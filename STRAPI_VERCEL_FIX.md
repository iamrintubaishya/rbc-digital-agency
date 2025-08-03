# Strapi Vercel Deployment Fix

## Issue Identified
Your Strapi deployment was failing with 404 errors because the Vercel configuration wasn't properly set up for serverless functions.

## Fixed Files
✅ `vercel.json` - Updated to use proper serverless function configuration
✅ `api/index.js` - Improved Strapi initialization for serverless environment
✅ `.env.production` - Added required environment variables

## Next Steps

### 1. Redeploy to Vercel
Since we fixed the configuration files, you need to redeploy:

1. **Push changes to your repository:**
   ```bash
   cd strapi-cms
   git add .
   git commit -m "Fix Vercel serverless configuration"
   git push
   ```

2. **Or manually redeploy in Vercel dashboard:**
   - Go to your Vercel project
   - Click "Redeploy" to trigger a new build

### 2. Add Environment Variables in Vercel
In your Vercel project dashboard, add these environment variables:

```
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
APP_KEYS=your-secure-key-1,your-secure-key-2,your-secure-key-3,your-secure-key-4
API_TOKEN_SALT=your-secure-salt
ADMIN_JWT_SECRET=your-secure-admin-secret
TRANSFER_TOKEN_SALT=your-secure-transfer-salt
JWT_SECRET=your-secure-jwt-secret
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

**Generate secure keys with:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Test Your Admin Panel
After redeployment, your admin should work at:
- `https://rbc-strapi-cms.vercel.app/admin`

## Why This Happens
Strapi requires specific serverless function configuration for Vercel, which differs from standard Node.js deployment. The fixes ensure proper initialization and routing for the admin panel.