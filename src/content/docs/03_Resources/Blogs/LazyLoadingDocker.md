---
title: Lazy Loading in Docker
description: A detailed guide to reduce cold starts in docker
time: 15:02:00
date: 06-02-2026
---

How **Docker Lazy Loading** works? ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))

---

## 📌 Core Ideas

**What problem this solves**

- Large container images (e.g., Airflow, Spark) slow cold starts and auto-scaling due to long pull/unpack times. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

**Lazy loading = pull on demand**

- Instead of downloading and unpacking entire images before starting containers, fetch blobs _only when first used_. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

**Technologies used**

- **eStargz** and **SOCI** enable lazy image fetching.
    
    - eStargz embeds a table of contents inside the layer for random access.
        
    - **SOCI (Seekable OCI)** uses an external index stored in the registry (no conversion needed). ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
        

**Results**

- ~4× faster image pull times on fresh nodes.
    
- ~30–40% faster P95 startup times for production workloads.
    
- 60% faster download times after tuning SOCI parameters. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

**Key insight**

- Lazy loading _does not eliminate download time_—it redistributes it from pre-start to _on-demand read time_. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

---

## 🧠 Mental Models

**Traditional vs Lazy Loading**

```text
Traditional:
  Download → unpack → assemble rootfs → container start
Lazy:
  Fetch index → present rootfs → start
    → read file? → fetch that chunk on first access
```

Understanding this sequence helps reason about performance trade-offs. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))

**RootFS Layers**

- Container rootfs = stack of read-only image layers + a writable top layer.
    
- Default overlayFS snapshotter unpacks all layers before start. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

**Remote snapshotter**

- Creates a virtual lowerdir backed by registry via FUSE.
    
- Actual content only downloaded when accessed. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

**Trade-off**

- ↓ start latency for cold nodes
    
- → potential runtime fetch latency  
    (depending on what files are accessed) ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

---

## ⚙️ Actionable Rules

### 🛠 Setup

**For SOCI on EKS (preferred)**

- Use Bottlerocket with native SOCI snapshotter:
    
    ```toml
    [settings.container-runtime]
    snapshotter = "soci"
    ```
    
    (No separate daemon needed.) ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

**For eStargz**

- Install `containerd-stargz-grpc` and register plugin in containerd:
    
    ```toml
    [proxy_plugins.stargz]
    type = "snapshot"
    address = "/run/containerd-stargz-grpc/containerd-stargz-grpc.sock"
    ```
    
    ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

### 📦 Building Images

- **eStargz:** build with Buildx:
    
    ```
    docker buildx build \
      --output type=registry,oci-mediatypes=true,compression=estargz \
      --tag $REG/$IMAGE:$TAG .
    ```
    
    ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    
- **SOCI:** no rebuild; generate SOCI index separately (CI/CD or AWS tools). ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

### 📈 Performance Tuning

Increase SOCI parallel pulls & chunk size:

- `max_concurrent_downloads_per_image`: 5 → 10
    
- `max_concurrent_unpacks_per_image`: 3 → 10
    
- `concurrent_download_chunk_size`: 8MB → 16MB
    

These yielded ~60% faster downloads on fresh nodes. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))

---

## ⚠️ Common Traps

### ❌ Misunderstanding benefits

- **Lazy loading ≠ no download**, it only defers parts of the download until file access. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

### ❌ Thinking eStargz is automatically better

- eStargz may improve pull times but can _increase application startup time_ compared to SOCI. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

### ❌ Forgetting to tune SOCI

- Default SOCI settings may leave performance on the table; tuning required for best results. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

### ❌ Ignoring workload patterns

- If a container reads many files immediately, lazy loading saves little compared to prefetch. Consider `.prefetch.landmark` or background prefetch strategies. ([Grab Tech](https://engineering.grab.com/docker-lazy-loading?utm_source=chatgpt.com "Docker lazy loading at Grab: Accelerating container startup times"))
    

---

## 🧾 One-Page Cheat Sheet

### GOAL
Faster container start times by lazy-loading image contents.

### KEY IDEA
Load only needed bytes on demand instead of full image upfront.

### MAIN TECH OPTIONS
- SOCI (preferred): separate index, no image rewrite, Bottlerocket native.
- eStargz: integrated index, embedded in layer, needs conversion.

### ARCHITECTURE
[Registry remote] ← index → [Remote snapshotter] → FUSE → overlayFS → container

### STATS
- ~4× faster pull on fresh nodes
- ~30-40% faster P95 startup
- 60% faster cold download with tuning

### SETUP (containerd)
- SOCI snapshotter enabled (on Bottlerocket)
- eStargz snapshotter via containerd-stargz-grpc for others

### TUNING (SOCI)
max_concurrent_downloads_per_image 10
max_concurrent_unpacks_per_image   10
concurrent_download_chunk_size     16MB

### BUILD
eStargz: Buildx with compression=estargz
SOCI: Generate index externally (no rebuild)

### COMMON TRAPS
- Assuming no download = instant start
- eStargz slow startup vs SOCI
- Ignoring tuning & workload access patterns