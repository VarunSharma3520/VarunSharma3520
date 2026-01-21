---
title: Convert an existing YAML app into Helm
description: Guide to use an existing YAML app into Helm
time: 04:01:86
date: 20-01-2026
---

# Converting an Existing Kubernetes YAML App into Helm

We’ll go from this 👇  
**Static YAML → Reusable, configurable Helm chart**

---

## 0. Starting Point: Existing YAML App

Assume you already have this app deployed using raw YAML.

### deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: dev
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: myorg/backend:1.0.0
          ports:
            - containerPort: 8080
          env:
            - name: ENV
              value: dev
```

### service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: dev
spec:
  selector:
    app: backend
  ports:
    - port: 80
      targetPort: 8080
```

### ingress.yaml

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: backend
spec:
  rules:
    - host: backend.dev.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: backend
                port:
                  number: 80
```

---

# STEP 1 — Create a Helm Chart Skeleton

```bash
helm create backend
```

Then **delete the example templates** inside `templates/`.

Your structure becomes:

```
backend/
├── Chart.yaml
├── values.yaml
└── templates/
```

---

# STEP 2 — Move YAML Files into templates/

Copy your YAML files:

```
templates/
├── deployment.yaml
├── service.yaml
└── ingress.yaml
```

⚠️ **At this stage, they are still plain YAML** — Helm won’t do anything special yet.

---

# STEP 3 — Identify What Must Be Configurable

This is the **most important thinking step**.

From your YAML, identify variables:

| Hardcoded Value              | Why It Should Be a Value |
| ---------------------------- | ------------------------ |
| `backend`                    | Release name varies      |
| `namespace`                  | Helm manages namespace   |
| `replicas: 2`                | Env-specific             |
| `image: myorg/backend:1.0.0` | Versioned                |
| `ENV=dev`                    | Env-specific             |
| `host`                       | Env-specific             |
|                              |                          |

---

# STEP 4 — Define values.yaml

Create `values.yaml`:

```yaml
replicaCount: 2

image:
  repository: myorg/backend
  tag: "1.0.0"

service:
  port: 80
  targetPort: 8080

env:
  - name: ENV
    value: dev

ingress:
  enabled: true
  host: backend.dev.example.com
```

📌 **Rule**:  
If it might change → it belongs in `values.yaml`.

---

# STEP 5 — Template the Deployment

### BEFORE (plain YAML)

```yaml
name: backend
replicas: 2
image: myorg/backend:1.0.0
```

### AFTER (Helm template)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      containers:
        - name: {{ .Release.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports:
            - containerPort: {{ .Values.service.targetPort }}
          env:
{{ toYaml .Values.env | indent 12 }}
```

✅ Now it’s reusable  
✅ No environment hardcoding  
✅ One chart → many deployments

---

# STEP 6 — Template the Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}
spec:
  selector:
    app: {{ .Release.Name }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: {{ .Values.service.targetPort }}
```

---

# STEP 7 — Make Ingress Conditional

Ingress is often **not needed in all environments**.

```yaml
{{- if .Values.ingress.enabled }}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ .Release.Name }}
spec:
  rules:
    - host: {{ .Values.ingress.host }}
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: {{ .Release.Name }}
                port:
                  number: {{ .Values.service.port }}
{{- end }}
```

---

# STEP 8 — Fix Namespace Handling (IMPORTANT)

❌ **Do NOT hardcode namespace**

```yaml
namespace: dev   # WRONG
```

✅ Helm automatically uses:

```bash
helm install backend ./backend -n dev
```

If needed:

```yaml
namespace: {{ .Release.Namespace }}
```

---

# STEP 9 — Add Environment-Specific Values

### values-dev.yaml

```yaml
replicaCount: 1
image:
  tag: dev
ingress:
  host: backend.dev.example.com
```

### values-prod.yaml

```yaml
replicaCount: 4
image:
  tag: "1.0.0"
ingress:
  host: backend.example.com
```

Deploy:

```bash
helm install backend-dev ./backend -f values-dev.yaml -n dev
helm install backend-prod ./backend -f values-prod.yaml -n prod
```

---

# STEP 10 — Validate Before Installing

### Render YAML

```bash
helm template backend ./backend
```

### Lint

```bash
helm lint ./backend
```

### Dry-run

```bash
helm install backend ./backend --dry-run --debug
```

---

# STEP 11 — Add Helpers (Clean Naming)

Create `templates/_helpers.tpl`:

```yaml
{{- define "backend.name" -}}
{{ .Chart.Name }}
{{- end }}

{{- define "backend.fullname" -}}
{{ .Release.Name }}
{{- end }}
```

Then replace names with:

```yaml
{{ include "backend.fullname" . }}
```

This avoids naming bugs later.

---

# STEP 12 — Final Result (What You Gained)

### Before Helm

❌ Copy-paste YAML  
❌ Hardcoded values  
❌ No rollbacks  
❌ Manual updates

### After Helm

✅ One chart, many environments  
✅ Versioned releases  
✅ Rollbacks  
✅ CI/CD friendly  
✅ GitOps ready

---

# Mental Model to Remember

> Converting YAML → Helm is **not rewriting YAML**  
> It’s **extracting configuration into values**

If you do that well, your Helm charts stay:

- Small
    
- Maintainable
    
- Production-ready
