---
title: Docker Network
desc: What is docker Network
---



You have a container:

```
IMAGE: node:24-alpine
NAME:  app
PORT:  4321 -> 4321
STATUS: Up
```

But:

* `curl localhost:4321` → **Connection reset by peer**
* `docker exec -it app /bin/bash` → **No such file**
* Container *is running*, but the app is **not serving correctly**

This is a **runtime + Alpine + app binding issue**, not Docker networking itself.

---

## 1️⃣ Why `/bin/bash` does NOT exist (important)

Your image is:

```
node:24-alpine
```

Alpine Linux **does NOT ship bash by default**.

### ✔ Correct shell for Alpine

```bash
docker exec -it app sh
```

Try this:

```bash
docker exec -it app sh
```

That should work.

👉 Lesson:

* Debian/Ubuntu images → `/bin/bash`
* Alpine images → `/bin/sh`

---

## 2️⃣ Why `curl: connection reset by peer`

This error means:

> TCP connection is accepted, then **closed immediately by the container**

This usually happens when:

### Most common causes (ranked)

1. App is **binding to 127.0.0.1 instead of 0.0.0.0**
2. App crashed after start
3. Wrong port inside container
4. Node app listening on IPv6 only
5. App expects HTTPS but you use HTTP

---

## 3️⃣ Check if the app is ACTUALLY listening

Enter container (using correct shell):

```bash
docker exec -it app sh
```

Inside container, run:

```sh
ps aux
```

You should see your Node process.

Now check listening ports:

```sh
netstat -tlnp || ss -tlnp
```

Look for something like:

```
LISTEN 0 511 0.0.0.0:4321
```

### ❌ Bad (common mistake)

```
127.0.0.1:4321
```

If it’s bound to `127.0.0.1`, Docker port forwarding **will NOT work**.

---

## 4️⃣ The #1 Bug: binding to localhost inside container

### ❌ Wrong

```js
app.listen(4321, 'localhost')
```

or

```js
app.listen(4321, '127.0.0.1')
```

### ✅ Correct (Docker-safe)

```js
app.listen(4321, '0.0.0.0')
```

Or simply:

```js
app.listen(4321)
```

---

## 5️⃣ Astro-specific issue (VERY LIKELY)

You previously ran **Astro**.

Astro by default binds to:

```
localhost
```

### Fix Astro dev server

Run inside container:

```bash
npm run dev -- --host
```

or set in `package.json`:

```json
"scripts": {
  "dev": "astro dev --host 0.0.0.0"
}
```

Then rebuild container.

---

## 6️⃣ Confirm exposed port matches app port

Check Dockerfile or run command:

```bash
docker inspect app | grep -i exposed
```

Inside container:

```bash
echo $PORT
```

Make sure:

* App listens on **4321**
* Docker maps **4321:4321**

---

## 7️⃣ Check container logs (CRITICAL)

Run:

```bash
docker logs app
```

You are almost guaranteed to see:

* crash
* bind error
* permission error
* app listening info

Post that output if you want deeper analysis.

---

## 8️⃣ Why some containers exited with 137 / 143

From your list:

| Code    | Meaning                 |
| ------- | ----------------------- |
| **137** | Killed (OOM / SIGKILL)  |
| **143** | SIGTERM (graceful stop) |

### Likely causes

* Low RAM
* Node / Python consuming memory
* Docker stopped container

Check memory:

```bash
docker stats
```

---

## 9️⃣ Fix summary (DO THIS IN ORDER)

### 1. Exec correctly

```bash
docker exec -it app sh
```

### 2. Verify listening

```sh
ss -tlnp
```

### 3. Ensure app binds to `0.0.0.0`

Node / Astro / Express fix

### 4. Restart container

```bash
docker restart app
```

### 5. Test again

```bash
curl http://localhost:4321
```

---

## 🔥 Pro tip (best practice)

For dev:

* Use **bind mounts**
* Use `--host 0.0.0.0`
* Log startup clearly

For prod:

* Use `node:slim` (not alpine unless needed)
* Use proper healthchecks

---

## 🧠 Mental Model (lock this in)

```
Container port exposure ≠ app listening
Docker forwards → app must accept
127.0.0.1 inside container = container only
```

