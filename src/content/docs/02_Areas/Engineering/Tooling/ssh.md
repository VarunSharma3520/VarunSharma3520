---
title: "SSH - Engineering Tooling"
description: "Guide on using SSH for secure remote access and file transfer."
---

# SSH Command Cheat Sheet & Quick Reference

> This quick reference cheat sheet provides various commands and examples for using SSH (Secure Shell).

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Connecting](#connecting)
  - [Executing Commands](#executing-commands)
  - [SCP (Secure Copy)](#scp-secure-copy)
  - [Config Location](#config-location)
  - [SCP Options](#scp-options)
  - [Config Sample](#config-sample)
  - [ProxyJump](#proxyjump)
  - [ssh-copy-id](#ssh-copy-id)
- [SSH Keygen](#ssh-keygen)
  - [Generating Keys](#generating-keys)
  - [Key Types](#key-types)
  - [Managing known_hosts](#managing-known_hosts)
  - [Key Formats](#key-formats)
- [Additional Resources](#additional-resources)

---

## Getting Started

### Connecting

**Connect to a server (default port 22)**
```bash
ssh user@server_address
```

**Connect on a specific port**
```bash
ssh user@server_address -p 6222
```

**Connect via PEM file (requires 0400 permissions)**
```bash
ssh -i /path/to/file.pem user@server_address
```

> 💡 **Tip:** See [SSH Permissions](https://quickref.me/chmod#ssh-permissions) for proper file permission settings.

---

### Executing Commands

**Execute a remote command**
```bash
ssh user@server_address 'ls -l'
```

**Invoke a local script on remote server**
```bash
ssh user@server_address bash < script.sh
```

**Compress and download from a server**
```bash
ssh user@server_address "tar cvzf - ~/source" > output.tgz
```

---

### SCP (Secure Copy)

**Copy from remote to local**
```bash
scp user@server:/dir/file.ext dest/
```

**Copy between two servers**
```bash
scp user@server:/file user@server:/dir
```

**Copy from local to remote**
```bash
scp dest/file.ext user@server:/dir
```

**Copy a whole folder**
```bash
scp -r user@server:/dir dest/
```

**Copy all files from a folder**
```bash
scp user@server:/dir/* dest/
```

**Copy from a server folder to the current folder**
```bash
scp user@server:/dir/* .
```

---

### Config Location

| File Path | Description |
|-----------|-------------|
| `/etc/ssh/ssh_config` | System-wide config |
| `~/.ssh/config` | User-specific config |
| `~/.ssh/id_{type}` | Private key |
| `~/.ssh/id_{type}.pub` | Public key |
| `~/.ssh/known_hosts` | Logged in host |
| `~/.ssh/authorized_keys` | Authorized login key |

---

### SCP Options

| Option | Description |
|--------|-------------|
| `scp -r` | Recursively copy entire directories |
| `scp -C` | Compresses data |
| `scp -v` | Prints verbose info |
| `scp -P 8080` | Uses a specific port |
| `scp -B` | Batch mode _(Prevents password prompt)_ |
| `scp -p` | Preserves times and modes |

---

### Config Sample

Create a configuration file at `~/.ssh/config`:

```ssh-config
Host server1 
    HostName 192.168.1.5
    User root
    Port 22
    IdentityFile ~/.ssh/server1.key
```

**Launch by alias**
```bash
ssh server1
```

> 📚 **Reference:** See full [Config Options](https://linux.die.net/man/5/ssh_config)

---

### ProxyJump

**Jump through a single proxy host**
```bash
ssh -J proxy_host1 remote_host2
```

**Jump with specific user**
```bash
ssh -J user@proxy_host1 user@remote_host2
```

**Multiple jumps**
```bash
ssh -J user@proxy_host1:port1,user@proxy_host2:port2 user@remote_host3
```

---

### ssh-copy-id

**Copy your public key to a server**
```bash
ssh-copy-id user@server
```

**Copy to an alias server**
```bash
ssh-copy-id server1
```

**Copy a specific key**
```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server
```

---

## SSH Keygen

### Generating Keys

**Generate an RSA 4096-bit key with email as a comment**
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

| Option | Description |
|--------|-------------|
| `-t` | [Type](#key-types) of key |
| `-b` | The number of bits in the key |
| `-C` | Provides a new comment |

---

**Generate a key interactively**
```bash
ssh-keygen
```

**Specify filename**
```bash
ssh-keygen -f ~/.ssh/filename
```

**Generate public key from private key**
```bash
ssh-keygen -y -f private.key > public.pub
```

**Change comment**
```bash
ssh-keygen -c -f ~/.ssh/id_rsa
```

**Change private key passphrase**
```bash
ssh-keygen -p -f ~/.ssh/id_rsa
```

---

### Key Types

- `rsa` - RSA algorithm (most common)
- `ed25519` - EdDSA algorithm (recommended for new keys)
- `dsa` - DSA algorithm (deprecated)
- `ecdsa` - ECDSA algorithm

---

### Managing known_hosts

**Search from known_hosts**
```bash
ssh-keygen -F <ip/hostname>
```

**Remove from known_hosts**
```bash
ssh-keygen -R <ip/hostname>
```

---

### Key Formats

- **PEM** - Privacy-Enhanced Mail format
- **PKCS8** - Public-Key Cryptography Standards #8

---

## Common SSH Configuration Examples

### Basic Host Configuration
```ssh-config
Host myserver
    HostName example.com
    User myuser
    Port 2222
    IdentityFile ~/.ssh/myserver_key
```

### Multiple Hosts with Wildcards
```ssh-config
Host *.example.com
    User admin
    IdentityFile ~/.ssh/admin_key
    
Host dev-*
    User developer
    Port 2222
```

### Jump Host Configuration
```ssh-config
Host jumphost
    HostName jump.example.com
    User jumper
    
Host internal-server
    HostName 10.0.0.50
    User root
    ProxyJump jumphost
```

### Disable Host Key Checking (Use with Caution)
```ssh-config
Host test-server
    HostName test.example.com
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
```

---

## Troubleshooting

### Common Issues and Solutions

**Connection Timeout**
```bash
# Increase connection timeout
ssh -o ConnectTimeout=30 user@server
```

**Permission Denied (publickey)**
```bash
# Check key permissions (should be 600 for private key, 644 for public key)
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# Verify SSH agent
ssh-add -l
ssh-add ~/.ssh/id_rsa
```

**Too Many Authentication Failures**
```bash
# Specify exact identity file to use
ssh -o IdentitiesOnly=yes -i ~/.ssh/specific_key user@server
```

**Debug Connection Issues**
```bash
# Verbose output (use -vv or -vvv for more verbosity)
ssh -v user@server
```

---

## Security Best Practices

### 1. Use Strong Keys
```bash
# Generate ED25519 key (recommended)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Or RSA with 4096 bits
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### 2. Set Proper Permissions
```bash
# SSH directory
chmod 700 ~/.ssh

# Private keys
chmod 600 ~/.ssh/id_*

# Public keys
chmod 644 ~/.ssh/*.pub

# authorized_keys file
chmod 600 ~/.ssh/authorized_keys

# config file
chmod 600 ~/.ssh/config
```

### 3. Use SSH Agent
```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_rsa

# List loaded keys
ssh-add -l

# Remove all keys from agent
ssh-add -D
```

### 4. Disable Password Authentication
Edit `/etc/ssh/sshd_config` on the server:
```
PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no
```

Then restart SSH service:
```bash
sudo systemctl restart sshd
```

---

## Advanced SSH Techniques

### Port Forwarding (SSH Tunneling)

**Local Port Forwarding**
```bash
# Forward local port 8080 to remote port 80
ssh -L 8080:localhost:80 user@server
```

**Remote Port Forwarding**
```bash
# Forward remote port 8080 to local port 3000
ssh -R 8080:localhost:3000 user@server
```

**Dynamic Port Forwarding (SOCKS Proxy)**
```bash
# Create SOCKS proxy on local port 1080
ssh -D 1080 user@server
```

### SSH Multiplexing

Configure in `~/.ssh/config`:
```ssh-config
Host *
    ControlMaster auto
    ControlPath ~/.ssh/sockets/%r@%h-%p
    ControlPersist 600
```

Create sockets directory:
```bash
mkdir -p ~/.ssh/sockets
```

### Keep SSH Sessions Alive

Add to `~/.ssh/config`:
```ssh-config
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

### SSH Escape Sequences

While in an SSH session:
- `~.` - Disconnect
- `~^Z` - Suspend SSH session
- `~?` - Show help for escape sequences

---

## Quick Command Reference

### Essential Commands
```bash
# Connect to server
ssh user@host

# Copy files
scp file.txt user@host:/path/

# Generate key pair
ssh-keygen -t ed25519

# Copy public key to server
ssh-copy-id user@host

# Check SSH service status
sudo systemctl status sshd

# Restart SSH service
sudo systemctl restart sshd
```

### File Transfer Alternatives
```bash
# rsync (more efficient than scp for large transfers)
rsync -avz /local/path/ user@host:/remote/path/

# sftp (interactive file transfer)
sftp user@host
```

---

## Additional Resources

- **Official Documentation**
  - [OpenSSH Manual Pages](https://www.openssh.com/manual.html)
  - [ssh_config Man Page](https://linux.die.net/man/5/ssh_config)
  
- **Tutorials & Guides**
  - [OpenSSH Config File Examples](https://www.cyberciti.biz/faq/create-ssh-config-file-on-linux-unix/)
  - [SSH Academy](https://www.ssh.com/academy/ssh)
  
- **Tools**
  - [ssh-audit](https://github.com/jtesta/ssh-audit) - SSH server auditing tool
  - [Mosh](https://mosh.org/) - Mobile Shell (alternative to SSH)

---

## Related Topics

- **Mitmproxy** - HTTP/HTTPS proxy tool
- **Netcat** - Networking utility for TCP/UDP connections
- **Netstat** - Network statistics and connections
- **Chmod** - File permissions management

---

**Source:** [QuickRef.ME](https://quickref.me/ssh.html)