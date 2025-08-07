# Sanity Studio Local Setup Guide

## Quick Setup (Based on Your Screenshot)

Since you already have a Sanity project configured, follow these steps to run Sanity Studio locally:

### Step 1: Authentication
First, make sure you're logged into Sanity:
```bash
npx sanity login
```

### Step 2: Run Sanity Studio
Start the Sanity Studio development server:
```bash
npx sanity dev
```

This will start the studio at: `http://localhost:3333`

### Step 3: Access Your Studio
Open your browser and go to: http://localhost:3333

You should see the Sanity Studio interface where you can:
- Create and edit blog posts
- Manage content with rich text editor
- Upload images and media
- Organize content with tags

## Project Configuration

Your Sanity project is already configured with:
- **Project ID**: `3prkr232`
- **Dataset**: `production`
- **Studio Host**: `rbc-digital-agency`

## Blog Post Schema

The studio includes a complete blog post schema with:
- Title and slug generation
- Rich text content editor
- Author information
- Cover image upload
- Audio URL field
- Reading time
- Tags management
- Publishing date

## Environment Variables for Production

When deploying, make sure these environment variables are set:
```
SANITY_PROJECT_ID=3prkr232
SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

## Troubleshooting

If you encounter issues:
1. Ensure you're logged into the correct Sanity account
2. Verify your project permissions
3. Check that the project ID matches your account

## Content Management Workflow

1. Start Sanity Studio: `npx sanity dev`
2. Create/edit blog posts in the studio
3. Content automatically syncs to your website
4. Changes appear immediately on your site

Your website will automatically use Sanity content when available, with intelligent fallback to local storage.