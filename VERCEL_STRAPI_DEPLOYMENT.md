# Deploy Strapi CMS on Vercel - Complete Guide

## Overview
Host your Strapi CMS directly on Vercel as a separate project, then connect it to your main website.

## Files Prepared for Vercel Deployment

✅ **vercel.json** - Vercel configuration for Strapi
✅ **api/index.js** - Serverless function entry point
✅ **package.json** - Updated with vercel-build script
✅ **Database config** - Ready for PostgreSQL or SQLite

## Step-by-Step Deployment

### 1. Create Separate Repository for Strapi
```bash
# Create new repository for just Strapi
mkdir rbc-strapi-cms
cp -r strapi-cms/* rbc-strapi-cms/
cd rbc-strapi-cms
git init
git add .
git commit -m "Initial Strapi CMS setup"
git remote add origin https://github.com/yourusername/rbc-strapi-cms.git
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Vercel Dashboard**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your `rbc-strapi-cms` repository
4. Vercel auto-detects it as Node.js project
5. Deploy!

**Option B: Vercel CLI**
```bash
npm i -g vercel
cd rbc-strapi-cms
vercel --prod
```

### 3. Configure Environment Variables

In Vercel dashboard, add these environment variables:

**Required:**
```
HOST=0.0.0.0
PORT=3000
APP_KEYS=your-app-key-1,your-app-key-2,your-app-key-3,your-app-key-4
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

**Database (Choose One):**

**Option 1: SQLite (Simple)**
```
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

**Option 2: PostgreSQL (Recommended)**
```
DATABASE_CLIENT=postgres
DATABASE_URL=your-postgres-connection-string
DATABASE_SSL=true
```

### 4. Generate Secure Keys

Use this to generate secure keys:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 5. Access Your Strapi

After deployment:
- **Admin Panel**: `https://your-strapi-app.vercel.app/admin`
- **API Base**: `https://your-strapi-app.vercel.app/api`

### 6. Connect to Main Website

Update your main website's environment variables on Vercel:
```
STRAPI_API_URL=https://your-strapi-app.vercel.app
STRAPI_API_TOKEN=your-generated-token
```

## Database Options for Vercel

### Option 1: Vercel Postgres (Recommended)
```bash
# Install Vercel Postgres
vercel env add DATABASE_URL
# Paste your Vercel Postgres connection string
```

### Option 2: External PostgreSQL
- Supabase (free tier available)
- PlanetScale
- Railway
- Neon Database

### Option 3: SQLite (Development Only)
Good for testing, but data resets on each deployment.

## Important Notes

**Limitations on Vercel:**
- Serverless functions have 10MB memory limit
- 50MB deployment size limit
- Files are read-only (except /tmp)
- No persistent file storage

**Recommended Setup:**
- Use PostgreSQL for production
- Use external file storage (AWS S3, Cloudinary) for uploads
- Keep Strapi deployment separate from main website

## File Upload Configuration

For file uploads on Vercel, use external storage:

```javascript
// config/plugins.js
module.exports = {
  upload: {
    config: {
      provider: 'cloudinary', // or 'aws-s3'
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
    },
  },
};
```

## Deployment Commands

```bash
# Build and deploy
npm run vercel-build
vercel --prod

# View logs
vercel logs your-strapi-app.vercel.app

# Update environment variables
vercel env add VARIABLE_NAME
```

## Final Access Points

- **Main Website**: `https://your-main-app.vercel.app`
- **Strapi Admin**: `https://your-strapi-app.vercel.app/admin`
- **Content Management**: Managed through Strapi admin
- **Automatic Sync**: Your main app pulls content from Strapi API

Your Strapi CMS will be fully hosted on Vercel with your own domain!