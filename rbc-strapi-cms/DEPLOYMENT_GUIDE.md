# Strapi CMS Vercel Deployment Guide

## Current Issue
Your Strapi CMS at https://rbc-strapi-cms.vercel.app/ is returning a 404 error because it's missing required environment variables.

## Solution

You need to add these environment variables in your Vercel project settings:

### Required Environment Variables

1. **APP_KEYS** (comma-separated list of 4 keys)
   ```
   key1,key2,key3,key4
   ```

2. **ADMIN_JWT_SECRET**
   ```
   your-admin-jwt-secret-here
   ```

3. **API_TOKEN_SALT** 
   ```
   your-api-token-salt
   ```

4. **TRANSFER_TOKEN_SALT**
   ```
   your-transfer-token-salt
   ```

5. **JWT_SECRET**
   ```
   your-jwt-secret
   ```

## How to Add Environment Variables to Vercel

1. Go to your Vercel dashboard
2. Select your `rbc-strapi-cms` project
3. Go to Settings → Environment Variables
4. Add each variable listed above
5. Redeploy your project

## Generate Secure Keys

You can generate secure keys using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run this command 5 times to generate 5 different keys for the variables above.

## Alternative: Use Default Values (Less Secure)

The configuration now includes default values, so the deployment should work even without custom environment variables, but this is less secure for production use.

## Database Configuration

Currently using SQLite (file-based database). For production, consider switching to PostgreSQL by setting:
- `DATABASE_CLIENT=postgres`
- `DATABASE_URL=your-postgres-connection-string`