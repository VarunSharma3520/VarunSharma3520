---
title: Appwrite
description: Intro to appwrite
time: 17:02:55
date: 15-02-2026
---
## 🚀 Appwrite — the Backend for Web, Mobile & Flutter

![Image](https://media2.dev.to/cdn-cgi/image/width%3D800%2Cheight%3D%2Cfit%3Dscale-down%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fgbh93jbu3bocojn9hcy2.png)

![Image](https://media2.dev.to/dynamic/image/width%3D800%2Cheight%3D%2Cfit%3Dscale-down%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fraw.githubusercontent.com%2Fappwrite%2Fappwrite%2Fmaster%2Fdocs%2Fspecs%2Foverview.drawio.svg%231)

![Image](https://appwrite.io/images/docs/auth/ssr/dark/ssr.png)

![Image](https://appwrite.io/images/blog/building-custom-auth-flows/cover.png)

**Appwrite** is an **open-source Backend-as-a-Service (BaaS)** designed for **developers who want a powerful, self-hostable backend** for web, mobile, and Flutter apps — without writing backend code.

---

# 🧠 Appwrite in One Sentence

> **Appwrite = Auth + Database + Storage + Functions + APIs + Realtime — all ready to use**

---

# 🧩 Appwrite Architecture

```
Your App (Web / Mobile / Flutter)
        |
        |
 Appwrite SDK
        |
--------------------------------
| Authentication               |
| Databases (NoSQL-like)        |
| Storage (Files & Media)      |
| Realtime (WebSockets)        |
| Functions (Serverless)       |
| REST APIs                    |
--------------------------------
```

---

# 🔐 1️⃣ Authentication

![Image](https://devdactic.com/img/blog/posts/flutter-authentication-appwrite/flutter-login.png)

![Image](https://og.appwrite.global/image.png?subtitle=Integrate+OAuth2+authentication+seamlessly+with+Appwrite.+Learn+how+to+connect+your+application+with+third-party+OAuth2+providers+for+secure+user+login+and+access.&title=OAuth+2+login)

![Image](https://opengraph.githubassets.com/012fca8757c55670acd6c96d7e4b86afa8d4a638c819e769a43fa04e2bebea57/appwrite/appwrite/discussions/3938)

Appwrite provides **complete user management**.

### Supports:

|Type|Examples|
|---|---|
|Email & Password|Standard login|
|Magic Links|Passwordless|
|OAuth|Google, GitHub, Discord|
|Phone Auth|SMS OTP|
|Anonymous Users|Guest users|

You get:

- Sessions
    
- JWTs
    
- Device tracking
    
- Email verification
    
- Password recovery
    

Example:

```js
await account.createEmailSession("user@gmail.com", "password")
```

---

# 🗄 2️⃣ Database

Appwrite uses **Document-based databases** (similar to MongoDB / Firestore).

Structure:

```
Database
 └── Collection
       └── Document
```

Each document is JSON.

Example:

```json
{
  "name": "Laptop",
  "price": 1200,
  "stock": 10
}
```

Features:

- Relations between documents
    
- Indexing
    
- Filters & queries
    
- Permissions on each record
    

---

# 🛡 3️⃣ Permissions (Security)

Appwrite uses **Permission-based access control**.

You can control:

- Who can read
    
- Who can write
    
- Who can delete
    

At:

- Database level
    
- Collection level
    
- Document level
    
- File level
    

Example:

```
read: user:123
write: team:admin
```

---

# 📦 4️⃣ Storage (Files, Images, Videos)

![Image](https://og.appwrite.global/image.png?subtitle=Unlock+the+power+of+cloud+storage+with+Appwrite+Storage.+Learn+how+to+store%2C+manage%2C+and+retrieve+files+and+media+assets+securely+in+your+applications.&title=Storage)

![Image](https://media2.dev.to/dynamic/image/width%3D1000%2Cheight%3D420%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fxoettkxhnr0xsak6055i.jpg)

Upload & manage:

- Profile photos
    
- Videos
    
- PDFs
    
- App assets
    

Features:

- Public & private files
    
- File permissions
    
- Image resizing
    
- Preview & compression
    

Example:

```js
await storage.createFile("bucketId", "unique()", file)
```

---

# ⚡ 5️⃣ Realtime

Appwrite provides **live data updates**.

You can subscribe to:

- Document changes
    
- File uploads
    
- User events
    

Use cases:

- Live chat
    
- Notifications
    
- Multiplayer apps
    
- Dashboards
    

---

# ☁ 6️⃣ Cloud Functions (Serverless)

![Image](https://media2.dev.to/dynamic/image/width%3D1000%2Cheight%3D420%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fj337xcj1xlljvtcurrl7.png)

![Image](https://media2.dev.to/cdn-cgi/image/width%3D800%2Cheight%3D%2Cfit%3Dscale-down%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fgbh93jbu3bocojn9hcy2.png)

![Image](https://appwrite.io/images/blog/serverless-functions/cover.png)

Run backend code without servers.

Languages:

- JavaScript
    
- Python
    
- PHP
    
- Dart
    
- Ruby
    
- Java
    
- Go
    

Use for:

- Payments
    
- Webhooks
    
- AI
    
- Background jobs
    
- Secure APIs
    

---

# 🔗 7️⃣ APIs & SDKs

Appwrite auto-generates APIs for everything.

You get:

- REST API
    
- SDKs for:
    
    - Web
        
    - Flutter
        
    - iOS
        
    - Android
        
    - Node.js
        
    - Python
        
    - Deno
        

Example:

```js
const client = new Client().setEndpoint().setProject()
```

---

# 🖥 8️⃣ Self-Hosting & Cloud

Appwrite can run:

- On your server
    
- On Docker
    
- On VPS
    
- On Appwrite Cloud
    

This gives you:

- Full data ownership
    
- GDPR compliance
    
- On-prem deployment
    

---

# 🔍 Appwrite vs Firebase

|Appwrite|Firebase|
|---|---|
|Open source|Closed|
|Self-hostable|Google only|
|REST API|Proprietary|
|Multi-language functions|Node mostly|
|Strong permissions|Simpler rules|

---

# 🧭 Mental Model

Think of Appwrite as:

> **“Firebase but open-source and self-hosted”**

Everything you need to build:

- SaaS apps
    
- Mobile apps
    
- AI products
    
- Startup backends
    

…without writing your own backend.

