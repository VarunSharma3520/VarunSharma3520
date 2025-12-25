---
title: OOM Killer
description: A comprehensive guide to understanding, diagnosing, and mitigating Linux OOM (Out Of Memory) killer issues in cloud environments.
---

## What is the OOM Killer in Linux?

The OOM (Out Of Memory) killer is a Linux kernel mechanism that protects the system from crashing due to critically low memory by selecting and terminating (killing) one or more processes that consume the most memory, freeing resources so the system can remain operational. It assigns scores to processes, prioritizing those that are memory hogs, and when memory is exhausted, it sacrifices them to prevent total system failure, often indicated by logs showing `Killed process` messages or `OOMKilled` errors in containers.

---

## How It Works

### Memory Overcommit
Linux allows allocating more memory than physically available, assuming not all processes use it at once.

### Trigger
When too many processes demand their allocated memory, the system runs out of physical RAM and swap space.

### Scoring
The OOM killer calculates a score for each process based on memory usage, prioritizing those that are good candidates for termination.

### Termination
It sends signals (like `SIGKILL`) to the highest-scoring process, killing it and releasing its memory.

---

## Common Causes

### Memory Leaks
Applications with bugs that continuously consume memory without releasing it.

### High Traffic
Websites or services receiving unexpected surges in users or bots that overwhelm available resources.

### Resource-Intensive Tasks
Compiling large software projects or running memory-hungry applications like databases, data processing tools, or machine learning frameworks.

### Misconfiguration
Over-allocation of resources (e.g., to Jenkins, databases, container limits) leaving no room for system processes.

---

## How to Deal with OOM Issues

### 1. Check Logs
Use the following commands to find out which process was killed and when:

```bash
# Check system logs for OOM killer messages
dmesg | grep -i "killed process"

# Check kernel logs
grep -i "out of memory" /var/log/kern.log

# For systemd-based systems
journalctl -k | grep -i "killed process"
```

### 2. Monitor Memory Usage
Identify memory-hungry processes with these tools:

```bash
# Real-time process monitoring
top

# Alternative with better UI
htop

# Detailed memory usage per process
ps aux --sort=-%mem | head -n 10

# System-wide memory statistics
free -h

# Virtual memory statistics
vmstat 1

# Continuous monitoring
watch -n 1 free -h
```

### 3. Increase Resources
**Add More RAM:**
- Physical RAM upgrade (hardware)
- Increase VM/container memory limits

**Add Swap Space:**
```bash
# Check current swap
swapon --show

# Create a swap file (4GB example)
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make it permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 4. Optimize Applications
**Tune Configurations:**
- Reduce memory limits for applications (Java heap size, database buffers)
- Optimize connection pools and cache sizes
- Configure proper resource limits in containerized environments

**Fix Memory Leaks:**
- Profile applications to identify leaks
- Update to patched versions
- Review and fix application code

### 5. Adjust OOM Score
Use `oom_score_adj` to make critical processes less likely to be killed (or more likely):

```bash
# Check current OOM score for a process
cat /proc/<PID>/oom_score
cat /proc/<PID>/oom_score_adj

# Make a process less likely to be killed (-1000 to 1000)
# Lower values = less likely to be killed
echo -500 | sudo tee /proc/<PID>/oom_score_adj

# Make a process more likely to be killed
echo 500 | sudo tee /proc/<PID>/oom_score_adj

# Protect a critical process (requires root)
echo -1000 | sudo tee /proc/<PID>/oom_score_adj
```

**Permanent Configuration:**
Create a systemd service override:
```bash
sudo systemctl edit myservice.service
```

Add:
```ini
[Service]
OOMScoreAdjust=-500
```

---

## Prevention Strategies

### 1. Set Resource Limits
Use cgroups and systemd to limit memory usage:

```bash
# For systemd services
[Service]
MemoryLimit=2G
MemoryMax=2G
```

### 2. Monitor Proactively
Set up monitoring and alerting:
- Prometheus + Grafana
- Nagios/Zabbix
- Cloud provider monitoring (CloudWatch, Azure Monitor)

### 3. Container Best Practices
For Docker/Kubernetes:

```bash
# Docker memory limit
docker run --memory="1g" --memory-swap="2g" myimage

# Kubernetes pod limits
resources:
  limits:
    memory: "1Gi"
  requests:
    memory: "512Mi"
```

### 4. Configure Overcommit Settings
```bash
# Check current setting
cat /proc/sys/vm/overcommit_memory

# 0 = heuristic (default)
# 1 = always overcommit
# 2 = never overcommit beyond swap + overcommit_ratio

# Set to never overcommit
echo 2 | sudo tee /proc/sys/vm/overcommit_memory
```

---

## Troubleshooting Checklist

- [ ] Check logs for OOM killer activity
- [ ] Identify which process was killed
- [ ] Monitor current memory usage patterns
- [ ] Review application configurations
- [ ] Check for memory leaks
- [ ] Verify resource limits are appropriate
- [ ] Consider adding more RAM or swap
- [ ] Adjust OOM scores for critical processes
- [ ] Set up proactive monitoring and alerts
- [ ] Document the incident and resolution

---

## Additional Resources

- [cPanel: What is the OOM Killer](https://support.cpanel.net/hc/en-us/articles/360052914574-What-is-the-OOM-Killer)
- [CloudBees: Process Killed by OOM Killer](https://docs.cloudbees.com/docs/cloudbees-ci-kb/latest/client-and-managed-controllers/process-killed-by-oom-killer)
- [Oracle: Understanding the Linux OOM Killer](https://www.oracle.com/technical-resources/articles/it-infrastructure/dev-oom-killer.html)
- [Kubernetes OOMKilled Error Guide](https://lumigo.io/kubernetes-troubleshooting/kubernetes-oomkilled-error-how-to-fix-and-tips-for-preventing-it/)
- [Wikipedia: Out of Memory](https://en.wikipedia.org/wiki/Out_of_memory)

---

## Quick Reference Commands

```bash
# View OOM killer logs
dmesg | grep -i oom

# Check memory usage
free -h
top
htop

# Monitor specific process
ps aux | grep <process_name>

# Check OOM scores
cat /proc/*/oom_score | sort -n

# Find high memory processes
ps aux --sort=-%mem | head

# Check swap usage
swapon --show
cat /proc/swaps
```

---

**Note:** Always test configuration changes in a non-production environment first, and maintain proper backups before making system-level changes.