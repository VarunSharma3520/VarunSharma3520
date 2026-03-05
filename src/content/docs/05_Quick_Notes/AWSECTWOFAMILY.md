---
title: AWS EC2 family
description: Click to edit description
time: 21:02:00
date: 15-02-2026
---
EC2 is not “a server”.  
It is a **family of CPUs, GPUs, disks, networks and hypervisors** that lets you build anything from a tiny blog to Netflix-scale systems.

I’ll give you the **full EC2 family map** like a cloud architect.

---

# 🧠 What EC2 Really Is

EC2 = **Elastic Compute Cloud**

It means:

> “I can rent any kind of computer I want, anytime, and scale it infinitely.”

You don’t rent “a server”.  
You rent:

- CPU type
    
- RAM size
    
- GPU
    
- Network speed
    
- Disk type
    
- Operating system
    

All separately.

---

# 🧬 EC2 is built from 6 layers

```
EC2 Instance
│
├── AMI (OS image)
├── Instance Type (CPU + RAM)
├── Storage (EBS / NVMe)
├── Network (VPC + ENI)
├── Security (SG + IAM)
└── Hypervisor (Nitro)
```

---

# 🧩 1️⃣ AMI (Operating System)

AMI = preinstalled OS + drivers

|AMI|Use|
|---|---|
|Amazon Linux|Cloud native|
|Ubuntu|Dev servers|
|Windows Server|Cloud PC|
|Red Hat|Enterprise|
|macOS|iOS builds|
|Custom|Your own OS|

You picked:

```
Windows Server 2025
```

That gave you:

- Desktop
    
- RDP
    
- GUI
    

---

# 🧠 2️⃣ Instance Types (CPU & RAM)

This defines how powerful your machine is.

## General purpose

|Type|Use|
|---|---|
|t3, t4g|Cheap dev, low traffic|
|m6i|Real servers|

## CPU optimized

|Type||
|---|---|
|c6i|APIs, game servers|

## Memory optimized

|Type||
|---|---|
|r6g|Redis, big databases|

## GPU

|Type||
|---|---|
|g4dn|UI, video|
|p5|AI|

## Storage optimized

|Type||
|---|---|
|i4i|Big databases|

You used:

```
t3.micro
```

Cheap, slow, for testing.

---

# 💾 3️⃣ Storage

Every EC2 has disks.

|Type|What|
|---|---|
|EBS gp3|Normal SSD|
|EBS io2|High-speed SSD|
|Instance Store|Ultra-fast but temporary|
|EFS|Network drive|

Your Windows C:\ is:

```
EBS volume
```

If instance dies → disk survives.

---

# 🌐 4️⃣ Networking

Each EC2 gets:

- Private IP (inside AWS)
    
- Public IP (internet)
    
- Network card (ENI)
    

Controlled by:

```
VPC + Subnet + Security Group
```

Security group = firewall.

You opened:

```
TCP 3389 → RDP
```

That’s why Windows connects.

---

# 🔐 5️⃣ Security

Every EC2 is protected by:

|Layer|What|
|---|---|
|Security Group|Firewall|
|NACL|Subnet firewall|
|IAM Role|AWS permissions|
|IMDSv2|Metadata protection|

Windows login is separate from AWS login.

---

# ⚡ 6️⃣ Nitro Hypervisor

AWS does NOT use VMware.

It uses:

```
Nitro
```

Which gives:

- Bare-metal speed
    
- Full GPU access
    
- Hardware isolation
    

This is why EC2 is fast.

---

# 🔁 Scaling EC2

You can create:

|Feature|Meaning|
|---|---|
|AMI from instance|Clone your server|
|Auto Scaling Group|Auto add servers|
|Load Balancer|Split traffic|
|Spot Instances|90% cheaper|
|Reserved Instances|Long-term discount|

---

# 🧠 What you built

Your Windows machine is:

```
AMI: Windows Server 2025
Instance: t3.micro
Disk: EBS
Network: Public IP
Security: RDP open
```

That is literally:

> A cloud PC

The same tech is used for:

- Netflix servers
    
- Trading bots
    
- Game servers
    
- AI training
    
- SaaS backends
