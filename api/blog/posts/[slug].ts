import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { query } = req;
  const { slug } = query;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`[Vercel Blog Post API] GET - Processing blog post: ${slug}`);

  try {
    // Default blog posts data
    const defaultBlogPosts = [
      {
        id: "1",
        title: "The Complete Guide to Local SEO for Service Businesses",
        slug: "complete-guide-local-seo-service-businesses", 
        content: `# The Complete Guide to Local SEO for Service Businesses

Local SEO is the foundation of digital marketing success for service-based businesses. Whether you're a plumber, dentist, lawyer, or any other local service provider, appearing in local search results can make or break your business.

## Why Local SEO Matters More Than Ever

In today's digital landscape, 97% of consumers search online for local businesses. When someone in your area needs your services, you want to be the first business they find.

## The Local SEO Framework

### 1. Google Business Profile Optimization
Your Google Business Profile is your digital storefront. Make sure it's complete with:
- Accurate business information
- High-quality photos
- Regular posts and updates
- Customer reviews management

### 2. Local Keyword Strategy
Target keywords that include your location:
- "dentist in [city]"
- "[city] plumbing services" 
- "best lawyer near me"

### 3. Citation Building
Ensure your business information is consistent across:
- Online directories
- Industry-specific websites
- Social media platforms
- Review sites

## Implementation Tips

Start with the basics: claim and optimize your Google Business Profile, then gradually expand to other local directories and review platforms.

Remember: Local SEO is a marathon, not a sprint. Consistent effort over time yields the best results.`,
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
        content: `# Analytics and Data-Driven Marketing: Making Smarter Decisions

In today's competitive landscape, successful marketing relies heavily on data-driven decision making. The days of "spray and pray" marketing are over – now, every campaign must be measured, analyzed, and optimized.

## The Power of Data in Marketing

Data transforms marketing from guesswork into science. With proper analytics, you can:
- Understand your audience deeply
- Optimize campaigns in real-time
- Predict future trends
- Maximize ROI on every dollar spent

## Essential Analytics Tools

### Google Analytics 4
The foundation of web analytics, GA4 provides insights into:
- Website traffic patterns
- User behavior flows
- Conversion tracking
- Audience demographics

### Social Media Analytics
Platform-specific insights help you understand:
- Engagement rates
- Audience growth
- Content performance
- Optimal posting times

## Key Metrics to Track

Focus on metrics that matter to your business goals:
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Conversion rates
- Return on Ad Spend (ROAS)

## Making Data Actionable

The real value comes from turning insights into action:
1. Set up automated reports
2. Create data-driven hypotheses
3. Test and iterate constantly
4. Share insights across teams

Remember: Data without action is just expensive noise. Use analytics to drive real business decisions.`,
        excerpt: "Learn how to leverage analytics and data science to make smarter marketing decisions.",
        author: "Dr. Sarah Kim",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        publishedAt: "2024-11-25T00:00:00.000Z",
        readingTime: 6,
        tags: ["Analytics", "Data Science", "Marketing Strategy"]
      }
    ];

    if (typeof slug === 'string') {
      const post = defaultBlogPosts.find(p => p.slug === slug);
      if (post) {
        console.log(`[Vercel Blog Post API] Blog post found: ${post.title}`);
        return res.status(200).json({ data: post });
      } else {
        console.log(`[Vercel Blog Post API] Blog post not found: ${slug}`);
        return res.status(404).json({ success: false, message: 'Blog post not found' });
      }
    }

    return res.status(400).json({ success: false, message: 'Invalid slug parameter' });

  } catch (error) {
    console.error('[Vercel Blog Post API] Error:', (error as Error).message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: (error as Error).message 
    });
  }
}