---
title: Hpw to Monitor and Log in AWS
description: A guide on monitoring and logging
time: 15:02:35
date: 17-02-2026
---
AWS monitoring and auditing component you listed, and how they all work together in real cloud systems.

---

# ☁️ **Amazon CloudWatch Metrics**

![Image](https://docs.aws.amazon.com/images/AmazonCloudWatch/latest/monitoring/images/CW-default-dashboard-update.png)

![Image](https://docs.aws.amazon.com/images/AmazonCloudWatch/latest/monitoring/images/metric_statistics_ec2_instance.png)

![Image](https://docs.aws.amazon.com/images/AmazonCloudWatch/latest/monitoring/images/Anomaly_Detection_Icon.PNG)

### What it is

**CloudWatch Metrics** is AWS’s **time-series database** that collects numeric performance data about AWS resources.

### What it measures

Automatically collected (every 1–5 minutes):

|Resource|Example Metrics|
|---|---|
|EC2|CPUUtilization, DiskReadOps, NetworkIn|
|RDS|ReadIOPS, FreeStorageSpace|
|ALB|RequestCount, TargetResponseTime|
|Lambda|Invocations, Errors, Duration|

Each metric has:

- **Namespace** → `AWS/EC2`, `AWS/RDS`
    
- **Metric Name** → `CPUUtilization`
    
- **Dimensions** → `InstanceId=i-12345`
    
- **Timestamp + Value**
    

### Why it matters

Metrics show **how well** your system is performing.

---

# 📜 **CloudWatch Logs**

![Image](https://d2908q01vomqb2.cloudfront.net/b7eb6c689c037217079766fdb77c3bac3e51cb4c/2021/07/29/enniop-architecture-diagram.jpg)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AIHDQal1M_KQr3kQdbh5htA.png)

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2019/06/07/SSLogInsights-1260x581.png)

### What it is

CloudWatch Logs stores **text-based log data**.

### What goes into it

|Source|Examples|
|---|---|
|EC2|`/var/log/syslog`, application logs|
|Lambda|`console.log()` output|
|ECS / EKS|Container logs|
|API Gateway|Request logs|

### Structure

```
Log Group
   └── Log Stream
         └── Log events (timestamp + message)
```

### Why it matters

Logs tell you **why** something happened.

Metrics = symptoms  
Logs = diagnosis

---

# 📊 **Custom Metrics**

![Image](https://d2908q01vomqb2.cloudfront.net/0716d9708d321ffb6a00818614779e779925365c/2017/06/13/vertx_metrics.jpg)

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2020/08/13/image001-1.png)

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2021/08/20/img2a.png)

### What it is

You can push **your own metrics** into CloudWatch.

### Examples

|App Data|Metric|
|---|---|
|Active users|`ActiveUsers=523`|
|Queue length|`QueueDepth=87`|
|API latency|`LoginLatency=320ms`|

Sent via:

- AWS SDK
    
- AWS CLI
    
- CloudWatch Agent
    

```bash
aws cloudwatch put-metric-data \
--namespace "MyApp" \
--metric-name "ActiveUsers" \
--value 523
```

### Why it matters

AWS gives you infrastructure metrics.  
Custom metrics give you **business and application health**.

---

# 🚨 **CloudWatch Alarms**

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2017/05/23/Example-Picture-1-2.png)

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2020/10/19/cw_6_alarm.png)

![Image](https://d2908q01vomqb2.cloudfront.net/7719a1c782a1ba91c031a682a0a2f8658209adbf/2017/12/19/architecture-1024x576.png)

### What it is

Alarms **watch metrics** and take action when thresholds are crossed.

### Example

> “If CPU > 80% for 5 minutes → Send email & scale EC2”

### What alarms can do

- Send email/SMS (SNS)
    
- Trigger Auto Scaling
    
- Reboot EC2
    
- Run Lambda
    

### Why it matters

Alarms convert **monitoring into action**.

---

# 🩺 **EC2 Status Checks**

![Image](https://media.amazonwebservices.com/blog/console_show_status_checks_column_1.png)

![Image](https://i.sstatic.net/B8dzx.png)

Every EC2 instance has **two automatic health checks**:

|Check|Tests|
|---|---|
|**System Status**|AWS infrastructure (power, network, host)|
|**Instance Status**|OS, kernel, disk, CPU|

### Examples

|Failure|Meaning|
|---|---|
|System check fails|AWS hardware issue|
|Instance check fails|Your OS is broken|

These appear as metrics:

- `StatusCheckFailed`
    
- `StatusCheckFailed_System`
    
- `StatusCheckFailed_Instance`
    

---

# 🔍 **AWS CloudTrail**

![Image](https://docs.aws.amazon.com/images/awscloudtrail/latest/userguide/images/cloudtrail-event-history.png)

![Image](https://maturitymodel.security.aws.dev/en/CloudTrail.png)

![Image](https://documentation.solarwinds.com/en/success_center/loggly/content/resources/images/docs/loggly_ui_cloudtrail_march_2020-1.png?ver=1757592516)

### What it is

CloudTrail records **WHO did WHAT and WHEN** in AWS.

### Example events

|Action|
|---|
|Someone deleted an EC2|
|IAM user changed permissions|
|S3 bucket made public|

Example:

```
User: admin
Action: TerminateInstances
Resource: i-345abc
Time: 12:05 UTC
IP: 10.2.3.4
```

### Why it matters

CloudTrail is **security + compliance + forensics**.

CloudWatch = system behavior  
CloudTrail = human behavior

---

# 🌐 **VPC Flow Logs**

![Image](https://d2908q01vomqb2.cloudfront.net/972a67c48192728a34979d9a35164c1295401b71/2023/05/09/Figure-1-Solution-Architecture-1024x771.png)

![Image](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2019/09/13/2019-08-13_10-41-04.png)

![Image](https://media.amazonwebservices.com/blog/2015/flow_see_a_stream_2.png)

### What it is

Flow Logs capture **network traffic metadata** in your VPC.

### Example record

```
10.0.1.10 → 54.23.8.2
Port 443
ACCEPT
Bytes: 15,230
```

### What it tells you

- Who connected to who
    
- Was traffic accepted or rejected
    
- How much data moved
    

### Why it matters

Flow Logs are used for:

- Security analysis
    
- Detecting intrusions
    
- Debugging network issues
    

---

# 🧠 How they all work together

|Tool|Answers|
|---|---|
|CloudWatch Metrics|How is my system performing?|
|CloudWatch Logs|What exactly happened?|
|Custom Metrics|How is my app doing?|
|Alarms|When should I react?|
|EC2 Status Checks|Is the VM alive?|
|CloudTrail|Who changed what?|
|VPC Flow Logs|Who talked to who?|
