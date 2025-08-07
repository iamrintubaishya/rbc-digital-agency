# Complete Sanity.io Setup Guide for RBC Digital Agency

## Method 1: Quick Browser Setup (5 minutes)

### Step 1: Create Your Sanity Account
1. Go to **[sanity.io](https://sanity.io)**
2. Click **"Get Started"**
3. Sign up with Google, GitHub, or email
4. Verify your account

### Step 2: Create Your Project
1. Once logged in, click **"Create new project"**
2. **Project name**: "RBC Digital Agency Blog"
3. **Use schema**: Choose "Blog" template (or "Clean" for custom)
4. **Plan**: Select "Free" (perfect for your needs)
5. Click **"Create project"**

### Step 3: Get Your Credentials
After project creation, you'll see:
- **Project ID**: `abc123xyz` (copy this)
- **Dataset**: `production`
- Go to **Settings > API** to create an API token

### Step 4: Access Your Studio
- **Studio URL**: `https://your-project-id.sanity.studio`
- **Local URL**: Available after CLI setup

## Method 2: CLI Setup (Advanced)

If you prefer command line setup:

```bash
# Create new Sanity project
npm create sanity@latest

# Follow prompts:
# - Login with your preferred method
# - Create new project: "RBC Digital Agency Blog"
# - Use default dataset: Yes
# - Choose template: Clean or Blog
# - TypeScript: No (for simplicity)
```

## Your Blog Schema Configuration

Once your project is created, you'll need to configure it for your blog posts. Here's the schema that matches your existing data:

```javascript
// In Sanity Studio, go to Structure > Schema
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'url'
    },
    {
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    }
  ]
}
```

## Integration Strategy Options

### Option A: Full Sanity Migration (Recommended)
**What it means**: Move all your blog content to Sanity, use it as your primary CMS

**Benefits**:
- Professional editing experience
- Team collaboration features
- Automatic backups and version history
- Rich media management
- Mobile content editing

**Steps**:
1. Create Sanity project (above)
2. Import your existing 11 blog posts
3. Update your website to fetch from Sanity API
4. Deploy with new Sanity integration

### Option B: Hybrid Approach
**What it means**: Keep your current system, add Sanity for content creation

**Benefits**:
- Keep existing architecture
- Add professional editing when needed
- Gradual migration possible

**Steps**:
1. Set up Sanity project
2. Create sync mechanism between Sanity and your database
3. Choose per-post whether to manage in Sanity or directly

## What You Get with Sanity.io Free Plan

✅ **3 Users** - Perfect for you and team members  
✅ **500k API requests/month** - More than enough for your site  
✅ **5GB Bandwidth** - Generous allowance  
✅ **Community Support** - Active help community  
✅ **Revision History** - Track all content changes  
✅ **Real-time Collaboration** - Multiple people can edit simultaneously  

## Next Steps

1. **Create your Sanity project** using Method 1 (browser) or Method 2 (CLI)
2. **Share your Project ID** with me (looks like `abc123xyz`)
3. **Choose integration option** (A or B above)
4. **I'll help you connect** Sanity to your existing website

The whole setup takes about 10 minutes, and you'll have a professional CMS that rivals expensive solutions like WordPress or Contentful.

Ready to create your Sanity project? I recommend starting with the browser method - it's the quickest way to get up and running!