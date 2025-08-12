import type { VercelRequest, VercelResponse } from '@vercel/node';

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
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, query } = req;
  const { slug } = query;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`[Vercel Blog API] ${method} - Processing blog post: ${slug}`);

  try {
    if (method === 'GET' && typeof slug === 'string') {
      // Find post in hardcoded fallback data
      const post = FALLBACK_BLOG_POSTS.find(p => p.slug === slug);
      if (post) {
        console.log(`[Vercel Blog API] Blog post found: ${post.title}`);
        return res.json({ data: post });
      } else {
        console.log(`[Vercel Blog API] Blog post not found: ${slug}`);
        return res.status(404).json({ success: false, message: 'Blog post not found' });
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