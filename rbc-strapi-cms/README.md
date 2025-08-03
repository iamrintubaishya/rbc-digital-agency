# RBC Simple CMS

A lightweight, serverless CMS solution for RBC Digital Agency blog content.

## Features

✅ **Serverless-First**: Designed specifically for Vercel deployment  
✅ **Zero Dependencies**: No external packages required  
✅ **Fast Performance**: Minimal overhead, quick response times  
✅ **Full CRUD Operations**: Create, Read, Update, Delete articles  
✅ **Rich Admin Interface**: Professional admin panel with edit forms  
✅ **API Compatible**: Strapi-like API structure for easy integration  

## API Endpoints

- `GET /api/articles` - Get all blog posts
- `POST /api/articles` - Create new blog post
- `GET /api/articles/:id` - Get specific post by ID or slug
- `PUT /api/articles/:id` - Update existing post by ID or slug
- `DELETE /api/articles/:id` - Delete post by ID or slug
- `GET /admin` - Rich admin interface with CRUD operations

## Deployment

This CMS is configured for one-click deployment to Vercel:

1. Push this repository to GitHub
2. Connect to Vercel
3. Deploy automatically

No environment variables or build steps required!

## Response Format

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Article Title",
        "slug": "article-slug",
        "excerpt": "Brief description...",
        "content": "<p>Full HTML content...</p>",
        "author": "Author Name",
        "publishedAt": "2024-12-15T10:00:00.000Z",
        "cover": null
      }
    }
  ]
}
```

## Why This Approach?

The original Strapi deployment had compatibility issues with Vercel's serverless environment. This lightweight solution:

- Eliminates complex dependency conflicts
- Provides instant cold starts
- Maintains API compatibility with existing frontend code
- Requires zero configuration or environment variables

## Local Development

```bash
node api/simple-cms.js
```

Visit `http://localhost:3000/admin` to access the full-featured admin interface.

## Admin Interface Features

- **Article Management**: Add, edit, and delete blog posts
- **Rich Forms**: Title, slug, author, excerpt, and HTML content editing
- **Real-time Updates**: Changes are reflected immediately
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-slug Generation**: Slugs are automatically generated from titles