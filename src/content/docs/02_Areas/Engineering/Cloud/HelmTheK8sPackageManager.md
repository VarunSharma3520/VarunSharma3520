---
title: Helm - The K8s Package Manager
description: Introduction to helm
time: 04:01:49
date: 20-01-2026
---
Below is a **from-scratch, end-to-end explanation of Helm in Kubernetes**, written for an **engineer** who wants to understand *what it is, why it exists, how it works internally, and how to use it correctly in real clusters*.

---

# Helm in Kubernetes — Complete Guide

## 1. What Problem Helm Solves

### Kubernetes without Helm

In raw Kubernetes, you typically deploy apps using YAML files:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

Problems:

* Many YAML files per app
* Hard-coded values (image tags, replicas, ports)
* No versioning
* No rollback
* Difficult upgrades
* Copy-paste across environments (dev/stage/prod)

---

### What Helm Does

**Helm is a package manager for Kubernetes**, similar to:

* `apt` for Ubuntu
* `yum` for CentOS
* `npm` for Node.js

Helm lets you:

* Package Kubernetes manifests
* Template values
* Install apps with one command
* Upgrade, rollback, and uninstall cleanly
* Manage versions and releases

---

## 2. Core Helm Concepts (Must Know)

| Term           | Meaning                            |
| -------------- | ---------------------------------- |
| **Chart**      | A Helm package (Kubernetes app)    |
| **Release**    | A running instance of a chart      |
| **Repository** | Storage for charts                 |
| **Values**     | Configuration inputs for templates |
| **Templates**  | Parameterized Kubernetes YAML      |
| **Revision**   | Version of a release               |

---

## 3. Helm Architecture (How It Works Internally)

Helm is **client-side only** (Helm v3+).

```
Helm CLI
   |
   |-- Renders templates (locally)
   |
   |-- Sends final YAML to Kubernetes API
   |
Kubernetes Cluster
```

📌 **Important**:
There is **no Helm server running inside the cluster**.

---

## 4. Installing Helm

### Linux / macOS

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### Verify

```bash
helm version
```

---

## 5. Helm Chart Structure (Very Important)

Create a chart:

```bash
helm create myapp
```

Directory structure:

```
myapp/
├── Chart.yaml
├── values.yaml
├── charts/
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── _helpers.tpl
└── .helmignore
```

---

### 5.1 Chart.yaml

Metadata about the chart.

```yaml
apiVersion: v2
name: myapp
description: A sample Helm chart
type: application
version: 0.1.0
appVersion: "1.0"
```

* `version` → chart version
* `appVersion` → app version (image version, etc.)

---

### 5.2 values.yaml

Default configuration values.

```yaml
replicaCount: 2

image:
  repository: nginx
  tag: latest

service:
  type: ClusterIP
  port: 80
```

These values are injected into templates.

---

### 5.3 templates/

Contains Kubernetes YAML with **Go templating**.

Example: `deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: app
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
```

---

## 6. Helm Templating Basics

### Common Variables

| Variable             | Meaning      |
| -------------------- | ------------ |
| `.Values`            | values.yaml  |
| `.Release.Name`      | release name |
| `.Release.Namespace` | namespace    |
| `.Chart.Name`        | chart name   |

---

### Conditionals

```yaml
{{- if .Values.ingress.enabled }}
kind: Ingress
{{- end }}
```

---

### Loops

```yaml
{{- range .Values.env }}
- name: {{ .name }}
  value: {{ .value }}
{{- end }}
```

---

## 7. Installing a Helm Chart

### From Local Chart

```bash
helm install my-release ./myapp
```

Where:

* `my-release` → release name
* `./myapp` → chart directory

---

### Specify Namespace

```bash
helm install my-release ./myapp -n dev --create-namespace
```

---

## 8. Overriding Values

### Using a values file

```bash
helm install my-release ./myapp -f values-prod.yaml
```

---

### Using CLI flags

```bash
helm install my-release ./myapp \
  --set image.tag=1.25 \
  --set replicaCount=3
```

⚠️ CLI overrides **values.yaml**

---

## 9. Helm Repository (Public Charts)

### Add Repository

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

---

### Search Charts

```bash
helm search repo nginx
```

---

### Install from Repo

```bash
helm install nginx bitnami/nginx
```

---

## 10. Managing Releases

### List Releases

```bash
helm list -A
```

---

### Get Manifest

```bash
helm get manifest my-release
```

---

### Get Values

```bash
helm get values my-release
```

---

## 11. Upgrading a Release

```bash
helm upgrade my-release ./myapp
```

With new values:

```bash
helm upgrade my-release ./myapp -f values-prod.yaml
```

Helm:

* Creates new revision
* Applies changes
* Keeps history

---

## 12. Rollback (Critical Feature)

```bash
helm rollback my-release 1
```

Check history:

```bash
helm history my-release
```

---

## 13. Uninstalling a Release

```bash
helm uninstall my-release
```

Deletes:

* All Kubernetes resources
* Release metadata

---

## 14. Dry Run & Debugging

### Render YAML without installing

```bash
helm template my-release ./myapp
```

---

### Dry Run

```bash
helm install my-release ./myapp --dry-run --debug
```

---

## 15. Helm Hooks (Advanced)

Hooks run at specific lifecycle events.

| Hook         | When            |
| ------------ | --------------- |
| pre-install  | Before install  |
| post-install | After install   |
| pre-upgrade  | Before upgrade  |
| post-delete  | After uninstall |

Example:

```yaml
annotations:
  "helm.sh/hook": pre-install
```

Use cases:

* DB migrations
* Pre-checks
* Cleanup jobs

---

## 16. Helm vs Kustomize (Quick Comparison)

| Feature    | Helm   | Kustomize |
| ---------- | ------ | --------- |
| Templating | Yes    | No        |
| Packaging  | Yes    | No        |
| Rollback   | Yes    | No        |
| Complexity | Medium | Low       |

👉 Helm is better for **reusable apps**, Kustomize for **overlays**.

---

## 17. Best Practices (Important)

### ✅ Do

* Keep `values.yaml` minimal
* Use environment-specific values files
* Pin chart versions
* Use `helm lint`

```bash
helm lint ./myapp
```

---

### ❌ Avoid

* Hardcoding secrets (use external secrets)
* Massive logic in templates
* CLI `--set` for large configs

---

## 18. Real-World Example (Typical Flow)

```bash
helm create backend
helm lint backend
helm install backend-dev backend -f values-dev.yaml
helm upgrade backend-dev backend -f values-prod.yaml
helm rollback backend-dev 1
helm uninstall backend-dev
```

---

## 19. When to Use Helm

✔ Microservices
✔ CI/CD pipelines
✔ Multi-environment deployments
✔ Reusable infrastructure components

❌ Very small one-off YAMLs

---

## 20. Summary

**Helm = Kubernetes app lifecycle manager**

* Charts = Packages
* Values = Configuration
* Releases = Installed apps
* Revisions = History

Once you learn Helm, **manual YAML management becomes unnecessary**.
