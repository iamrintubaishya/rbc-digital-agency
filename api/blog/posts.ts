import type { VercelRequest, VercelResponse } from '@vercel/node';

// Hardcoded fallback blog posts for production reliability
const FALLBACK_BLOG_POSTS = [
  {
    id: "a9dd3ba1-5405-457c-a68b-dae",
    title: "The Complete Guide to Local SEO for Service Businesses",
    slug: "complete-guide-local-seo-service-businesses",
    content: "Local SEO is the foundation of digital marketing success for service-based businesses. When potential customers search for services in your area, you want to be the first business they find. This comprehensive guide will walk you through the essential strategies to dominate local search results and attract more qualified leads through search engines.\n\n## Understanding Local SEO Fundamentals\n\nLocal SEO focuses on optimizing your online presence to attract more business from relevant local searches. These searches take place on Google and other search engines when customers look for businesses and services near their location.\n\n## Google My Business Optimization\n\nYour Google My Business (GMB) profile is the cornerstone of local SEO. Ensure your business information is complete, accurate, and regularly updated. Add high-quality photos, respond to reviews promptly, and post regular updates about your services, special offers, and business news.\n\n## Local Keyword Research\n\nIdentify the terms your local customers use when searching for your services. Include location-specific keywords like city names, neighborhoods, and regional landmarks. Use tools like Google Keyword Planner and Google Trends to discover popular local search terms.\n\n## On-Page Optimization for Local Search\n\nOptimize your website's title tags, meta descriptions, and content with local keywords. Create location-specific landing pages for different service areas. Include your business name, address, and phone number (NAP) consistently across all pages.\n\n## Building Local Citations and Backlinks\n\nList your business in relevant local directories, industry-specific platforms, and review sites. Ensure your NAP information is consistent across all platforms. Build relationships with other local businesses and organizations to earn quality local backlinks.\n\n## Customer Reviews and Reputation Management\n\nEncourage satisfied customers to leave reviews on Google, Yelp, and other relevant platforms. Respond professionally to all reviews, both positive and negative. Use feedback to improve your services and demonstrate your commitment to customer satisfaction.\n\n## Local Content Marketing\n\nCreate content that addresses local concerns and interests. Write blog posts about local events, community involvement, and area-specific tips related to your industry. This helps establish your business as a local authority and improves search relevance.\n\nImplementing these local SEO strategies will significantly improve your visibility in local search results and drive more qualified leads to your business.",
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
    content: "In today's competitive landscape, successful marketing relies heavily on data-driven decision making. Analytics provide the insights needed to understand customer behavior, optimize campaigns, and maximize return on investment. This comprehensive guide will help you leverage data to make smarter marketing decisions that drive real business growth.\n\n## Setting Up Comprehensive Analytics\n\nStart with Google Analytics 4 to track website performance, user behavior, and conversion paths. Implement conversion tracking for all important actions: form submissions, phone calls, downloads, and purchases. Use UTM parameters to track campaign performance across different channels.\n\n## Key Performance Indicators (KPIs)\n\nFocus on metrics that directly impact business goals. Track leading indicators like traffic and engagement alongside lagging indicators like conversions and revenue. Establish benchmarks and set realistic targets based on historical performance and industry standards.\n\n## Customer Journey Analysis\n\nMap the customer journey from awareness to conversion and beyond. Identify touchpoints where customers interact with your brand and measure the effectiveness of each channel. Use attribution modeling to understand how different marketing efforts contribute to conversions.\n\n## Segmentation and Personalization\n\nSegment your audience based on demographics, behavior, source, and other relevant criteria. Create personalized experiences for different segments using targeted content, offers, and messaging. Test different approaches to see what resonates best with each audience group.\n\n## A/B Testing and Experimentation\n\nImplement systematic testing to optimize marketing performance. Test everything from email subject lines to landing page designs. Use statistical significance to ensure reliable results and avoid making decisions based on insufficient data.\n\n## Marketing Attribution\n\nUnderstand how different marketing channels work together to drive conversions. Implement multi-touch attribution to see the full customer journey. This helps you allocate budget more effectively and optimize underperforming channels.\n\n## Reporting and Insights\n\nCreate regular reports that focus on actionable insights rather than just data dumps. Use visualization tools to make complex data easy to understand. Share findings with stakeholders and use insights to inform future marketing strategies.\n\nBy embracing data-driven marketing, you'll make more informed decisions, optimize your campaigns more effectively, and achieve better results from your marketing investments.",
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
    content: "Social media has become an essential channel for local service businesses to connect with customers, build brand awareness, and drive bookings. This guide covers platform-specific strategies for maximum impact and sustainable growth in your local market.\n\n## Choosing the Right Platforms\n\nNot all social media platforms are equally effective for local service businesses. Facebook and Instagram are typically most valuable for reaching local audiences. LinkedIn works well for B2B services, while TikTok can be powerful for reaching younger demographics. Focus your efforts on platforms where your target customers are most active.\n\n## Creating Engaging Local Content\n\nShare content that resonates with your local community. Post about local events, feature customer success stories, and showcase your involvement in community activities. Behind-the-scenes content helps humanize your business and builds personal connections with potential customers.\n\n## Building Local Community Engagement\n\nJoin local Facebook groups and participate in community discussions. Share valuable insights and help answer questions without being overly promotional. Engage with other local businesses and create partnerships that benefit both parties and the community.\n\n## Leveraging User-Generated Content\n\nEncourage customers to share photos and reviews of your services. Create branded hashtags for your business and local area. Repost customer content (with permission) to build social proof and show appreciation for your clients.\n\n## Local Social Media Advertising\n\nUse geographic targeting to reach potential customers in your service area. Create lookalike audiences based on your best customers. Test different ad formats like carousel ads, video ads, and lead generation forms to see what works best for your business.\n\n## Monitoring and Responding\n\nMonitor mentions of your business across social platforms. Respond promptly to comments, messages, and reviews. Use social listening tools to track conversations about your industry and identify opportunities to join relevant discussions.\n\n## Measuring Social Media ROI\n\nTrack metrics that matter to your business: website traffic from social media, lead generation, and actual conversions. Use UTM parameters to track social media traffic in Google Analytics. Don't focus solely on vanity metrics like likes and followers.\n\nConsistent, authentic social media marketing builds trust with your local community and creates a steady stream of qualified leads for your service business.",
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
  const { method } = req;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`[Vercel Blog API] ${method} - Processing blog posts request`);
  
  // Quick test endpoint
  if (method === 'GET' && req.url === '/test') {
    return res.json({ 
      status: 'Blog API working',
      timestamp: new Date().toISOString(),
      fallbackPosts: FALLBACK_BLOG_POSTS.length 
    });
  }

  try {
    if (method === 'GET') {
      console.log(`[Vercel Blog API] Fetching blog posts list`);
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const pageSize = parseInt(url.searchParams.get('pageSize') || '0');
      
      // Use hardcoded posts directly for production reliability
      const allPosts = FALLBACK_BLOG_POSTS;
      console.log(`[Vercel Blog API] Using ${allPosts.length} hardcoded blog posts`);
      
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