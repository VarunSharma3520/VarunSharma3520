---
title: Modules in Terraform
description: Guide on a production level on terraform modules
time: 14:01:86
date: 21-01-2026
---
A good **production-level Terraform module setup** usually follows two principles:

1. **Reuse battle-tested community modules** where possible.
    
2. **Wrap them with your own modules** to enforce standards, security, and defaults.
    

This is how most serious orgs do it.

---

# 1. Typical Production Structure

```
terraform/
├── environments/
│   ├── dev/
│   │   └── main.tf
│   ├── staging/
│   └── prod/
│
├── modules/
│   ├── network/
│   ├── eks/
│   ├── rds/
│   └── iam/
│
└── versions.tf
```

- `modules/` → **your opinionated wrappers**
    
- `environments/` → thin configs per environment
    
- Community modules live **inside your modules**, not directly in envs.
    

---

# 2. Using a Community Module (Example: VPC)

### Community module

Use something like:

```hcl
terraform-aws-modules/vpc/aws
```

### Your production wrapper

`modules/network/main.tf`

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = var.name
  cidr = var.cidr

  azs             = var.azs
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets

  enable_nat_gateway = true
  single_nat_gateway = false
  enable_dns_hostnames = true

  tags = merge(var.tags, {
    "Module" = "network"
  })
}
```

`modules/network/variables.tf`

```hcl
variable "name" { type = string }
variable "cidr" { type = string }
variable "azs"  { type = list(string) }

variable "private_subnets" { type = list(string) }
variable "public_subnets"  { type = list(string) }

variable "tags" {
  type    = map(string)
  default = {}
}
```

`modules/network/outputs.tf`

```hcl
output "vpc_id" {
  value = module.vpc.vpc_id
}

output "private_subnets" {
  value = module.vpc.private_subnets
}
```

---

# 3. Environment Usage (Thin Layer)

`environments/prod/main.tf`

```hcl
module "network" {
  source = "../../modules/network"

  name = "prod-vpc"
  cidr = "10.0.0.0/16"

  azs = ["us-east-1a", "us-east-1b", "us-east-1c"]

  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  tags = {
    Environment = "prod"
    Owner       = "platform"
  }
}
```

Environments should:

- Only pass values
    
- Never define real resources directly
    

---

# 4. Making Your Own Module (No Community)

Example: custom S3 module.

`modules/s3/main.tf`

```hcl
resource "aws_s3_bucket" "this" {
  bucket = var.name

  force_destroy = false

  tags = var.tags
}

resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.this.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id

  block_public_acls   = true
  block_public_policy = true
  ignore_public_acls  = true
  restrict_public_buckets = true
}
```

This module enforces:

- Versioning
    
- No public access
    
- Safe defaults
    

---

# 5. Production Rules Most Teams Follow

### 1. Never use community modules directly in envs

Always wrap them.

### 2. Pin versions

```hcl
version = "~> 5.0"
```

### 3. Opinionated defaults

Your module decides:

- Encryption on
    
- Logging on
    
- Private by default
    

### 4. Outputs are your contract

Only expose what downstream needs.

### 5. No logic in environments

No `for_each`, no conditionals, no resources.

---

# 6. Remote State & Locking (Mandatory in prod)

```hcl
terraform {
  backend "s3" {
    bucket         = "org-terraform-state"
    key            = "prod/network.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

---

# 7. Real Production Module Checklist

A module is "production level" when it has:

|Item|Required|
|---|---|
|Version pinning|✅|
|Safe defaults|✅|
|Input validation|✅|
|No hardcoded secrets|✅|
|Outputs documented|✅|
|Works with remote state|✅|
|Idempotent|✅|
|Destroy protection|where needed|

---

# 8. Enterprise Pattern (What big companies do)

```
infra-live/        (envs only)
infra-modules/     (your wrappers)
infra-policies/    (OPA / Sentinel)
```

With:

- CI: `terraform fmt`, `validate`, `tflint`
    
- CD: plan requires approval
    
- No human applies in prod
    

---

# The Golden Rule

> **Community modules give you 80%.  
> Your modules provide the last 20% that makes it safe, compliant, and operable.**

If you're not wrapping community modules, you're not really doing production Terraform — you're just scripting infrastructure.
