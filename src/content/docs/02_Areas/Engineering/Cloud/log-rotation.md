---
title: Log Rotation
description: An overview of log rotation in Linux systems, its importance, and how to configure it to manage log file sizes effectively.
---

### **Log rotation (short, cloud-engineer explanation)**

**Log rotation is mandatory because logs grow forever.**

If logs are not rotated:

* `/var/log` fills up
* Disk becomes **100% full**
* Services crash or stop writing
* VM becomes unstable or unbootable

---

### What log rotation does

* **Splits logs into smaller files**
* **Compresses old logs**
* **Deletes very old logs automatically**

Example:

```
nginx.log
nginx.log.1
nginx.log.2.gz
```

---

### How it’s done in Linux

* Tool: **logrotate**
* Config:

  * `/etc/logrotate.conf`
  * `/etc/logrotate.d/nginx`

Example policy:

* Rotate daily
* Keep 7 days
* Compress old logs

---

### Why cloud engineers care

* Cloud VMs are **disk-limited**
* Logs must be:

  * Rotated locally
  * Shipped to centralized logging (CloudWatch, ELK)
* Servers may be **ephemeral** → logs must leave the machine

---

### Interview one-liner

> *“Log rotation prevents disk exhaustion by managing log size and retention, which is critical for system stability in production cloud environments.”*
