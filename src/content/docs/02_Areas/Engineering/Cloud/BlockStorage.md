---
title: Types of EBS in AWS
description: Compare types of EBS
time: 14:02:00
date: 17-02-2026
---
************
## 🧱 Amazon EBS Volume Types — Deep Dive

_(gp3, io2, st1, sc1)_

![Image](https://www.scaler.com/topics/images/amzon-ebs.webp)

![Image](https://cdn.prod.website-files.com/6141f644cab6712410b75edc/67bf12ee43121d26868fd7e1_EBS%20volume%20types.webp)

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/io1_throughput.png)

**Amazon Elastic Block Store (EBS)** is AWS’s block-level storage used primarily with **EC2** instances. Each EBS volume type is optimized for a different workload pattern:

- **General purpose**
    
- **High-performance databases**
    
- **Big data & streaming**
    
- **Cold archive data**
    

---

# 1️⃣ **gp3 — General Purpose SSD**

> Default choice for most workloads

### What it is

**gp3** is the modern replacement for **gp2**. It delivers **predictable performance** at **lower cost** and lets you scale performance independently from storage size.

### Performance model

|Metric|gp3|
|---|---|
|Baseline IOPS|**3,000**|
|Max IOPS|**16,000**|
|Baseline Throughput|**125 MB/s**|
|Max Throughput|**1,000 MB/s**|
|Latency|**Single-digit ms**|

You **pay extra only if you need more IOPS or throughput**.

### Best use cases

- Web servers
    
- Application servers
    
- Small/medium databases
    
- Dev/Test environments
    
- Docker / Kubernetes volumes
    

### Why gp3 is so good

In gp2, performance scaled with size.  
In **gp3**, performance is **decoupled from size**, so:

> You can have a **50-GB volume with 16,000 IOPS**

---

# 2️⃣ **io2 — High-Performance SSD (Mission-Critical)**

> For databases where downtime or lag is unacceptable

### What it is

**io2** is AWS’s **highest-end block storage** for ultra-low latency and very high IOPS.

It supports **multi-attach**, allowing **multiple EC2 instances** to access the same volume (clustered databases).

### Performance model

|Metric|io2|
|---|---|
|Max IOPS|**256,000**|
|Max Throughput|**4,000 MB/s**|
|Latency|**Sub-millisecond**|
|Durability|**99.999%**|

It is built on **AWS Nitro SSDs** instead of network storage.

### Best use cases

- Oracle, SAP HANA
    
- Large PostgreSQL / MySQL
    
- Financial systems
    
- Transaction processing (OLTP)
    
- High-frequency trading platforms
    

### Why io2 costs more

You are paying for:

- Dedicated performance
    
- Ultra-low latency
    
- Extreme durability
    
- Multi-attach
    

---

# 3️⃣ **st1 — Throughput Optimized HDD**

> For big data & streaming workloads

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/st1-burst-bucket.png)

![Image](https://miro.medium.com/0%2AjgKtXcNYO2UpFwlM.png)

### What it is

**st1** is a **magnetic hard drive** designed for **high-throughput, sequential reads & writes**.

It is NOT good for random I/O.

### Performance model

|Metric|st1|
|---|---|
|Max Throughput|**500 MB/s**|
|Max IOPS|**500**|
|Latency|**High (ms+)**|

### Best use cases

- Hadoop
    
- Kafka
    
- Data warehousing
    
- ETL jobs
    
- Log processing
    
- Streaming analytics
    

### Key idea

st1 trades:

> ❌ Low latency  
> for  
> ✅ High streaming bandwidth

---

# 4️⃣ **sc1 — Cold HDD**

> Cheapest EBS for rarely accessed data

![Image](https://docs.aws.amazon.com/images/ebs/latest/userguide/images/sc1-burst-bucket.png)

![Image](https://cdn.prod.website-files.com/63403546259748be2de2e194/6510ab90d75705217fe92a97_Img1b_Short2.gif)

### What it is

**sc1** is for **cold data** — data that is accessed occasionally but must stay online.

### Performance model

|Metric|sc1|
|---|---|
|Max Throughput|**250 MB/s**|
|Max IOPS|**250**|
|Latency|**Very high**|

### Best use cases

- Old log archives
    
- Historical data
    
- Backup staging
    
- Compliance data
    

### Not for

- Boot volumes
    
- Databases
    
- Applications
    
- Any random I/O
    

---

# ⚡ Quick Comparison

|Feature|**gp3**|**io2**|**st1**|**sc1**|
|---|---|---|---|---|
|Storage type|SSD|SSD|HDD|HDD|
|Latency|Low|Ultra-low|High|Very high|
|IOPS|Up to 16k|Up to 256k|500|250|
|Throughput|1 GB/s|4 GB/s|500 MB/s|250 MB/s|
|Cost|Low|Very high|Low|Very low|
|Use case|General apps|Databases|Big data|Archives|

---

# 🧠 AWS Architecture Rule of Thumb

|Workload|Use|
|---|---|
|EC2 OS, web apps|**gp3**|
|MySQL / PostgreSQL|**gp3 → io2 when big**|
|Oracle / SAP|**io2**|
|Hadoop, Spark|**st1**|
|Logs, archives|**sc1**|
