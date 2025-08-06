# Vercel + Neon Database Setup Guide

## Current Database Schema

Your RBC Digital Agency application uses the following database tables:

### Tables Created:
- **users** - User authentication (id, username, password)
- **contacts** - Lead capture forms (id, firstName, lastName, email, phone, businessType, challenge, createdAt)
- **bookings** - Appointment scheduling (id, name, email, preferredDate, hubspotContactId, createdAt)
- **blog_posts** - Blog content management (id, title, slug, content, excerpt, author, coverImage, contentImages, audioUrl, readingTime, tags, publishedAt, createdAt, updatedAt)

## Steps to Set Up Neon for Vercel:

### 1. Create Neon Database
1. Go to [neon.tech](https://neon.tech)
2. Sign up or log in to your account
3. Create a new project
4. Choose a region close to your users
5. Note down your connection string

### 2. Configure Database Schema
Run these commands in your Neon database console or use a tool like pgAdmin:

```sql
-- Users table
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Contacts table
CREATE TABLE contacts (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_type TEXT,
  challenge TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_date TEXT,
  hubspot_contact_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT,
  cover_image TEXT,
  content_images TEXT[],
  audio_url TEXT,
  reading_time TEXT,
  tags TEXT[],
  strapi_id TEXT UNIQUE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Set Vercel Environment Variables
In your Vercel dashboard, go to your project settings → Environment Variables and add:

```
DATABASE_URL=your_neon_connection_string_here
```

Your Neon connection string should look like:
```
postgresql://username:password@hostname:5432/database?sslmode=require
```

### 4. Optional: HubSpot Integration
If you want to enable HubSpot CRM integration, also add:
```
HUBSPOT_ACCESS_TOKEN=your_hubspot_token_here
```

## Alternative: Use Drizzle Push Command

Instead of manually creating tables, you can use the automated schema push:

1. Install Drizzle Kit locally in your project:
   ```bash
   npm install -g drizzle-kit
   ```

2. Set your DATABASE_URL environment variable to your Neon connection string

3. Run the schema push:
   ```bash
   npm run db:push
   ```

This will automatically create all tables based on your `shared/schema.ts` file.

## Verification

After setup, your Vercel deployment should:
- ✅ Connect to Neon database successfully
- ✅ Handle contact form submissions
- ✅ Process booking appointments
- ✅ Display blog posts
- ✅ Store all data persistently

## Current Project Status
- Migration from Replit Agent completed ✅
- PostgreSQL schema defined and tested ✅
- Vercel deployment configuration ready ✅
- Database connection logic implemented ✅