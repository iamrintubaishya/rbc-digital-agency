# Strapi CMS Configuration Guide

## Overview

Your RBC Digital Agency website now has Strapi CMS configured as a headless content management system for blog posts. The system is set up with a smart fallback mechanism - it will use Strapi when available, and fallback to your local PostgreSQL database when Strapi is not running.

## What's Configured

✅ **Strapi CMS Installation**: Complete Strapi v5.20.0 instance installed in `strapi-cms/`
✅ **Article Content Type**: Pre-configured with fields for title, slug, content, excerpt, author, and cover image
✅ **Database Configuration**: Uses SQLite for Strapi data (separate from your main PostgreSQL database)
✅ **API Integration**: Your main application automatically syncs with Strapi via the `/api/blog/posts` endpoint
✅ **Smart Fallback**: When Strapi is unavailable, the system uses your PostgreSQL database

## Starting Strapi CMS

### Option 1: Use the provided script
```bash
./start-strapi.sh
```

### Option 2: Manual start
```bash
cd strapi-cms
npm run develop
```

## Accessing Strapi Admin

1. Start Strapi using one of the methods above
2. Open your browser to: http://localhost:1337/admin
3. Create your admin account or use the configured credentials:
   - Email: admin@rbcdigital.com
   - Password: admin123

## Creating Blog Content

1. Access the Strapi admin panel
2. Go to "Content Manager" → "Article"
3. Click "Create new entry"
4. Fill in the article details:
   - **Title**: Your blog post title
   - **Slug**: Auto-generated URL slug (you can customize)
   - **Content**: Rich text editor for your article content
   - **Excerpt**: Short summary for previews
   - **Author**: Author name
   - **Cover**: Upload a cover image (optional)
5. Click "Save" and then "Publish"

## How It Works

Your main application automatically:
- Fetches articles from Strapi when available
- Syncs Strapi articles to your PostgreSQL database
- Falls back to local database when Strapi is offline
- Serves content via the `/api/blog/posts` endpoint

## API Endpoints

- `GET /api/blog/posts` - List all blog posts
- `GET /api/blog/posts/:slug` - Get specific post by slug

## Environment Variables

Strapi uses these environment variables (already configured):
- `HOST=0.0.0.0`
- `PORT=1337`
- `APP_KEYS` - Security keys for Strapi
- `DATABASE_CLIENT=sqlite` - Uses SQLite for Strapi data

## Troubleshooting

**Strapi won't start?**
- Make sure port 1337 is not in use
- Check the `strapi-cms/.env` file exists
- Try running `npm install` in the `strapi-cms/` directory

**Articles not appearing?**
- Make sure to "Publish" articles in Strapi admin (not just save as draft)
- Check that your main application is running on port 5000
- The system will fallback to local database if Strapi is unavailable

**Admin login issues?**
- Use the credentials: admin@rbcdigital.com / admin123
- Or create a new admin account on first access

## File Structure

```
strapi-cms/
├── src/api/article/          # Article content type
├── config/                   # Strapi configuration
├── .env                      # Environment variables
└── package.json              # Strapi dependencies

server/strapi.ts              # Strapi integration service
shared/schema.ts              # Database schema with blog_posts table
```

Your content will be available at both:
- Strapi admin: http://localhost:1337/admin
- Your website: http://localhost:5000 (in the blog section)