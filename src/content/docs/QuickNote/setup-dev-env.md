---
title: Setup docker dev environment
description: A reference page for setting up docker dev enviroment.
---

# 🎯 Your Goal:

✅ Use only prebuilt images

🚫 No Dockerfile

✅ Use volumes

✅ Still provide a productive developer experience

## Initial Setup

1. Download Docker 
2. Make a file in current working directory `docker-compose.yml`
3. Copy service specific example
4. Open terminal and execute to connect host terminal to container
5. Now You are ready to go
6. Recommended VS Code Extension
    - [Remote Container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers&ssr=false#review-details)
    - [Docker DX](https://marketplace.visualstudio.com/items?itemName=docker.docker&ssr=false#review-details)
    - [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker&ssr=false#review-details)

```bash
docker exec -it cont_name /bin/bash
```

## For NodeJS

```docker
version: '3.9'

services:
  nodeApp:                                             # Service name
    image: node:latest                                 # Use the latest official Node.js image
    container_name: node_cont                          # Name of the container
    working_dir: /app                                  # Set the working directory inside the container
    volumes:
      - .:/app                                         # Mount current working directory to /app in the container
    ports:
      - '3000:3000'                                    # Expose port host:container (adjust as needed)
    command: sh -c "npm install && /bin/bash"          # Install dependencies and keep the container running
    stdin_open: true                                   # Keep STDIN open
    tty: true                                          # Allocate a pseudo-TTY

```

## For Python

```docker
version: '3.9'

services:
  bookReader:                                         # Define the service name
    image: python:latest                              # Use the latest Python image from Docker Hub
    container_name: cont_name                         # Name of the container
    working_dir: /app                                 # Set the working directory inside the container
    volumes:
      - .:/app                                        # Mount the current working directory to /app in the container
    ports:
      - '8000:8000'                                   # Expose port host:container for the application
    command: sh -c "pip install uvicorn && /bin/bash" # Install uvicorn and keep the container running
    stdin_open: true                                  # the container will have an open STDIN stream when it is run
    tty: true                                         # keep the container running
```

## For MongoDB

```docker
version: '3.9'

services:
  mongodb:
    image: mongo:latest                                # Use the latest MongoDB image
    container_name: mongodb_cont                       # Name your container
    ports:
      - '27017:27017'                                  # Expose MongoDB's default port
    volumes:
      - mongo_data:/data/db                            # Persist MongoDB data
    environment:
      MONGO_INITDB_ROOT_USERNAME: root                 # Root username
      MONGO_INITDB_ROOT_PASSWORD: example              # Root password
    stdin_open: true
    tty: true

volumes:
  mongo_data:
```

### 🔑 Default Credentials

| Key      | Value   |
| -------- | ------- |
| Username | root    |
| Password | example |
| Port     | 27017   |

## For PosgressSQL

```docker
version: '3.9'

services:
  postgres:
    image: postgres:latest                              # Official PostgreSQL image
    container_name: postgres_cont                       # Name your container
    ports:
      - '5432:5432'                                     # Expose default PostgreSQL port
    environment:
      POSTGRES_USER: user                               # DB username
      POSTGRES_PASSWORD: password                       # DB password
      POSTGRES_DB: appdb                                # Default DB to create
    volumes:
      - postgres_data:/var/lib/postgresql/data          # Persist database data
    stdin_open: true
    tty: true

volumes:
  postgres_data:
```

### 🔑 Default Credentials

| Key      | Value       |
| -------- | ----------- |
| User     | user        |
| Password | password    |
| Database | appdb       |
| Port     | (host) 5432 |

## For MySQL

```docker
version: '3.9'

services:
  mysql:
    image: mysql:latest                                 # Official MySQL image
    container_name: mysql_cont                          # Name your container
    ports:
      - '3306:3306'                                     # Default MySQL port
    environment:
      MYSQL_ROOT_PASSWORD: rootpass                     # Root password
      MYSQL_DATABASE: appdb                             # Initial database
      MYSQL_USER: user                                  # Optional non-root user
      MYSQL_PASSWORD: password                          # Password for non-root user
    volumes:
      - mysql_data:/var/lib/mysql                       # Persist MySQL data
    stdin_open: true
    tty: true

volumes:
  mysql_data:
```

🔑 Default Credentials

| Key               | Value    |
| ----------------- | -------- |
| Root user         | root     |
| Root password     | rootpass |
| Database          | appdb    |
| App user          | user     |
| App user password | password |
| Port (host)       | 3306     |
