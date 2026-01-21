---
title: Production-grade Helm chart
description: Click to edit description
time: 01:01:29
date: 20-01-2026
---

Perfect — this is where things become **real-world Helm**, not tutorials.  
Below are **REAL production-grade Helm chart examples**, **exactly how they look in companies** (clean, opinionated, scalable).

I’ll give you:

1. **Complete chart structure**
    
2. **Actual templates**
    
3. **Production values**
    
4. **Why each piece exists**
    

You can use this as a **reference repo**.

---

# 🏗️ REAL PRODUCTION HELM CHART – Backend API

## 📁 Directory Structure (Industry Standard)

```text
charts/api/
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
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── serviceaccount.yaml
│   ├── _helpers.tpl
│   └── NOTES.txt
```

---

## 1️⃣ Chart.yaml (Production Metadata)

```yaml
apiVersion: v2
name: api
description: Production Backend API
type: application
version: 1.3.0
appVersion: "2.1.4"
```

✔ version = chart  
✔ appVersion = image

---

## 2️⃣ values.yaml (DEFAULTS ONLY)

```yaml
replicaCount: 2

image:
  repository: myorg/api
  pullPolicy: IfNotPresent
  tag: ""

service:
  type: ClusterIP
  port: 8080

resources:
  requests:
    cpu: 100m
    memory: 256Mi
  limits:
    cpu: 500m
    memory: 512Mi

env: []
```

⚠️ No secrets  
⚠️ No prod-specific values

---

## 3️⃣ values-prod.yaml (REAL PROD)

```yaml
replicaCount: 4

image:
  tag: "2.1.4"

env:
  - name: ENV
    value: production

autoscaling:
  enabled: true
  minReplicas: 4
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

ingress:
  enabled: true
  host: api.company.com

pdb:
  enabled: true
  minAvailable: 3
```

---

## 4️⃣ _helpers.tpl (MANDATORY IN PROD)

```yaml
{{- define "api.name" -}}
api
{{- end }}

{{- define "api.fullname" -}}
{{ .Release.Name }}-{{ include "api.name" . }}
{{- end }}
```

✔ Prevents naming collisions  
✔ Required for GitOps

---

## 5️⃣ deployment.yaml (PRODUCTION QUALITY)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "api.fullname" . }}
spec:
  replicas: {{ .Values.replicaCount }}
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: {{ include "api.name" . }}
  template:
    metadata:
      labels:
        app: {{ include "api.name" . }}
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
      containers:
        - name: api
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports:
            - containerPort: {{ .Values.service.port }}
          env:
            {{- range .Values.env }}
            - name: {{ .name }}
              value: {{ .value | quote }}
            {{- end }}
          readinessProbe:
            httpGet:
              path: /health
              port: {{ .Values.service.port }}
          livenessProbe:
            httpGet:
              path: /health
              port: {{ .Values.service.port }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

✔ Zero-downtime  
✔ Security context  
✔ Config-driven

---

## 6️⃣ service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ include "api.fullname" . }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: 80
      targetPort: {{ .Values.service.port }}
  selector:
    app: {{ include "api.name" . }}
```

---

## 7️⃣ ingress.yaml (NGINX / ALB)

```yaml
{{- if .Values.ingress.enabled }}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ include "api.fullname" . }}
spec:
  rules:
    - host: {{ .Values.ingress.host }}
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: {{ include "api.fullname" . }}
                port:
                  number: 80
{{- end }}
```

---

## 8️⃣ hpa.yaml (Autoscaling)

```yaml
{{- if .Values.autoscaling.enabled }}
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "api.fullname" . }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "api.fullname" . }}
  minReplicas: {{ .Values.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.autoscaling.maxReplicas }}
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: {{ .Values.autoscaling.targetCPUUtilizationPercentage }}
{{- end }}
```

---

## 9️⃣ pdb.yaml (NODE DRAIN SAFETY)

```yaml
{{- if .Values.pdb.enabled }}
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: {{ include "api.fullname" . }}
spec:
  minAvailable: {{ .Values.pdb.minAvailable }}
  selector:
    matchLabels:
      app: {{ include "api.name" . }}
{{- end }}
```

---

# 🗄️ REAL PROD MONGODB (HELM DEPENDENCY)

```yaml
dependencies:
  - name: mongodb
    version: 15.x.x
    repository: https://charts.bitnami.com/bitnami
```

Used via:

```bash
helm dependency update
```

---

# 🧠 How THIS IS USED IN REAL ORGS

```text
infra/
├── charts/
│   ├── api/
│   ├── worker/
│   └── frontend/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
```

Deployed via:

- ArgoCD
    
- Flux
    
- CI pipelines
    

---

# 🚨 What Makes This “PRODUCTION”

✔ No hardcoded values  
✔ Environment separation  
✔ PDB + HPA  
✔ Zero downtime rollout  
✔ Security context  
✔ GitOps compatible
