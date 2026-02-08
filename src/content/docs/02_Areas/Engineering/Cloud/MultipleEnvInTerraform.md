---
title: Manage multiple environments in Terrrafom
description: A Modern approah to manage terraform
time: 20:01:52
date: 23-01-2026
---
This is one of the **most important Terraform concepts**. If you get this right early, everything else stays sane.

There are **4 main patterns**, but only **2 are actually good in real life**.

---

# The Core Problem

You want:

- dev
    
- staging
    
- prod
    

But:

- different sizes
    
- different AWS accounts
    
- different variables
    
- same architecture
    

---

# Pattern 1 (Beginner, NOT recommended)

## Terraform workspaces

```bash
terraform workspace new dev
terraform workspace new prod
```

Same code, different state.

### Why this sucks in practice

- Easy to destroy prod by mistake
    
- All envs share same credentials
    
- Hard to do different accounts
    
- Terrible with CI/CD
    

**Almost nobody serious uses this for prod.**

---

# Pattern 2 (Best Practice)

## Folder per environment (most common)

```
terraform/
  modules/
    eks/
    vpc/
  envs/
    dev/
      main.tf
      backend.tf
      terraform.tfvars
    staging/
      main.tf
      backend.tf
      terraform.tfvars
    prod/
      main.tf
      backend.tf
      terraform.tfvars
```

All envs reuse the same modules.

---

## Example

### modules/eks/main.tf

```hcl
variable "cluster_name" {}
variable "node_size" {}

module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name = var.cluster_name
  eks_managed_node_groups = {
    default = {
      instance_types = [var.node_size]
    }
  }
}
```

---

### envs/dev/terraform.tfvars

```hcl
cluster_name = "myapp-dev"
node_size    = "t3.small"
```

### envs/prod/terraform.tfvars

```hcl
cluster_name = "myapp-prod"
node_size    = "m5.large"
```

---

### envs/dev/main.tf

```hcl
module "eks" {
  source = "../../modules/eks"
  cluster_name = var.cluster_name
  node_size    = var.node_size
}
```

---

# Pattern 3 (Account per environment – PRO setup)

Same as pattern 2, but:

|Env|AWS Account|
|---|---|
|dev|111111111|
|stage|222222222|
|prod|333333333|

Terraform provider:

```hcl
provider "aws" {
  region = "us-east-1"
  profile = "dev"
}
```

This is what serious companies do.

---

# Pattern 4 (Mono-repo with Terragrunt)

Used by large infra teams.

```
live/
  dev/
  prod/
modules/
```

Terragrunt handles:

- remote state
    
- DRY variables
    
- dependencies
    

Powerful but more complex.

---

# How state should be handled (CRITICAL)

Never local state.

Use remote:

```hcl
backend "s3" {
  bucket = "my-tf-state-prod"
  key    = "eks/terraform.tfstate"
  region = "us-east-1"
  dynamodb_table = "terraform-locks"
}
```

Each env → different bucket or key.

---

# How this works with ArgoCD

Terraform environments manage:

- EKS clusters
    
- VPCs
    
- IAM
    

ArgoCD environments manage:

```
gitops/
  apps/
    dev/
    prod/
```

Each ArgoCD points to its env path.

---

# Golden rules (real world)

|Rule|Why|
|---|---|
|One state per env|No cross-destruction|
|One AWS account per env|Security|
|Same modules|No drift|
|Different variables|Flexibility|
|Remote state|Team safe|
|No workspaces|Ever|

---

# Simple mental model

Think of Terraform like this:

> "Same blueprint, different buildings"

Modules = blueprint  
Env folders = buildings

---

# My recommendation for you

Since you're doing EKS:

```
infra/
  modules/
    eks/
    vpc/
  envs/
    dev/
    prod/
```

Later:

- add staging
    
- move prod to separate AWS account
    
- plug ArgoCD on top
    

---

# One sentence that matters

> **Environments are folders, not workspaces.**  
> If you follow only that rule, you're already ahead of 70% of teams.
