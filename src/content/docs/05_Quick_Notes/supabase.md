---
title: Supabase
description: Intro to supabase
time: 17:02:68
date: 15-02-2026
---

## 🚀 Supabase — the all-in-one Backend for Developers

![Image](https://supabase.com/_next/image?q=75&url=%2Fimages%2Fblog%2Flaunch-week-sql-day-4-reports-and-metrics%2Freports-and-metrics-reports-screen.jpg&w=3840)

![Image](https://www.workingsoftware.dev/content/images/thumbnail/structurizr-75038-Supabase--7-.png)

![Image](https://supabase.com/images/blog/launch-week-7/day-4-supabase-auth-sso-pkce/supabase-auth-pkce-flow--light.svg)

![Image](https://www.sandromaglione.com/static/images/posts/flutter-supabase-authentication-2/supabase-auth-diagram.png)

**Supabase** is an open-source **Firebase alternative** built on top of **PostgreSQL**.  
It gives you everything you need to build a production-ready backend — **database, auth, storage, real-time, APIs, and serverless functions** — without managing servers.

---

# 🧠 Supabase in One Sentence

> **Supabase = PostgreSQL + Auth + Storage + Realtime + APIs + Serverless — all auto-generated**

---

# 🧩 Supabase Architecture

```
Your App (Web / Mobile / Backend)
        |
        |
 Supabase Client SDK
        |
-----------------------------------
| PostgreSQL Database              |
| Auth (Users, JWT, OAuth)         |
| Storage (Files, Buckets)         |
| Realtime (WebSockets)            |
| Edge Functions (Serverless)     |
| REST + GraphQL APIs              |
-----------------------------------
```

---

# 🧱 1️⃣ Database (PostgreSQL)

Supabase gives you a **fully managed PostgreSQL database**.

### You get:

- Tables, rows, columns
    
- JSON support
    
- Full SQL
    
- Indexes, views, triggers, functions
    
- Foreign keys & relations
    

Every table becomes an API automatically.

Example:

```sql
create table profiles (
  id uuid references auth.users,
  username text,
  avatar_url text
);
```

Now you instantly have:

```
GET /profiles
POST /profiles
PATCH /profiles?id=eq.123
```

No backend coding required.

---

# 🔐 2️⃣ Authentication (Auth)

![Image](https://depshub.com/_astro/02-supabase-auth-dashboard.ad071b17_Znen3p.webp)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AXB-rCw2AeOdrZ4g1FN77zg.png)

![Image](https://cdn.zuplo.com/assets/31aa7809-da93-4b3a-bba1-c2a2b8c6685b.png)

Supabase handles **users and login**.

### Supports:

|Type|Examples|
|---|---|
|Email|Magic links, OTP|
|Social|Google, GitHub, Discord|
|Password|Email + password|
|Enterprise|SAML, LDAP|
|Phone|SMS OTP|

### What you get

- Secure JWT tokens
    
- User IDs stored in `auth.users`
    
- Session handling
    
- Role-based access
    

Example:

```js
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@gmail.com",
  password: "123456"
})
```

---

# 🛡 3️⃣ Row Level Security (RLS)

This is Supabase’s **superpower**.

You can secure data at the **database level**.

Example:

```sql
create policy "Users can see own data"
on profiles
for select
using ( auth.uid() = id );
```

Now:

- User A cannot read User B’s data
    
- Even if they hack the frontend
    

Security lives in PostgreSQL — not in your app.

---

# 📦 4️⃣ Storage (Files, Images, Videos)

![Image](https://supabase.com/images/features/file-storage.png)

![Image](https://docs.weweb.io/assets/supabase-storage-new-bucket.NA-G47-I.png)

![Image](https://miro.medium.com/1%2AQlsY7hsxeNovKbelo-wUSQ.jpeg)

You get cloud storage like **S3**.

You can store:

- Images
    
- PDFs
    
- Videos
    
- Audio
    
- User uploads
    

Example:

```js
await supabase.storage
  .from('avatars')
  .upload('user1.png', file)
```

You can also:

- Make files public/private
    
- Secure files with RLS
    
- Generate signed URLs
    

---

# ⚡ 5️⃣ Realtime (Live Updates)

Supabase uses **WebSockets** to stream database changes.

Example:

```js
supabase
  .channel('chat')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
    console.log(payload.new)
  })
  .subscribe()
```

You can build:

- Live chat
    
- Live dashboards
    
- Multiplayer games
    
- Notifications
    

---

# 🧠 6️⃣ Auto-Generated APIs

You get **REST + GraphQL APIs** automatically for every table.

Example REST:

```
GET /rest/v1/products?price=gt.100
```

Example GraphQL:

```
query {
  products {
    id
    name
    price
  }
}
```

No backend needed.

---

# ☁ 7️⃣ Edge Functions (Serverless)

![Image](https://supabase.com/docs/img/guides/functions/function-logs.png)

![Image](https://user-images.githubusercontent.com/60829711/188305719-404347b7-ab5b-4195-a8eb-5ee1d858e336.png)

You can run server code near the user.

Use for:

- Payments
    
- AI calls
    
- Webhooks
    
- Cron jobs
    
- Secret keys
    

Example:

```ts
serve(async (req) => {
  return new Response("Hello from Supabase")
})
```

Runs on **Deno**.

---

# 🔗 8️⃣ Client Libraries

Supabase has SDKs for:

|Platform|
|---|
|JavaScript / TypeScript|
|React|
|Next.js|
|Flutter|
|React Native|
|Swift|
|Kotlin|
|Python|

Example:

```js
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
```

---

# 🧠 Supabase vs Firebase

|Supabase|Firebase|
|---|---|
|SQL (Postgres)|NoSQL|
|Open source|Closed|
|RLS security|App-side rules|
|Self-hostable|Google locked|
|REST & GraphQL|Custom APIs|

---

# 🏗 What can you build?

With Supabase you can build:

- SaaS apps
    
- AI apps
    
- Social networks
    
- Chat apps
    
- Marketplaces
    
- Mobile apps
    
- Internal tools
    

---

# 🧭 Mental Model

Think of Supabase as:

> **“PostgreSQL with superpowers”**

Everything connects to the database:

- Auth writes users into Postgres
    
- Storage uses Postgres for access
    
- Realtime streams Postgres
    
- APIs come from Postgres
    
- Security is Postgres
    
