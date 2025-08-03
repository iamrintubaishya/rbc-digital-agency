# Complete Self-Hosted Strapi Guide

## Method 1: Railway (Recommended - Easiest)

### Step 1: Create New Strapi Project
```bash
npx create-strapi-app@latest rbc-strapi --quickstart --no-run
cd rbc-strapi
```

### Step 2: Configure for Railway
Create `railway.toml`:
```toml
[build]
builder = "nixpacks"

[deploy]
healthcheckPath = "/_health"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 10
```

### Step 3: Update package.json
```json
{
  "scripts": {
    "start": "strapi start",
    "build": "strapi build",
    "railway:start": "strapi start"
  }
}
```

### Step 4: Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway new
railway up
```

**Cost**: $5-20/month with PostgreSQL database included

---

## Method 2: DigitalOcean App Platform

### Step 1: Create Strapi Project
```bash
npx create-strapi-app@latest rbc-strapi --quickstart --no-run
cd rbc-strapi
```

### Step 2: Add App Spec (.do/app.yaml)
```yaml
name: rbc-strapi
services:
- name: api
  source_dir: /
  github:
    repo: your-username/rbc-strapi
    branch: main
  run_command: npm run start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
databases:
- engine: PG
  name: db
  num_nodes: 1
  size: db-s-dev-database
  version: "12"
```

### Step 3: Deploy
1. Push code to GitHub
2. Connect DigitalOcean to your repository
3. Configure environment variables
4. Deploy

**Cost**: $12-25/month with managed PostgreSQL

---

## Method 3: VPS (Most Control)

### Step 1: Get VPS Server
- **Providers**: Linode, DigitalOcean Droplets, Vultr
- **Specs**: 2GB RAM minimum, Ubuntu 20.04+

### Step 2: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Create database
sudo -u postgres createdb strapi_db
sudo -u postgres createuser strapi_user
sudo -u postgres psql -c "ALTER USER strapi_user PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE strapi_db TO strapi_user;"
```

### Step 3: Deploy Strapi
```bash
# Clone your project
git clone https://github.com/your-username/rbc-strapi.git
cd rbc-strapi

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

### Step 4: Environment Configuration
```bash
# .env file
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_db
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your_password
```

### Step 5: Start with PM2
```bash
# Install PM2
npm install -g pm2

# Build and start
npm run build
pm2 start npm --name "strapi" -- start
pm2 startup
pm2 save
```

**Cost**: $5-15/month for VPS

---

## Method 4: Docker Self-Host

### Step 1: Create Docker Setup
Create `docker-compose.yml`:
```yaml
version: '3'
services:
  strapi:
    container_name: strapi
    build: .
    image: strapi:latest
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: strapiDB
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
    volumes:
      - ./config:/opt/app/config
      - ./src:/opt/app/src
      - ./package.json:/opt/package.json
      - ./yarn.lock:/opt/yarn.lock
      - ./.env:/opt/app/.env
    ports:
      - '1337:1337'
    networks:
      - strapi
    depends_on:
      - strapiDB

  strapiDB:
    container_name: strapiDB
    platform: linux/amd64
    restart: unless-stopped
    env_file: .env
    image: postgres:14.5-alpine
    environment:
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi
      POSTGRES_DB: strapi
    volumes:
      - strapi-data:/var/lib/postgresql/data/
    ports:
      - '5432:5432'
    networks:
      - strapi

volumes:
  strapi-data:

networks:
  strapi:
    name: Strapi
    driver: bridge
```

### Step 2: Deploy with Docker
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f strapi
```

---

## Migration from Current CMS

### Step 1: Export Current Data
I can create a script to export your current blog posts:
```javascript
// export-posts.js
const posts = [/* your current posts */];
const fs = require('fs');
fs.writeFileSync('posts-export.json', JSON.stringify(posts, null, 2));
```

### Step 2: Import to Strapi
```javascript
// import-to-strapi.js
const axios = require('axios');
const posts = require('./posts-export.json');

posts.forEach(async (post) => {
  await axios.post('http://localhost:1337/api/articles', {
    data: {
      title: post.title,
      content: post.content,
      slug: post.slug,
      publishedAt: post.publishedAt
    }
  });
});
```

## Recommendation

For RBC Digital Agency, I recommend **Railway** because:
- Easiest setup (5 minutes)
- Includes database
- Automatic deployments
- Good performance
- Reasonable cost

Would you like me to help you set up Strapi on Railway specifically?