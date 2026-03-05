---
title: Blue Green Deployment With Helm
description: A demonstration of blue green deployment
time: 01:01:00
date: 20-01-2026
---
Perfect — **Blue/Green with Helm** is a _real production deployment strategy_, not a toy example.  
I’ll explain it **the same way it’s implemented in real teams**, step by step.

You’ll get:

1. Concept (what actually happens)
    
2. Helm chart structure
    
3. Templates (real YAML)
    
4. Deployment flow
    
5. Rollback strategy
    
6. When NOT to use it
    

---

# 🔵🟢 Blue–Green Deployment (Production-Grade with Helm)

## What Blue–Green REALLY means

- **Blue** = current live version
    
- **Green** = new version (idle, tested)
    
- Traffic switches **instantly**
    
- Zero downtime
    
- Instant rollback
    

> Unlike rolling updates, **no mixed versions** ever serve traffic.

---

## 🧠 High-Level Architecture

```
            ┌──────────────┐
            │   Service    │  ← traffic switch here
            └──────┬───────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   Deployment (blue)     Deployment (green)
   v1 (LIVE)             v2 (IDLE)
```

---

# 🧱 Helm Chart Structure (Blue/Green)

```text
charts/api/
├── Chart.yaml
├── values.yaml
├── values-blue.yaml
├── values-green.yaml
└── templates/
    ├── deployment.yaml
    ├── service.yaml
    ├── _helpers.tpl
```

---

## 1️⃣ values.yaml (Common)

```yaml
image:
  repository: myorg/api
  tag: ""

service:
  port: 8080

deployment:
  color: blue
```

---

## 2️⃣ values-blue.yaml

```yaml
deployment:
  color: blue

image:
  tag: "1.0.0"
```

---

## 3️⃣ values-green.yaml

```yaml
deployment:
  color: green

image:
  tag: "1.1.0"
```

---

# 4️⃣ _helpers.tpl

```yaml
{{- define "api.name" -}}
api
{{- end }}

{{- define "api.fullname" -}}
{{ .Release.Name }}-{{ include "api.name" . }}-{{ .Values.deployment.color }}
{{- end }}
```

---

# 5️⃣ Deployment Template (KEY PART)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "api.fullname" . }}
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
      color: {{ .Values.deployment.color }}
  template:
    metadata:
      labels:
        app: api
        color: {{ .Values.deployment.color }}
    spec:
      containers:
        - name: api
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports:
            - containerPort: {{ .Values.service.port }}
          readinessProbe:
            httpGet:
              path: /health
              port: {{ .Values.service.port }}
```

✔ Both versions run simultaneously  
✔ Distinguished by `color` label

---

# 6️⃣ Service Template (TRAFFIC SWITCH)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
    color: {{ .Values.deployment.color }}
  ports:
    - port: 80
      targetPort: {{ .Values.service.port }}
```

👉 **THIS is the switch**  
Change `color` → traffic moves instantly

---

# 🚀 Deployment Flow (REAL LIFE)

### Step 1: Deploy Blue (live)

```bash
helm install api-blue ./api -f values-blue.yaml
```

Traffic → **blue**

---

### Step 2: Deploy Green (idle)

```bash
helm install api-green ./api -f values-green.yaml
```

Traffic still → **blue**

---

### Step 3: Test Green (internal)

```bash
kubectl port-forward deploy/api-green-api-green 8080:8080
```

or:

```bash
curl http://green-preview/api
```

---

### Step 4: Switch Traffic (INSTANT)

```bash
helm upgrade api-blue ./api -f values-green.yaml
```

✔ Zero downtime  
✔ Instant switch

---

### Step 5: Remove Old Version

```bash
helm uninstall api-green
```

---

# 🔄 Rollback Strategy (1 command)

If something breaks:

```bash
helm upgrade api-blue ./api -f values-blue.yaml
```

Rollback time: **seconds**

---

# 🟢 Blue–Green vs Rolling Updates

|Feature|Rolling|Blue–Green|
|---|---|---|
|Downtime|No|No|
|Mixed versions|Yes|❌ No|
|Rollback|Slow|⚡ Instant|
|Cost|Low|Higher|
|Risk|Medium|Very low|

---

# ⚠️ Production Rules (VERY IMPORTANT)

✔ Readiness probes mandatory  
✔ DB migrations must be backward-compatible  
✔ External state (DB, cache) shared  
✔ Traffic switch must be atomic

❌ Never use Blue–Green without probes  
❌ Never break DB schema

---

# 🧠 How Big Companies Do It

- **Service selector switch**
    
- Or **Ingress weight switch**
    
- Or **Argo Rollouts (advanced)**
    

Helm is used for:

- Packaging
    
- Versioning
    
- Promotion
    

---

# 🏆 When to Use Blue–Green

✅ Critical APIs  
✅ Financial systems  
✅ Auth systems  
✅ Low error tolerance

❌ High-cost stateful apps  
❌ Huge clusters with cost pressure
