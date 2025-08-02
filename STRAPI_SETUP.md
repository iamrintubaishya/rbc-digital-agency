# Strapi CMS Setup Instructions

I've configured Strapi CMS for your RBC Digital Agency website. Here's how to get it running:

## What I've Created For You

✅ **Strapi Project Structure** - Complete CMS setup in `strapi-cms/` folder
✅ **Article Content Type** - Pre-configured for blog posts with all needed fields
✅ **SEO Component** - Built-in meta tags for search engine optimization
✅ **Integration Code** - Your website already knows how to connect to Strapi

## Installation Steps

### 1. Navigate to Strapi Folder
```bash
cd strapi-cms
```

### 2. Install Strapi (One-time Setup)
```bash
npx create-strapi-app@latest . --quickstart --skip-cloud
```

### 3. Start Your CMS
```bash
npm run develop
```

### 4. Access Admin Panel
- Open: **http://localhost:1337/admin**
- Create your admin account
- You'll see the Article content type ready to use

### 5. Create API Token
1. Go to **Settings → API Tokens**
2. Click **"Create new API Token"**
3. Name: "Website Integration"
4. Set **Full Access** permissions
5. **Copy the token** - you'll need it next

### 6. Connect to Your Website
Add these environment secrets to your main project:
- `STRAPI_API_URL`: `http://localhost:1337`
- `STRAPI_API_TOKEN`: (paste your token here)

## How It Works

**Content Creation:**
1. Write articles in Strapi's visual editor
2. Add images, format text, set SEO tags
3. Publish when ready
4. Content automatically appears on your website

**Smart Fallback:**
- If Strapi is offline, your website still works
- Content is cached in your database
- No downtime for visitors

## Next Steps

1. **Install Strapi** using the commands above
2. **Create your first blog post** in the admin panel
3. **Get your API token** and add it to environment variables
4. **Your website will automatically start using Strapi**

The integration is already built - you just need to run these setup steps to activate it.

Would you like me to help you with any specific part of the setup?