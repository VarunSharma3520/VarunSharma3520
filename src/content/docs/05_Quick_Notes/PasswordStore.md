---
title: Password Store
description: A guide to pass or Password Store
time: 23:02:67
date: 28-02-2026
---

## 🔐 How to Use `pass` (Password Store CLI)

`pass` (also called **Password Store**) is a simple, secure command-line password manager for Linux and macOS. It uses **GPG encryption** and stores passwords as encrypted files.

---

## 1️⃣ Install `pass`

### Ubuntu/Debian

```bash
sudo apt install pass
```

### macOS (Homebrew)

```bash
brew install pass
```

You also need **GPG** installed:

```bash
sudo apt install gnupg
# or
brew install gnupg
```

---

## 2️⃣ Create a GPG Key (Required First)

Check if you already have one:

```bash
gpg --list-secret-keys
```

If not, generate one:

```bash
gpg --full-generate-key
```

Choose:

- RSA and RSA
    
- 4096 bits
    
- Set expiration (optional)
    
- Enter your name/email
    
- Create a secure passphrase
    

After creation, get your key ID:

```bash
gpg --list-secret-keys --keyid-format=long
```

It will look like:

```
sec   rsa4096/ABCD1234EFGH5678
```

Your key ID = `ABCD1234EFGH5678`

---

## 3️⃣ Initialize `pass`

```bash
pass init "ABCD1234EFGH5678"
```

This creates:

```
~/.password-store/
```

All passwords will be stored there encrypted.

---

## 4️⃣ Basic Commands

### ➕ Add a password

```bash
pass insert github
```

It will prompt you to enter the password.

Or generate one automatically:

```bash
pass generate github 20
```

(20 = password length)

---

### 📂 Organize in folders

```bash
pass insert work/aws
pass generate personal/gmail 16
```

---

### 📖 View a password

```bash
pass github
```

Only copy to clipboard:

```bash
pass -c github
```

---

### 📋 List stored passwords

```bash
pass ls
```

---

### ✏️ Edit a password

```bash
pass edit github
```

---

### ❌ Remove a password

```bash
pass rm github
```

---

## 5️⃣ Password File Format

Each entry is just a text file:

```
mypassword123
username: cybro
url: https://github.com
notes: personal account
```

First line = password  
Other lines = metadata (optional)

---

## 6️⃣ Git Integration (Highly Recommended)

You can version control your password store:

```bash
cd ~/.password-store
git init
pass git init
pass git add .
pass git commit -m "Initial commit"
```

Now you can push to a private repo (e.g., GitHub, GitLab).

---

## 7️⃣ Browser Integration (Optional)

Use:

- `passff` (Firefox)
    
- `browserpass` (Chrome/Firefox)
    

---

## 8️⃣ Sync Across Devices

Just clone your private repo:

```bash
git clone git@github.com:yourname/password-store.git ~/.password-store
```

Then import your GPG key on the new machine:

```bash
gpg --import privatekey.asc
```

---

# 🚀 Quick Example Workflow

```bash
gpg --full-generate-key
pass init YOUR_KEY_ID
pass generate github 20
pass github
pass -c github
```

---

With `pass`, the thing you must keep safe is your **GPG private key**.  
Not the password store itself — that can be backed up anywhere because it’s encrypted.

---

# 🔐 What Exactly Must You Protect?

## 1️⃣ Your **Private GPG Key** (MOST IMPORTANT)

This is what decrypts everything in `~/.password-store`.

If you lose it:

- ❌ You cannot decrypt your passwords
    
- ❌ They are permanently unreadable
    
- ❌ No recovery exists
    

If someone steals it (and knows your passphrase):

- ❌ They can decrypt everything
    

---

## 📍 Where Is the Key Stored?

By default:

```bash
~/.gnupg/
```

Your private keys live inside that directory.

But you normally don’t manually copy files from there.  
You **export** the key properly.

---

# 🛡 How to Safely Back It Up (Do This Now)

### 1️⃣ Find your key ID

```bash
gpg --list-secret-keys --keyid-format=long
```

You’ll see something like:

```
sec   rsa4096/ABCD1234EFGH5678
```

That long string is your key ID.

---

### 2️⃣ Export Your Private Key

```bash
gpg --export-secret-keys ABCD1234EFGH5678 > private-key-backup.gpg
```

For extra safety (recommended):

```bash
gpg --armor --export-secret-keys ABCD1234EFGH5678 > private-key-backup.asc
```

This creates a readable ASCII file.

---

### 3️⃣ Store It Somewhere SAFE

Best practices:

- ✅ Encrypted USB drive
    
- ✅ Offline external disk
    
- ✅ Printed and stored securely (paperkey method)
    
- ❌ NOT plain cloud storage
    
- ❌ NOT emailed to yourself
    

If you must store in cloud:

- Put it inside a VeraCrypt container
    
- Or encrypt it again with another GPG key
    

---

# 🧠 What You Actually Need to Back Up

Minimum recovery kit:

1. ✅ Your **private key file**
    
2. ✅ Your **GPG key passphrase**
    
3. ✅ Your `~/.password-store` directory (optional but recommended)
    

That’s it.

---

# 🔄 How to Restore on New Machine

```bash
gpg --import private-key-backup.asc
```

Then clone your password store:

```bash
git clone your-private-repo ~/.password-store
```

Done.

---

# 🔥 Pro-Level Advice

Create a revocation certificate:

```bash
gpg --output revoke.asc --gen-revoke ABCD1234EFGH5678
```

Store it offline.

If your key is ever compromised, you can revoke it.

---

# ⚠️ Summary

|Item|Must Protect?|Why|
|---|---|---|
|Private GPG key|🚨 YES|Required to decrypt passwords|
|GPG passphrase|🚨 YES|Unlocks private key|
|`~/.password-store`|Backup|Encrypted but needed|
|Public key|No|Safe to share|

---

