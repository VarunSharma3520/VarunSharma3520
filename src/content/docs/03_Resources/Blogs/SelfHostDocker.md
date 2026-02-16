---
title: Selfhost with Docker
description: List of open source self host able docker component
time: 21:02:44
date: 14-02-2026
---
## Links to Follow:
- https://awesome-selfhosted.net
- https://awesome-docker-compose.com/
- https://awesome-selfhost-docker.vercel.app/
## 🗂 Best practices

✔ Use **Docker Compose** for complex stacks  
✔ Use **named volumes** for config/data  
✔ Set **restart policies** (`unless-stopped`)  
✔ Publish only needed ports  
✔ Use **.env** files for secrets  
✔ Backup volumes regularly

## 📡 Common self-hosted stacks

|Stack|Notes|
|---|---|
|Nextcloud|File sync/share|
|Plex, Jellyfin|Media servers|
|Home Assistant|Smart home hub|
|Bitwarden|Password manager|
|Grafana + Prometheus|Monitoring dashboard|
|Portainer|GUI for Docker|

---

## 🚀 Useful tips

✨ Use a **reverse proxy** (Traefik / Nginx Proxy Manager) for SSL and friendly domains  
✨ Use **Let’s Encrypt** for free HTTPS  
✨ Check Docker image trust (stars, docs, updates)  
✨ Keep host OS + Docker updated

