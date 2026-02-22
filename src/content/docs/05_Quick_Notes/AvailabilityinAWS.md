---
title: Availability in EC2
description: Availability in EC2
time: 15:02:87
date: 17-02-2026
---
The four core building blocks that make **AWS production systems** reliable, scalable, and safe.

---

# 🚀 1. Launch Templates

![Image](https://labresources.whizlabs.com/1bee6663745fb9d3e02aee2834faa309/auto_scaling.png)

![Image](https://docs.aws.amazon.com/images/whitepapers/latest/blue-green-deployments/images/scale-down-blue-launch.png)

A **Launch Template** is the **blueprint** used by AWS to create EC2 instances.

It tells AWS:

> “When I need a new server, build it like this.”

---

### What a Launch Template contains

|Category|What it defines|
|---|---|
|AMI|Which OS & application image|
|Instance type|CPU, RAM (t3, m5, c6g, etc)|
|Key pair|SSH access|
|Security groups|Firewall rules|
|IAM role|Permissions|
|User Data|Startup scripts|
|Storage|EBS volumes|
|Networking|VPC, subnets|

ASG cannot create instances without a **Launch Template**.

---

### Versioning

Every time you change it:

```
v1 → v2 → v3 → v4
```

ASG can:

- Pin to a version
    
- Or always use **latest**
    

This makes deployments safe.

---

# ❤️ 2. Health Checks

![Image](https://d2908q01vomqb2.cloudfront.net/5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/2023/04/10/figure_2-1024x688.png)

![Image](https://aws.github.io/aws-elb-best-practices/reliability/images/deep-health-check-elb.png)

![Image](https://docs.aws.amazon.com/images/autoscaling/ec2/userguide/images/how-health-checks-work.png)

Health checks answer:

> “Is this server safe to send traffic to?”

There are **two layers**:

---

## EC2 Health Check

Checks:

- OS booted
    
- Hardware
    
- Network
    

If EC2 crashes → AWS knows

---

## Load Balancer Health Check

Checks:

```
GET /health
```

If your app is broken, ALB sees it and reports:

> Unhealthy

ASG uses BOTH.

If either fails:

```
Terminate instance
Launch new one
```

This is called **self-healing**.

---

# 🔄 3. Rolling Deployments

![Image](https://developer.harness.io/assets/images/22f0a4be013dcf977b67e4f645941ce03ea5f63e6d9225a28f5efa383b5b5bdc-0f1b66e28696d1bde235ca5ae2fc2a7f.png)

![Image](https://docs.aws.amazon.com/images/whitepapers/latest/blue-green-deployments/images/blue-green-example.png)

![Image](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/06/16/instance-refresh-automation-flow.jpg)

Rolling deployments update servers **without downtime**.

Instead of:

```
Stop all → deploy → start
```

You do:

```
Replace a few → test → replace more → repeat
```

---

## How AWS does it (Instance Refresh)

When you:

- Change AMI
    
- Update launch template
    
- Patch OS
    

ASG:

1. Launches new instance
    
2. Waits for it to pass health checks
    
3. Puts it into the Load Balancer
    
4. Terminates one old instance
    
5. Repeats
    

Users never notice.

---

## Why it’s critical

Without rolling deploys:

- Updates = outages
    
- Bugs = full crash
    

With rolling deploys:

- Zero downtime
    
- Easy rollback
    

---

# 🌍 4. Multi-AZ Architecture

![Image](https://d2908q01vomqb2.cloudfront.net/fc074d501302eb2b93e2554793fcaf50b3bf7291/2021/06/22/Figure-2.-Multi-site-active-active-DR-strategy.png)

![Image](https://docs.aws.amazon.com/images/whitepapers/latest/advanced-multi-az-resilience-patterns/images/discovering-rds-endpoint-names.png)

![Image](https://d1tcczg8b21j1t.cloudfront.net/strapi-assets/ec2_simple_high_availability_architecture_238f1c256f.png)

An **Availability Zone (AZ)** is a physically separate data center.

Multi-AZ means:

> “My system runs in multiple data centers at the same time.”

---

## What happens in Multi-AZ

```
AZ-A → EC2-1, EC2-2
AZ-B → EC2-3, EC2-4
ALB spreads traffic across both
```

If **AZ-A dies**:

- ALB sends traffic to AZ-B
    
- ASG launches new EC2s in AZ-B
    

Your app stays alive.

---

## ASG + Multi-AZ

ASG automatically:

- Distributes instances across AZs
    
- Rebalances if one AZ has more
    

This protects you from:

- Power failures
    
- Network failures
    
- Fire, flood, or maintenance
    

---

# 🧠 How all 4 work together

```
Launch Template → defines server
Health Checks → verify server
Rolling Deployment → update server
Multi-AZ → protect server
```

Together they form:

> A **fault-tolerant, self-healing, zero-downtime cloud platform**
