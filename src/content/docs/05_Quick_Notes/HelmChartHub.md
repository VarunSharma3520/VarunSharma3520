---
title: How to use public helm charts efficiently
description: Guide to use public helm chart
time: 04:01:83
date: 20-01-2026
---
This is written from a **real cluster / production mindset**, not just “helm install and forget”.

---

# Using Public Helm Charts — In-Depth Guide

## 1. What Are Public Helm Charts?

**Public Helm charts** are pre-packaged Kubernetes applications published by:

- Vendors (Bitnami, Grafana, Elastic)
    
- Cloud-native projects (Prometheus, Argo)
    
- Community maintainers
    

They allow you to deploy complex systems in **minutes instead of weeks**.

Examples:

- Prometheus monitoring stack
    
- NGINX Ingress Controller
    
- Kafka
    
- Redis
    
- Argo CD
    

---

## 2. Where Public Charts Come From (Repositories)

A **Helm repository** is just an HTTP server hosting:

- `.tgz` chart archives
    
- `index.yaml` metadata
    

### Common Trusted Repositories

|Repo|Maintained by|Trust Level|
|---|---|---|
|Bitnami|VMware / Broadcom|⭐⭐⭐⭐⭐|
|prometheus-community|CNCF community|⭐⭐⭐⭐⭐|
|grafana|Grafana Labs|⭐⭐⭐⭐⭐|
|ingress-nginx|Kubernetes SIG|⭐⭐⭐⭐⭐|
|elastic|Elastic|⭐⭐⭐⭐|
|argo|Argo project|⭐⭐⭐⭐⭐|

---

## 3. Adding and Managing Repositories

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```

List repos:

```bash
helm repo list
```

---

## 4. Discovering Charts (Correct Way)

### Search a repo

```bash
helm search repo redis
```

### Inspect chart metadata

```bash
helm show chart bitnami/redis
```

### Inspect default values (VERY IMPORTANT)

```bash
helm show values bitnami/redis
```

📌 **Never install a public chart without reading its values**.

---

## 5. Understanding Public Chart Design

Most mature charts follow this structure:

```
chart/
├── templates/
├── values.yaml        # very large
├── values.schema.json # validation
├── README.md          # critical
```

### Key Characteristics

- Hundreds of configurable options
    
- Defaults optimized for **demo**, not production
    
- Feature flags for:
    
    - persistence
        
    - auth
        
    - TLS
        
    - metrics
        
    - RBAC
        
    - HA
        

---

## 6. Golden Rules for Using Public Charts

### ❌ Don’t

- Edit chart templates directly
    
- Use default values in production
    
- Upgrade blindly
    

### ✅ Do

- Override values via your own `values-*.yaml`
    
- Pin chart versions
    
- Store values in Git
    
- Read upgrade notes
    

---

## 7. Installing a Public Chart (Correct Workflow)

### Step 1: Inspect values

```bash
helm show values bitnami/postgresql > postgres-values.yaml
```

### Step 2: Modify for your environment

```yaml
auth:
  username: appuser
  database: appdb

primary:
  persistence:
    enabled: true
    size: 50Gi

resources:
  requests:
    cpu: 500m
    memory: 1Gi
```

### Step 3: Install

```bash
helm install postgres bitnami/postgresql \
  -n databases \
  -f postgres-values.yaml \
  --create-namespace
```

---

## 8. Upgrading Public Charts Safely

### Check current version

```bash
helm list -n databases
```

### Check available versions

```bash
helm search repo bitnami/postgresql --versions
```

### Dry-run upgrade

```bash
helm upgrade postgres bitnami/postgresql \
  -f postgres-values.yaml \
  --dry-run
