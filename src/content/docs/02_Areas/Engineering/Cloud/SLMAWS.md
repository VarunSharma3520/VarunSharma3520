---
title: Snapshot Lifecycle Manager in AWS
description: Click to edit description
time: 15:02:00
date: 17-02-2026
---

## 🧱 Amazon EBS — Attach/Detach, Snapshots & Lifecycle Manager (Deep Dive)

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2019/10/08/1_EBSVolDelBlog_20190812.png)

![Image](https://d2908q01vomqb2.cloudfront.net/e1822db470e60d090affd0956d743cb0e7cdf113/2022/02/10/Figure-1.png)

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/snapshot_1c.png)

![Image](https://miro.medium.com/0%2Af4XkpTJ5LoxZTGYn.jpg)

These three features together form **AWS’s block-storage safety system**:

> **Volumes → Snapshots → Automated retention**

---

# 1️⃣ Attaching & Detaching EBS Volumes

### What “Attach” means

Attaching means:

> Connecting a virtual disk (EBS volume) to an EC2 instance.

It appears inside the OS as a **block device** (like `/dev/nvme1n1`).

You can:

- Format it
    
- Mount it
    
- Put files on it
    
- Use it as a database disk
    

---

### 🔁 How Attach Works

1. EC2 sends request to EBS
    
2. EBS maps the volume to the instance
    
3. OS sees a new disk
    
4. You mount it
    

The volume is still **network-attached** behind the scenes.

---

### ❗ Detaching a Volume

When you detach:

- EC2 disconnects the volume
    
- Data stays on the volume
    
- You can attach it to another EC2
    

> Detaching ≠ deleting

---

### ⚠️ Unsafe Detach

If you detach without unmounting:

- Data corruption may occur
    

Always:

```
umount /data
```

then detach.

---

# 2️⃣ EBS Snapshots

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/snapshot_1c.png)

![Image](https://d2908q01vomqb2.cloudfront.net/e1822db470e60d090affd0956d743cb0e7cdf113/2022/02/10/Figure-1.png)

### What is a snapshot?

An EBS snapshot is:

> A **point-in-time backup** of a volume stored in **S3**

But it is NOT a file-level backup — it is **block-level**.

---

### 🧠 How EBS Snapshots Work

AWS tracks which **disk blocks changed**.

|Snapshot|Stores|
|---|---|
|1st snapshot|All blocks|
|2nd|Only changed blocks|
|3rd|Only changed blocks|

This is called **incremental snapshots**.

You only pay for the **delta**.

---

### 🔁 Restore from Snapshot

From a snapshot you can:

- Create a new EBS volume
    
- Attach it to EC2
    
- Or create an AMI
    

The new volume will be:

- Same data
    
- Same encryption state
    

---

### 🛡️ Snapshots & Encryption

|Source|Result|
|---|---|
|Encrypted volume|Encrypted snapshot|
|Encrypted snapshot|Encrypted new volume|
|Key used|Same KMS key unless changed|

---

# 3️⃣ Snapshot Lifecycle Manager (SLM)

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/snapshot-lifecycle.png)

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/dlm-scripts.png)

SLM is AWS’s **built-in backup automation** for EBS.

It is part of **Amazon Data Lifecycle Manager**.

---

### 🧩 What SLM Does

It automates:

- Snapshot creation
    
- Scheduling
    
- Retention
    
- Deletion
    
- Cross-region copy (optional)
    

---

### 🏷️ Tag-based Automation

SLM uses **tags**.

Example:

```
Backup = Daily
```

Any volume with that tag:  
→ Automatically backed up

---

### ⏰ Policy Example

|Setting|Value|
|---|---|
|Frequency|Every 24 hours|
|Retain|7 days|
|Start time|01:00|
|Target|Volumes with tag Backup=Daily|

This creates:

- One snapshot per day
    
- Keeps last 7
    
- Deletes older ones
    

---

### 🌍 Cross-Region DR

SLM can:

- Copy snapshots to another region
    
- Encrypt with different KMS key
    

This gives:

> Disaster recovery even if a region fails

---

# 🧠 Real-World Architecture

Production database volume:

- Attached to EC2
    
- Encrypted
    
- Tagged `Backup=Daily`
    

SLM:

- Takes nightly snapshot
    
- Keeps 30 days
    
- Copies to another region
    

If EC2 dies:  
→ Create new volume  
→ Attach  
→ System restored

---

# 🧾 Summary

|Feature|Purpose|
|---|---|
|Attach|Connect storage to EC2|
|Detach|Move storage between instances|
|Snapshot|Point-in-time backup|
|Incremental|Saves only changed blocks|
|SLM|Automates backups & retention|

---

# 🧠 AWS Golden Rule

> **Volumes are not backups. Snapshots are.**

If you do not have:

- Snapshots
    
- Lifecycle policies
    
- Cross-region copies
    

You **do not have disaster recovery**.
