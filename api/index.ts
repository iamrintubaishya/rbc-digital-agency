import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';
import { insertContactSchema, insertBookingSchema } from '../shared/schema.js';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  const path = req.url || '';

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Await storage initialization
    const storageInstance = await storage;

    if (method === 'POST' && path.includes('/contacts')) {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storageInstance.createContact(validatedData);
      return res.json({ success: true, contact });
    }

    if (method === 'POST' && path.includes('/bookings')) {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storageInstance.createBooking(validatedData);
      return res.json({ success: true, booking });
    }

    if (method === 'GET' && path.includes('/contacts')) {
      const contacts = await storageInstance.getContacts();
      return res.json(contacts);
    }

    if (method === 'GET' && path.includes('/bookings')) {
      const bookings = await storageInstance.getBookings();
      return res.json(bookings);
    }

    // Blog API endpoints
    if (method === 'GET' && path.includes('/blog/posts')) {
      if (path.includes('/blog/posts/') && !path.endsWith('/blog/posts/')) {
        // Individual blog post by slug
        const slug = path.split('/blog/posts/')[1].split('?')[0];
        const post = await storageInstance.getBlogPostBySlug(slug);
        if (post) {
          return res.json({ data: post });
        } else {
          return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
      } else {
        // List blog posts with pagination support
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const pageSize = parseInt(url.searchParams.get('pageSize') || '0');
        const allPosts = await storageInstance.getBlogPosts();
        
        // Limit posts if pageSize is specified
        const posts = pageSize > 0 ? allPosts.slice(0, pageSize) : allPosts;
        
        return res.json({ 
          data: posts,
          meta: {
            pagination: {
              page: 1,
              pageSize: posts.length,
              pageCount: 1,
              total: allPosts.length,
            }
          }
        });
      }
    }

    // Update blog post by slug
    if (method === 'PATCH' && path.includes('/blog/posts/')) {
      const slug = path.split('/blog/posts/')[1].split('?')[0];
      const existingPost = await storageInstance.getBlogPostBySlug(slug);
      if (!existingPost) {
        return res.status(404).json({ success: false, message: 'Blog post not found' });
      }
      
      const updatedPost = await storageInstance.updateBlogPost(existingPost.id, req.body);
      if (updatedPost) {
        return res.json({ success: true, data: updatedPost });
      } else {
        return res.status(404).json({ success: false, message: 'Blog post not found' });
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