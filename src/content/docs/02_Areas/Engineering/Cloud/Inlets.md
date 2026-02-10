---
title: What is Inlets ?
description: A economical way to make services online
time: 23:02:59
date: 06-02-2026
---
You want this flow:

```
User (Internet)
   ↓
EC2 (public IP)
   ↓
Your Home PC (running Next.js, private NAT)
   ↓
EC2
   ↓
User
```

In other words:  
Expose a **private machine (your home PC)** to the public internet **securely** via a **public EC2 relay**.

---

# What is Inlets?

**Inlets** is a **reverse tunnel**.

Instead of:

```
Internet → Your home PC (blocked by NAT & firewall)
```

It works like:

```
Your home PC → EC2
Internet → EC2 → tunneled back to your PC
```

So your **home PC initiates** the connection (which works behind NAT), and EC2 becomes a **secure gateway**.

It is very similar to:

- Cloudflare Tunnel
    
- ngrok
    
- Tailscale Funnel  
    But **you control the server**.
    

---

# Architecture you want

```
Browser
   ↓
EC2 (Public IP :80 / :443)
   ↓ Inlets Server
Encrypted tunnel
   ↓
Inlets Client (Home PC)
   ↓
Next.js (localhost:3000)
```

---

# Step 1 — On EC2 (the public server)

### 1. Open ports

In AWS Security Group:

- Allow **TCP 80**
    
- Allow **TCP 443**
    
- Allow **TCP 8123** (tunnel port)
    

---

### 2. Install Inlets

SSH into EC2:

```bash
curl -sLS https://get.inlets.dev | sudo sh
```

---

### 3. Generate a token

```bash
inletsctl token
```

Copy the token.  
You’ll use it on both sides.

---

### 4. Start the Inlets server

```bash
inlets server \
  --token "PASTE_TOKEN_HERE" \
  --port 8123 \
  --control-port 8124
```

Your EC2 is now waiting for clients.

---

# Step 2 — On your Home PC

Install inlets:

```bash
curl -sLS https://get.inlets.dev | sudo sh
```

---

# Step 3 — Start your Next.js app

On your PC:

```bash
cd your-nextjs-app
npm run dev
```

It should be running on:

```
http://localhost:3000
```

---

# Step 4 — Connect your PC to EC2 (the tunnel)

Run on your PC:

```bash
inlets client \
  --url wss://YOUR_EC2_PUBLIC_IP:8123 \
  --token "PASTE_TOKEN_HERE" \
  --upstream http://localhost:3000
```

What this does:

```
EC2 port 80/443 → encrypted tunnel → localhost:3000
```

Your PC is now **publicly reachable**.

---

# Step 5 — Expose it on EC2

Run on EC2:

```bash
inlets http server \
  --token "PASTE_TOKEN_HERE"
```

Now traffic flow is:

```
Internet → EC2:80 → Inlets → Your PC → Next.js
```

---

# Test

Open in browser:

```
http://YOUR_EC2_PUBLIC_IP
```

You should see your **Next.js app** running from your **home PC**.

---

# Why this is powerful

You now have:

- No port forwarding
    
- No firewall changes at home
    
- No exposing your home IP
    
- TLS possible
    
- Works behind NAT, CGNAT, Starlink, mobile hotspot, etc
    

Your EC2 is just a **secure relay**.

---

# Want to add HTTPS + domain?

You can add:

- Nginx on EC2
    
- LetsEncrypt
    
- Route53 domain
    

So you get:

```
https://yourdomain.com → EC2 → tunnel → Home PC
```


