#!/bin/bash

# Deploy to Docker Swarm

set -e

# Create secrets
echo "admin" | docker secret create mongo_username -
echo "password" | docker secret create mongo_password -

# Build and push images (assuming registry is available, e.g., dockerhub)
# For local testing, you can skip push and use local images

# Build backend
docker build -t silentium-education-backend:latest ./server

# Build frontend
docker build -t silentium-education-frontend:latest ./client

# Deploy stack
docker stack deploy -c docker-compose.swarm.yaml silentium-education

echo "Deployment complete. Check status with: docker stack ps silentium-education"
