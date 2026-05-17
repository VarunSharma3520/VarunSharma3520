---
title: Disaster Recovery Patterns in cloud deployment
description: A detailed methodological description of disaster recovery pattern
time: 19:02:00
date: 17-02-2026
---

## 🧯 Disaster Recovery (DR) Patterns — Full Explanation

**Disaster Recovery patterns** define how your system is rebuilt or continued when an AWS Region, data center, or critical service fails.

They are designed around two business goals:

- **RTO (Recovery Time Objective)** → How long can the system be down?
    
- **RPO (Recovery Point Objective)** → How much data loss is acceptable?
    

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2021/07/21/DR-Strategies-1260x530.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2021/04/23/Figure-3.-Failover-and-cross-Region-recovery-with-a-multi-Region-backup-and-restore-strategy.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2024/01/11/fig1-dr-strategies-part-3-1024x460.png)

![Image](https://docs.aws.amazon.com/images/whitepapers/latest/disaster-recovery-workloads-on-aws/images/disaster-recovery-strategies.png)

AWS defines **four major DR patterns** (from cheapest to most resilient).

---

# 1️⃣ Backup & Restore

This is the **simplest DR strategy**.

### How it works

You:

- Take backups of:
    
    - Databases (RDS snapshots, DynamoDB backups)
        
    - EC2 (AMI)
        
    - S3 (replication or backup)
        
- Store them in another Region
    

Nothing is running in the DR Region.

### During a disaster

1. Launch new VPC
    
2. Restore database from snapshot
    
3. Launch EC2 from AMIs
    
4. Restore S3 data
    
5. Reconfigure DNS
    

### Recovery

⏱ Hours to days  
📉 Data loss: depends on last backup

### Cost

💲 Very low

### Use when

- Dev/test
    
- Internal apps
    
- Small companies
    

---

# 2️⃣ Pilot Light

Only the **core infrastructure** is always on.

### What is always running?

- Database replica
    
- Minimal EC2
    
- Networking (VPC, IAM)
    

### During a disaster

You scale up the environment quickly.

### Recovery

⏱ 10–60 minutes  
📉 Minimal data loss

### Cost

💲 Low

### Use when

- Production apps
    
- Some downtime is acceptable
    

---

# 3️⃣ Warm Standby

Everything is running, but at **low scale**.

### What is running?

- Web, app, DB, load balancers
    
- But small instance counts
    

### During a disaster

Auto Scaling increases capacity.

### Recovery

⏱ Seconds to minutes  
📉 Almost no data loss

### Cost

💲💲 Medium

### Use when

- Customer-facing apps
    
- SaaS platforms
    

---

# 4️⃣ Multi-Site (Active-Active)

Everything runs in **multiple regions at once**.

### How it works

- Users are split between regions
    
- Databases are globally replicated
    
- Load balancers route traffic
    

### During a disaster

Traffic automatically shifts.

### Recovery

⏱ Near zero  
📉 Zero data loss

### Cost

💲💲💲💲 Very high

### Use when

- Banking
    
- Healthcare
    
- Global platforms
    

---

# 🧠 DR Pattern Comparison

|Pattern|Running in DR|RTO|RPO|Cost|
|---|---|---|---|---|
|Backup & Restore|Nothing|Hours–days|Hours|Low|
|Pilot Light|Core only|10–60 min|Minutes|Low|
|Warm Standby|Small full system|Minutes|Seconds|Medium|
|Multi-Site|Full system|Seconds|Zero|High|

---

# 🏗 How AWS Services enable DR

|Purpose|AWS Services|
|---|---|
|Data sync|RDS Read Replicas, DynamoDB Global Tables|
|DNS failover|Route 53|
|Traffic routing|ALB, Global Accelerator|
|Backups|AWS Backup, S3 Replication|
|Scaling|Auto Scaling|

---

# 🧩 Final Summary

Disaster Recovery patterns are a **trade-off** between:

**💲 Cost vs ⏱ Downtime vs 📉 Data Loss**

AWS lets you choose exactly how much risk your business can tolerate.
