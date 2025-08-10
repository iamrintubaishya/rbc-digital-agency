import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage, createMemStorageSync, MemStorage } from '../server/storage';
import { insertContactSchema, insertBookingSchema } from '../shared/schema';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  // Extract the path from the query parameter since Vercel rewrites the URL
  const path = req.query.__path ? `/${req.query.__path}` : req.url || '';

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`[Vercel] ${method} ${path} - Processing request`);

  try {
    // Await storage initialization with timeout and fallback
    let storageInstance: Awaited<typeof storage>;
    try {
      storageInstance = await Promise.race([
        storage,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Storage initialization timeout')), 10000)
        )
      ]);
    } catch (storageError) {
      console.error('[Vercel] Storage initialization failed:', (storageError as Error).message);
      // Fallback to MemStorage for blog requests
      if (path.includes('/blog/')) {
        console.log('[Vercel] Using MemStorage fallback for blog request');
        storageInstance = createMemStorageSync();
      } else {
        throw storageError;
      }
    }

    if (method === 'POST' && path.includes('/contacts')) {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storageInstance.createContact({
        ...validatedData,
        hubspotContactId: req.body.hubspotContactId || undefined
      });
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
    if (method === 'POST' && (path === '/blog/sync' || path === 'blog/sync')) {
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
          
          for (const post of requiredPosts as any[]) {
            const existing = allPosts.find((p: any) => p.slug === post.slug);
            if (!existing) {
              await storageInstance.createBlogPost(post);
              console.log('Created missing post:', post.title);
            }
          }
        }
        
        const finalPosts = await storageInstance.getBlogPosts();
        return res.json({ success: true, message: `Sync complete. Total posts: ${finalPosts.length}` });
      } catch (error) {
        console.error('Sync failed:', (error as Error).message);
        return res.status(500).json({ success: false, error: (error as Error).message });
      }
    }

    // Blog API endpoints with hardcoded fallback data
    if (method === 'GET' && (path.includes('blog/posts') || path.startsWith('/blog/posts'))) {
      if ((path.includes('blog/posts/') && !path.endsWith('blog/posts/')) || (path.startsWith('blog/posts/') && !path.endsWith('blog/posts/'))) {
        // Individual blog post by slug
        const slug = path.includes('/blog/posts/') 
          ? path.split('/blog/posts/')[1].split('?')[0]
          : path.split('blog/posts/')[1].split('?')[0];
        console.log(`[Vercel] Fetching blog post: ${slug}`);
        
        try {
          const post = await storageInstance.getBlogPostBySlug(slug);
          if (post) {
            console.log(`[Vercel] Blog post found: ${post.title}`);
            return res.json({ data: post });
          } else {
            console.log(`[Vercel] Blog post not found: ${slug}`);
            return res.status(404).json({ success: false, message: 'Blog post not found' });
          }
        } catch (error) {
          console.error(`[Vercel] Error fetching blog post ${slug}:`, (error as Error).message);
          return res.status(500).json({ success: false, message: 'Error fetching blog post' });
        }
      } else {
        // List blog posts with pagination support  
        console.log(`[Vercel] Fetching blog posts list`);
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const pageSize = parseInt(url.searchParams.get('pageSize') || '0');
        
        try {
          let allPosts = await storageInstance.getBlogPosts();
          console.log(`[Vercel] Blog posts found: ${allPosts.length}`);
        
        // Force initialization if no posts found (production fallback)
        if (allPosts.length === 0) {
          console.log('[Vercel] No posts found, forcing MemStorage initialization');
          try {
            const memStorage = createMemStorageSync();
            allPosts = await memStorage.getBlogPosts();
            console.log(`[Vercel] MemStorage initialized with ${allPosts.length} posts`);
            
            // If database is available but empty, populate it
            if (process.env.DATABASE_URL && allPosts.length > 0) {
              console.log('[Vercel] Populating empty database with MemStorage data');
              for (const post of allPosts) {
                try {
                  await storageInstance.createBlogPost({
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    excerpt: post.excerpt ?? undefined,
                    author: post.author ?? undefined,
                    coverImage: post.coverImage ?? undefined,
                    contentImages: post.contentImages ?? undefined,
                    audioUrl: post.audioUrl ?? undefined,
                    readingTime: post.readingTime ?? undefined,
                    tags: post.tags ?? undefined,
                    publishedAt: post.publishedAt?.toISOString(),
                  });
                } catch (insertError) {
                  console.warn('[Vercel] Failed to insert post:', post.title, insertError);
                }
              }
              // Refresh posts from database
              try {
                const dbPosts = await storageInstance.getBlogPosts();
                if (dbPosts.length > 0) {
                  allPosts = dbPosts;
                  console.log(`[Vercel] Database populated, now has ${allPosts.length} posts`);
                }
              } catch (refreshError) {
                console.warn('[Vercel] Failed to refresh posts from database:', refreshError);
              }
            }
          } catch (error) {
            console.error('[Vercel] MemStorage initialization failed:', error);
          }
        }
        
        // Auto-sync missing posts if database exists but has fewer than expected
        if (allPosts.length > 0 && allPosts.length < 10 && process.env.DATABASE_URL) {
          try {
            console.log('Auto-sync triggered: found', allPosts.length, 'posts, populating missing ones');
            
            // Use the MemStorage approach for fallback
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
          
          console.log(`[Vercel] Returning ${posts.length} blog posts`);
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
        } catch (error) {
          console.error('[Vercel] Error fetching blog posts:', (error as Error).message);
          // Ultimate fallback - return hardcoded posts
          try {
            console.log('[Vercel] Using ultimate hardcoded fallback');
            const hardcodedPosts = [
              {
                id: "1",
                title: "The Complete Guide to Local SEO for Service Businesses",
                slug: "complete-guide-local-seo-service-businesses", 
                excerpt: "Master local SEO strategies that help service businesses dominate their geographic markets.",
                author: "Michael Rodriguez",
                coverImage: "https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                publishedAt: "2024-12-01T00:00:00.000Z",
                createdAt: "2024-12-01T00:00:00.000Z",
                readingTime: "8 min read",
                tags: ["SEO", "Local Business", "Digital Marketing"]
              },
              {
                id: "2", 
                title: "Analytics and Data-Driven Marketing: Making Smarter Decisions",
                slug: "analytics-data-driven-marketing-decisions",
                excerpt: "Learn how to leverage analytics and data science to make smarter marketing decisions.",
                author: "Dr. Sarah Kim",
                coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                publishedAt: "2024-11-25T00:00:00.000Z",
                createdAt: "2024-11-25T00:00:00.000Z",
                readingTime: "6 min read",
                tags: ["Analytics", "Data Science", "Marketing Strategy"]
              },
              {
                id: "3",
                title: "Social Media Automation: Scale Your Content Without Losing Authenticity",
                slug: "social-media-automation-scale-content-authenticity",
                excerpt: "Discover how to automate your social media presence while maintaining genuine connections.",
                author: "Jessica Martinez",
                coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                publishedAt: "2024-11-20T00:00:00.000Z",
                createdAt: "2024-11-20T00:00:00.000Z",
                readingTime: "7 min read",
                tags: ["Social Media", "Automation", "Content Marketing"]
              },
              {
                id: "4",
                title: "Email Marketing That Converts: Advanced Segmentation Strategies",
                slug: "email-marketing-converts-advanced-segmentation",
                excerpt: "Transform your email campaigns with sophisticated segmentation and personalization techniques.",
                author: "David Chen",
                coverImage: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                publishedAt: "2024-11-15T00:00:00.000Z",
                createdAt: "2024-11-15T00:00:00.000Z",
                readingTime: "9 min read",
                tags: ["Email Marketing", "Conversion", "Segmentation"]
              },
              {
                id: "5",
                title: "The Psychology of High-Converting Landing Pages",
                slug: "psychology-high-converting-landing-pages",
                excerpt: "Understanding the psychological triggers that turn visitors into customers.",
                author: "Dr. Emily Watson",
                coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                publishedAt: "2024-11-10T00:00:00.000Z",
                createdAt: "2024-11-10T00:00:00.000Z",
                readingTime: "5 min read",
                tags: ["Landing Pages", "Psychology", "Conversion Optimization"]
              },
              {
                id: "6",
                title: "Video Marketing Trends That Will Dominate 2024",
                slug: "video-marketing-trends-dominate-2024",
                excerpt: "Stay ahead of the curve with the latest video marketing strategies and platforms.",
                author: "Marcus Thompson",
                coverImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                publishedAt: "2024-11-05T00:00:00.000Z",
                createdAt: "2024-11-05T00:00:00.000Z",
                readingTime: "6 min read",
                tags: ["Video Marketing", "Trends", "Digital Strategy"]
              },
              {
                id: "7",
                title: "AI-Powered Customer Service: Implementation Guide",
                slug: "ai-powered-customer-service-implementation",
                excerpt: "Learn how to integrate AI tools to enhance your customer service operations.",
                author: "Rachel Park",
                coverImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                publishedAt: "2024-10-30T00:00:00.000Z",
                createdAt: "2024-10-30T00:00:00.000Z",
                readingTime: "7 min read",
                tags: ["AI", "Customer Service", "Automation"]
              },
              {
                id: "8",
                title: "Content Marketing ROI: Measuring What Matters",
                slug: "content-marketing-roi-measuring-matters",
                excerpt: "Essential metrics and strategies for tracking your content marketing success.",
                author: "Alex Foster",
                coverImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                publishedAt: "2024-10-25T00:00:00.000Z",
                createdAt: "2024-10-25T00:00:00.000Z",
                readingTime: "8 min read",
                tags: ["Content Marketing", "ROI", "Analytics"]
              },
              {
                id: "9",
                title: "Mobile-First Design: Optimizing for the Smartphone Era",
                slug: "mobile-first-design-smartphone-optimization",
                excerpt: "Best practices for creating mobile experiences that convert and engage.",
                author: "Sofia Rodriguez",
                coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
                publishedAt: "2024-10-20T00:00:00.000Z",
                createdAt: "2024-10-20T00:00:00.000Z",
                readingTime: "6 min read",
                tags: ["Mobile Design", "UX", "Conversion"]
              }
            ];
            
            const posts = pageSize > 0 ? hardcodedPosts.slice(0, pageSize) : hardcodedPosts;
            console.log(`[Vercel] Hardcoded fallback returning ${posts.length} blog posts`);
            
            return res.json({ 
              data: posts,
              meta: {
                pagination: {
                  page: 1,
                  pageSize: posts.length,
                  pageCount: 1,
                  total: hardcodedPosts.length,
                }
              }
            });
          } catch (fallbackError) {
            console.error('[Vercel] Ultimate fallback failed:', (fallbackError as Error).message);
            return res.status(500).json({ 
              success: false, 
              message: 'Unable to fetch blog posts',
              error: (error as Error).message 
            });
          }
        }
      }
    }

    // Update blog post by slug
    if (method === 'PATCH' && (path.includes('/blog/posts/') || path.includes('blog/posts/'))) {
      const slug = path.includes('/blog/posts/') 
        ? path.split('/blog/posts/')[1].split('?')[0]
        : path.split('blog/posts/')[1].split('?')[0];
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