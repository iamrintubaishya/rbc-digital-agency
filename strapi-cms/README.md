# RBC Digital Agency - Strapi CMS

This is your content management system for the RBC Digital Agency website.

## Quick Setup

### Step 1: Install Strapi
Run this command in the `strapi-cms` directory:
```bash
npx create-strapi-app@latest . --quickstart --skip-cloud
```

### Step 2: Start Strapi
```bash
npm run develop
```

### Step 3: Access Admin Panel
- Open: http://localhost:1337/admin
- Create your admin account when prompted

### Step 4: Configure Content Type
The Article content type is already configured with these fields:
- **Title** - Blog post headline
- **Slug** - URL-friendly version
- **Content** - Rich text editor for full article
- **Excerpt** - Short summary
- **Author** - Writer name
- **Cover** - Featured image
- **SEO** - Meta title, description, keywords

### Step 5: Create API Token
1. Go to Settings → API Tokens
2. Click "Create new API Token"
3. Name: "RBC Website Integration"
4. Token duration: Unlimited
5. Token type: Full access
6. Copy the generated token

### Step 6: Connect to Your Website
Add these environment variables to your main project:
```
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token-here
```

## Content Management Workflow

### Creating Blog Posts:
1. **Go to Content Manager** → Articles
2. **Click "Create new entry"**
3. **Fill in the fields:**
   - Title: Your blog headline
   - Content: Write your article (rich text editor)
   - Excerpt: Brief summary for previews
   - Author: Your name
   - Cover: Upload featured image
   - SEO: Add meta tags for search engines
4. **Save as Draft** or **Publish** immediately
5. **Your website automatically syncs** the new content

### Benefits:
- **Visual Editor** - No coding required
- **Media Library** - Easy image management  
- **Preview** - See how posts look before publishing
- **SEO Tools** - Built-in meta tag management
- **Multi-user** - Team members can contribute
- **Auto-sync** - Content appears on your website immediately

## Production Setup
For live websites, deploy Strapi to:
- Strapi Cloud (recommended)
- Heroku
- DigitalOcean
- AWS

Then update `STRAPI_API_URL` to your live Strapi URL.