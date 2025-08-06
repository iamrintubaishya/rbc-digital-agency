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

    // Blog sync endpoint for production fixes
    if (method === 'POST' && path === '/api/blog/sync') {
      try {
        const allPosts = await storageInstance.getBlogPosts();
        console.log('Sync endpoint called, current posts:', allPosts.length);
        
        if (allPosts.length < 10) {
          // Force population of missing posts
          const requiredPosts = [
            {
              title: "The Complete Guide to Local SEO for Service Businesses",
              slug: "complete-guide-local-seo-service-businesses",
              content: "Local SEO is the foundation of digital marketing success for service-based businesses...",
              excerpt: "Master local SEO strategies that help service businesses dominate their geographic markets.",
              author: "Michael Rodriguez",
              publishedAt: "2024-12-01T00:00:00.000Z"
            },
            {
              title: "Analytics and Data-Driven Marketing: Making Smarter Decisions", 
              slug: "analytics-data-driven-marketing-decisions",
              content: "In today's competitive landscape, successful marketing relies heavily on data-driven decision making...",
              excerpt: "Learn how to leverage analytics and data science to make smarter marketing decisions.",
              author: "Dr. Sarah Kim",
              publishedAt: "2024-11-25T00:00:00.000Z"
            }
          ];
          
          for (const post of requiredPosts) {
            const existing = allPosts.find(p => p.slug === post.slug);
            if (!existing) {
              await storageInstance.createBlogPost(post);
              console.log('Created missing post:', post.title);
            }
          }
        }
        
        const finalPosts = await storageInstance.getBlogPosts();
        return res.json({ success: true, message: `Sync complete. Total posts: ${finalPosts.length}` });
      } catch (error) {
        console.error('Sync failed:', error);
        return res.status(500).json({ success: false, error: error.message });
      }
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
        let allPosts = await storageInstance.getBlogPosts();
        
        // Auto-sync missing posts if database has fewer than expected
        if (allPosts.length < 5 && process.env.DATABASE_URL) {
          try {
            console.log('Auto-sync triggered: found', allPosts.length, 'posts, populating missing ones');
            
            // Use the MemStorage approach for fallback
            const { MemStorage } = require('../server/storage.js');
            const memStorage = new MemStorage();
            const memPosts = await memStorage.getBlogPosts();
            
            for (const memPost of memPosts) {
              const existing = allPosts.find(p => p.slug === memPost.slug);
              if (!existing) {
                console.log('Adding missing post:', memPost.title);
                await storageInstance.createBlogPost({
                  title: memPost.title,
                  slug: memPost.slug,
                  content: memPost.content,
                  excerpt: memPost.excerpt ?? undefined,
                  author: memPost.author ?? undefined,
                  coverImage: memPost.coverImage ?? undefined,
                  contentImages: memPost.contentImages ?? undefined,
                  audioUrl: memPost.audioUrl ?? undefined,
                  readingTime: memPost.readingTime ?? undefined,
                  tags: memPost.tags ?? undefined,
                  publishedAt: memPost.publishedAt?.toISOString(),
                });
              }
            }
            allPosts = await storageInstance.getBlogPosts();
            console.log('Auto-sync completed, now have', allPosts.length, 'posts');
          } catch (error) {
            console.warn('Auto-sync failed:', error);
          }
        }
        
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