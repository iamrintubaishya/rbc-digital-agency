# Sanity CMS Deployment Configuration

## Environment Variables Required for Production

Add these environment variables to your deployment platform (Vercel, Railway, etc.):

```bash
# Sanity Configuration
SANITY_PROJECT_ID=3prkr232
SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token_here

# Optional: Database URL (if using PostgreSQL)
DATABASE_URL=your_neon_database_url_here

# Optional: HubSpot Integration
HUBSPOT_ACCESS_TOKEN=your_hubspot_token_here
```

## Sanity Project Setup

1. **Project ID**: `3prkr232`
2. **Dataset**: `production`
3. **Studio URL**: https://rbc-digital-agency.sanity.studio/

## Schema Configuration

The project includes a complete blog post schema with:
- Title and slug
- Rich text content
- Author information
- Cover images
- Audio URLs
- Tags and categories
- Publishing dates

## API Integration

The application automatically:
- Uses Sanity CMS when `SANITY_API_TOKEN` is available
- Falls back to local storage when Sanity is not configured
- Provides seamless content management in both environments

## Content Management

### Blog Posts
- Create and edit through Sanity Studio
- Rich text editor with full formatting
- Image uploads and media management
- SEO-friendly slug generation
- Tag management

### Deployment Steps

1. **Configure Environment Variables**
   - Add all required variables to your deployment platform
   - Ensure `SANITY_API_TOKEN` has write permissions for content creation

2. **Verify Sanity Studio Access**
   - Access studio at: https://rbc-digital-agency.sanity.studio/
   - Login with your Sanity account
   - Verify you can create/edit blog posts

3. **Test Content Sync**
   - Create a test blog post in Sanity Studio
   - Verify it appears on your website
   - Test the API endpoints work correctly

## Security Notes

- Read operations work without tokens (public content)
- Write operations require valid API token
- Tokens should have minimal required permissions
- Use environment variables, never hardcode credentials

## Fallback Strategy

The application includes intelligent fallback:
- If Sanity is unavailable, uses local blog content
- Ensures website always loads with content
- Graceful degradation for content management features