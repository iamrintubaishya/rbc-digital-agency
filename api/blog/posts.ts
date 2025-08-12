import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage, createMemStorageSync, MemStorage } from '../../server/storage';

// Hardcoded fallback blog posts for production reliability
const FALLBACK_BLOG_POSTS = [
  {
    id: "a9dd3ba1-5405-457c-a68b-dae",
    title: "The Complete Guide to Local SEO for Service Businesses",
    slug: "complete-guide-local-seo-service-businesses",
    content: "Local SEO is the foundation of digital marketing success for service-based businesses. When potential customers search for services in your area, you want to be the first business they find. This comprehensive guide will walk you through the essential strategies to dominate local search results...",
    excerpt: "Master local SEO strategies that help service businesses dominate their geographic markets and attract more qualified leads.",
    author: "Michael Rodriguez",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    readingTime: "8 min read",
    tags: ["SEO", "Local Marketing", "Digital Strategy"],
    publishedAt: "2024-12-01T00:00:00.000Z",
    createdAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: "b8cc2aa0-4304-356b-a57b-cde",
    title: "Analytics and Data-Driven Marketing: Making Smarter Decisions",
    slug: "analytics-data-driven-marketing-decisions",
    content: "In today's competitive landscape, successful marketing relies heavily on data-driven decision making. Analytics provide the insights needed to understand customer behavior, optimize campaigns, and maximize ROI...",
    excerpt: "Learn how to leverage analytics and data science to make smarter marketing decisions that drive real business growth.",
    author: "Dr. Sarah Kim",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    readingTime: "10 min read",
    tags: ["Analytics", "Data Science", "Marketing Strategy"],
    publishedAt: "2024-11-25T00:00:00.000Z",
    createdAt: "2024-11-25T00:00:00.000Z"
  },
  {
    id: "c7bb1990-3203-245a-956a-bcd",
    title: "Social Media Marketing for Local Service Businesses",
    slug: "social-media-marketing-local-service-businesses",
    content: "Social media has become an essential channel for local service businesses to connect with customers, build brand awareness, and drive bookings. This guide covers platform-specific strategies for maximum impact...",
    excerpt: "Discover proven social media strategies that help local service businesses build communities and convert followers into customers.",
    author: "Jessica Chen",
    coverImage: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    readingTime: "7 min read",
    tags: ["Social Media", "Local Marketing", "Community Building"],
    publishedAt: "2024-11-20T00:00:00.000Z",
    createdAt: "2024-11-20T00:00:00.000Z"
  },
  {
    id: "d6aa0880-2102-134a-845a-abc",
    title: "AI Automation for Small Business Operations",
    slug: "ai-automation-small-business-operations",
    content: "Artificial Intelligence is revolutionizing how small businesses operate, offering affordable automation solutions that were once only available to large enterprises...",
    excerpt: "Learn how AI automation can streamline your business operations and free up time for growth-focused activities.",
    author: "David Park",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    readingTime: "9 min read",
    tags: ["AI", "Automation", "Business Operations"],
    publishedAt: "2024-11-15T00:00:00.000Z",
    createdAt: "2024-11-15T00:00:00.000Z"
  },
  {
    id: "e5990770-1001-023a-734a-def",
    title: "Creating High-Converting Landing Pages",
    slug: "creating-high-converting-landing-pages",
    content: "A well-designed landing page can be the difference between a visitor and a customer. This comprehensive guide covers the essential elements of high-converting pages...",
    excerpt: "Master the art and science of creating landing pages that convert visitors into loyal customers.",
    author: "Maria Santos",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    readingTime: "6 min read",
    tags: ["Landing Pages", "Conversion", "Web Design"],
    publishedAt: "2024-11-10T00:00:00.000Z",
    createdAt: "2024-11-10T00:00:00.000Z"
  },
  {
    id: "f4880660-0900-912a-623a-ghi",
    title: "Email Marketing Strategies That Actually Work",
    slug: "email-marketing-strategies-that-work",
    content: "Email marketing remains one of the highest ROI channels for businesses. Learn proven strategies to build engaged lists and create campaigns that convert...",
    excerpt: "Discover email marketing tactics that drive real results and build lasting customer relationships.",
    author: "Alex Thompson",
    coverImage: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    readingTime: "8 min read",
    tags: ["Email Marketing", "Customer Retention", "Automation"],
    publishedAt: "2024-11-05T00:00:00.000Z",
    createdAt: "2024-11-05T00:00:00.000Z"
  },
  {
    id: "g3770550-0800-801a-512a-jkl",
    title: "The Future of Digital Marketing: Trends to Watch",
    slug: "future-digital-marketing-trends",
    content: "The digital marketing landscape is constantly evolving. Stay ahead of the curve by understanding the emerging trends that will shape the industry...",
    excerpt: "Get insights into the latest digital marketing trends and prepare your business for the future.",
    author: "Dr. Emily Zhang",
    coverImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    readingTime: "11 min read",
    tags: ["Future Trends", "Digital Strategy", "Innovation"],
    publishedAt: "2024-10-30T00:00:00.000Z",
    createdAt: "2024-10-30T00:00:00.000Z"
  },
  {
    id: "h2660440-0700-690a-401a-mno",
    title: "Measuring Marketing ROI: Metrics That Matter",
    slug: "measuring-marketing-roi-metrics-matter",
    content: "Understanding which metrics truly matter for your business is crucial for marketing success. Learn how to track and optimize the right KPIs...",
    excerpt: "Learn to track the marketing metrics that actually impact your bottom line and business growth.",
    author: "Robert Kim",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    readingTime: "7 min read",
    tags: ["ROI", "Analytics", "Performance Tracking"],
    publishedAt: "2024-10-25T00:00:00.000Z",
    createdAt: "2024-10-25T00:00:00.000Z"
  },
  {
    id: "i1550330-0600-579a-290a-pqr",
    title: "Building Brand Authority in Your Local Market",
    slug: "building-brand-authority-local-market",
    content: "Establishing your business as the go-to authority in your local market requires strategic content creation and community engagement...",
    excerpt: "Build trust and authority in your local market with proven branding and content strategies.",
    author: "Lisa Rodriguez",
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    readingTime: "9 min read",
    tags: ["Brand Authority", "Local Marketing", "Content Strategy"],
    publishedAt: "2024-10-20T00:00:00.000Z",
    createdAt: "2024-10-20T00:00:00.000Z"
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`[Vercel Blog API] ${method} - Processing blog posts request`);

  try {
    // Initialize storage with timeout and fallback
    let storageInstance: Awaited<typeof storage>;
    try {
      storageInstance = await Promise.race([
        storage,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Storage initialization timeout')), 10000)
        )
      ]);
    } catch (storageError) {
      console.error('[Vercel Blog API] Storage initialization failed:', (storageError as Error).message);
      console.log('[Vercel Blog API] Using MemStorage fallback');
      storageInstance = createMemStorageSync();
    }

    if (method === 'GET') {
      console.log(`[Vercel Blog API] Fetching blog posts list`);
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const pageSize = parseInt(url.searchParams.get('pageSize') || '0');
      
      try {
        let allPosts = await storageInstance.getBlogPosts();
        console.log(`[Vercel Blog API] Blog posts found: ${allPosts.length}`);
        
        // Force initialization if no posts found (production fallback)
        if (allPosts.length === 0) {
          console.log('[Vercel Blog API] No posts found, forcing MemStorage initialization');
          try {
            const memStorage = createMemStorageSync();
            allPosts = await memStorage.getBlogPosts();
            console.log(`[Vercel Blog API] MemStorage initialized with ${allPosts.length} posts`);
            
            // If database is available but empty, populate it
            if (process.env.DATABASE_URL && allPosts.length > 0) {
              console.log('[Vercel Blog API] Populating empty database with MemStorage data');
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
                  console.warn('[Vercel Blog API] Failed to insert post:', post.title, insertError);
                }
              }
              // Refresh posts from database
              try {
                const dbPosts = await storageInstance.getBlogPosts();
                if (dbPosts.length > 0) {
                  allPosts = dbPosts;
                  console.log(`[Vercel Blog API] Database populated, now has ${allPosts.length} posts`);
                }
              } catch (refreshError) {
                console.warn('[Vercel Blog API] Failed to refresh posts from database:', refreshError);
              }
            }
          } catch (error) {
            console.error('[Vercel Blog API] MemStorage initialization failed:', error);
          }
        }
        
        // Limit posts if pageSize is specified
        const posts = pageSize > 0 ? allPosts.slice(0, pageSize) : allPosts;
        
        console.log(`[Vercel Blog API] Returning ${posts.length} blog posts`);
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
        console.error('[Vercel Blog API] Error fetching blog posts:', (error as Error).message);
        // Ultimate fallback - return MemStorage posts
        try {
          console.log('[Vercel Blog API] Using ultimate MemStorage fallback');
          const memStorage = createMemStorageSync();
          const fallbackPosts = await memStorage.getBlogPosts();
          const posts = pageSize > 0 ? fallbackPosts.slice(0, pageSize) : fallbackPosts;
          console.log(`[Vercel Blog API] Fallback returning ${posts.length} blog posts`);
          
          return res.json({ 
            data: posts,
            meta: {
              pagination: {
                page: 1,
                pageSize: posts.length,
                pageCount: 1,
                total: fallbackPosts.length,
              }
            }
          });
        } catch (fallbackError) {
          console.error('[Vercel Blog API] Ultimate fallback failed:', (fallbackError as Error).message);
          console.log('[Vercel Blog API] Using hardcoded fallback posts');
          const url = new URL(req.url || '', `http://${req.headers.host}`);
          const pageSize = parseInt(url.searchParams.get('pageSize') || '0');
          const posts = pageSize > 0 ? FALLBACK_BLOG_POSTS.slice(0, pageSize) : FALLBACK_BLOG_POSTS;
          
          return res.json({ 
            data: posts,
            meta: {
              pagination: {
                page: 1,
                pageSize: posts.length,
                pageCount: 1,
                total: FALLBACK_BLOG_POSTS.length,
              }
            }
          });
        }
      }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });

  } catch (error) {
    console.error('[Vercel Blog API] Handler error:', (error as Error).message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: (error as Error).message 
    });
  }
}