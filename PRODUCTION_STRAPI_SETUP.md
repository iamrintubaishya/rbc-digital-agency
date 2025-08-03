# Strapi CMS Production Deployment Guide

## Current Setup
- **Development**: Strapi runs locally on port 1338
- **Production**: Need separate Strapi hosting

## Recommended: Deploy Strapi to Railway

### Step 1: Prepare Strapi for Production
1. Your Strapi is already configured in `strapi-cms/` directory
2. Has SQLite database (works for small-medium sites)
3. Admin panel and API ready

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `strapi-cms` folder as root
4. Railway will auto-detect and deploy Strapi
5. Get your live URL: `https://your-project.railway.app`

### Step 3: Update Main App Connection
Add environment variable on Vercel:
- **STRAPI_API_URL**: `https://your-project.railway.app`
- **STRAPI_API_TOKEN**: (generate in Strapi admin settings)

### Step 4: Access Your Strapi Admin
- **Live Admin Panel**: `https://your-project.railway.app/admin`
- **Your Vercel Site**: `https://your-site.vercel.app`
- **Content Sync**: Automatic between both

## Alternative: Strapi Cloud
1. Go to [strapi.io/cloud](https://strapi.io/cloud)
2. Import your Strapi project
3. Get managed hosting with automatic updates

## Current Environment Variables Needed

On Vercel, add these secrets:
- `STRAPI_API_URL` - Your live Strapi URL
- `STRAPI_API_TOKEN` - API token from Strapi admin
- `DATABASE_URL` - (optional) for PostgreSQL database

Your main app will automatically:
- Connect to live Strapi when available
- Fallback to in-memory storage if Strapi is down
- Work perfectly on Vercel