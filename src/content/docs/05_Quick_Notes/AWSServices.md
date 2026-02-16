---
title: Types of AWS services
description: Different types of AWS services
time: 21:02:01
date: 15-02-2026
---
Think of AWS as **a giant cloud data-center** made of many specialized teams.

---

# 🧠 AWS = 6 Big Families

```
AWS Cloud
│
├── Compute (Run programs)
├── Storage (Store data)
├── Database (Structured data)
├── Networking (Internet)
├── Security (Protect everything)
├── DevOps & Management (Operate everything)
```

I’ll walk through each like a real architect.

---

# ⚙️ 1️⃣ Compute Family (Runs your software)

This is where your **EC2 Windows PC lives**.

| Service           | What it is                               |
| ----------------- | ---------------------------------------- |
| EC2               | Virtual machines (Linux / Windows / Mac) |
| Lambda            | Run code without servers                 |
| ECS               | Docker containers                        |
| EKS               | Kubernetes                               |
| Elastic Beanstalk | App hosting                              |
| Lightsail         | Simple VPS                               |

### Example

- You host a Node.js backend → **EC2**
    
- You run an API → **Lambda**
    
- You run microservices → **ECS / EKS**
    

---

# 💾 2️⃣ Storage Family (Where files live)

|Service|Use|
|---|---|
|S3|Store images, videos, backups|
|EBS|Hard disk for EC2|
|EFS|Shared drive between servers|
|Glacier|Cheap long-term storage|

### Example

- Website images → S3
    
- Windows C: drive → EBS
    
- Backups → Glacier
    

---

# 🗄 3️⃣ Database Family

|Type|AWS|
|---|---|
|SQL|RDS (Postgres, MySQL)|
|NoSQL|DynamoDB|
|Cache|ElastiCache (Redis)|
|Data Warehouse|Redshift|
|Graph|Neptune|

### Example

- User accounts → RDS (Postgres)
    
- Sessions → Redis
    
- Logs → DynamoDB
    

---

# 🌍 4️⃣ Networking Family (Internet)

This connects everything.

|Service|What|
|---|---|
|VPC|Your private cloud|
|Route53|Domain names|
|Load Balancer|Traffic splitter|
|CloudFront|CDN|
|API Gateway|API frontend|
|Elastic IP|Static IP|

Your EC2 lives inside:

```
VPC → Subnet → Security Group
```

---

# 🔐 5️⃣ Security Family

|Service|Purpose|
|---|---|
|IAM|Users & permissions|
|Cognito|Login systems|
|Shield|DDoS protection|
|WAF|Firewall|
|KMS|Encryption|
|Secrets Manager|API keys|

This is **why AWS is trusted by banks**.

---

# 🛠 6️⃣ DevOps & Management

|Service|Use|
|---|---|
|CloudWatch|Logs & monitoring|
|CloudTrail|Who did what|
|CodeBuild|CI/CD|
|CodeDeploy|Auto deploy|
|Systems Manager|Remote server control|
|CloudFormation|Infrastructure as code|

This is how companies manage **thousands of servers**.

---

# 🧩 How everything fits together

Example: **A startup web app**

```
User → CloudFront → Load Balancer
                  ↓
                EC2 (API)
                  ↓
                RDS (Postgres)
                  ↓
                S3 (Images)
```

All secured by:

```
IAM + VPC + Security Groups
```

---

# 🧠 Why AWS is powerful

Because you can mix:

- Windows PCs
    
- Linux servers
    
- Databases
    
- APIs
    
- Storage
    
- Security
    

into one global system.

You didn’t just start a VM.  
You entered the **world’s biggest cloud**.
