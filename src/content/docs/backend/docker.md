---
title: Docker Reference
description: A reference page for bash scripting.
---

[Docker cheatsheet from docker](https://docs.docker.com/get-started/docker_cheatsheet.pdf)

## Version Information

```bash
docker --version
docker version
docker info
````

## Help

```bash
docker --help
docker <command> --help
```

## Images

### List Images

```bash
docker images
```

### Pull Image

```bash
docker pull <image>
```

### Build Image

```bash
docker build -t <name>:<tag> .
```

### Remove Image

```bash
docker rmi <image>
```

### Tag Image

```bash
docker tag <image> <repository>:<tag>
```

### Push Image

```bash
docker push <repository>:<tag>
```

### Save Image to File

```bash
docker save -o <path> <image>
```

### Load Image from File

```bash
docker load -i <path>
```

## Containers

### List Running Containers

```bash
docker ps
```

### List All Containers

```bash
docker ps -a
```

### Run Container

```bash
docker run <image>
```

```bash
docker run -d <image>
```

```bash
docker run -it <image> /bin/bash
```

### Start Container

```bash
docker start <container>
```

### Stop Container

```bash
docker stop <container>
```

### Restart Container

```bash
docker restart <container>
```

### Remove Container

```bash
docker rm <container>
```

### Kill Container

```bash
docker kill <container>
```

### Pause Container

```bash
docker pause <container>
```

### Unpause Container

```bash
docker unpause <container>
```

### Rename Container

```bash
docker rename <old_name> <new_name>
```

### Attach to Running Container

```bash
docker attach <container>
```

### Exec Command in Container

```bash
docker exec -it <container> <command>
```

## Container Logs

### View Logs

```bash
docker logs <container>
```

### Follow Logs

```bash
docker logs -f <container>
```

### View Last N Lines of Logs

```bash
docker logs --tail <n> <container>
```

## Container Networking

### List Networks

```bash
docker network ls
```

### Create Network

```bash
docker network create <network>
```

### Inspect Network

```bash
docker network inspect <network>
```

### Connect Container to Network

```bash
docker network connect <network> <container>
```

### Disconnect Container from Network

```bash
docker network disconnect <network> <container>
```

### Remove Network

```bash
docker network rm <network>
```

## Volumes

### List Volumes

```bash
docker volume ls
```

### Create Volume

```bash
docker volume create <volume>
```

### Inspect Volume

```bash
docker volume inspect <volume>
```

### Remove Volume

```bash
docker volume rm <volume>
```

## Docker Compose

### Start Services

```bash
docker-compose up
```
### Start Services in background
```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

### Build Services

```bash
docker-compose build
```

### List Services

```bash
docker-compose ps
```

### View Logs

```bash
docker-compose logs
```

```bash
docker-compose logs -f
```

## Inspect and Stats

### Inspect Container

```bash
docker inspect <container>
```

### Container Stats

```bash
docker stats <container>
```

### Container Top

```bash
docker top <container>
```

## Clean Up

### Remove Stopped Containers

```bash
docker container prune
```

### Remove Unused Images

```bash
docker image prune
```

```bash
docker image prune -a
```

### Remove Unused Networks

```bash
docker network prune
```

### Remove Unused Volumes

```bash
docker volume prune
```

## System Commands

### Docker System Information

```bash
docker system info
```

### Docker System Prune (Clean up everything)

```bash
docker system prune
```

```bash
docker system prune -a
```

