#!/bin/sh
set -e

# Set default domain if not provided
DOMAIN=${DOMAIN:-localhost}

# Substitute environment variables in nginx config using sed
sed "s|\${DOMAIN}|${DOMAIN}|g" /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Execute the command
exec "$@"
