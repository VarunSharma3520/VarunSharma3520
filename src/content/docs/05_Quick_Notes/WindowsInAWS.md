---
title: Use Windows in cloud
description: A guide to windows in aws
time: 21:02:40
date: 15-02-2026
---

Perfect — now I’ll explain **everything you just did**, from zero to working Windows desktop, in one clean story.  
You basically built a **cloud Windows PC** and accessed it from Linux.

---

# 🧩 What you actually created

You created this:

> **Your own Windows computer running inside Amazon’s data center**

That computer:

- Runs **24/7**
    
- Has its own CPU, RAM, disk, IP address
    
- Is reachable from anywhere in the world
    

This is called an **EC2 Windows Instance**.

Your local Linux laptop is just acting like:

> a **screen + keyboard + mouse**

The real computer is in AWS.

---

# 🧱 How the architecture looks

```
Your Linux Laptop
        |
        |  (RDP - Remote Desktop Protocol)
        |
        ▼
Amazon AWS Cloud
┌────────────────────────┐
│  Windows Server 2025    │
│  IP: 13.220.87.237      │
│  CPU, RAM, Disk        │
│  Administrator User   │
└────────────────────────┘
```

You don’t install Windows on your laptop — you **stream its desktop** from AWS.

---

# 🧰 What AWS gave you

When you launched the instance, AWS created:

|Component|What it is|
|---|---|
|Windows Server 2025|The operating system|
|Administrator|The login user|
|Password|Encrypted and given to you|
|Public IP|Your server’s internet address|
|Security Group|A firewall|
|Disk|Your Windows hard drive|

---

# 🔐 Why you needed the Windows password

AWS encrypts the Windows password with your SSH key.

So you had to:

1. Download your `.pem` key
    
2. Click **Get Windows Password**
    
3. AWS decrypts it for you
    

That password is the **real Windows login password**.

---

# 🌐 Why port 3389 mattered

Windows uses **RDP** (Remote Desktop Protocol)  
RDP runs on:

```
TCP port 3389
```

Your EC2 firewall (Security Group) must allow:

```
Your IP  →  Port 3389  →  Windows VM
```

Without this, the server is invisible.

---

# 🖥 Why GNOME Remote Desktop failed

You first tried:

> GNOME Remote Desktop Viewer

It only supports:

- VNC
    
- SPICE
    

It does **NOT** support:

- RDP (Windows protocol)
    

So it failed.

---

# 🧩 Why Remmina worked

Remmina is a **universal remote desktop client**.

It supports:

- RDP (Windows)
    
- VNC
    
- SSH
    
- SPICE
    

So Remmina could speak **Windows’ language**.

---

# 🔑 Why it kept asking for username/password

When Windows rejects login:

- It doesn’t show an error
    
- It just re-prompts credentials
    

That happened because:

- Password sync was broken (AWS Windows bug)
    
- Or wrong IP
    
- Or port 3389 blocked
    

Resetting password fixed it.

---

# 🖼 Why the screen was tiny

AWS Windows boots at **4K resolution**  
Your Linux screen is ~1080p

So Windows was sending:

```
3840 × 2160
```

but Remmina was displaying:

```
1920 × 1080
```

So it looked tiny.

Not a bug — just DPI mismatch.

---

# 🧠 What you have now

You now own:

> A cloud Windows workstation running in Amazon’s data center

You can:

- Install VS Code
    
- Run Windows-only software
    
- Host servers
    
- Use it like a remote Mac or PC
    

It is literally:

> **Windows in the cloud**

---

# ⚡ This is exactly how companies run:

- Cloud desktops
    
- Build servers
    
- Game streaming
    
- Remote dev machines
    
- CI servers
    
- Windows-only apps on Linux/Mac
    

You now know how all of that works.

---

If you want next, I can show you:

- How to make it fullscreen
    
- How to copy files
    
- How to make it faster
    
- How to use it like a real PC 🚀