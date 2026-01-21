---
title: Helm Ref
description: A reference page for helm charts
time: 01:01:57
date: 20-01-2026
---

# 📘 HELM COMPLETE REFERENCE GUIDE (Production Focus)

---

## 1️⃣ Helm Core Concepts (Must Know)

### Helm Terminology

| Term       | Meaning                                 |
| ---------- | --------------------------------------- |
| Chart      | A Helm package                          |
| Release    | A running instance of a chart           |
| Values     | Configuration input                     |
| Templates  | Kubernetes manifests with Go templating |
| Repository | Chart source (Bitnami, ArtifactHub)     |

---

## 2️⃣ Helm Chart Structure (Mandatory)

```text
mychart/
├── Chart.yaml
├── values.yaml
├── values-prod.yaml
├── values-dev.yaml
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── hpa.yaml
│   ├── pdb.yaml
│   ├── _helpers.tpl
└── charts/
```

### Chart.yaml (metadata)

```yaml
apiVersion: v2
name: mychart
version: 0.1.0
appVersion: "1.0.0"
type: application
```

---

## 3️⃣ Values Management (VERY IMPORTANT)

### Order of precedence

```text
CLI --set > values-prod.yaml > values.yaml
```

### Best Practice

```bash
helm install app . -f values-prod.yaml
```

Never hardcode values in templates.

---

## 4️⃣ Go Templating (CORE SKILL)

### Basic templating

```yaml
replicas: {{ .Values.replicaCount }}
```

### If condition

```yaml
{{- if .Values.ingress.enabled }}
```

### Default values

```yaml
{{ .Values.image.tag | default "latest" }}
```

### Loops

```yaml
{{- range .Values.env }}
- name: {{ .name }}
  value: {{ .value }}
{{- end }}
```

---

## 5️⃣ _helpers.tpl (Production Standard)

### Naming convention

```yaml
{{- define "app.fullname" -}}
{{ .Release.Name }}-{{ .Chart.Name }}
{{- end }}
```

Usage:

```yaml
name: {{ include "app.fullname" . }}
```

✔ Prevents naming collisions  
✔ Required for reusable charts

---

## 6️⃣ Helm Lifecycle Commands (MUST MEMORIZE)

```bash
helm install myapp .
helm upgrade myapp .
helm rollback myapp 1
helm uninstall myapp
helm list
helm history myapp
```

---

## 7️⃣ Helm Upgrade Strategies

### Safe upgrade

```bash
helm upgrade myapp . --atomic --timeout 5m
```

### Dry run

```bash
helm upgrade myapp . --dry-run --debug
```

---

## 8️⃣ Helm Hooks (Advanced)

Used for:

- DB migrations
    
- Pre/post install logic
    

```yaml
annotations:
  "helm.sh/hook": pre-install,pre-upgrade
```

⚠️ Use sparingly in production.

---

## 9️⃣ Helm + Kubernetes Production Objects

### MUST HAVE

|Resource|Why|
|---|---|
|Readiness Probe|Zero downtime|
|Liveness Probe|Self-healing|
|PDB|Node drain safety|
|HPA|Scaling|
|Resources|Stability|
|SecurityContext|Security|

---

## 🔟 Secrets Management (CRITICAL)

### ❌ Don’t do this

```yaml
password: hardcoded
```

### ✅ Do this

```yaml
env:
- name: DB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {{ .Values.secrets.db.name }}
      key: password
```

### Tools

- SealedSecrets
    
- External Secrets Operator
    
- SOPS + Helm
    

---

## 1️⃣1️⃣ Helm Dependencies (Subcharts)

```yaml
dependencies:
- name: mongodb
  version: 15.x.x
  repository: https://charts.bitnami.com/bitnami
```

Install:

```bash
helm dependency update
```

---

## 1️⃣2️⃣ Helm Testing (Underrated)

```bash
helm lint
helm template . | kubeval
helm test myapp
```

---

## 1️⃣3️⃣ Helm Best Practices (INTERVIEW GOLD)

✔ No logic in templates  
✔ Keep templates small  
✔ One chart = one app  
✔ Separate infra charts  
✔ Immutable image tags  
✔ Version charts properly

---

## 1️⃣4️⃣ Helm Anti-Patterns (Red Flags)

❌ Using Helm as a bash script  
❌ Large conditionals in templates  
❌ Hardcoding namespaces  
❌ Managing CRDs inside app charts

---

## 1️⃣5️⃣ Helm in CI/CD (Real World)

### GitOps Flow

```text
Git → CI → Helm Package → ArgoCD / Flux
```

### CI Commands

```bash
helm lint
helm template
helm package
```

---

## 1️⃣6️⃣ Helm + GitOps (Production Standard)

Tools:

- Argo CD
    
- Flux
    

Helm becomes **declarative**, not imperative.

---

## 1️⃣7️⃣ Versioning Strategy

|Component|Version|
|---|---|
|Chart|SemVer|
|App|Image tag|
|Infra|Separate repo|

---

## 1️⃣8️⃣ Security Checklist

✔ runAsNonRoot  
✔ readOnlyRootFilesystem  
✔ no latest tags  
✔ secrets externalized  
✔ network policies

---

## 1️⃣9️⃣ Helm Debugging Cheatsheet

```bash
helm template .
helm get values myapp
helm get manifest myapp
kubectl describe pod
```

---

## 2️⃣0️⃣ REAL Production Helm Stack

|Layer|Tool|
|---|---|
|Charts|Helm|
|CD|ArgoCD|
|Secrets|ESO / Vault|
|Monitoring|Prometheus|
|Logging|Loki|
|Tracing|Tempo|

