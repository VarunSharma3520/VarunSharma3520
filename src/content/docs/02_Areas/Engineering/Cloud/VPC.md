---
title: VPC guide
description: A list of VPC topics
time: 05:02:00
date: 17-02-2026
---

Here is a **complete, advanced-level AWS VPC concepts — including **deep networking topics, real-world architectures, optimization techniques, and “cloud-engineer hacks”** that senior AWS engineers and cloud architects use.

---

# 🧠 **AWS VPC – Advanced Learning Roadmap**

## 🧩 1. **VPC Core Architecture (Deep Level)**

You should go beyond “subnets & route tables” and understand:

- CIDR design for large multi-region networks
    
- Overlapping vs non-overlapping IP planning
    
- IPv4 + IPv6 dual-stack VPCs
    
- Secondary CIDR blocks
    
- VPC limits & scaling behavior
    
- Elastic Network Interfaces (ENI) deep dive
    
- Jumbo frames & MTU tuning
    
- VPC-level DNS resolution & hostnames
    
- DHCP Options Sets
    
- Amazon-provided DNS vs custom DNS
    

---

## 🧱 2. **Subnet Engineering**

Master how AWS really moves packets inside a VPC:

- Public vs private subnet internals
    
- Routing priority rules
    
- AZ-specific subnet behavior
    
- Dedicated ingress subnets
    
- Isolated subnets
    
- Subnet IP exhaustion mitigation
    
- Resizing subnets without downtime
    
- Using secondary CIDR to expand
    
- High-availability subnet layouts
    

---

## 🚦 3. **Advanced Routing**

This is where senior engineers stand out:

- Route table precedence
    
- Longest-prefix match
    
- Local routes
    
- Blackhole routes
    
- TGW vs VPC peering routing
    
- Asymmetric routing detection
    
- Routing loops
    
- AWS route propagation logic
    
- Hybrid routing (on-prem → AWS → SaaS)
    

---

## 🔐 4. **Security at the Network Layer**

Go far beyond Security Groups:

### **Network ACLs**

- Stateless filtering behavior
    
- Rule ordering tricks
    
- Ephemeral port handling
    
- NACL vs SG layered security
    

### **Security Groups**

- Self-referencing SGs
    
- SG chaining
    
- SG as virtual firewalls
    
- Cross-VPC SG referencing
    
- Performance implications
    

### **Advanced**

- AWS Network Firewall
    
- Firewall Manager
    
- Stateful vs stateless inspection
    
- Deep packet inspection (DPI)
    
- East-west traffic filtering
    

---

## 🌍 5. **Internet, NAT & Egress Engineering**

Most AWS breaches happen here.

- Internet Gateway internals
    
- NAT Gateway vs NAT Instance
    
- Egress-only Internet Gateway (IPv6)
    
- Split-tunnel vs full-tunnel
    
- Egress filtering using firewall
    
- Per-AZ NAT deployment
    
- NAT cost optimization
    
- Blocking data exfiltration
    

---

## 🔗 6. **Private Connectivity (Enterprise Level)**

You must master how big companies connect networks.

- VPC Peering (limitations & hacks)
    
- AWS Transit Gateway (TGW)
    
- TGW route tables & segmentation
    
- TGW vs Hub-and-Spoke VPCs
    
- TGW inter-region peering
    
- TGW multicast
    
- AWS PrivateLink
    
- Interface vs Gateway endpoints
    
- Endpoint policies
    
- SaaS private connectivity
    

---

## 🏢 7. **Hybrid Networking (On-Prem + AWS)**

Critical for large companies.

- Site-to-Site VPN
    
- Client VPN
    
- Direct Connect
    
- BGP routing
    
- Active-active VPN
    
- Failover strategies
    
- Redundant DX architecture
    
- AWS global accelerator vs DX
    
- Routing between multiple data centers
    

---

## 🔍 8. **Traffic Monitoring & Forensics**

This is how real cloud security works.

- VPC Flow Logs (all levels)
    
- Traffic mirroring
    
- Packet capture on EC2
    
- NAT gateway logs
    
- AWS Network Access Analyzer
    
- Reachability Analyzer
    
- Route Analyzer
    

---

## ⚡ 9. **Performance Engineering**

Used by high-scale companies.

- ENI bandwidth limits
    
- Placement groups
    
- SR-IOV networking
    
- Jumbo frames
    
- TCP tuning
    
- Cross-AZ latency
    
- Global Accelerator vs ALB vs NLB
    
- PrivateLink latency optimization
    

---

## 🧠 10. **Multi-Account & Enterprise Design**

How real companies build AWS.

- AWS Organizations
    
- Central networking account
    
- Shared VPC models
    
- Resource Access Manager (RAM)
    
- Cross-account routing
    
- Firewall centralization
    
- Per-account isolation
    

---

## 🧨 11. **Red-Team & Cloud Hacks (Ethical)**

These are used by penetration testers & defenders.

- Exposed route table exploitation
    
- Over-permissive SG scanning
    
- Open NACL detection
    
- Public IP leakage
    
- VPC endpoint bypass tricks
    
- DNS exfiltration paths
    
- Traffic shadowing
    

---

## 🛠 12. **Production-Grade Architectures**

You should be able to design:

- Zero-trust VPC
    
- Multi-region VPC mesh
    
- Isolated PCI VPC
    
- Secure SaaS VPC
    
- DR VPC
    
- Shared services VPC
    
- Internet-less VPC
    
- Fully private Kubernetes VPC