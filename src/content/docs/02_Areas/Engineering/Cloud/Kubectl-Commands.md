---
title: Kubectl command
desc: Important kubectl command
---

Below is a **clean, senior-engineer–level cheat sheet of the most useful `kubectl` commands**, grouped by **real-world usage**.
This covers **90%+ of daily Kubernetes work**.

---

## 🔍 Cluster & Context

```bash
kubectl version
kubectl cluster-info
kubectl config get-contexts
kubectl config current-context
kubectl config use-context <context>
```

---

## 📦 Get / List Resources

```bash
kubectl get nodes
kubectl get namespaces
kubectl get pods
kubectl get svc
kubectl get deploy
kubectl get rs
kubectl get sts
kubectl get ds
kubectl get cm
kubectl get secret
kubectl get ingress
kubectl get events
kubectl get all
```

With namespace:

```bash
kubectl get pods -n <namespace>
```

Watch:

```bash
kubectl get pods -w
```

---

## 🧠 Describe / Inspect

```bash
kubectl describe pod <pod>
kubectl describe svc <service>
kubectl describe deploy <deployment>
kubectl describe node <node>
```

---

## 📄 Apply / Delete / Edit

```bash
kubectl apply -f file.yaml
kubectl apply -k ./kustomize
kubectl delete -f file.yaml
kubectl delete pod <pod>
kubectl delete deploy <name>
kubectl edit deploy <name>
```

---

## 🚀 Pods & Containers

```bash
kubectl logs <pod>
kubectl logs <pod> -c <container>
kubectl logs <pod> --previous
kubectl exec -it <pod> -- sh
kubectl exec -it <pod> -c <container> -- sh
kubectl cp <pod>:/path ./local
```

---

## ❤️ Health & Debugging

```bash
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl describe pod <pod>
kubectl top pods
kubectl top nodes
kubectl rollout status deploy <name>
kubectl rollout history deploy <name>
kubectl rollout undo deploy <name>
```

---

## 🔁 Deployments & Scaling

```bash
kubectl scale deploy <name> --replicas=3
kubectl rollout restart deploy <name>
```

---

## 🌐 Networking & Access

```bash
kubectl port-forward pod/<pod> 8080:80
kubectl port-forward svc/<service> 8080:80
kubectl get svc -o wide
kubectl get ingress
```

---

## 🔐 ConfigMaps & Secrets

```bash
kubectl create configmap my-cm --from-literal=key=value
kubectl create secret generic my-secret --from-literal=key=value
kubectl get cm
kubectl get secret
kubectl describe secret <name>
kubectl get secret <name> -o yaml
```

Decode secret:

```bash
kubectl get secret <name> -o jsonpath='{.data.key}' | base64 -d
```

---

## 🗂 Namespaces

```bash
kubectl create ns <name>
kubectl delete ns <name>
kubectl get all -n <namespace>
```

Set default namespace:

```bash
kubectl config set-context --current --namespace=<ns>
```

---

## 🧹 Cleanup / Maintenance

```bash
kubectl delete pod --all
kubectl delete deploy --all
kubectl delete svc --all
kubectl delete all --all
```

Force delete:

```bash
kubectl delete pod <pod> --force --grace-period=0
```

---

## 📦 YAML / Output Formatting

```bash
kubectl get pod <pod> -o yaml
kubectl get pod <pod> -o json
kubectl get pods -o wide
kubectl get pods -o jsonpath='{.items[*].metadata.name}'
```

---

## 🧪 Dry Run / Validation

```bash
kubectl apply -f file.yaml --dry-run=client
kubectl create deploy test --image=nginx --dry-run=client -o yaml
```

---

## 🔐 RBAC & Auth

```bash
kubectl auth can-i create pods
kubectl get sa
kubectl get role
kubectl get rolebinding
kubectl get clusterrole
kubectl get clusterrolebinding
```

---

## 🧰 Advanced / Power User

```bash
kubectl api-resources
kubectl api-versions
kubectl explain pod
kubectl explain pod.spec.containers
kubectl diff -f file.yaml
```

---

## 🧠 Must-know aliases (recommended)

```bash
alias k=kubectl
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kga='kubectl get all'
```

---

## ✅ Senior engineer daily set (if you remember only 10)

```bash
kubectl get pods
kubectl describe pod <pod>
kubectl logs <pod>
kubectl exec -it <pod> -- sh
kubectl apply -f file.yaml
kubectl delete pod <pod>
kubectl port-forward svc/<svc> 8080:80
kubectl rollout restart deploy <name>
kubectl get events
kubectl get all
```

---

