---
title: AutoScaling and Load Balancing AWS
description: Click to edit description
time: 15:02:00
date: 17-02-2026
---
How **Auto Scaling Groups**, **Scaling Policies**, and **AWS Load Balancers** work together to build a **highly available, self-healing, and scalable cloud architecture**.

---

# 🧩 1. Auto Scaling Groups (ASG)

![Image](https://docs.aws.amazon.com/images/autoscaling/ec2/userguide/images/elb-tutorial-architecture-diagram.png)

![Image](https://docs.aws.amazon.com/images/autoscaling/ec2/userguide/images/sample-3-tier-architecture-auto-scaling-diagram.png)

![Image](https://d2908q01vomqb2.cloudfront.net/5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/2023/04/10/figure_2-1024x688.png)

An **Auto Scaling Group** is a **container for EC2 instances** that automatically ensures:

- The **right number of servers**
    
- **Healthy servers only**
    
- **Automatic scaling** when traffic changes
    

### What an ASG manages

|Responsibility|What it does|
|---|---|
|Capacity|Keeps min / desired / max number of EC2s|
|Health|Replaces crashed or unhealthy EC2s|
|AZ balancing|Spreads EC2s across availability zones|
|Registration|Adds/removes EC2s from load balancers|

---

### Core ASG Settings

|Setting|Meaning|
|---|---|
|**Min**|Lowest number of servers allowed|
|**Desired**|Normal running amount|
|**Max**|Hard limit of servers|

Example:

```
Min = 2
Desired = 4
Max = 10
```

ASG will always keep **4** unless scaling policies change it.

---

### ASG Health Checks

ASG continuously checks:

- EC2 status
    
- Load Balancer health
    

If an instance:

- crashes
    
- fails health check  
    ASG **terminates it** and **launches a new one automatically**
    

This makes ASG **self-healing**.

---

# ⚙️ 2. Scaling Policies

![Image](https://docs.aws.amazon.com/images/autoscaling/ec2/userguide/images/sqs-as-custom-metric-diagram.png)

![Image](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2023/02/08/Figure-1-Dynamic_TargetTracking_Diagram.png)

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2021/04/30/Figure-1-Solution-flow-1.png)

Scaling policies decide **WHEN** and **HOW MUCH** to scale.

---

## Types of Scaling Policies

### 1️⃣ Target Tracking (Most common)

You give AWS a target, e.g.:

> Keep average CPU at 50%

ASG automatically:

- Adds instances when CPU > 50%
    
- Removes when CPU < 50%
    

You don’t define steps — AWS does it for you.

---

### 2️⃣ Step Scaling

You define exact rules:

|CPU|Action|
|---|---|
|> 80%|+4 instances|
|60–80%|+2|
|< 30%|−1|

Used when you want **precise control**.

---

### 3️⃣ Simple Scaling

Old version of step scaling.  
One alarm → one action.

Example:

> CPU > 70% → add 1 instance

Not used much anymore.

---

### 4️⃣ Scheduled Scaling

Scale based on time.

Example:

- 8am → 10 instances
    
- 10pm → 2 instances
    

Perfect for:

- office hours
    
- batch jobs
    
- predictable workloads
    

---

# 🔀 3. Load Balancers

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2021/05/13/Figure-2.-Pilot-light-DR-strategy-1024x538.png)

![Image](https://miro.medium.com/1%2AKi7PQVUG3kJHXjsM763Ryw.png)

![Image](https://docs.aws.amazon.com/images/elasticloadbalancing/latest/classic/images/load_balancer.png)

A **Load Balancer** is the **traffic cop** of AWS.

It:

- Receives user traffic
    
- Sends it to healthy EC2 instances
    
- Works with ASG for automatic registration
    

---

# Types of AWS Load Balancers

|Type|Layer|Best For|
|---|---|---|
|**ALB**|Layer 7 (HTTP)|Web apps, microservices|
|**NLB**|Layer 4 (TCP)|Ultra-high performance|
|**CLB**|L4 + L7|Legacy only|

---

## 🟦 Application Load Balancer (ALB)

![Image](https://media.amazonwebservices.com/blog/2017/alb_all_rules_1.png)

![Image](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2019/10/06/illustration-2-779x630.png)

ALB understands:

- URLs
    
- Headers
    
- Cookies
    

Example routing:

```
/api → API servers
/images → image servers
/login → auth servers
```

It supports:

- HTTPS termination
    
- WebSockets
    
- Containers
    
- Microservices
    

ALB works with **Target Groups** that ASG attaches EC2s to.

---

## 🟥 Network Load Balancer (NLB)

![Image](https://miro.medium.com/1%2AKi7PQVUG3kJHXjsM763Ryw.png)

![Image](https://miro.medium.com/1%2AEIe_EtVJzGeW4hI6G_nzNA.png)

NLB is:

- Extremely fast
    
- TCP/UDP based
    
- Used for:
    
    - gaming
        
    - VoIP
        
    - financial trading
        
    - IoT
        

It can handle **millions of requests per second**.

---

## 🟨 Classic Load Balancer (CLB)

Old generation.  
Avoid unless supporting old systems.

---

# 🤝 How ASG + Load Balancer Work Together

![Image](https://docs.aws.amazon.com/images/autoscaling/ec2/userguide/images/elb-tutorial-architecture-diagram.png)

![Image](https://substackcdn.com/image/fetch/w_1456%2Cc_limit%2Cf_auto%2Cq_auto%3Agood%2Cfl_progressive%3Asteep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27dcd71d-6672-4f40-9dd4-1389a42869d7_1405x1923.png)

Flow:

1. User sends traffic to **Load Balancer**
    
2. Load Balancer sends traffic to **healthy EC2s**
    
3. ASG monitors:
    
    - CPU
        
    - requests
        
    - health
        
4. If traffic increases → ASG launches new EC2s
    
5. New EC2s are **auto-registered** into Load Balancer
    
6. Traffic spreads automatically
    

This gives you:

- Zero downtime
    
- Auto-healing
    
- Auto-scaling
    

---

# 🏗️ Real-World Example

Netflix-style web app:

```
ALB
 ├── ASG (Web Servers)
 ├── ASG (API Servers)
 └── ASG (Auth Servers)
```

If API traffic spikes:

- Only API ASG scales
    
- Web and Auth stay the same
    

This keeps cost low and performance high.

---

# 🎯 Summary

|Component|Purpose|
|---|---|
|ASG|Manages server count & health|
|Scaling Policies|Decide when to scale|
|Load Balancer|Distributes traffic|

Together they create:

> **A self-healing, elastic, highly-available cloud system**
