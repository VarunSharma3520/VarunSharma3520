---
title: Ngrok Free Alernative
description: A guide to sfrp
time: 21:02:51
date: 26-02-2026
---
> **frp** = Fast Reverse Proxy — exposes internal services to the internet behind NAT/firewalls. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))

---

## Core Ideas

- frp is an extensible, high‑performance **reverse proxy** for exposing local networks to public networks. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    
- It supports **many protocols**: TCP, UDP, HTTP/S, STCP, XTCP, and more. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    
- The _Release.md_ tracks changes per version (features, improvements, fixes). ([GitHub](https://github.com/fatedier/frp/blob/dev/Release.md?utm_source=chatgpt.com "frp/Release.md at dev · fatedier/frp"))
    
- Releases add **features**, **enhancements**, **protocol support**, **dashboard improvements**, and **OIDC/metrics** options. ([GitHub](https://github.com/fatedier/frp/releases?utm_source=chatgpt.com "Releases · fatedier/frp"))
    

---

## Mental Models

- **frps (server)** – publicly reachable endpoint that accepts connections from clients. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    
- **frpc (client)** – runs on machines behind NAT/firewall; registers proxies to frps. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    
- **Proxy types** act as translators/tunnels between frps and frpc proxies (tcp/http/etc.). ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    
- **Releases** = snapshots of feature set and stability improvements — think of them as checkpoints in frp’s evolution. ([GitHub](https://github.com/fatedier/frp/blob/dev/Release.md?utm_source=chatgpt.com "frp/Release.md at dev · fatedier/frp"))
    

---

## Key Terminologies

- **Proxy**: A tunnel mapping a local internal service to an external endpoint. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    
- **bindPort**: Port on frps that frpc clients use to connect. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    
- **remotePort**: Port on frps that forwards to local services via frpc. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    
- **VirtualNet**: Experimental layer‑3 (TUN) feature for virtual networks. ([GitHub](https://github.com/fatedier/frp/releases?utm_source=chatgpt.com "Releases · fatedier/frp"))
    
- **OIDC (OpenID Connect)**: Authentication option for clients. ([GitHub](https://github.com/fatedier/frp/releases?utm_source=chatgpt.com "Releases · fatedier/frp"))
    
- **Multiplexer Modes**: HTTP CONNECT / tcpmux for multiplexing multiple proxies through one port. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    

---

## Actionable Rules

- Always **pin frp versions** in production; releases introduce breaking changes. ([GitHub](https://github.com/fatedier/frp/blob/dev/Release.md?utm_source=chatgpt.com "frp/Release.md at dev · fatedier/frp"))
    
- Use **OIDC options** for secure (token‑based) authentication. ([GitHub](https://github.com/fatedier/frp/releases?utm_source=chatgpt.com "Releases · fatedier/frp"))
    
- Enable **VirtualNet feature gate** only for experimental needs. ([GitHub](https://github.com/fatedier/frp/releases?utm_source=chatgpt.com "Releases · fatedier/frp"))
    
- Use **load‑balancing groups** for distributing load across multiple backend proxies. ([GitHub](https://github.com/fatedier/frp/releases?utm_source=chatgpt.com "Releases · fatedier/frp"))
    
- Enable **metrics** (`proxy_counts_detailed`) for observability and monitoring. ([GitHub](https://github.com/fatedier/frp/releases?utm_source=chatgpt.com "Releases · fatedier/frp"))
    

---

## Common Traps

- **Assuming defaults** are always secure — many features default to false (e.g., feature gates). ([GitHub](https://github.com/fatedier/frp/releases?utm_source=chatgpt.com "Releases · fatedier/frp"))
    
- **Confusing local and remote ports** — remotePort ≠ bindPort! ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    
- **Not testing configs** across versions — syntax/feature support changes. ([GitHub](https://github.com/fatedier/frp/blob/dev/Release.md?utm_source=chatgpt.com "frp/Release.md at dev · fatedier/frp"))
    
- Using **experimental features** (like VirtualNet) in production before maturity. ([GitHub](https://github.com/fatedier/frp/releases?utm_source=chatgpt.com "Releases · fatedier/frp"))
    
- Relying on frp for **security hardening** — frp tunnels services; separate security hardening still needed. ([GitHub](https://github.com/fatedier/frp?utm_source=chatgpt.com "fatedier/frp: A fast reverse proxy to help you expose a local ..."))
    

---

## One‑Page Cheat Sheet (Markdown)

```md
# FRP Cheatsheet

## Components
- frps: server (public)
- frpc: client (internal)
- Proxy: mapping between frps and frpc

## Common Config Fields
**Server**
```

bindPort = 7000  
vhostHTTPPort = 8080  
featureGates = { VirtualNet = true }  
allowPorts = [{ start=2000, end=3000 }]

```
**Client**
```

serverAddr = "x.x.x.x"  
serverPort = 7000  
[[proxies]]  
name = "web"  
type = "http"  
localPort = 80  
customDomains = ["app.example.com"]

```

## Proxy Types
- `tcp` – raw TCP
- `http` / `https` – reverse HTTP/HTTPS
- `stcp`, `xtcp` – secure/peer‑to‑peer TCP
- `tcpmux` – multiplexed TCP (HTTP CONNECT)
- plugins: static_file, http2http, etc.

## Security & Auth
- OIDC client options: `trustedCaFile`, `proxyURL`, `insecureSkipVerify`
- TLS options: enable, force, custom certs
- HTTP Basic Auth: `httpUser`, `httpPassword`

## Networking Features
- **KCP/QUIC** protocols for UDP transport
- TCP Stream Multiplexing
- Connection Pooling

## Load Balancing & Health
- Groups via `loadBalancer.group`, `groupKey`
- Health checks: `healthCheck.type`, `timeoutSeconds`

## Scaling / Bash
- Use metrics (`proxy_counts_detailed`) for monitoring
- Pin version per release
```

---

If you want, I can also distill the **latest release‑specific changelog summary** (e.g., for v0.65–v0.67) into bullet points.
