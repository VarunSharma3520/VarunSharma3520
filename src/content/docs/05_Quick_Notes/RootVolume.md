---
title: What is Root Volume in AWS?
description: A guide on root volume in AWS
time: 15:02:69
date: 17-02-2026
---
## 🧱 Root Volume vs Amazon EBS — What’s the Real Difference?

![Image](https://docs.aws.amazon.com/images/AWSEC2/latest/UserGuide/images/ebs_backed_instance.png)

![Image](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2025/07/16/image-3-13.png)

![Image](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2022/09/20/rvv-architecture-overall-architecture.drawio.png)

This is one of the most misunderstood topics in AWS.

> **Root Volume is NOT a different storage type.  
> Root Volume is just a ROLE played by an EBS volume.**

---

# 🧩 What Is a Root Volume?

The **root volume** is:

> The disk that contains the **operating system** of an **EC2 instance**

It holds:

- Linux or Windows
    
- Bootloader
    
- System files (`/`, `/boot`, `C:\Windows`)
    
- Cloud-init & drivers
    

Without it:

> EC2 cannot start.

---

# 🧱 What Is Amazon EBS?

**Amazon EBS** (Elastic Block Store) is:

> AWS’s **network-attached block storage service** for EC2

EBS creates:

- Disks (volumes)
    
- That can be attached to EC2
    
- Used for OS, data, or both
    

---

# 🔑 The Key Relationship

```
Every Root Volume  =  EBS Volume
Not every EBS Volume = Root Volume
```

Root volume is simply:

> The **first EBS volume attached at boot**

---

# 🧠 When You Launch an EC2 Instance

1. You select an **AMI**
    
2. AWS creates an **EBS volume from the AMI snapshot**
    
3. That volume is attached as **/dev/xvda or /dev/nvme0n1**
    
4. EC2 boots from it
    

That disk = **Root Volume**

---

# 🧱 Data Volumes vs Root Volume

|Feature|Root Volume|Data EBS Volume|
|---|---|---|
|Storage type|EBS|EBS|
|Contains OS|✅|❌|
|Bootable|✅|❌|
|Can be detached while running|❌|✅|
|Can be deleted|Yes (if instance terminated)|Yes|
|Can be replaced|❌|✅|
|Snapshot|✅|✅|

---

# 🧨 What Happens When EC2 Stops or Terminates?

|Action|Root Volume|
|---|---|
|Reboot|Stays|
|Stop|Stays|
|Start|Stays|
|Terminate|Deleted by default|

You can change:

> **Delete on Termination = false**

to keep the root disk.

---

# 🧠 Why AWS Separates OS and Data

Best practice:

- Root volume → OS only
    
- Data volumes → databases, files, logs
    

This allows:

- OS replacement
    
- Easy backups
    
- Safer upgrades
    

---

# 🧾 Summary

|Root Volume|Amazon EBS|
|---|---|
|A role|A service|
|Boot disk|Block storage|
|Always EBS|Can be root or data|
|Created from AMI|Created by user|
|Holds OS|Holds anything|

---

# 🧠 Final Mental Model

> **Amazon EBS is a disk factory.  
> The root volume is simply the disk your EC2 boots from.**

Same technology — different purpose.

