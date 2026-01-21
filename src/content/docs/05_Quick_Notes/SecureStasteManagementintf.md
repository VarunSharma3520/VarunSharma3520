---
title: Secure State Management in Terraform
description: production-grade Terraform remote state setup**
time: 13:01:50
date: 21-01-2026
---
Here’s the **real-world, production-grade Terraform remote state setup**. This is the pattern used in serious teams.

No fluff.

---

# Terraform Secure Remote State (AWS Gold Standard)

## Architecture

```
Terraform
  ↓
S3 (state file)
  + versioning
  + encryption
  + private
  + IAM locked
  ↓
DynamoDB (state locking)
```

---

## 1. Create the backend infra (one-time)

### S3 bucket (state)

```hcl
resource "aws_s3_bucket" "tf_state" {
  bucket = "mycompany-terraform-state-prod"
}

resource "aws_s3_bucket_versioning" "tf_state" {
  bucket = aws_s3_bucket.tf_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "tf_state" {
  bucket = aws_s3_bucket.tf_state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "tf_state" {
  bucket = aws_s3_bucket.tf_state.id
  block_public_acls   = true
  block_public_policy = true
  ignore_public_acls  = true
  restrict_public_buckets = true
}
```

---

### DynamoDB (state lock)

```hcl
resource "aws_dynamodb_table" "tf_lock" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
```

---

## 2. Terraform backend config

In **every project**:

```hcl
terraform {
  backend "s3" {
    bucket         = "mycompany-terraform-state-prod"
    key            = "network/vpc.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

Then:

```sh
terraform init
```

State is now:

- Remote
    
- Encrypted
    
- Versioned
    
- Locked
    
- Team-safe
    

---

## 3. IAM (most important part)

### Minimum permissions for humans / CI

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::mycompany-terraform-state-prod",
        "arn:aws:s3:::mycompany-terraform-state-prod/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem"
      ],
      "Resource": "arn:aws:dynamodb:*:*:table/terraform-locks"
    }
  ]
}
```

No one else gets access.

---

## 4. Environment isolation (must do)

Use **separate state files**:

```hcl
key = "prod/app.tfstate"
key = "staging/app.tfstate"
key = "dev/app.tfstate"
```

Never share a state file between environments.

---

## 5. Secrets handling (critical)

### Never store secrets in state

Bad:

```hcl
db_password = "supersecret"
```

State now leaks secrets forever.

---

### Correct patterns

Use:

- AWS SSM
    
- AWS Secrets Manager
    
- Vault
    

Example:

```hcl
data "aws_ssm_parameter" "db_pass" {
  name = "/prod/db/password"
  with_decryption = true
}
```

Terraform reads, but **state stores only reference**, not value.

---

## 6. Remote access model (how teams actually work)

### Humans

```text
AWS SSO / IAM Role
→ terraform plan/apply
```

### CI/CD

```text
GitHub Actions / GitLab / Jenkins
→ OIDC AssumeRole
→ Terraform
```

No static AWS keys. Ever.

---

## 7. State recovery & safety

Because you enabled:

- S3 versioning  
    You can literally roll back state:
    

```sh
aws s3api list-object-versions --bucket mycompany-terraform-state-prod
```

Then restore any previous version.

This saves lives.

---

# The “don’t get fired” checklist

If all are true, you're solid:

|Item|Status|
|---|---|
|Remote backend|✅|
|Encryption|✅|
|Versioning|✅|
|Locking|✅|
|IAM restricted|✅|
|Secrets external|✅|
|Separate env states|✅|
|No local state in git|✅|

---

# What _not_ to ever do

|Anti-pattern|Why it's bad|
|---|---|
|Local state|Team race conditions|
|Git state|Leaks secrets|
|No locking|Corrupt infra|
|Shared prod/dev state|Catastrophic|
|Hardcoded secrets|Permanent compromise|

---

# Mental model (important)

Terraform state is:

> **Your infrastructure brain.**

If:

- it’s public → you're hacked
    
- it’s shared → you're broken
    
- it’s unlocked → you're corrupt
    
- it has secrets → you're breached
    

---

# Industry standard stack

This exact setup is used by:

- FAANG
    
- Banks
    
- SaaS platforms
    
- Gov cloud
    

Anything else is **toy mode**.
