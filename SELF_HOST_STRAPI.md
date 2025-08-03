# Self-Host Strapi CMS - Complete Setup Guide

## Overview
Deploy Strapi CMS on your own server (VPS, DigitalOcean, AWS, etc.) for full control and cost efficiency.

## Server Requirements
- **OS**: Ubuntu 20.04+ or CentOS 7+
- **RAM**: Minimum 1GB (2GB recommended)
- **Storage**: 10GB+ SSD
- **Node.js**: 18.x or 20.x
- **Database**: PostgreSQL (recommended) or MySQL

## Step 1: Server Setup

### Install Node.js
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
```

### Install PostgreSQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# CentOS/RHEL
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### Create Database
```bash
sudo -u postgres psql
CREATE DATABASE strapi_db;
CREATE USER strapi_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE strapi_db TO strapi_user;
\q
```

## Step 2: Deploy Strapi Files

### Upload Your Strapi Directory
```bash
# Upload your local strapi-cms/ folder to server
scp -r strapi-cms/ user@your-server-ip:/home/user/

# Or clone from GitHub
git clone https://github.com/your-username/your-repo.git
cd your-repo/strapi-cms/
```

### Install Dependencies
```bash
cd /home/user/strapi-cms/
npm install --production
```

## Step 3: Production Configuration

### Environment Variables
```bash
# Create production .env file
nano .env
```

Add these variables:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate-4-random-keys-here
API_TOKEN_SALT=random-string-here
ADMIN_JWT_SECRET=random-string-here
TRANSFER_TOKEN_SALT=random-string-here
JWT_SECRET=random-string-here

DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=strapi_db
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your_secure_password
DATABASE_SSL=false

NODE_ENV=production
```

### Generate Secure Keys
```bash
# Generate secure random keys
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Step 4: Build and Start

### Build Strapi
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Setup Process Manager (PM2)
```bash
# Install PM2
npm install -g pm2

# Start Strapi with PM2
pm2 start npm --name "strapi" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

## Step 5: Reverse Proxy (Nginx)

### Install Nginx
```bash
sudo apt install nginx  # Ubuntu/Debian
sudo yum install nginx  # CentOS/RHEL
```

### Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/strapi
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 6: SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Step 7: Firewall Configuration

```bash
# Ubuntu UFW
sudo ufw allow 22      # SSH
sudo ufw allow 80      # HTTP
sudo ufw allow 443     # HTTPS
sudo ufw enable

# CentOS/RHEL Firewalld
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## Step 8: Connect Your Vercel App

### Update Vercel Environment Variables
In your Vercel dashboard:
- **STRAPI_API_URL**: `https://your-domain.com`
- **STRAPI_API_TOKEN**: (generate in Strapi admin)

### Generate API Token
1. Access: `https://your-domain.com/admin`
2. Go to Settings → API Tokens
3. Create new token with "Full access"
4. Copy token to Vercel environment variables

## Maintenance Commands

### View Logs
```bash
pm2 logs strapi
```

### Restart Strapi
```bash
pm2 restart strapi
```

### Update Strapi
```bash
cd /home/user/strapi-cms/
git pull  # if using git
npm install
npm run build
pm2 restart strapi
```

## Access Points
- **Admin Panel**: `https://your-domain.com/admin`
- **API**: `https://your-domain.com/api`
- **Your Vercel Site**: Automatically connects to your Strapi

## Cost Estimation
- **Basic VPS**: $5-10/month (DigitalOcean, Linode)
- **Domain**: $10-15/year
- **SSL**: Free (Let's Encrypt)
- **Total**: ~$60-120/year

Your self-hosted Strapi will be fully under your control with no platform limitations!