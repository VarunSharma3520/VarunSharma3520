---
title: How to set up ArgoCD in Terraform
description: Manage ArgoCD With Terraform
time: 20:01:39
date: 23-01-2026
---
There are **three standard patterns**, from most common to most “pure GitOps”.

---

# Pattern 1 (Most popular)

## Terraform installs ArgoCD via Helm

Terraform → installs ArgoCD → ArgoCD manages everything else.

### Flow

```
Terraform
  └─ Helm chart: ArgoCD
        └─ ArgoCD syncs apps from Git
```

### Example

```hcl
provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    token                  = data.aws_eks_cluster_auth.this.token
  }
}

resource "helm_release" "argocd" {
  name       = "argocd"
  namespace  = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "5.51.6"

  create_namespace = true

  values = [file("argocd-values.yaml")]
}
```

Then:

```bash
kubectl get pods -n argocd
```

---

# Pattern 2 (Terraform applies raw YAML)

Less common, more brittle:

```hcl
resource "kubernetes_manifest" "argocd" {
  manifest = yamldecode(file("install.yaml"))
}
```

Not great for upgrades.

---

# Pattern 3 (Ultra-pure GitOps)

Terraform **only installs ArgoCD**, and immediately stops touching K8s forever.

Everything else:

- In Git
    
- Applied by ArgoCD
    
- Even ArgoCD manages itself (self-healing)
    

This is what high-maturity orgs do.

---

# Recommended architecture (real-world)

```
terraform/
  eks/
  argocd/

gitops-repo/
  apps/
    frontend/
    backend/
  infra/
    ingress/
    cert-manager/
```

Terraform:

- EKS
    
- VPC
    
- ArgoCD
    

ArgoCD:

- All workloads
    
- Ingress
    
- Monitoring
    
- Secrets
    

---

# Bootstrapping your first app

Terraform installs ArgoCD, then:

```yaml
# app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/you/gitops
    path: apps/myapp
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

Apply once:

```bash
kubectl apply -f app.yaml
```

From now on → **no more kubectl**.

---

# This combo is industry standard

|Tool|Purpose|
|---|---|
|Terraform|Cloud infra|
|Helm|Packaging|
|ArgoCD|GitOps controller|
|GitHub|Source of truth|

---

# Critical rule (that saves careers)

> Terraform should install ArgoCD  
> **ArgoCD should deploy everything else**

Never let Terraform and ArgoCD manage the same resource.

---

# Common mistakes

|Mistake|Why it hurts|
|---|---|
|Terraform deploying apps|Drift + conflicts|
|Argo managing infra|Slow, unsafe|
|Mixing kubectl & Argo|Ghost state|
|Storing secrets in Git|Security nightmare|

---

# Your ideal setup (for EKS)

```
AWS -> Terraform -> EKS
                 -> ArgoCD
                        -> Apps
                        -> Ingress
                        -> Monitoring
                        -> Certs
```

At that point you’ve basically built **enterprise-grade platform engineering**.

---

### One-liner summary

Yes — **Terraform bootstraps ArgoCD, then ArgoCD takes over the cluster**.  
That’s the cleanest GitOps model in production today.