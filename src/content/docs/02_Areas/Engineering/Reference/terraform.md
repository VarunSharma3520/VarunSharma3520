---
title: Basic Terraform Commands
description: A quick reference for basic Terraform commands used in infrastructure management.
---

### 1️⃣ `terraform init`

👉 Initialize a Terraform project

```bash
terraform init
```

* Downloads providers
* Sets up backend
* Prepares working directory

Run **first**, always.

---

### 2️⃣ `terraform plan`

👉 Preview what Terraform will do

```bash
terraform plan
```

Shows:

```
+ create
~ update
- destroy
```

Safe, read-only.

---

### 3️⃣ `terraform apply`

👉 Create / modify infrastructure

```bash
terraform apply
```

* Executes the plan
* Prompts for confirmation

---

### 4️⃣ `terraform destroy`

👉 Delete everything Terraform created

```bash
terraform destroy
```

⚠️ Dangerous in production

---

# 📦 State & Inspection Commands

### 5️⃣ `terraform show`

👉 Show current state in human-readable form

```bash
terraform show
```

Shows:

* Resource IDs
* Attributes
* Outputs

---

### 6️⃣ `terraform state list`

👉 List resources tracked in state

```bash
terraform state list
```

Example:

```
aws_vpc.server_vpc
aws_instance.web
```

---

### 7️⃣ `terraform state show`

👉 Inspect ONE resource in state

```bash
terraform state show aws_vpc.server_vpc
```

---

### 8️⃣ `terraform refresh`

👉 Sync state with real cloud (mostly deprecated)

```bash
terraform refresh
```

⚠️ Usually replaced by:

```bash
terraform apply -refresh-only
```

---

# 🔍 Validation & Formatting

### 9️⃣ `terraform validate`

👉 Check syntax and logic

```bash
terraform validate
```

No cloud calls.

---

### 🔟 `terraform fmt`

👉 Auto-format `.tf` files

```bash
terraform fmt
terraform fmt -recursive
```

---

# 🔧 Advanced / Power Commands

### 11️⃣ `terraform output`

👉 Show outputs

```bash
terraform output
terraform output vpc_id
```

---

### 12️⃣ `terraform graph`

👉 Visual dependency graph (DOT format)

```bash
terraform graph
```

---

### 13️⃣ `terraform providers`

👉 Show providers used

```bash
terraform providers
```

---

### 14️⃣ `terraform taint` (deprecated)

👉 Mark resource for recreation

Replaced by:

```bash
terraform apply -replace=aws_instance.web
```

---

# 🧪 Debug & Import

### 15️⃣ `terraform import`

👉 Bring existing infra under Terraform

```bash
terraform import aws_vpc.server_vpc vpc-123456
```

---

### 16️⃣ `terraform console`

👉 Interactive Terraform REPL

```bash
terraform console
```

Example:

```hcl
> cidrsubnet("10.0.0.0/16", 8, 1)
```

---

# 📁 Workspace Commands (Multi-Env)

### 17️⃣ `terraform workspace list`

```bash
terraform workspace list
```

---

### 18️⃣ `terraform workspace new dev`

```bash
terraform workspace new dev
```

---

### 19️⃣ `terraform workspace select prod`

```bash
terraform workspace select prod
```

---

# 🧠 Most Important Commands (MEMORIZE)

If you remember only these, you’re good:

```
terraform init
terraform plan
terraform apply
terraform destroy
terraform show
terraform state list
terraform fmt
terraform validate
```
