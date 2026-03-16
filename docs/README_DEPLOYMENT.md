# 🚀 Deployment Guide — Lucky Cruise Voyage (VPS)

> Complete guide for deploying to Hostinger KVM VPS at `187.77.144.38`

---

## Server Info

| Field | Value |
|---|---|
| **Server IP** | 187.77.144.38 |
| **SSH** | `root@187.77.144.38` |
| **Domain** | https://luckytoursandtravels.com |
| **GitHub** | https://github.com/digiwebdex/lucky-cruise-voyage-c35dac8f.git |
| **Project Dir** | `/var/www/lucky-cruise-voyage` |
| **Backend Port** | 4001 |
| **DB Port** | 5433 (external) / 5432 (internal) |

---

## Prerequisites

```bash
# SSH into VPS
ssh root@187.77.144.38

# Install required packages (if not present)
apt update && apt install -y nginx nodejs npm postgresql git certbot python3-certbot-nginx

# Install Node.js 20 (if needed)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify
node --version   # Should be 20+
npm --version
psql --version   # Should be 14+
```

---

## Step 1: Clone Project

```bash
mkdir -p /var/www/lucky-cruise-voyage
cd /var/www/lucky-cruise-voyage
git clone https://github.com/digiwebdex/lucky-cruise-voyage-c35dac8f.git .
```

---

## Step 2: Setup Database

```bash
# Create PostgreSQL user and database
sudo -u postgres psql

CREATE USER lucky_user WITH PASSWORD 'YOUR_SECURE_PASSWORD';
CREATE DATABASE lucky_cruise_db OWNER lucky_user;
GRANT ALL PRIVILEGES ON DATABASE lucky_cruise_db TO lucky_user;
\q

# Run migration
cd /var/www/lucky-cruise-voyage
PGPASSWORD='YOUR_SECURE_PASSWORD' psql -h localhost -U lucky_user -d lucky_cruise_db -f database/schema.sql
PGPASSWORD='YOUR_SECURE_PASSWORD' psql -h localhost -U lucky_user -d lucky_cruise_db -f database/seed.sql
```

---

## Step 3: Setup Backend

```bash
cd /var/www/lucky-cruise-voyage/backend

# Create .env file
cp .env.example .env
nano .env
# Edit: DB_PASSWORD, JWT_SECRET, BACKEND_URL, FRONTEND_URL

# Install dependencies
npm install --production

# Test
node server.js
# Should show: ✅ Lucky Cruise API running on port 4001
# Ctrl+C to stop
```

---

## Step 4: Build Frontend

```bash
cd /var/www/lucky-cruise-voyage

# Install dependencies
npm install

# Build for production
npm run build
# Output: dist/ directory
```

---

## Step 5: Setup PM2 (Process Manager)

```bash
npm install -g pm2

# Start backend
cd /var/www/lucky-cruise-voyage/backend
pm2 start server.js --name lucky-cruise-api

# Save PM2 config
pm2 save
pm2 startup
```

---

## Step 6: Nginx Configuration

```bash
nano /etc/nginx/sites-available/luckytoursandtravels.com
```

Paste:

```nginx
# Frontend
server {
    listen 80;
    server_name luckytoursandtravels.com www.luckytoursandtravels.com;

    root /var/www/lucky-cruise-voyage/dist;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:4001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploaded files
    location /uploads/ {
        proxy_pass http://127.0.0.1:4001/uploads/;
    }

    # Static asset caching
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

Enable and test:

```bash
ln -sf /etc/nginx/sites-available/luckytoursandtravels.com /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## Step 7: SSL Certificate

```bash
certbot --nginx -d luckytoursandtravels.com -d www.luckytoursandtravels.com
# Follow prompts, select redirect HTTP to HTTPS
```

---

## Step 8: Verify

```bash
# Check backend
curl http://localhost:4001/api/health

# Check frontend
curl https://luckytoursandtravels.com

# Check PM2 processes
pm2 status

# Check logs
pm2 logs lucky-cruise-api
```

---

## Maintenance Commands

```bash
# Update code
cd /var/www/lucky-cruise-voyage
git pull origin main
npm install && npm run build
cd backend && npm install
pm2 restart lucky-cruise-api
systemctl reload nginx

# View logs
pm2 logs lucky-cruise-api --lines 100

# Database backup
pg_dump -h localhost -U lucky_user lucky_cruise_db > /var/www/lucky-cruise-voyage/backup/db_$(date +%Y%m%d).sql

# Restart services
pm2 restart lucky-cruise-api
systemctl restart nginx
systemctl restart postgresql
```

---

## Ports Used

| Service | Port | Notes |
|---|---|---|
| Frontend (Nginx) | 80/443 | Serves dist/ + proxies /api |
| Backend API | 4001 | Express.js |
| PostgreSQL | 5432 | Local only |

**No conflicts with existing sites** — each site uses its own Nginx config and project directory.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| 502 Bad Gateway | Check `pm2 status`, restart backend |
| DB connection failed | Verify `.env` credentials, check `systemctl status postgresql` |
| Permission denied | `chown -R www-data:www-data /var/www/lucky-cruise-voyage/dist` |
| SSL cert expired | `certbot renew` |
| Port conflict | Change PORT in `.env`, update nginx proxy_pass |
