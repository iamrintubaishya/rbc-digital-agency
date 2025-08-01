# Neon Database Setup Guide

## Overview

Your RBC Digital Agency website is now configured to use Neon Database (serverless PostgreSQL) for persistent data storage. This replaces the in-memory storage and ensures your contact forms and bookings are saved permanently.

## Local Development Setup

### 1. Database Already Created
✅ A PostgreSQL database has been created and connected to your Replit environment
✅ Database schema has been pushed successfully
✅ Your app is now using persistent storage

### 2. Tables Created
Your database now includes:
- **contacts** - Stores contact form submissions
- **bookings** - Stores appointment bookings  
- **users** - For future authentication features

## Vercel Deployment with Neon

### 1. Get Your Neon Database URL
If deploying to Vercel, you'll need to set up your own Neon database:

1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Copy the connection string from your dashboard

### 2. Add Environment Variable to Vercel
1. In your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Add: `DATABASE_URL` = `your_neon_connection_string`
4. Redeploy your application

### 3. Database Schema Migration
The database tables will be created automatically when you deploy, thanks to the Drizzle configuration.

## Database Schema

```sql
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
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users table (for future features)
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
```

## Smart Fallback System

Your app uses intelligent storage selection:
- **With DATABASE_URL**: Uses Neon PostgreSQL for persistent storage
- **Without DATABASE_URL**: Falls back to in-memory storage for demos

## Benefits of Neon Integration

✅ **Persistent Data**: Contact forms and bookings saved permanently
✅ **Serverless**: Automatically scales with your application  
✅ **Free Tier**: Generous free tier for small businesses
✅ **Fast**: Sub-millisecond latency with connection pooling
✅ **Secure**: SSL connections and encrypted at rest

## API Endpoints

Your API now supports persistent storage:

- `POST /api/contacts` - Save contact form (to database)
- `POST /api/bookings` - Save booking (to database)  
- `GET /api/contacts` - List all contacts (from database)
- `GET /api/bookings` - List all bookings (from database)

## Monitoring & Management

1. **Neon Dashboard**: Monitor database usage, connections, and performance
2. **Vercel Analytics**: Track API endpoint performance
3. **Local Development**: Uses your Replit database automatically

Your RBC Digital Agency website now has enterprise-grade data persistence! 🚀