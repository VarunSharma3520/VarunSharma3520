---
title: "Docker Overlayfs: How filesystems work in Docker"
description: A blog from dev dot to explaining docker file system
time: 12:02:40
date: 06-02-2026
---
[Link to blog: Docker Overlayfs: How filesystems work in Docker](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo)


Here’s a concise **Notes summary** of the article you shared on how Docker uses OverlayFS and namespaces — rewritten as future-me study notes.

---

## 📌 Core Ideas

1. **Docker uses OverlayFS as its storage driver** to combine image layers into one unified container filesystem. ([DEV Community](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo "Docker Overlayfs: How filesystems work in Docker - DEV Community"))
    
2. A container’s filesystem comes from stacking layers: _LowerDir_ (base image), _UpperDir_ (container changes), and _MergedDir_ (combined view). ([DEV Community](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo "Docker Overlayfs: How filesystems work in Docker - DEV Community"))
    
3. OverlayFS supports efficient reuse: unchanged files stay on lower image layers and are shared across containers. ([DEV Community](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo "Docker Overlayfs: How filesystems work in Docker - DEV Community"))
    
4. Linux namespaces isolate containers — e.g., mount namespace for filesystem, network namespace for networking (separate interfaces, IPs, routes). ([DEV Community](https://dev.to/pemcconnell/docker-networking-network-namespaces-docker-and-dns-19f1?utm_source=chatgpt.com "Docker networking: Network Namespaces, Docker and DNS - DEV Community"))
    
5. Docker networking uses bridge networks and virtual Ethernet devices to connect namespaces securely. ([DEV Community](https://dev.to/pemcconnell/docker-networking-network-namespaces-docker-and-dns-19f1?utm_source=chatgpt.com "Docker networking: Network Namespaces, Docker and DNS - DEV Community"))
    

---

## 🧠 Mental Models

**OverlayFS stack = layer cake**

- LowerDir = base image layers
    
- UpperDir = container’s writable layer
    
- MergedDir = unified view seen inside container ([DEV Community](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo "Docker Overlayfs: How filesystems work in Docker - DEV Community"))
    

**Namespace bubble model**  
Each container lives in its own Linux namespace bubble:

- Filesystem namespace isolates what it sees on disk
    
- Network namespace gets its own network stack and interfaces ([DEV Community](https://dev.to/pemcconnell/docker-networking-network-namespaces-docker-and-dns-19f1?utm_source=chatgpt.com "Docker networking: Network Namespaces, Docker and DNS - DEV Community"))
    

---

## 🔧 Actionable Rules

✔ When inspecting container files:

- Look at **LowerDir** for base files
    
- **UpperDir** for runtime changes
    
- **MergedDir** to see what container sees. ([DEV Community](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo "Docker Overlayfs: How filesystems work in Docker - DEV Community"))
    

✔ To explore container filesystem from host:

- Use `docker inspect` to get directories
    
- Access **MergedDir** or use `nsenter` to view inside container context. ([DEV Community](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo "Docker Overlayfs: How filesystems work in Docker - DEV Community"))
    

✔ Understand that **OverlayFS is read-optimized**:

- Share layers
    
- Only write changes into upper layer
    
- Speeds up builds and saves space. ([DEV Community](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo "Docker Overlayfs: How filesystems work in Docker - DEV Community"))
    

✔ For networking:

- Containers get isolated network stacks via **net namespaces**
    
- Use bridge mode to connect containers to host network through virtual interfaces. ([DEV Community](https://dev.to/pemcconnell/docker-networking-network-namespaces-docker-and-dns-19f1?utm_source=chatgpt.com "Docker networking: Network Namespaces, Docker and DNS - DEV Community"))
    

---

## ⚠ Common Traps

❌ Thinking container filesystem is a full copy of the host — it isn’t; only changes go into UpperDir. ([DEV Community](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo "Docker Overlayfs: How filesystems work in Docker - DEV Community"))

❌ Expecting changes inside container to persist to image — container writes go into upper layer only. ([DEV Community](https://dev.to/pemcconnell/docker-overlayfs-network-namespaces-docker-bridge-and-dns-52jo "Docker Overlayfs: How filesystems work in Docker - DEV Community"))

❌ Assuming containers share network with host — they have separate network stacks by default unless you use `--network=host`. ([DEV Community](https://dev.to/pemcconnell/docker-networking-network-namespaces-docker-and-dns-19f1?utm_source=chatgpt.com "Docker networking: Network Namespaces, Docker and DNS - DEV Community"))

---

## 📄 One-Page Cheat Sheet

### 🧱 OverlayFS Structure

```bash
LowerDir   → base image layers
UpperDir   → writable container layer
MergedDir  → combined view seen inside container
```

Inspect with:

````bash
docker inspect <container> -f '{{.GraphDriver.Data.LowerDir}}'
docker inspect <container> -f '{{.GraphDriver.Data.UpperDir}}'
docker inspect <container> -f '{{.GraphDriver.Data.MergedDir}}'
``` :contentReference[oaicite:14]{index=14}

---

### 🌐 Networking Basics
- Each container has its **own network namespace**. :contentReference[oaicite:15]{index=15}  
- Bridge mode connects container namespaces via virtual Ethernet pair and docker0 bridge. :contentReference[oaicite:16]{index=16}  
- `--network=host` disables isolation. :contentReference[oaicite:17]{index=17}

---

If you want, I can also generate a **visual diagram** of OverlayFS layers and namespaces or turn this into an **Anki-style flashcard deck** for review.
::contentReference[oaicite:18]{index=18}
````