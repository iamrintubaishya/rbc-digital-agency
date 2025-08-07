# Setting Up Your Sanity.io Project for RBC Digital Agency

## Option 1: Quick Setup with CLI (Recommended)

### Step 1: Create Sanity Project
Run this command to create a new Sanity project:

```bash
npm create sanity@latest
```

**During setup, choose:**
- ✅ **Create new project**: "RBC Digital Agency Blog"
- ✅ **Use the default dataset configuration**: Yes
- ✅ **Project template**: Clean project
- ✅ **TypeScript**: No (for simplicity)
- ✅ **Package manager**: npm

### Step 2: Configure Your Blog Schema
After project creation, navigate to your sanity folder and replace the schema:

```bash
cd your-sanity-project-folder
```

## Option 2: Manual Sanity.io Dashboard Setup

### Step 1: Create Account & Project
1. Go to **sanity.io**
2. Sign up for free account
3. Click "Create new project"
4. Name: "RBC Digital Agency Blog"
5. Choose "Blog" template or start clean

### Step 2: Get Your Project Credentials
After creating project, you'll get:
- **Project ID**: `abc123xyz` (unique to your project)
- **Dataset**: `production`
- **API Token**: (generate from Settings > API)

## Blog Schema Configuration

### Your Blog Post Schema
Replace the default schema with this structure that matches your existing blog posts:

```javascript
// schemas/blogPost.js
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: Rule => Rule.required()
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
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
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
      name: 'audioUrl',
      title: 'Audio URL',
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
      of: [{type: 'string'}]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    }
  ]
}
```

## Integration Options

### Option A: Sanity as Primary CMS (Recommended)
- **How**: Migrate your blog data to Sanity
- **Benefits**: Full CMS features, real-time collaboration, revision history
- **Effort**: Medium setup, but professional long-term solution

### Option B: Dual System (Hybrid)
- **How**: Keep Neon for production, sync with Sanity for editing
- **Benefits**: Best of both worlds
- **Effort**: More complex but very powerful

### Option C: Sanity Studio Only
- **How**: Use Sanity Studio interface to edit your existing API
- **Benefits**: Beautiful editing experience, keep current architecture
- **Effort**: Custom integration work

## What You Get with Sanity.io

### ✅ Professional Features
- **Rich Text Editor**: Beautiful WYSIWYG editor
- **Media Management**: Image uploads and optimization  
- **Collaboration**: Multiple users, roles, permissions
- **Revision History**: Track all changes over time
- **Real-time Updates**: See changes instantly
- **Mobile Editing**: Edit content from anywhere

### ✅ Developer Experience
- **GraphQL/REST APIs**: Flexible data fetching
- **Webhooks**: Trigger builds on content changes
- **CDN**: Fast global content delivery
- **TypeScript Support**: Fully typed schemas
- **React Components**: Pre-built UI components

### ✅ Free Tier Includes
- **3 Users**: Team collaboration
- **500k API requests/month**: Plenty for most sites
- **5GB Bandwidth**: Generous allowance
- **Community Support**: Active help community

## Next Steps

1. **Choose your option** above (I recommend Option A for best experience)
2. **Create your Sanity project** following the steps
3. **Let me know your Project ID** and I'll help integrate it
4. **Import your existing blog data** to Sanity
5. **Update your website** to fetch from Sanity instead of local storage

Would you like me to walk you through creating the Sanity project and setting up the integration?