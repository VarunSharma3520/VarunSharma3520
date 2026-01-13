---
title: Types of file in Kubernetes
desc: how things look in real clusters
---

Perfect — let’s do a **real, end-to-end Kubernetes deployment** that uses **ALL of these**:

```
Pod (created by controller)
Deployment
Service
ConfigMap
Secret
Ingress
StatefulSet
PVC
Namespace
Job
```

This is **exactly how things look in real clusters**.

---

# 🎯 Scenario (realistic)

We will deploy:

* **Namespace:** `demo`
* **ConfigMap:** app config
* **Secret:** DB password
* **StatefulSet:** MySQL (with PVC)
* **Deployment:** Nginx app
* **Service:** expose app internally
* **Ingress:** expose app externally
* **Job:** DB initialization job
* **Pods:** created automatically

---

## 1️⃣ Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: demo
```

Apply:

```bash
kubectl apply -f namespace.yaml
```

---

## 2️⃣ ConfigMap (app configuration)

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: demo
data:
  APP_ENV: "production"
  APP_NAME: "k8s-demo"
```

---

## 3️⃣ Secret (database password)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
  namespace: demo
type: Opaque
data:
  MYSQL_ROOT_PASSWORD: cGFzc3dvcmQ=   # "password" (base64)
```

---

## 4️⃣ PVC (storage for database)

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
  namespace: demo
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

---

## 5️⃣ StatefulSet (MySQL database)

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  namespace: demo
spec:
  serviceName: mysql
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: MYSQL_ROOT_PASSWORD
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
```

📌 **StatefulSet creates:**

* Pod: `mysql-0`
* PVC: `data-mysql-0`

---

## 6️⃣ Job (one-time DB init)

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-init
  namespace: demo
spec:
  template:
    spec:
      containers:
      - name: init
        image: mysql:8.0
        command:
          - sh
          - -c
          - |
            echo "Initializing database..."
      restartPolicy: Never
```

📌 Runs once → exits → stays completed

---

## 7️⃣ Deployment (application)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx
        envFrom:
        - configMapRef:
            name: app-config
```

📌 **Creates Pods:** `web-xxxxx`

---

## 8️⃣ Service (internal access)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-service
  namespace: demo
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
```

📌 Service → Pods

---

## 9️⃣ Ingress (external access)

⚠️ Requires an **Ingress Controller** (Kind supports nginx ingress).

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
  namespace: demo
spec:
  rules:
  - host: demo.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
```

Add to `/etc/hosts`:

```
127.0.0.1 demo.local
```

---

## 4️⃣ Create HPA (actual autoscaling)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-hpa
  namespace: demo
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web
  minReplicas: 2
  maxReplicas: 5
  metrics:
  - type: Resource 
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
```

Apply:

```bash
kubectl apply -f hpa.yaml
```

Verify HPA

```bash
kubectl get hpa -n demo
```

Example output:

```bash
NAME      REFERENCE        TARGETS   MINPODS   MAXPODS   REPLICAS
web-hpa   Deployment/web   10%/50%   2         5         2
```


---

## 🔍 Verify everything

```bash
kubectl get all -n demo
kubectl get pvc -n demo
kubectl get ingress -n demo
```

---

# 🧠 What actually runs on WORKER nodes?

| Resource    | Runs containers? |
| ----------- | ---------------- |
| Pod         | ✅ YES            |
| Deployment  | ❌                |
| StatefulSet | ❌                |
| Job         | ❌                |
| Service     | ❌                |
| Ingress     | ❌                |
| ConfigMap   | ❌                |
| Secret      | ❌                |
| PVC         | ❌                |
| Namespace   | ❌                |

👉 **Only Pods run containers**

---

# 🔁 Full Flow (important)

```
Ingress
  ↓
Service
  ↓
Pod (nginx)
```

```
StatefulSet
  ↓
Pod (mysql-0)
  ↓
PVC
```

---

# 🎯 You now understand REAL Kubernetes

This is **not toy YAML** — this is how production clusters are built.

---
