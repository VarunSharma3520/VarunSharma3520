---
title: Operator v/s Helm Chart in k8s
description: Comparison between Operator & Helm Chart in k8s
time: 04:01:82
date: 20-01-2026
---

Great follow-up. I’ll do this in **two clear parts**:

1. **Hands-on: Writing a production-grade Helm chart (step by step)**
    
2. **Deep comparison: Helm vs Kubernetes Operators (when to use which)**
    

I’ll assume you already understand basic Helm from the previous explanation and now want **real-world, production-quality patterns**.

---

# PART 1 — Writing a Production-Grade Helm Chart

We’ll build a **realistic microservice Helm chart** with:

- Config separation
    
- Resource limits
    
- Health checks
    
- Autoscaling
    
- Security best practices
    
- Clean templating
    

---

## 1. Chart Layout (Production Standard)

```bash
helm create myservice
```

Then **clean it up**:

```
myservice/
├── Chart.yaml
├── values.yaml
├── values-dev.yaml
├── values-prod.yaml
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── hpa.yaml
│   ├── configmap.yaml
│   ├── serviceaccount.yaml
│   ├── _helpers.tpl
│   └── NOTES.txt
└── .helmignore
```

---

## 2. Chart.yaml (Versioning Matters)

```yaml
apiVersion: v2
name: myservice
description: Production-ready backend service
type: application

version: 1.2.0        # Chart version
appVersion: "2.5.1"   # App/image version
```

**Rules:**

- Bump `version` for chart changes
    
- Bump `appVersion` for app changes
    

---

## 3. values.yaml (Defaults Only)

```yaml
replicaCount: 2

image:
  repository: myorg/myservice
  tag: ""
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 8080

resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"

env: []

autoscaling:
  enabled: false

ingress:
  enabled: false
```

📌 **Rule:**  
`values.yaml` = safe defaults, not environment-specific values.

---

## 4. Environment-Specific Values

### values-dev.yaml

```yaml
replicaCount: 1
image:
  tag: dev
```

### values-prod.yaml

```yaml
replicaCount: 4

image:
  tag: "2.5.1"

autoscaling:
  enabled: true
  minReplicas: 4
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

ingress:
  enabled: true
  host: myservice.prod.example.com
```

---

## 5. _helpers.tpl (Critical for Clean Charts)

```yaml
{{- define "myservice.name" -}}
{{ .Chart.Name }}
{{- end }}

{{- define "myservice.fullname" -}}
{{ .Release.Name }}-{{ .Chart.Name }}
{{- end }}
```

**Why helpers matter:**

- Prevent duplication
    
- Avoid naming bugs
    
- Easier refactoring
    

---

## 6. Deployment.yaml (Production-Ready)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myservice.fullname" . }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ include "myservice.name" . }}
  template:
    metadata:
      labels:
        app: {{ include "myservice.name" . }}
    spec:
      containers:
        - name: app
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}

          ports:
            - containerPort: {{ .Values.service.port }}

          resources:
{{ toYaml .Values.resources | indent 12 }}

          livenessProbe:
            httpGet:
              path: /health
              port: {{ .Values.service.port }}

          readinessProbe:
            httpGet:
              path: /ready
              port: {{ .Values.service.port }}

          env:
{{ toYaml .Values.env | indent 12 }}
```

✅ Includes:

- Resource limits
    
- Health probes
    
- Safe image tag fallback
    
- Indentation via `toYaml`
    

---

## 7. HPA (Conditional Resource)

```yaml
{{- if .Values.autoscaling.enabled }}
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "myservice.fullname" . }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "myservice.fullname" . }}
  minReplicas: {{ .Values.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.autoscaling.maxReplicas }}
{{- end }}
```

📌 **Best practice:**  
Always guard optional resources with `if`.

---

## 8. Ingress (Production Safe)

```yaml
{{- if .Values.ingress.enabled }}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ include "myservice.fullname" . }}
spec:
  rules:
    - host: {{ .Values.ingress.host }}
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: {{ include "myservice.fullname" . }}
                port:
                  number: {{ .Values.service.port }}
{{- end }}
```

---

## 9. Security Best Practices

Add to `values.yaml`:

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
```

In deployment:

```yaml
securityContext:
{{ toYaml .Values.securityContext | indent 10 }}
```

---

## 10. Linting & Validation

```bash
helm lint ./myservice
helm template myservice ./myservice
helm install myservice-dev ./myservice -f values-dev.yaml --dry-run
```

---

## 11. Production Checklist

✅ Resource limits  
✅ Probes  
✅ HPA  
✅ Ingress gated  
✅ No secrets in values  
✅ Helper templates  
✅ Environment-specific values  
✅ helm lint passes

---

# PART 2 — Helm vs Kubernetes Operators (Deep Comparison)

This is a **very important architectural decision**.

---

## 1. What Is an Operator?

A Kubernetes **Operator** is:

- A **controller**
    
- Watches Custom Resources (CRDs)
    
- Encodes operational logic in code
    

Example:

```yaml
apiVersion: database.example.com/v1
kind: PostgresCluster
spec:
  replicas: 3
  backup: enabled
```

The Operator:

- Creates Pods
    
- Manages upgrades
    
- Handles failures
    
- Performs backups automatically
    

---

## 2. Helm vs Operator — Core Difference

|Aspect|Helm|Operator|
|---|---|---|
|Type|Templating tool|Kubernetes controller|
|Logic|Static|Dynamic|
|Runtime intelligence|❌ No|✅ Yes|
|Reconciliation loop|❌ No|✅ Yes|
|Complexity|Medium|High|
|Language|YAML + Go templates|Go (usually)|

---

## 3. When Helm Is Enough

Use **Helm** when:

- Deploying stateless services
    
- Deploying standard apps (API, frontend)
    
- Configuration-driven installs
    
- CI/CD-driven workflows
    
- Simple upgrades/rollbacks
    

Examples:

- Microservices
    
- NGINX
    
- Redis (basic)
    
- Monitoring stacks (Prometheus, Loki)
    

---

## 4. When You Need an Operator

Use an **Operator** when:

- Stateful systems
    
- Complex lifecycle management
    
- Runtime decisions required
    
- Self-healing logic beyond K8s defaults
    

Examples:

- Databases (Postgres, Cassandra)
    
- Kafka
    
- ElasticSearch
    
- Custom platforms
    

---

## 5. Why Helm Cannot Replace Operators

Helm:

- Renders YAML **once**
    
- Applies it
    
- Stops caring
    

Operator:

- Watches continuously
    
- Reconciles actual vs desired state
    
- Acts on failures automatically
    

📌 **Key insight**:

> Helm installs software  
> Operators **run** software

---

## 6. Helm + Operator Together (Best Practice)

Most real systems use **both**.

Example:

- Helm installs the Operator
    
- Operator manages runtime behavior
    

```bash
helm install postgres-operator ./postgres-operator-chart
```

Then:

```yaml
apiVersion: postgres.example.com/v1
kind: PostgresCluster
```

---

## 7. Decision Matrix

|Requirement|Helm|Operator|
|---|---|---|
|Simple deployment|✅|❌|
|Rollbacks|✅|❌|
|Runtime healing|❌|✅|
|Stateful automation|❌|✅|
|Low learning curve|✅|❌|
|Day-2 operations|❌|✅|

---

## 8. Final Recommendation

👉 **Use Helm by default**  
👉 **Use Operators only when necessary**

**Rule of thumb**:

> If you can explain your app lifecycle in YAML → Helm  
> If you need code to manage your app → Operator
