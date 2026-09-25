#!/bin/sh
set -eu
if [ "${RAILWAY_VOLUME_MOUNT_PATH:-}" != /app/data ]; then
    echo 'NOFX requires a persistent Railway volume at /app/data.' >&2
    exit 1
fi
export PORT=${PORT:-8080}
export ATLAS_PAPER_ONLY=true
umask 077
mkdir -p /app/data/keys
test -f /app/data/keys/rsa.pem || openssl genrsa -traditional -out /app/data/keys/rsa.pem 2048 2>/dev/null
test -f /app/data/keys/aes || openssl rand -base64 32 > /app/data/keys/aes
test -f /app/data/keys/jwt || openssl rand -base64 48 > /app/data/keys/jwt
export RSA_PRIVATE_KEY="${RSA_PRIVATE_KEY:-$(cat /app/data/keys/rsa.pem)}"
export DATA_ENCRYPTION_KEY="${DATA_ENCRYPTION_KEY:-$(cat /app/data/keys/aes)}"
export JWT_SECRET="${JWT_SECRET:-$(cat /app/data/keys/jwt)}"

cat > /etc/nginx/http.d/default.conf << NGINX_EOF
server {
    listen $PORT;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    client_max_body_size 20m;
    location / { try_files \$uri \$uri/ /index.html; }
    location /api/ {
        proxy_pass http://127.0.0.1:8081/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_buffering off;
        proxy_read_timeout 300s;
    }
    location = /health {
        proxy_pass http://127.0.0.1:8081/api/health;
    }
}
NGINX_EOF

API_SERVER_PORT=8081 /app/nofx &
backend_pid=$!
nginx -g 'daemon off;' &
frontend_pid=$!
cleanup() { kill "$backend_pid" "$frontend_pid" 2>/dev/null || true; }
trap 'cleanup; exit 0' TERM INT
# A healthy static page must not hide a failed backend.
while kill -0 "$backend_pid" 2>/dev/null && kill -0 "$frontend_pid" 2>/dev/null; do
    sleep 2
done
cleanup
exit 1
