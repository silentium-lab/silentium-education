# Docker Swarm Deployment

This guide explains how to deploy the Silentium Education application to a Docker Swarm cluster.

## Prerequisites

- Docker Swarm initialized on your cluster
- Docker registry access (optional, for production)

## Files Created

- `server/Dockerfile` - Multi-stage build for the Node.js backend
- `client/Dockerfile` - Multi-stage build for the frontend with Nginx
- `client/nginx.conf` - Nginx configuration with API proxy
- `docker-compose.swarm.yaml` - Swarm stack configuration
- `deploy-swarm.sh` - Deployment script

## Deployment

1. Initialize Docker Swarm if not already done:
   ```bash
   docker swarm init
   ```

2. Run the deployment script:
   ```bash
   ./deploy-swarm.sh
   ```

   This will:
   - Create Docker secrets for MongoDB credentials
   - Build the backend and frontend images
   - Deploy the stack to Swarm

## Services

- **frontend**: 2 replicas on port 80, serves the React app and proxies API calls
- **backend**: 2 replicas on port 4000 (internal), Node.js API server
- **mongodb**: 1 replica on manager node, MongoDB database

## Monitoring

Check the status of your services:
```bash
docker stack ps silentium-education
docker stack services silentium-education
```

View logs:
```bash
docker service logs silentium-education_backend
docker service logs silentium-education_frontend
```

## Scaling

Scale services as needed:
```bash
docker service scale silentium-education_backend=3
docker service scale silentium-education_frontend=3
```

## Secrets

MongoDB credentials are stored as Docker secrets. To update them:
```bash
echo "newusername" | docker secret create mongo_username -
echo "newpassword" | docker secret create mongo_password -
```

Then redeploy the stack.

## Networking

Services communicate over an overlay network `app-network`. The frontend is exposed on port 80.

## Production Considerations

- Use a proper Docker registry for image storage
- Configure external load balancer
- Set up monitoring and logging
- Configure persistent volumes for MongoDB data
- Use environment-specific secrets management
