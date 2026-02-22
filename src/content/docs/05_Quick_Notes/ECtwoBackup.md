---
title: EC2 Backup methods
description: A detailed guide to back up EC2
time: 19:02:07
date: 17-02-2026
---

These four services are the **core of backup, recovery, and golden-image management** for EC2 workloads in AWS.  
They are heavily used in **disaster recovery, scaling, and security hardening**.

---

# 💽 **EBS Snapshots**

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/snapshot_1c.png)

![Image](https://media.licdn.com/dms/image/v2/C5612AQEBreTcKZmyXQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1597404570555?e=2147483647&t=pay6m8kWyyFMWIVPmwHpRI8EAJdCkmUbxqkr7b13tXU&v=beta)

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/snapshot_1a.png)

### What it is

An **EBS Snapshot** is a **point-in-time backup** of an EBS volume stored in **Amazon S3** (managed by AWS).

### How it works

- First snapshot = full backup
    
- Later snapshots = **incremental** (only changed blocks saved)
    

Example:

```
Volume = 100 GB
Day 1 snapshot = 100 GB
Day 2 change = 5 GB → Snapshot = 5 GB
Day 3 change = 2 GB → Snapshot = 2 GB
```

### What can be restored

- A new EBS volume
    
- An AMI
    
- A copy in another region
    

### Why it matters

It protects:

- EC2 data disks
    
- Root volumes
    
- Databases running on EC2
    

---

# 📦 **AMI Backups**

![Image](https://docs.aws.amazon.com/images/AWSEC2/latest/UserGuide/images/ami_create_instance_store.png)

![Image](https://media.licdn.com/dms/image/v2/D4D12AQG6TtWaGJFikg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1706547893931?e=2147483647&t=j9dZ61rPSS5n_QVGtKjUjrxzc2rCSCvZ3ZuVzKBvv_8&v=beta)

![Image](https://docs.aws.amazon.com/images/AWSEC2/latest/UserGuide/images/launch-from-ami.png)

### What it is

An **AMI (Amazon Machine Image)** is a **full server backup**.

It contains:

- OS
    
- Installed software
    
- Configuration
    
- One or more EBS snapshots
    

Think of it as a **server template**.

### What it is used for

- Launching new EC2 instances
    
- Auto Scaling
    
- Disaster recovery
    
- Cloning servers
    

If your EC2 dies, you launch a new one from the AMI.

---

# 🌍 **Cross-Region Backups**

![Image](https://d2908q01vomqb2.cloudfront.net/887309d048beef83ad3eabf2a79a64a389ab1c9f/2017/09/19/Tool-Architecture1.jpg)

![Image](https://d2908q01vomqb2.cloudfront.net/e1822db470e60d090affd0956d743cb0e7cdf113/2021/01/12/Secure-recovery-with-cross-account-backup-and-Cross-Region-copy-using-AWS-Backup.png)

![Image](https://d2908q01vomqb2.cloudfront.net/887309d048beef83ad3eabf2a79a64a389ab1c9f/2021/07/07/DBB-1691-diag.png)

### What it is

Copying your backups to **another AWS Region**.

You can copy:

- EBS snapshots
    
- AMIs
    
- RDS snapshots
    
- AWS Backup vaults
    

### Why it matters

If an entire region fails (e.g., us-east-1), your data is safe in us-west-2.

### How it works

AWS copies snapshots **block-by-block** in the background.

You can automate this with:

- AWS Backup
    
- Snapshot lifecycle policies
    

---

# 🏭 **EC2 Image Builder**

![Image](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2023/04/11/Figure-4-An-example-workflow-for-a-EC2-Image-Builder-Cascading-Pipelines.png)

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2023/10/05/figure1-imagebuilder.png)

![Image](https://d2908q01vomqb2.cloudfront.net/761f22b2c1593d0bb87e0b606f990ba4974706de/2018/05/16/GAP-1.png)

### What it is

EC2 Image Builder automatically creates **secure, patched, pre-configured AMIs**.

These are called **Golden Images**.

### What it does

Instead of:

> “Manually build servers”

You define:

- Base AMI (Amazon Linux, Ubuntu)
    
- Software (Docker, Nginx, agents)
    
- Patches
    
- Hardening rules
    

Image Builder builds:

- AMIs
    
- Docker images
    
- VM images
    

Automatically on a schedule.

### Why it matters

- Security (always patched)
    
- Consistency
    
- Faster deployments
    
- DR readiness
    

---

# 🧠 How they all work together

|Tool|Purpose|
|---|---|
|EBS Snapshots|Back up disks|
|AMIs|Back up entire servers|
|Cross-Region backups|Protect against region failure|
|EC2 Image Builder|Create clean, secure server images|

---

# 🏗 Real-World DR Setup

A production system typically:

1. Uses **Image Builder** to create golden AMIs
    
2. Runs EC2 from those AMIs
    
3. Takes **EBS snapshots** every day
    
4. Copies snapshots **cross-region**
    
5. Can rebuild everything in minutes
    

This is how enterprises achieve **fast disaster recovery**.