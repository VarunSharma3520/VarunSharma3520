---
title: Complete CI/CD Pipeline
description: A way to setup CI/CD pipeline
time: 02:01:46
date: 20-01-2026
---
This is a **full real-world GitOps workflow**, exactly how modern production platforms are built.

Below is a **clear, end-to-end GitOps reference** using:

**Terraform + AWS + Docker + GitHub Actions + ArgoCD + Kubernetes**

I’ll explain:

1. Architecture
    
2. Repos structure
    
3. Workflow (step-by-step)
    
4. GitHub Actions pipelines
    
5. ArgoCD role
    
6. Who does what (CI vs CD)
    
7. Why this is production-grade
    

---

# 🧠 High-Level Architecture (Mental Model)

```
Developer
   │
   ▼
GitHub (Code + Infra)
   │
   ├── GitHub Actions (CI)
   │      ├─ Build Docker Image
   │      ├─ Push to ECR
   │      └─ Update Helm values
   │
   ▼
GitHub (Git = Source of Truth)
   │
   ▼
ArgoCD (CD / GitOps)
   │
   ▼
Kubernetes (EKS)
```

> **Key principle:**  
> ❌ CI never deploys to cluster  
> ✅ ArgoCD pulls desired state from Git

---

# 🗂️ Repository Structure (REAL PROD)

### 1️⃣ Infrastructure Repo (Terraform)

```text
infra/
├── terraform/
│   ├── vpc/
│   ├── eks/
│   ├── ecr/
│   └── iam/
├── environments/
│   ├── dev/
│   └── prod/
└── backend.tf
```

Used for:

- VPC
    
- EKS
    
- ECR
    
- IAM
    
- S3 backend
    

---

### 2️⃣ Application Repo (Code + Docker)

```text
app/
├── Dockerfile
├── src/
├── tests/
└── .github/workflows/ci.yaml
```

Used for:

- Build
    
- Test
    
- Docker image
    

---

### 3️⃣ GitOps Repo (K8s + Helm)

```text
gitops/
├── charts/
│   └── api/
├── environments/
│   ├── dev/
│   │   └── api.yaml
│   └── prod/
│       └── api.yaml
└── argocd/
```

Used by:

- ArgoCD ONLY
    

---

# 🚀 Step-by-Step Workflow

---

## STEP 1️⃣ Infrastructure Provisioning (Terraform → AWS)

```bash
terraform init
terraform plan
terraform apply
```

Terraform creates:

- VPC
    
- EKS
    
- Node Groups
    
- ECR
    
- IAM roles
    

✅ One-time / rare changes  
❌ Not part of app deploys

---

## STEP 2️⃣ Developer Pushes Code

```bash
git checkout -b feature/login
git commit -m "feat: add login"
git push
```

PR → review → merge to `main`

---

## STEP 3️⃣ GitHub Actions (CI PIPELINE)

### `.github/workflows/ci.yaml`

```yaml
name: CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Login to ECR
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build & Push Image
        run: |
          docker build -t api:${{ github.sha }} .
          docker tag api:${{ github.sha }} \
            $ECR_REPO:{{ github.sha }}
          docker push $ECR_REPO:${{ github.sha }}

      - name: Update GitOps Repo
        run: |
          sed -i "s/tag:.*/tag: ${GITHUB_SHA}/" \
            environments/dev/values.yaml
```

✅ CI does:

- Build
    
- Test
    
- Push image
    
- Update Git
    

❌ CI does NOT:

- kubectl apply
    
- helm install
    

---

## STEP 4️⃣ GitOps Repo Updated

```yaml
image:
  repository: 123456789.dkr.ecr.aws/api
  tag: a1b2c3d
```

This commit = **deployment request**

---

## STEP 5️⃣ ArgoCD (CD / GitOps)

ArgoCD watches GitOps repo:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: api
spec:
  source:
    repoURL: https://github.com/org/gitops.git
    path: charts/api
    helm:
      valueFiles:
        - environments/prod/values.yaml
```

ArgoCD:

- Detects Git change
    
- Diffs desired vs live state
    
- Syncs cluster automatically
    

---

## STEP 6️⃣ Kubernetes Applies Change

- New Pods created
    
- Readiness checks
    
- Rolling / Blue-Green
    
- Old pods terminated safely
    

✔ Zero downtime  
✔ Rollback via Git

---

# 🔄 Rollback (GitOps Superpower)

```bash
git revert <commit>
git push
```

ArgoCD:

- Sees revert
    
- Restores previous version
    

⏱ Rollback time: **seconds**

---

# 🧩 Who Does What (VERY IMPORTANT)

|Tool|Responsibility|
|---|---|
|Terraform|Infrastructure|
|Docker|Application image|
|GitHub Actions|CI|
|Git|Source of truth|
|ArgoCD|CD|
|Kubernetes|Runtime|

---

# 🔐 Security Model

✔ No cluster creds in CI  
✔ No kubectl in pipelines  
✔ IAM roles for service accounts  
✔ Secrets via ESO / AWS SM

---

# 🧠 Why This Is Production-Grade

✔ Immutable infrastructure  
✔ Auditable deployments  
✔ Easy rollback  
✔ Drift detection  
✔ Environment separation  
✔ Least privilege

---

# 🚨 Anti-Patterns (Avoid These)

❌ CI deploying to cluster  
❌ Helm install in pipelines  
❌ Secrets in Git  
❌ Manual kubectl apply  
❌ Terraform for app deploys

---

# 🏆 How Big Companies Do It

- AWS → EKS
    
- Terraform for infra
    
- ArgoCD for CD
    
- GitHub Actions for CI
    
- Helm for packaging
    
- External Secrets
    

This exact model is used at:

- Stripe
    
- Airbnb
    
- Shopify
    
- Netflix (variant)
    

---

## 📌 TL;DR

> **CI builds artifacts**
> 
> **Git declares desired state**
> 
> **ArgoCD enforces it**



