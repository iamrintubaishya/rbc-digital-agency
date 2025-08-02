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