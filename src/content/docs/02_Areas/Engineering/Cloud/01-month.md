---
title: 01-Month CE
description: The first month of a structured 12-month roadmap to become an industry-ready Cloud Engineer, focusing on foundational skills and concepts.
aliaes:
---

Below is a **clean, end-to-end explanation** that ties all the topics you listed together, finishing with **how a browser request becomes a response** on a Linux server.

## 1. Linux basics (server side foundations)

### Filesystem, permissions, users

* Linux has a **single filesystem tree** (`/`)
Key directories (what matters in real systems)
`/etc` – Configuration (❗critical)

- Plain-text configs for almost everything

- Examples:
  - `/etc/nginx/`
  - `/etc/ssh/sshd_config`
  - `/etc/systemd/system/`

- Cloud reality:
  - Often templated by:
    - [cloud-init](https://cloudinit.readthedocs.io/en/latest/)
    - [Ansible](https://docs.ansible.com/)
    - [Terraform](https://www.terraform.io/) + [User Data Scripts](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#user_data)
- Failure pattern:
  - Bad config → service won’t start
  - Diagnosed via systemctl status + logs

`/var` – Variable data
- `/var/log` → logs
- `/var/lib` → runtime state (databases, Docker, Kubernetes)
- `/var/cache` → cached data
Why cloud engineers care

- `/var` can grow uncontrollably
- Full disk = outages
- Log rotation is mandatory [How to do it?](/02_areas/engineering/cloud-/log-rotation/)

`/usr` – Installed software

`/home`
- Human users
- Usually irrelevant in production
- Many prod servers:
  - No SSH users
  Or only one automation user
  
`/tmp` and `/run`
- Temporary and runtime files
- `/run` is memory-backed (clears on reboot)

* Permissions:

  * `rwx` for **owner / group / others**
  * Example: `-rw-r--r--`
* Users & groups:

  * Services usually run as **non-root users** (`www-data`, `nginx`)
  * Root is all-powerful → avoid using it directly

---

### Processes, systemd, logs

* A **process** = running program
* [systemd](https://wiki.archlinux.org/title/Systemd) manages processes:

  * Starts services at boot
  * Manages restarts and dependencies
* Common commands:

  * `systemctl status nginx`
  * `systemctl restart ssh`
* Logs:

  * `journalctl -u nginx`
  * `/var/log/syslog`
  * `/var/log/nginx/access.log`

---

## 2. Remote access & file transfer

### SSH

* [Quick Reference](/02_areas/engineering/tooling/ssh/) 
* Secure remote shell (TCP port **22**)
* Uses public/private key auth
* Example:

  ```bash
  ssh user@server_ip
  ```

### SCP / rsync

* [Copy files over SSH](/02_areas/engineering/tooling/ssh/#scp-secure-copy)
* `scp` → simple copy
* `rsync` → efficient, incremental

  ```bash
  rsync -av site/ user@server:/var/www/html/
  ```

---

## 3. Networking fundamentals

[Networking Fundamentals](/02_areas/engineering/cloud-/networking/)
### TCP/IP

* **IP**: addressing (who)
* **TCP**: reliable delivery (how)
* **UDP**: fast, no guarantees

### DNS

* Converts domain → IP
* Example:

  ```bash
  ping example.com
  ```

### HTTP / HTTPS

* **HTTP**: plaintext
* **HTTPS**: HTTP over [TLS](/02_areas/engineering/cloud-/tls/) (encrypted)
* Methods: `GET`, `POST`, `PUT`, `DELETE`

---

### Ports, firewalls, NAT, subnets

* **Port** = service endpoint

  * 22 → SSH
  * 80 → HTTP
  * 443 → HTTPS
* **Firewall**:

  * `ufw`, `iptables`
  * Controls allowed traffic
* **NAT**:

  * Translates private → public IPs
* **Subnet**:

  * Logical IP grouping (e.g. `192.168.1.0/24`)

---

## 4. Practical setup you listed

### Install Ubuntu (VM or bare metal)

* VM (VirtualBox, VMware, KVM) is safer for learning
* Gets:

  * Private IP
  * Virtual NIC
  * NAT or bridged networking

---

### SSH into VM from host

1. VM gets IP:

   ```bash
   ip a
   ```
2. SSH from host:

   ```bash
   ssh user@vm_ip
   ```

---

### Host a simple Nginx web server

```bash
sudo apt install nginx
sudo systemctl start nginx
```

* Web root: `/var/www/html`
* Config:

  * `/etc/nginx/nginx.conf`
  * `/etc/nginx/sites-enabled/`

---

### Break & fix network configs (great exercise)

Examples:

* Block port 80 in firewall → site stops loading
* Break DNS (`/etc/resolv.conf`)
* Misconfigure default gateway
* Stop nginx process

---

## 5. **End-to-end: Browser → Server → Response**

This is the **big picture**.

---

### Step 1: User types URL

```text
https://example.com
```

---

### Step 2: DNS resolution

1. Browser checks cache
2. OS checks `/etc/hosts`
3. DNS query sent to resolver
4. Resolver returns **IP address**

---

### Step 3: TCP connection

* Browser opens TCP connection to:

  ```
  IP:443
  ```
* 3-way handshake:

  * SYN
  * SYN-ACK
  * ACK

---

### Step 4: TLS handshake (HTTPS only)

* Server proves identity (certificate)
* Encryption keys negotiated

---

### Step 5: HTTP request sent

```http
GET /index.html HTTP/1.1
Host: example.com
User-Agent: Firefox
```

---

### Step 6: Server networking stack (Linux)

1. Packet hits **NIC**
2. Kernel:

   * Checks firewall rules
   * Routes packet
   * Delivers to listening socket

---

### Step 7: Nginx receives request

* Nginx is:

  * Running as a process
  * Listening on port 443
* It:

  * Matches request to server block
  * Reads files or forwards to app (PHP, backend)

---

### Step 8: File access & permissions

* Nginx reads:

  ```text
  /var/www/html/index.html
  ```
* Kernel checks:

  * User (`www-data`)
  * Permissions (`r--`)

---

### Step 9: Response generated

```http
HTTP/1.1 200 OK
Content-Type: text/html
```

---

### Step 10: Response travels back

* Same path, reversed:

  * Nginx → kernel → NIC → router → browser

---

### Step 11: Browser renders page

* HTML → DOM
* CSS → layout
* JS → execution

---

## How everything connects

* **Linux permissions** protect files
* **systemd** keeps services running
* **TCP/IP & DNS** move data
* **Firewalls** control access
* **Nginx** serves content
* **Logs** explain failures
* **SSH** lets you fix it all remotely

---
