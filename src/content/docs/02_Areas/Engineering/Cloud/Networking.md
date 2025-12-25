---
title: Networking Fundamentals
description: A concise guide to essential networking concepts every cloud engineer should master, including TCP/IP, DNS, HTTP/HTTPS, ports, firewalls, NAT, and subnets.
---

# Networking Fundamentals - Ports, Firewalls, NAT & Subnets

> A comprehensive guide to understanding essential networking concepts for developers and system administrators.

---

## Table of Contents

- [Ports](#ports)
- [Firewalls](#firewalls)
- [NAT (Network Address Translation)](#nat-network-address-translation)
- [Subnets](#subnets)
- [Practical Examples](#practical-examples)
- [Troubleshooting](#troubleshooting)

---

## Ports

### What is a Port?

A **port** is a virtual endpoint for network communications. Think of it as a specific door or channel on a server through which different services communicate.

- **IP Address**: Identifies the computer/server (like a building address)
- **Port Number**: Identifies the specific service (like an apartment number)

### Port Number Ranges

| Range | Type | Description |
|-------|------|-------------|
| **0-1023** | Well-Known Ports | Reserved for common services (HTTP, SSH, FTP) |
| **1024-49151** | Registered Ports | Used by specific applications |
| **49152-65535** | Dynamic/Private Ports | Temporary ports for client connections |

### Common Port Numbers

| Port | Protocol | Service | Description |
|------|----------|---------|-------------|
| **20, 21** | FTP | File Transfer Protocol | File transfers |
| **22** | SSH | Secure Shell | Remote server access |
| **23** | Telnet | Telnet | Unencrypted remote access (deprecated) |
| **25** | SMTP | Simple Mail Transfer Protocol | Email sending |
| **53** | DNS | Domain Name System | Domain name resolution |
| **80** | HTTP | Hypertext Transfer Protocol | Web traffic (unsecured) |
| **110** | POP3 | Post Office Protocol | Email retrieval |
| **143** | IMAP | Internet Message Access Protocol | Email access |
| **443** | HTTPS | HTTP Secure | Encrypted web traffic |
| **465** | SMTPS | SMTP Secure | Encrypted email sending |
| **587** | SMTP | SMTP Submission | Email submission (preferred) |
| **993** | IMAPS | IMAP Secure | Encrypted email access |
| **995** | POP3S | POP3 Secure | Encrypted email retrieval |
| **3306** | MySQL | MySQL Database | Database connections |
| **5432** | PostgreSQL | PostgreSQL Database | Database connections |
| **6379** | Redis | Redis Cache | In-memory data store |
| **8080** | HTTP-Alt | HTTP Alternate | Alternative HTTP port |
| **27017** | MongoDB | MongoDB Database | NoSQL database |
| **3000** | Node.js | Development Server | Common dev server port |
| **5000** | Flask | Flask Development | Python web framework |
| **8000** | Django | Django Development | Python web framework |

### Port Examples

```bash
# View all listening ports
netstat -tuln
ss -tuln

# Check specific port
netstat -tuln | grep :80
lsof -i :3000

# View process using a port
sudo lsof -i :443
sudo fuser 80/tcp
```

### Port in URLs

```
https://example.com:443/path
  │        │         │    │
  │        │         │    └─ Path
  │        │         └────── Port (443 for HTTPS)
  │        └──────────────── Domain
  └───────────────────────── Protocol
```

---

## Firewalls

### What is a Firewall?

A **firewall** is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between trusted internal networks and untrusted external networks.

### Types of Firewalls

1. **Packet Filtering** - Inspects packets and allows/denies based on rules
2. **Stateful Inspection** - Tracks active connections
3. **Application Layer** - Inspects application-level data
4. **Next-Generation** - Combines multiple features (IPS, SSL inspection, etc.)

---

### UFW (Uncomplicated Firewall)

UFW is a user-friendly frontend for `iptables`, designed for Ubuntu/Debian systems.

#### Basic Commands

```bash
# Check status
sudo ufw status
sudo ufw status verbose
sudo ufw status numbered

# Enable/Disable firewall
sudo ufw enable
sudo ufw disable

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow specific port
sudo ufw allow 22          # Allow SSH
sudo ufw allow 80          # Allow HTTP
sudo ufw allow 443         # Allow HTTPS

# Allow port range
sudo ufw allow 6000:6007/tcp

# Allow from specific IP
sudo ufw allow from 192.168.1.100
sudo ufw allow from 192.168.1.0/24

# Allow specific IP to specific port
sudo ufw allow from 192.168.1.100 to any port 22

# Deny traffic
sudo ufw deny 23           # Deny Telnet
sudo ufw deny from 192.168.1.50

# Delete rules
sudo ufw delete allow 80
sudo ufw delete 2          # Delete rule number 2

# Reset firewall
sudo ufw reset

# Application profiles
sudo ufw app list
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
```

#### Common UFW Configurations

**Web Server**
```bash
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable
```

**Database Server (restricted)**
```bash
sudo ufw allow from 192.168.1.0/24 to any port 3306  # MySQL only from local network
sudo ufw allow 22/tcp      # SSH
sudo ufw enable
```

**Development Server**
```bash
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 3000/tcp    # Node.js
sudo ufw allow 5000/tcp    # Flask/React
sudo ufw allow 8080/tcp    # Alternative HTTP
sudo ufw enable
```

---

### iptables (Advanced Firewall)

`iptables` is a powerful, low-level firewall tool for Linux.

#### Basic Concepts

- **Tables**: filter, nat, mangle, raw
- **Chains**: INPUT, OUTPUT, FORWARD
- **Targets**: ACCEPT, DROP, REJECT

#### Basic Commands

```bash
# View rules
sudo iptables -L
sudo iptables -L -v -n

# Save rules (Ubuntu/Debian)
sudo iptables-save > /etc/iptables/rules.v4

# Restore rules
sudo iptables-restore < /etc/iptables/rules.v4

# Allow SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP and HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow established connections
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Allow loopback
sudo iptables -A INPUT -i lo -j ACCEPT

# Drop all other traffic
sudo iptables -A INPUT -j DROP

# Delete rule
sudo iptables -D INPUT 3   # Delete rule 3 from INPUT chain

# Flush all rules
sudo iptables -F
```

#### Example iptables Configuration

```bash
#!/bin/bash
# Basic firewall script

# Flush existing rules
iptables -F
iptables -X

# Default policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT

# Allow established connections
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Allow SSH
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP/HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow ping
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT

# Log dropped packets
iptables -A INPUT -j LOG --log-prefix "iptables-dropped: "

# Save rules
iptables-save > /etc/iptables/rules.v4
```

---

### Firewall Comparison

| Feature | UFW | iptables |
|---------|-----|----------|
| **Ease of Use** | Very easy | Complex |
| **Best For** | General use, beginners | Advanced users, complex rules |
| **Syntax** | Simple commands | Detailed syntax |
| **Default on** | Ubuntu | Most Linux |
| **Flexibility** | Moderate | Very high |

---

## NAT (Network Address Translation)

### What is NAT?

**NAT** translates private IP addresses to public IP addresses, allowing multiple devices on a local network to share a single public IP address for internet access.

### Why NAT?

- **IPv4 Address Conservation**: Limited IPv4 addresses available
- **Security**: Hides internal network structure
- **Flexibility**: Easy to reorganize internal network

### NAT Types

#### 1. Static NAT (One-to-One)
Maps one private IP to one public IP permanently.

```
Private IP: 192.168.1.10 ←→ Public IP: 203.0.113.5
```

#### 2. Dynamic NAT (Many-to-Many)
Maps private IPs to a pool of public IPs dynamically.

```
Private IPs: 192.168.1.10-50 ←→ Public IP Pool: 203.0.113.5-10
```

#### 3. PAT (Port Address Translation) / NAT Overload
Maps multiple private IPs to a single public IP using different ports (most common).

```
192.168.1.10:5000 ←→ 203.0.113.5:50001
192.168.1.11:5000 ←→ 203.0.113.5:50002
192.168.1.12:5000 ←→ 203.0.113.5:50003
```

### NAT Example

```
Your Home Network:
┌─────────────────────────────────────┐
│  Router (NAT Device)                │
│  Private IP: 192.168.1.1            │
│  Public IP: 203.0.113.5             │
├─────────────────────────────────────┤
│  Computer 1: 192.168.1.100          │
│  Computer 2: 192.168.1.101          │
│  Phone: 192.168.1.102               │
└─────────────────────────────────────┘
         │
         │ All devices share
         │ Public IP: 203.0.113.5
         ↓
    Internet
```

### NAT Configuration (iptables)

```bash
# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# Make it permanent
echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf
sysctl -p

# Configure NAT (masquerading)
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Port forwarding (forward external port 8080 to internal 192.168.1.100:80)
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.100:80
iptables -A FORWARD -p tcp -d 192.168.1.100 --dport 80 -j ACCEPT
```

### Viewing NAT Connections

```bash
# View NAT table
sudo iptables -t nat -L -v -n

# View active connections
sudo conntrack -L

# Count NAT connections
sudo conntrack -L | wc -l
```

---

## Subnets

### What is a Subnet?

A **subnet** (subnetwork) is a logical subdivision of an IP network, allowing you to organize and secure your network more efficiently.

### CIDR Notation

CIDR (Classless Inter-Domain Routing) notation represents IP ranges:

```
192.168.1.0/24
    │        │
    │        └─ Subnet mask (24 bits for network, 8 bits for hosts)
    └────────── Network address
```

### Common Subnet Masks

| CIDR | Subnet Mask | Hosts | Example |
|------|-------------|-------|---------|
| `/8` | 255.0.0.0 | 16,777,214 | 10.0.0.0/8 |
| `/16` | 255.255.0.0 | 65,534 | 172.16.0.0/16 |
| `/24` | 255.255.255.0 | 254 | 192.168.1.0/24 |
| `/25` | 255.255.255.128 | 126 | 192.168.1.0/25 |
| `/26` | 255.255.255.192 | 62 | 192.168.1.0/26 |
| `/27` | 255.255.255.224 | 30 | 192.168.1.0/27 |
| `/28` | 255.255.255.240 | 14 | 192.168.1.0/28 |
| `/30` | 255.255.255.252 | 2 | 192.168.1.0/30 |
| `/32` | 255.255.255.255 | 1 | 192.168.1.1/32 |

### Subnet Breakdown Example

**Network: 192.168.1.0/24**

```
Network Address:   192.168.1.0
First Host:        192.168.1.1
Last Host:         192.168.1.254
Broadcast Address: 192.168.1.255
Total Hosts:       254 (256 - 2)
Subnet Mask:       255.255.255.0
```

### Private IP Ranges (RFC 1918)

| Class | Range | CIDR | Hosts |
|-------|-------|------|-------|
| **Class A** | 10.0.0.0 - 10.255.255.255 | 10.0.0.0/8 | 16,777,216 |
| **Class B** | 172.16.0.0 - 172.31.255.255 | 172.16.0.0/12 | 1,048,576 |
| **Class C** | 192.168.0.0 - 192.168.255.255 | 192.168.0.0/16 | 65,536 |

### Special IP Addresses

| Address | Purpose |
|---------|---------|
| `0.0.0.0` | Default route / Any address |
| `127.0.0.1` | Loopback / localhost |
| `169.254.0.0/16` | Link-local (APIPA) |
| `224.0.0.0/4` | Multicast |
| `255.255.255.255` | Broadcast |

### Subnet Calculation

```bash
# Using ipcalc
sudo apt install ipcalc
ipcalc 192.168.1.0/24

# Output:
# Address:   192.168.1.0
# Netmask:   255.255.255.0 = 24
# Wildcard:  0.0.0.255
# Network:   192.168.1.0/24
# HostMin:   192.168.1.1
# HostMax:   192.168.1.254
# Broadcast: 192.168.1.255
# Hosts/Net: 254

# Using sipcalc
sudo apt install sipcalc
sipcalc 192.168.1.0/24
```

### Subnetting Example

**Original Network: 192.168.1.0/24 (254 hosts)**

Split into 4 subnets (/26 = 62 hosts each):

```
Subnet 1: 192.168.1.0/26    (192.168.1.1 - 192.168.1.62)
Subnet 2: 192.168.1.64/26   (192.168.1.65 - 192.168.1.126)
Subnet 3: 192.168.1.128/26  (192.168.1.129 - 192.168.1.190)
Subnet 4: 192.168.1.192/26  (192.168.1.193 - 192.168.1.254)
```

### Network Configuration

**Ubuntu/Debian (netplan)**
```yaml
# /etc/netplan/01-netcfg.yaml
network:
  version: 2
  ethernets:
    eth0:
      addresses:
        - 192.168.1.10/24
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```

**CentOS/RHEL (NetworkManager)**
```bash
# /etc/sysconfig/network-scripts/ifcfg-eth0
BOOTPROTO=static
IPADDR=192.168.1.10
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=8.8.8.8
DNS2=8.8.4.4
```

---

## Practical Examples

### Complete Server Setup

**Scenario:** Setting up a web server with database

```bash
# 1. Configure firewall (UFW)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
# Allow database only from application server
sudo ufw allow from 192.168.1.100 to any port 3306
sudo ufw enable

# 2. Check open ports
sudo netstat -tuln | grep LISTEN
# or
sudo ss -tuln | grep LISTEN

# 3. Verify firewall rules
sudo ufw status numbered
```

### Docker Container Networking

```bash
# Create custom network with subnet
docker network create --subnet=172.20.0.0/16 mynetwork

# Run container with specific IP
docker run -d --network mynetwork --ip 172.20.0.10 nginx

# Expose ports
docker run -d -p 8080:80 nginx  # Host:Container
```

### Kubernetes Service Ports

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
    - port: 80          # Service port
      targetPort: 8080  # Container port
      nodePort: 30080   # External port
```

### Cloud Security Groups (AWS Example)

```bash
# Allow HTTP from anywhere
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxx \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

# Allow SSH from specific IP
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxx \
  --protocol tcp \
  --port 22 \
  --cidr 203.0.113.5/32
```

---

## Troubleshooting

### Port Issues

```bash
# Check if port is open
nc -zv example.com 443
telnet example.com 443

# Find process using port
sudo lsof -i :8080
sudo fuser 8080/tcp

# Kill process on port
sudo fuser -k 8080/tcp

# Test port locally
nc -l 8080  # Listen on port
nc localhost 8080  # Connect to port
```

### Firewall Issues

```bash
# Check if firewall is blocking
sudo ufw status
sudo iptables -L -n -v

# Temporarily disable (testing only!)
sudo ufw disable
sudo iptables -F

# Watch firewall logs
sudo tail -f /var/log/ufw.log
sudo journalctl -u ufw -f
```

### NAT Issues

```bash
# Check IP forwarding
cat /proc/sys/net/ipv4/ip_forward  # Should be 1

# View NAT table
sudo iptables -t nat -L -n -v

# Check conntrack table
sudo conntrack -L

# Test connectivity
ping -c 4 8.8.8.8  # Test internet
ping -c 4 192.168.1.1  # Test gateway
```

### Network Issues

```bash
# Check network configuration
ip addr show
ip route show

# Test connectivity
ping -c 4 google.com

# Trace route
traceroute google.com
mtr google.com

# DNS lookup
nslookup example.com
dig example.com

# Check listening services
sudo netstat -tuln
sudo ss -tuln
```

---

## Security Best Practices

### 1. Port Security

✅ **Do:**
- Close unused ports
- Use non-standard ports for SSH (e.g., 2222 instead of 22)
- Implement port knocking for sensitive services
- Monitor open ports regularly

❌ **Don't:**
- Expose database ports to the internet
- Use default ports for everything
- Leave development ports open in production

### 2. Firewall Security

✅ **Do:**
- Enable firewall on all servers
- Use whitelist approach (deny all, allow specific)
- Log dropped packets
- Regularly review rules

❌ **Don't:**
- Use `ufw allow all` or overly permissive rules
- Disable firewall for "easier troubleshooting"
- Forget to enable firewall after configuration

### 3. Network Segmentation

✅ **Do:**
- Separate public-facing and internal services
- Use VLANs or subnets for different departments
- Isolate databases and sensitive data
- Implement DMZ for web servers

❌ **Don't:**
- Put everything on the same network
- Allow direct internet access to databases
- Mix production and development networks

---

## Quick Reference Commands

```bash
# Ports
netstat -tuln              # View all ports
lsof -i :80                # Check specific port
ss -tuln                   # Modern netstat alternative

# UFW
sudo ufw status            # Check status
sudo ufw allow 80          # Allow port
sudo ufw deny 23           # Deny port
sudo ufw delete allow 80   # Remove rule

# iptables
sudo iptables -L           # List rules
sudo iptables -A INPUT     # Append rule
sudo iptables -D INPUT 1   # Delete rule
sudo iptables-save         # Save rules

# NAT
echo 1 > /proc/sys/net/ipv4/ip_forward  # Enable forwarding
iptables -t nat -L         # View NAT table
conntrack -L               # View connections

# Subnets
ipcalc 192.168.1.0/24      # Calculate subnet
ip addr show               # Show IP addresses
ip route show              # Show routing table
```

---

## Networking Tools Cheat Sheet

| Tool | Purpose |
|------|---------|
| `netstat` | Network statistics and connections |
| `ss` | Socket statistics (modern netstat) |
| `lsof` | List open files and ports |
| `nmap` | Network scanner |
| `tcpdump` | Packet analyzer |
| `wireshark` | GUI packet analyzer |
| `iptables` | Firewall configuration |
| `ufw` | Simplified firewall |
| `ip` | Network configuration |
| `ping` | Test connectivity |
| `traceroute` | Trace network path |
| `dig`/`nslookup` | DNS lookup |
| `curl`/`wget` | HTTP client |
| `nc` (netcat) | Network utility |

---

## Additional Resources

- [iptables Tutorial](https://www.frozentux.net/iptables-tutorial/iptables-tutorial.html)
- [UFW Documentation](https://help.ubuntu.com/community/UFW)
- [Subnet Calculator](https://www.subnet-calculator.com/)
- [CIDR.xyz](https://cidr.xyz/) - Interactive CIDR calculator
- [RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918) - Private IP addresses

---
