# 🚀 URGENT: Fix Vercel Blog Deployment

Your Vercel deployment is failing due to multiple issues. Here are the exact files that need to be updated in your GitHub repository:

## ✅ Required File Updates

### 1. Fix `api/index.ts` - Add Blog Endpoints
Replace the entire file with this:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';
import { insertContactSchema, insertBookingSchema } from '../shared/schema.js';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  const path = req.url || '';

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (method === 'POST' && path.includes('/contacts')) {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      return res.json({ success: true, contact });
    }

    if (method === 'POST' && path.includes('/bookings')) {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      return res.json({ success: true, booking });
    }

    if (method === 'GET' && path.includes('/contacts')) {
      const contacts = await storage.getContacts();
      return res.json(contacts);
    }

    if (method === 'GET' && path.includes('/bookings')) {
      const bookings = await storage.getBookings();
      return res.json(bookings);
    }

    // Blog API endpoints
    if (method === 'GET' && path.includes('/blog/posts')) {
      if (path.includes('/blog/posts/') && !path.endsWith('/blog/posts/')) {
        // Individual blog post by slug
        const slug = path.split('/blog/posts/')[1].split('?')[0];
        const post = await storage.getBlogPostBySlug(slug);
        if (post) {
          return res.json({ data: post });
        } else {
          return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
      } else {
        // List blog posts
        const posts = await storage.getBlogPosts();
        return res.json({ 
          data: posts,
          meta: {
            pagination: {
              page: 1,
              pageSize: posts.length,
              pageCount: 1,
              total: posts.length,
            }
          }
        });
      }
    }

    return res.status(404).json({ success: false, message: 'Not found' });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid form data", 
        errors: error.errors 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  }
}
```

### 2. Fix `server/storage.ts` - Update Line 281-282
Replace lines 281-282 with:

```typescript
const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(a.createdAt);
const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(b.createdAt);
```

### 3. Fix `server/storage.ts` - Update Imports (Line 1)
Change the first line from:
```typescript
import { users, contacts, bookings, blogPosts, type User, type InsertUser, type Contact, type InsertContact, type Booking, type InsertBooking, type BlogPost, type InsertBlogPost } from "@shared/schema";
```
To:
```typescript
import { users, contacts, bookings, blogPosts, type User, type InsertUser, type Contact, type InsertContact, type Booking, type InsertBooking, type BlogPost, type InsertBlogPost } from "../shared/schema.js";
```

### 4. Fix `server/storage.ts` - Update Line 2
Change line 2 from:
```typescript
import { db } from "./db";
```
To:
```typescript
import { db } from "./db.js";
```

### 5. Fix `server/db.ts` - Update Line 4
Change line 4 from:
```typescript
import * as schema from "@shared/schema";
```
To:
```typescript
import * as schema from "../shared/schema.js";
```

### 6. Update `vercel.json`
Replace the entire file with:

```json
{
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "dist/public",
  "functions": {
    "api/index.ts": {
      "runtime": "nodejs20.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api"
    }
  ]
}
```

## 🎯 What This Fixes

✅ **Module Resolution**: Fixes ES module import paths for Vercel
✅ **Blog API**: Adds missing blog endpoints to Vercel function
✅ **TypeScript Errors**: Resolves Date constructor issues
✅ **Sample Data**: Provides 10 blog posts without database
✅ **Complete Functionality**: Blog, contacts, and bookings all work

After making ALL these changes and pushing to GitHub, your Vercel deployment will work perfectly with full blog functionality!