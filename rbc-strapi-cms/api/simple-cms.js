// Simple CMS API for Vercel deployment
// This replaces the complex Strapi setup with a lightweight solution

const blogPosts = [
  {
    id: 1,
    title: "5 Digital Marketing Trends That Will Dominate 2025",
    slug: "digital-marketing-trends-2025",
    excerpt: "Stay ahead of the competition with these emerging digital marketing trends that will shape the industry in 2025.",
    content: `<h2>The Future of Digital Marketing is Here</h2>
    <p>As we move into 2025, digital marketing continues to evolve at breakneck speed. Local service businesses need to stay ahead of these trends to maintain their competitive edge.</p>
    
    <h3>1. AI-Powered Personalization</h3>
    <p>Artificial intelligence is revolutionizing how businesses interact with customers. From chatbots to personalized content recommendations, AI is making customer experiences more relevant and engaging.</p>
    
    <h3>2. Voice Search Optimization</h3>
    <p>With smart speakers becoming ubiquitous, optimizing for voice search is no longer optional. Local businesses need to focus on conversational keywords and question-based content.</p>
    
    <h3>3. Video-First Content Strategy</h3>
    <p>Video content continues to dominate social media platforms. Short-form videos, live streaming, and interactive video content are driving engagement rates through the roof.</p>
    
    <h3>4. Hyper-Local Marketing</h3>
    <p>Location-based marketing is becoming more sophisticated. Businesses can now target customers within specific geographic areas with unprecedented precision.</p>
    
    <h3>5. Privacy-First Marketing</h3>
    <p>With increasing privacy regulations, businesses must adapt their marketing strategies to respect user privacy while still delivering effective campaigns.</p>`,
    author: "Sarah Mitchell",
    publishedAt: "2024-12-15T10:00:00.000Z",
    cover: null
  },
  {
    id: 2,
    title: "How to Measure ROI on Your Digital Marketing Investment",
    slug: "measure-digital-marketing-roi",
    excerpt: "Learn the essential metrics and tools you need to track the success of your digital marketing campaigns.",
    content: `<h2>Understanding Digital Marketing ROI</h2>
    <p>Return on Investment (ROI) is the holy grail of marketing metrics. For local service businesses, understanding which marketing efforts drive real results is crucial for sustainable growth.</p>
    
    <h3>Key Metrics to Track</h3>
    <ul>
    <li><strong>Customer Acquisition Cost (CAC)</strong> - How much it costs to acquire a new customer</li>
    <li><strong>Customer Lifetime Value (CLV)</strong> - The total value a customer brings over their relationship with your business</li>
    <li><strong>Conversion Rate</strong> - The percentage of visitors who take desired actions</li>
    <li><strong>Cost Per Lead (CPL)</strong> - How much you spend to generate each lead</li>
    </ul>
    
    <h3>Tools for Measuring ROI</h3>
    <p>Google Analytics, Facebook Ads Manager, and CRM systems provide valuable insights into campaign performance. Setting up proper tracking is essential for accurate measurement.</p>
    
    <h3>Attribution Models</h3>
    <p>Understanding how customers interact with your brand across multiple touchpoints helps you allocate budget more effectively across different marketing channels.</p>`,
    author: "Mike Johnson",
    publishedAt: "2024-12-10T14:30:00.000Z",
    cover: null
  },
  {
    id: 3,
    title: "Local SEO Secrets: Dominate Your Market in 2025",
    slug: "local-seo-secrets-2025",
    excerpt: "Discover the advanced local SEO strategies that will help your business rank higher in local search results.",
    content: `<h2>Local SEO is Your Secret Weapon</h2>
    <p>For local service businesses, appearing in local search results can make or break your marketing success. Here are the strategies that will set you apart from competitors.</p>
    
    <h3>Google Business Profile Optimization</h3>
    <p>Your Google Business Profile is your digital storefront. Keep it updated with accurate information, high-quality photos, and regular posts to improve visibility.</p>
    
    <h3>Local Keyword Strategy</h3>
    <p>Target location-specific keywords that your customers are actually searching for. "Plumber near me" and "best dentist in [city]" are goldmines for local businesses.</p>
    
    <h3>Online Reviews Management</h3>
    <p>Positive reviews are ranking factors and trust signals. Implement a systematic approach to encouraging and managing customer reviews across all platforms.</p>
    
    <h3>Local Link Building</h3>
    <p>Build relationships with local organizations, chambers of commerce, and complementary businesses to earn valuable local backlinks.</p>
    
    <h3>Mobile Optimization</h3>
    <p>Local searches happen on mobile devices. Ensure your website loads quickly and provides an excellent mobile experience.</p>`,
    author: "Jennifer Chen",
    publishedAt: "2024-12-05T09:15:00.000Z",
    cover: null
  },
  {
    id: 4,
    title: "Social Media Content That Converts: A Guide for Service Businesses",
    slug: "social-media-content-converts",
    excerpt: "Create social media content that not only engages your audience but also drives real business results.",
    content: `<h2>Beyond Likes and Shares: Content That Drives Business</h2>
    <p>Social media success isn't measured by vanity metrics. For service businesses, the goal is to create content that builds trust, showcases expertise, and converts followers into customers.</p>
    
    <h3>Content Types That Work</h3>
    <ul>
    <li><strong>Before/After Showcases</strong> - Visual proof of your work builds credibility</li>
    <li><strong>Educational Content</strong> - Position yourself as the expert in your field</li>
    <li><strong>Customer Testimonials</strong> - Social proof is incredibly powerful</li>
    <li><strong>Behind-the-Scenes</strong> - Humanize your brand and build connections</li>
    </ul>
    
    <h3>Platform-Specific Strategies</h3>
    <p>Each social media platform has its own culture and best practices. Tailor your content to match platform expectations while maintaining brand consistency.</p>
    
    <h3>Engagement Strategies</h3>
    <p>Respond promptly to comments and messages. Use social media as a customer service channel to build relationships and resolve issues publicly.</p>
    
    <h3>Conversion Optimization</h3>
    <p>Include clear calls-to-action in your posts. Whether it's booking a consultation or visiting your website, make it easy for followers to take the next step.</p>`,
    author: "David Rodriguez",
    publishedAt: "2024-11-28T16:45:00.000Z",
    cover: null
  },
  {
    id: 5,
    title: "Email Marketing Automation for Local Service Businesses",
    slug: "email-marketing-automation-local-services",
    excerpt: "Set up email automation sequences that nurture leads and keep your business top-of-mind with customers.",
    content: `<h2>Email Marketing: The Unsung Hero of Digital Marketing</h2>
    <p>While social media gets all the attention, email marketing consistently delivers the highest ROI for local service businesses. Here's how to automate your email marketing for maximum impact.</p>
    
    <h3>Welcome Series</h3>
    <p>Create a series of emails that introduce new subscribers to your business, share your story, and provide valuable tips related to your services.</p>
    
    <h3>Lead Nurturing Sequences</h3>
    <p>Not everyone is ready to buy immediately. Nurture leads with educational content that builds trust and positions you as the expert they'll think of when they're ready.</p>
    
    <h3>Seasonal Campaigns</h3>
    <p>Plan email campaigns around seasonal needs. HVAC companies can remind customers about maintenance before summer and winter, while landscapers can promote seasonal services.</p>
    
    <h3>Segmentation Strategies</h3>
    <p>Segment your email list based on customer behavior, interests, and demographics to send more relevant, targeted messages.</p>
    
    <h3>Performance Tracking</h3>
    <p>Monitor open rates, click-through rates, and conversions to optimize your email campaigns for better results.</p>`,
    author: "Lisa Thompson",
    publishedAt: "2024-11-20T11:30:00.000Z",
    cover: null
  }
];

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req;
  
  try {
    // Parse URL and route requests
    if (url === '/api/articles') {
      // Return all articles
      res.status(200).json({
        data: blogPosts.map(post => ({
          id: post.id,
          attributes: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            publishedAt: post.publishedAt,
            cover: post.cover
          }
        }))
      });
    } else if (url.startsWith('/api/articles/')) {
      // Return specific article by ID or slug
      const identifier = url.split('/api/articles/')[1];
      const post = blogPosts.find(p => 
        p.id.toString() === identifier || p.slug === identifier
      );
      
      if (post) {
        res.status(200).json({
          data: {
            id: post.id,
            attributes: {
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              content: post.content,
              author: post.author,
              publishedAt: post.publishedAt,
              cover: post.cover
            }
          }
        });
      } else {
        res.status(404).json({
          error: {
            status: 404,
            name: 'NotFoundError',
            message: 'Article not found'
          }
        });
      }
    } else if (url === '/admin' || url.startsWith('/admin/')) {
      // Simple admin interface
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>RBC CMS Admin</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; background: #f8f9fa; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2563eb; margin-bottom: 30px; }
            .post { border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin-bottom: 20px; }
            .post h3 { margin: 0 0 10px 0; color: #1f2937; }
            .post p { color: #6b7280; margin: 5px 0; }
            .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
            .stat { background: #f3f4f6; padding: 20px; border-radius: 6px; text-align: center; }
            .stat h3 { margin: 0; font-size: 2em; color: #2563eb; }
            .stat p { margin: 5px 0 0 0; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 RBC Digital Agency CMS</h1>
            
            <div class="stats">
              <div class="stat">
                <h3>${blogPosts.length}</h3>
                <p>Published Articles</p>
              </div>
              <div class="stat">
                <h3>✅</h3>
                <p>System Status</p>
              </div>
              <div class="stat">
                <h3>API</h3>
                <p>Ready & Working</p>
              </div>
            </div>
            
            <h2>Published Articles</h2>
            ${blogPosts.map(post => `
              <div class="post">
                <h3>${post.title}</h3>
                <p><strong>Author:</strong> ${post.author}</p>
                <p><strong>Published:</strong> ${new Date(post.publishedAt).toLocaleDateString()}</p>
                <p><strong>Slug:</strong> /${post.slug}</p>
                <p>${post.excerpt}</p>
              </div>
            `).join('')}
            
            <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="text-align: center; color: #6b7280;">
              Simple CMS API running on Vercel ✨<br>
              API Endpoint: <code>/api/articles</code>
            </p>
          </div>
        </body>
        </html>
      `);
    } else {
      // Default response
      res.status(200).json({
        message: 'RBC Digital Agency CMS API',
        version: '1.0.0',
        endpoints: {
          articles: '/api/articles',
          admin: '/admin'
        },
        status: 'operational'
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: {
        status: 500,
        name: 'InternalServerError',
        message: error.message
      }
    });
  }
};