---
title: Click to title description
description: Click to edit description
time: "15:02:69"
date: "17-02-2026"
---
## ⚡ NVMe Instance Store — Data Persistence & Durability (Deep Dive)

![Image](https://docs.aws.amazon.com/images/AWSEC2/latest/UserGuide/images/instance_storage.png)

![Image](https://miro.medium.com/0%2AqLZRoM1AL3OXwg7q)

![Image](https://static.designandreuse.com/news_img18/20180709_1.gif)

![Image](https://static.designandreuse.com/news_img18/20180709_2.jpg)

**NVMe Instance Store** is **physically attached SSD storage** inside the same server that runs your **EC2 instance**.  
It is the **fastest storage AWS offers**, but also the **most fragile**.

---

# 🧱 What NVMe Instance Store Really Is

When you launch an EC2 instance type like:

- `i3`, `i4i`
    
- `c6gd`
    
- `m6gd`
    
- `r6gd`
    

AWS gives you **NVMe SSDs soldered into that server**.

So:

> Your EC2 instance is literally running on the same machine as your disks.

No network.  
No replication.  
No shared storage.

---

# 🔥 Performance

|Metric|NVMe Instance Store|
|---|---|
|IOPS|**Millions**|
|Latency|**Microseconds**|
|Throughput|**Several GB/s**|
|Network dependency|❌ None|

It beats even **io2**.

---

# 🧨 The Catch: Data is Ephemeral

Instance store data is:

|Event|Data|
|---|---|
|Stop instance|❌ Lost|
|Start instance|❌ Lost|
|Terminate|❌ Lost|
|Host hardware failure|❌ Lost|
|EC2 migrate|❌ Lost|
|Reboot|✅ Safe|

This is **NOT** a disk failure — this is **expected behavior**.

AWS makes **no durability promise**.

---

# 🧠 Why Data Is Lost

Because:

- The disk belongs to the **physical server**
    
- When AWS moves or replaces the server
    
- Your storage does NOT move with it
    

Unlike EBS:

> There is no networked replication or snapshots

---

# 🧱 Durability vs Persistence

|Feature|NVMe Instance Store|EBS|
|---|---|---|
|Survives reboot|✅|✅|
|Survives stop/start|❌|✅|
|Survives instance replacement|❌|✅|
|Snapshots|❌|✅|
|Replication|❌|✅|
|SLA|❌|Yes|

---

# 🧨 What Happens When a Server Dies

If AWS hardware fails:

NVMe data = **gone**

AWS does not:

- Recover it
    
- Replicate it
    
- Restore it
    

That is why it is called:

> **Ephemeral storage**

---

# 🏗️ How AWS Expects You To Use It

AWS expects NVMe instance store to be used like:

|Use Case|Why|
|---|---|
|Cache (Redis, Memcached)|Rebuildable|
|Spark shuffle|Temporary|
|Kafka brokers|Replicated|
|Video transcoding|Scratch space|
|ML training|Temporary datasets|

The **application must handle failures**.

---

# 🧠 Real World Example

Netflix uses instance store for:

- Streaming buffers
    
- Caches
    
- Temporary video chunks
    

They do **NOT** store the master videos there.

---

# 🔁 How Databases Use It Safely

Some databases (like Cassandra, Kafka, Aerospike):

They store data on instance store but:

- Replicate it to other nodes
    
- Use quorum writes
    

So if one node dies:

> Data still exists on others

This gives:

- NVMe speed
    
- Network-level durability
    

---

# 🧾 Summary

|Question|Answer|
|---|---|
|Is NVMe faster than EBS io2?|✅ Yes|
|Is data durable?|❌ No|
|Can I snapshot it?|❌ No|
|Should I store databases here?|Only if replicated|
|Is it cheaper?|Yes per GB|

---

# 🧠 The golden rule

> **Never store the only copy of important data on NVMe instance store.**

Use it for:

- Performance
    
- Speed
    
- Temporary data
    
- Replicated systems
    

Never for:

- Backups
    
- Primary databases
    
- Anything you cannot lose