```

📌 **Always read the chart’s CHANGELOG before upgrading.**

---

## 9. Rollbacks (Why Helm Shines)

```bash
helm history postgres -n databases
helm rollback postgres 1 -n databases
```

This is **huge** for infra components.

---

# 10. Common & Useful Public Helm Charts (Curated List)

Below is a **production-oriented list**, grouped by category.

---

## A. Ingress & Networking

### 1. ingress-nginx

📌 **Most common ingress controller**

```bash
helm install ingress-nginx ingress-nginx/ingress-nginx
```

Used for:

- HTTP routing
    
- TLS termination
    
- Load balancing
    

Why it’s popular:

- Official Kubernetes project
    
- Very stable
    
- Works everywhere
    

---

### 2. cert-manager

📌 **Automatic TLS certificates**

Use cases:

- Let’s Encrypt
    
- Internal CA
    

Why important:

- Manages cert lifecycle automatically
    
- Almost mandatory in production
    

---

## B. Observability & Monitoring

### 3. kube-prometheus-stack

📌 **Monitoring gold standard**

Includes:

- Prometheus
    
- Alertmanager
    
- Grafana
    
- Node exporters
    

```bash
helm install monitoring prometheus-community/kube-prometheus-stack
```

Why it’s huge:

- Full observability out of the box
    
- Used by almost every serious cluster
    

---

### 4. Grafana

📌 **Dashboards & visualization**

Often installed standalone or via Prometheus stack.

---

### 5. Loki

📌 **Log aggregation**

Why Loki:

- Cheaper than ELK
    
- Label-based logging
    
- Native Grafana integration
    

---

## C. Databases & Messaging

### 6. PostgreSQL (Bitnami)

📌 **Most used DB chart**

Features:

- Persistence
    
- Replication
    
- Backups
    
- Metrics
    

Use when:

- You need DB quickly
    
- Dev / staging / even prod (with care)
    

---

### 7. Redis (Bitnami)

📌 **Cache / queue**

Supports:

- Standalone
    
- Master/replica
    
- Sentinel
    

---

### 8. Kafka (Bitnami)

📌 **Event streaming**

Heavy chart, but:

- Very configurable
    
- Production-ready
    

---

## D. CI/CD & GitOps

### 9. Argo CD

📌 **GitOps standard**

```bash
helm install argocd argo/argo-cd
```

Why Argo:

- Declarative deployments
    
- Git as source of truth
    
- Massive ecosystem adoption
    

---

### 10. Jenkins

📌 **Classic CI server**

Still common, but:

- Needs careful resource tuning
    
- Security hardening required
    

---

## E. Security & Secrets

### 11. External Secrets Operator

📌 **Sync secrets from cloud providers**

Supports:

- AWS Secrets Manager
    
- Vault
    
- Azure Key Vault
    

Critical for:

- Avoiding secrets in Helm values
    

---

### 12. HashiCorp Vault

📌 **Enterprise-grade secrets**

Complex but powerful.

---

## F. Storage & Infrastructure

### 13. Metrics Server

📌 **Required for HPA**

```bash
helm install metrics-server bitnami/metrics-server
```

---

### 14. Longhorn

📌 **Distributed block storage**

Great for:

- On-prem clusters
    
- Stateful workloads
    

---

## 11. How to Decide If a Public Chart Is “Good”

Check:

1. **Maintenance activity**
    
2. **Number of contributors**
    
3. **Open issues**
    
4. **Documentation quality**
    
5. **values.schema.json present**
    
6. **Used by well-known companies**
    

If these are weak → be cautious.

---

## 12. Customizing Public Charts (Best Pattern)

```
helm/
├── postgres/
│   ├── values-dev.yaml
│   ├── values-prod.yaml
│   └── README.md (your notes)
```

Never fork unless:

- You need to change templates
    
- Maintainer is inactive
    

---

## 13. Helm + GitOps (Real-World Pattern)

```yaml
# Argo CD Application
source:
  repoURL: https://charts.bitnami.com/bitnami
  chart: postgresql
  targetRevision: 15.2.0
  helm:
    valueFiles:
      - values-prod.yaml
```

This is **industry standard**.

---

## 14. Common Mistakes (Very Common)

❌ Using default passwords  
❌ No persistence enabled  
❌ No resource limits  
❌ Blind upgrades  
❌ Storing secrets in values.yaml

---

## 15. Final Mental Model

> Public Helm charts are **frameworks**, not “install and forget” apps.

You:

- Inspect
    
- Configure
    
- Pin versions
    
- Own the lifecycle
    

Do that, and they become **one of the most powerful tools in Kubernetes**.
