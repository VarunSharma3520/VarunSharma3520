---
title: AutoScaling in k8s
desc: Look at autoscaling and it's types
---

Great 👍 Let’s **add HPA (Horizontal Pod Autoscaler)** to the **existing Deployment (`web`)** and make it **actually work on Kind**.

I’ll do this in **3 clear parts**:
1️⃣ what HPA is (short)
2️⃣ prerequisites (VERY important)
3️⃣ real HPA YAML + test autoscaling

---

# 1️⃣ What HPA does (simple)

**HPA automatically changes the number of Pods** based on metrics (CPU / memory).

Example:

```
CPU low  → 2 pods
CPU high → 5 pods
```

📌 **HPA scales Pods**
❌ NOT nodes
❌ NOT containers
❌ NOT Services

---

# 2️⃣ Prerequisite: Metrics Server (required!)

⚠️ **HPA will NOT work without metrics-server**

### Check if it’s installed

```bash
kubectl get deployment -n kube-system metrics-server
```

If you see **NotFound**, install it 👇

---

## Install Metrics Server (Kind-compatible)

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Now patch it for Kind (important):

```bash
kubectl patch deployment metrics-server -n kube-system \
--type=json \
-p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
```

Wait until ready:

```bash
kubectl get pods -n kube-system | grep metrics
```

Verify metrics:

```bash
kubectl top nodes
kubectl top pods -n demo
```

✅ If this works → HPA will work.

---

# 3️⃣ Update Deployment (CPU requests REQUIRED)

⚠️ HPA **requires CPU requests**.

### Update `web` Deployment

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
        resources:
          requests:
            cpu: 100m
          limits:
            cpu: 500m
```

Apply:

```bash
kubectl apply -f deployment.yaml
```

---

# 4️⃣ Create HPA (actual autoscaling)

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

---

## Verify HPA

```bash
kubectl get hpa -n demo
```

Example output:

```
NAME      REFERENCE        TARGETS   MINPODS   MAXPODS   REPLICAS
web-hpa   Deployment/web   10%/50%   2         5         2
```

---

# 5️⃣ Test autoscaling (real test)

Generate load inside the cluster:

```bash
kubectl run load-generator \
  --image=busybox \
  -n demo \
  --restart=Never \
  -- sh -c "while true; do wget -q -O- http://web-service; done"
```

Watch scaling:

```bash
kubectl get hpa -n demo -w
```

```bash
kubectl get pods -n demo -w
```

You should see:

```
2 → 3 → 4 → 5 pods
```

🎉 **Autoscaling works**

---

# 6️⃣ Clean up load test

```bash
kubectl delete pod load-generator -n demo
```

After some time, pods scale **back down**.

---

# 🧠 What’s happening internally (important)

```
metrics-server
     ↓
HPA Controller (control plane)
     ↓
Deployment replicas updated
     ↓
Pods created/removed on workers
```

📌 HPA itself runs in **control plane**
📌 Pods still run on **worker nodes**

---

# ⚠️ Common mistakes (you avoided them)

❌ No CPU requests → HPA fails
❌ No metrics-server → HPA stuck
❌ Expecting node scaling → wrong (that’s Cluster Autoscaler)

---

# ✅ You now know REAL autoscaling

This is **production-grade Kubernetes knowledge**.

---

## Want to go next?

U can:

* 📈 add **memory-based HPA**
* ⚡ show **custom metrics**
* 🧠 explain **HPA vs VPA vs CA**
* 🔥 combine **HPA + Ingress + load test**

