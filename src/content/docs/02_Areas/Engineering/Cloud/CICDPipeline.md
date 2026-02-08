---
title: how to set up CI/CD pipeline
description: Setup CI/CD
time: 16:01:43
date: 23-01-2026
---
Great — this is a very common and clean setup 👍  
You’ll basically use **Terraform for infrastructure (EKS + networking)** and then either:

- Terraform again for **deploying your K8s manifests**, or
    
- `kubectl`/Helm for **app layer**.
    

I’ll show you the standard, production-style approach.

---

## High-level flow

```
Terraform
  ├─ Create VPC
  ├─ Create EKS cluster
  ├─ Create node groups
  └─ Configure kubectl access

Then:
  └─ Apply your k8s YAML to the cluster
```

---

# Option A (Most common & clean)

**Terraform manages only EKS.  
kubectl/Helm manages workloads.**

This is what 90% of teams do.

---

## 1. Terraform project structure

```
infra/
  main.tf
  vpc.tf
  eks.tf
  variables.tf
  outputs.tf
```

---

## 2. Providers

```hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
```

---

## 3. Create VPC (simplest way)

Use the official module:

```hcl
# vpc.tf
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"

  name = "eks-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
}
```

---

## 4. Create EKS cluster

```hcl
# eks.tf
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.8.0"

  cluster_name    = "my-eks"
  cluster_version = "1.29"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    default = {
      desired_size = 2
      max_size     = 3
      min_size     = 1

      instance_types = ["t3.medium"]
    }
  }
}
```

---

## 5. Get kubeconfig

After `terraform apply`:

```bash
aws eks update-kubeconfig --region us-east-1 --name my-eks
```

Test:

```bash
kubectl get nodes
```

---

## 6. Deploy your YAML

Now just:

```bash
kubectl apply -f your-app.yaml
```

or with Helm:

```bash
helm install myapp ./chart
```

---

# Option B (Terraform also deploys your YAML)

Useful for GitOps-style infra repos.

---

## Use Kubernetes provider

```hcl
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  token                  = data.aws_eks_cluster_auth.this.token
}
```

```hcl
resource "kubernetes_manifest" "app" {
  manifest = yamldecode(file("../k8s/app.yaml"))
}
```

---

# Real-world best practice (what companies do)

|Layer|Tool|
|---|---|
|AWS infra|Terraform|
|EKS addons (CNI, ALB, autoscaler)|Helm|
|Applications|Helm / ArgoCD|
|Secrets|SSM / External Secrets|

---

# Minimal command sequence

```bash
cd infra
terraform init
terraform apply

aws eks update-kubeconfig --name my-eks
kubectl apply -f k8s/
```

---

# Production extras you’ll want soon

Once basics work:

- **AWS Load Balancer Controller**
    
- **Cluster Autoscaler**
    
- **External DNS**
    
- **IRSA (IAM roles for service accounts)**
    
- **ArgoCD for GitOps**
    

---

## Mental model (important)

> Terraform should manage **things that are slow to change**  
> Kubernetes should manage **things that change often**

That separation will save you a lot of pain later.

---

If you tell me:

- AWS region
    
- how many nodes you want
    
- whether this is dev or prod
    

I can give you a **ready-to-run minimal repo structure** tailored exactly for you.