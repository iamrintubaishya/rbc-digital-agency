# Sanity CMS Migration Complete - Setup Instructions

## ✅ What's Been Set Up

I've configured your project to use **Sanity.io** as your primary blog CMS with project ID `3prkr232`. Here's what's been implemented:

### 1. Sanity Configuration
- **Project ID**: `3prkr232` 
- **Dataset**: `production`
- **Schema**: Blog post structure matching your existing content
- **API Integration**: Smart fallback system (Sanity → Local storage)

### 2. Updated Blog API Routes
Your website now tries to fetch from Sanity first, with automatic fallback to local storage:
- `GET /api/blog/posts` - Lists all posts
- `GET /api/blog/posts/:slug` - Individual post
- `PATCH /api/blog/posts/:slug` - Update post
- `POST /api/blog/posts` - Create new post

### 3. Migration Script Ready
I've created a migration script to move your 11 existing blog posts to Sanity.

## 🔑 Next Steps (Required)

### Step 1: Get Your Sanity API Token
1. Go to **https://sanity.io/manage/personal/tokens**
2. Click **"Create new token"**
3. **Name**: "RBC Blog API"
4. **Permissions**: Choose **"Editor"**
5. **Copy the token** (you won't see it again!)

### Step 2: Add API Token to Your Project
Add the token to your environment variables:

**For Local Development:**
```bash
# In your .env file
SANITY_API_TOKEN=your_token_here
```

**For Vercel Production:**
1. Go to your Vercel dashboard
2. Select your project → Settings → Environment Variables
3. Add new variable:
   - **Name**: `SANITY_API_TOKEN`
   - **Value**: Your token
   - **Environment**: Production (and optionally Preview)

### Step 3: Run Migration
Once you have the API token:

```bash
# Install tsx if not already installed
npm install -g tsx

# Run migration script
SANITY_API_TOKEN=your_token_here npx tsx scripts/migrate-to-sanity.ts
```

This will copy all your existing blog posts to Sanity.

## 🎯 What You Get

### Professional CMS Interface
- **Studio URL**: `https://3prkr232.sanity.studio`
- **Rich text editor** with formatting options
- **Media management** for images and files
- **Real-time collaboration** with team members
- **Version history** and drafts
- **Mobile editing** capabilities

### Smart Integration
- **Primary**: Posts served from Sanity (fast, cached)
- **Fallback**: Local storage if Sanity unavailable
- **Seamless**: No changes needed to your frontend
- **Reliable**: Your website works even if Sanity is down

### Free Tier Benefits
- **500k API requests/month** (more than enough)
- **3 users** for team collaboration
- **5GB bandwidth** for media files
- **Community support** and documentation

## 📋 Testing Checklist

### After Migration:
- [ ] Visit `https://3prkr232.sanity.studio` (your admin interface)
- [ ] Verify all 11 blog posts are visible
- [ ] Edit a blog post title and save
- [ ] Check your website shows the updated content
- [ ] Test creating a new blog post in Sanity

### On Your Website:
- [ ] Blog page shows all posts
- [ ] Individual post pages load correctly
- [ ] "Read full article" links work
- [ ] Content matches what you see in Sanity

## 🔧 Admin Interface Features

In your Sanity Studio, you can:
- **Edit existing posts** with rich text formatting
- **Create new posts** with all the fields you need
- **Upload images** directly in the editor
- **Manage tags** for categorization
- **Set publish dates** and author information
- **Preview changes** before publishing
- **Collaborate** with team members in real-time

## 🚀 Production Deployment

Your Vercel deployment will automatically use Sanity once you:
1. Add the `SANITY_API_TOKEN` to Vercel environment variables
2. Redeploy your application (or it will redeploy automatically)

The website will then serve content from Sanity, giving you the professional CMS experience you wanted.

## 🆘 Support

If you need help:
1. **Sanity Documentation**: https://www.sanity.io/docs
2. **Your Studio**: https://3prkr232.sanity.studio
3. **Project Dashboard**: https://sanity.io/organizations/personal/project/3prkr232

Ready to get your Sanity API token and run the migration?