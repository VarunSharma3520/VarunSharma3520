---
title: Kubernetes
desc: What is Kubernetes ?
---

# Kubernetes: A Very Deep, Very Detailed Guide

This document is a **from-first-principles, production-grade** explanation of Kubernetes (K8s). It is written as if you were going to *design, operate, debug, and extend* Kubernetes—not just use it.

We will move **slowly and rigorously**, explaining *why* things exist, not just *what* they are.

---

## How This Guide Is Structured

Kubernetes is complex because it solves *many* distributed systems problems at once. We’ll layer the concepts in the only order that truly works:

1. **The Problem Kubernetes Solves** (Why it exists)
2. **Containers & Images (Docker is not Kubernetes)**
3. **Cluster Architecture (Control Plane vs Data Plane)**
4. **Core Primitives (Pods, Nodes, Namespaces)**
5. **Workload Controllers (ReplicaSet, Deployment, StatefulSet, DaemonSet, Job, CronJob)**
6. **Scheduling & Resource Management**
7. **Networking (Deep, including CNI, kube-proxy, DNS)**
8. **Services & Ingress (Traffic Flow Explained Packet-by-Packet)**
9. **Configuration & Secrets**
10. **Storage (Volumes, PV, PVC, CSI)**
11. **Security (Auth, AuthZ, RBAC, Pod Security, NetworkPolicy)**
12. **Health, Autoscaling, and Self-Healing**
13. **Observability (Logs, Metrics, Traces)**
14. **Upgrades, Failures, and Disaster Recovery**
15. **How Kubernetes Actually Works Internally**
16. **Designing Production-Grade Clusters**

Each section builds on the previous one. Skipping ahead will hurt comprehension.

---

# 1. Why Kubernetes Exists (The Real Problem)

Before Kubernetes, teams ran applications like this:

```
App → VM → Physical Server
```

### Problems With This Model

1. **Low Utilization**

   * VMs are heavy
   * One app per VM wastes CPU/RAM

2. **Manual Scaling**

   * Need to create new VMs
   * Load balancers configured by hand

3. **Fragile Deployments**

   * App crashes = downtime
   * No automatic restart

4. **Environment Drift**

   * “Works on my machine” problem
   * Different OS libraries, configs

---

## Enter Containers

Containers solve *packaging* and *environment consistency*.

Key properties:

* Process isolation (namespaces)
* Resource limits (cgroups)
* Immutable images

But containers introduce a **new problem**:

> Running one container is easy. Running **10,000 containers reliably** is hard.

That problem is called **container orchestration**.

---

## Kubernetes Is NOT:

❌ A container runtime
❌ A PaaS
❌ Just Docker orchestration

## Kubernetes IS:

✅ A **distributed systems control plane**
✅ A **desired-state engine**
✅ A **self-healing cluster manager**

You do NOT tell Kubernetes *how* to do things.
You tell Kubernetes **what the final state should be**.

This is the single most important mental model.

---

# 2. Desired State vs Actual State

Everything in Kubernetes revolves around this loop:

```
Desired State (YAML) ──▶ Kubernetes
                          │
Actual State ◀────────────┘
```

Example:

> “I want 3 replicas of this app running.”

If:

* One crashes → Kubernetes creates another
* A node dies → Pods are rescheduled
* A container fails health checks → Restarted

This is **control theory**, not scripting.

---

# 3. Kubernetes Architecture (Bird’s-Eye View)

A Kubernetes cluster has **two halves**:

```
┌─────────────────────────────┐
│        Control Plane        │
│ (The Brain / Decision Maker)│
└─────────────────────────────┘
            │
            ▼
┌─────────────────────────────┐
│         Worker Nodes        │
│   (Where containers run)    │
└─────────────────────────────┘
```

---

## 3.1 Control Plane Components (Critical)

### 1. kube-apiserver (THE CORE)

* REST API for the entire cluster
* All components talk ONLY to the API server
* Stateless

**Nothing happens without the API server.**

---

### 2. etcd (The Source of Truth)

* Strongly consistent key-value store
* Stores **entire cluster state**
* If etcd is lost → cluster is lost

Kubernetes without etcd is a brain-dead body.

---

### 3. kube-scheduler

* Watches for Pods without a node
* Chooses the *best* node
* Considers:

  * CPU/RAM
  * Affinity/anti-affinity
  * Taints & tolerations
  * Topology constraints

Scheduler does **NOT** run containers.
It only *decides*.

---

### 4. Controller Manager

Controllers are **control loops**:

Examples:

* ReplicaSet Controller
* Node Controller
* Job Controller

Each controller:

1. Watches the API
2. Compares desired vs actual
3. Takes corrective action

This is how Kubernetes “self-heals.”

---

# 4. Worker Node Components

Each node runs:

### kubelet

* Talks to API server
* Starts/stops containers
* Reports node & pod status

### Container Runtime

* containerd / CRI-O
* Actually runs containers

### kube-proxy

* Networking rules
* Implements Services

---

# 5. Pods (The Atomic Unit)

**Pod ≠ Container**

A Pod is:

* One or more containers
* Shared network namespace
* Shared volumes
* Scheduled together

Why Pods exist:

* Sidecars (logging, proxies)
* Tight coupling

> Kubernetes does NOT manage containers directly.
> It manages Pods.

---

## Pod Networking (Critical Concept)

Inside a Pod:

* Same IP
* Same localhost
* Different processes

Between Pods:

* Unique IP per Pod
* Flat network (no NAT)

This assumption drives *everything*.

---

# 6. YAML: How You Talk to Kubernetes

Kubernetes is API-driven.
YAML is just a **serialization format**.

Every object has:

```yaml
apiVersion:
kind:
metadata:
spec:
status:  # read-only
```

You declare **intent**, Kubernetes fills in reality.

---

# Where We Go Next

Next sections will go **much deeper** into:

* Controllers vs Pods
* Scheduling internals
* Networking packet flow
* Storage abstraction layers
* Security model
* Failure scenarios

This is only the foundation.

---

**We will proceed slowly and precisely.**

