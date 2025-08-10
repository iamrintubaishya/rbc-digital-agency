import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`[Vercel Blog Posts API] ${req.method} - Processing request`);

  try {
    // For now, return the MemStorage blog posts directly to ensure the API works
    const defaultBlogPosts = [
      {
        id: "1",
        title: "The Complete Guide to Local SEO for Service Businesses",
        slug: "complete-guide-local-seo-service-businesses", 
        excerpt: "Master local SEO strategies that help service businesses dominate their geographic markets.",
        author: "Michael Rodriguez",
        coverImage: "https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        publishedAt: "2024-12-01T00:00:00.000Z",
        readingTime: 8,
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
        readingTime: 6,
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
        readingTime: 7,
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
        readingTime: 9,
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
        readingTime: 5,
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
        readingTime: 6,
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
        readingTime: 7,
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
        readingTime: 8,
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
        readingTime: 6,
        tags: ["Mobile Design", "UX", "Conversion"]
      },
      {
        id: "10",
        title: "Building Brand Authority Through Thought Leadership",
        slug: "building-brand-authority-thought-leadership",
        excerpt: "Strategies for establishing your brand as an industry authority and trusted advisor.",
        author: "Jonathan Hayes",
        coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        publishedAt: "2024-10-15T00:00:00.000Z",
        readingTime: 7,
        tags: ["Brand Authority", "Thought Leadership", "Content Strategy"]
      }
    ];

    // Get page size from query parameters
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '0');
    
    // Limit posts if pageSize is specified
    const posts = pageSize > 0 ? defaultBlogPosts.slice(0, pageSize) : defaultBlogPosts;
    
    console.log(`[Vercel Blog Posts API] Returning ${posts.length} blog posts`);
    
    return res.status(200).json({ 
      data: posts,
      meta: {
        pagination: {
          page: 1,
          pageSize: posts.length,
          pageCount: 1,
          total: defaultBlogPosts.length,
        }
      }
    });

  } catch (error) {
    console.error('[Vercel Blog Posts API] Error:', (error as Error).message);
    return res.status(500).json({ 
      success: false, 
      message: 'Unable to fetch blog posts',
      error: (error as Error).message 
    });
  }
}