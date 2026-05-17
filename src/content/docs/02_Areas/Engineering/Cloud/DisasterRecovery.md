---
title: How recover from cloud disaster
description: A guide on disaster recovery
time: 15:02:15
date: 17-02-2026
---
These three terms describe **Disaster Recovery (DR) strategies** in AWS and cloud architecture.  
They differ mainly in **cost, speed, and how much of your system is running in the backup region**.

---

# 🧯 **Pilot Light vs Warm Standby vs Multi-Site**

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2021/05/13/Figure-2.-Pilot-light-DR-strategy.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2021/06/22/Figure-2.-Multi-site-active-active-DR-strategy.png)

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2021/06/22/Figure-3.-Read-local-write-partitioned-pattern-for-multi-site-active-active-DR-strategy.png)

---

## 🔥 **Pilot Light**

Think of it like a **gas stove**.

The pilot light is ON, but the main burners are OFF.

### What is running?

Only the **critical core** of your system:

- Database (replica)
    
- Minimal EC2 or containers
    
- Core IAM, networking, AMIs
    

Everything else (app servers, full fleet, load balancers) is **stopped**.

### What happens during disaster?

1. You detect failure in Region A
    
2. Scale up EC2 / containers in Region B
    
3. Attach them to the running database
    
4. Point DNS to Region B
    

### Recovery time

⏱ **Minutes to 1 hour**

### Cost

💲 **Low**

### Use when

- You can tolerate some downtime
    
- You want cheap DR
    
- Example: internal tools, admin portals
    

---

## 🔥 **Warm Standby**

Now the stove is **already warm**.

The backup site is **running**, just smaller.

### What is running?

Everything, but at **low capacity**:

- Web servers
    
- App servers
    
- Database
    
- Load balancer
    

It can already serve traffic, but not at full scale.

### What happens during disaster?

1. DNS shifts traffic to standby region
    
2. Auto Scaling increases server count
    
3. Traffic flows normally
    

### Recovery time

⏱ **Seconds to minutes**

### Cost

💲💲 **Medium**

### Use when

- Some downtime is okay, but short
    
- Production systems
    
- SaaS platforms
    

---

## 🔥 **Multi-Site (Active-Active)**

Now **both stoves are fully cooking**.

Two or more regions are live at the same time.

### What is running?

Everything in **all regions**:

- Web
    
- App
    
- Databases
    
- Load balancers
    

Users are already split between regions.

### What happens during disaster?

Nothing special.  
Traffic automatically flows to the healthy region.

### Recovery time

⏱ **Near zero**

### Cost

💲💲💲💲 **High**

### Use when

- Mission-critical systems
    
- Banks, airlines, Netflix, AWS services
    

---

# 🧠 Side-by-Side Comparison

|Feature|Pilot Light|Warm Standby|Multi-Site|
|---|---|---|---|
|Servers running in DR|Minimal|Reduced|Full|
|Database|Replica|Live|Multi-master / global|
|Cost|Low|Medium|High|
|Downtime|Minutes–1 hr|Seconds–minutes|Almost none|
|Complexity|Low|Medium|High|
|Typical RTO|~30–60 min|~1–10 min|Seconds|
|Typical RPO|Minutes|Seconds|Zero|

---

# 🏗️ Real-World Example

Imagine an online store:

### Pilot Light

- Only database replica is running in backup region
    
- When main region fails, servers start from AMIs
    

### Warm Standby

- Website and DB already running at 10% capacity
    
- Just scale up and redirect traffic
    

### Multi-Site

- Customers already use both regions
    
- One region dying is invisible to users
    