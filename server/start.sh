#!/bin/sh

# Read MongoDB password from secret
MONGO_PASSWORD=$(cat /run/secrets/mongo_password)

# Set environment variable
export MONGODB_URI="mongodb://admin:$MONGO_PASSWORD@mongodb:27017/myapp?authSource=admin"

# Start the application
exec npm run start:prod
