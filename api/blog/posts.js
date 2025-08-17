// Vercel serverless function for blog posts
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const BLOG_POSTS = [
      {
        id: "a9dd3ba1-5405-457c-a68b-dae537e6076c",
        title: "5 Digital Marketing Strategies That Drive Local Business Growth",
        slug: "5-digital-marketing-strategies-local-business-growth",
        content: "The digital marketing landscape continues to evolve at breakneck speed. As we head into 2025, businesses need to stay ahead of emerging trends to maintain their competitive edge. Here are the five most impactful trends that will shape digital marketing strategies this year.\n\n## 1. AI-Powered Personalization at Scale\n\nArtificial intelligence is revolutionizing how we deliver personalized experiences. From dynamic content optimization to predictive customer behavior analysis, AI enables marketers to create highly targeted campaigns that resonate with individual users. Smart automation tools can now adjust messaging, timing, and channel selection in real-time based on user interactions.\n\n## 2. Voice Search Optimization\n\nWith voice assistants becoming increasingly sophisticated, optimizing for voice search is no longer optional. Businesses must adapt their SEO strategies to accommodate natural language queries and conversational search patterns. This includes focusing on long-tail keywords and featured snippet optimization.\n\n## 3. Interactive Video Content\n\nStatic video content is giving way to interactive experiences. Features like clickable hotspots, branching narratives, and real-time polls are transforming passive viewers into active participants. This engagement boost translates directly into higher conversion rates and brand loyalty.\n\n## 4. Privacy-First Marketing\n\nWith increasing data privacy regulations and growing consumer awareness, marketers must prioritize transparent, consent-based data collection. First-party data strategies and contextual advertising are becoming essential alternatives to traditional tracking methods.\n\n## 5. Social Commerce Integration\n\nSocial platforms are evolving into comprehensive shopping destinations. Seamless integration between social content and e-commerce functionality allows customers to discover, research, and purchase products without leaving their favorite platforms.\n\nThese trends represent fundamental shifts in how consumers interact with brands online. Businesses that adapt early will capture the most significant advantages in the evolving digital marketplace.",
        excerpt: "Discover the five game-changing digital marketing trends that will define success in 2025, from AI-powered personalization to social commerce integration.",
        author: "Sarah Mitchell",
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        readingTime: "12 min read",
        tags: ["Digital Marketing", "Trends", "AI", "Strategy"],
        publishedAt: "2024-12-15T00:00:00.000Z",
        createdAt: "2024-12-15T00:00:00.000Z"
      },
      {
        id: "b8cc2aa0-4304-356b-a57b-cde537e6076d",
        title: "The Complete Guide to Local SEO for Service Businesses",
        slug: "complete-guide-local-seo-service-businesses",
        content: "Local SEO is the lifeblood of service-based businesses. Whether you're a plumber, dentist, or consultant, your ability to be found by nearby customers directly impacts your bottom line. This comprehensive guide covers everything you need to dominate local search results.\n\n## Understanding Local Search Intent\n\nLocal search queries fall into three categories: navigational (finding a specific business), informational (learning about local services), and transactional (ready to hire). Understanding these intents helps you create content that matches what customers are actually searching for.\n\n## Google Business Profile Optimization\n\nYour Google Business Profile is your digital storefront. Complete every section: business hours, contact information, services offered, and high-quality photos. Regular posts and prompt responses to reviews signal to Google that your business is active and customer-focused.\n\n## Citation Building Strategy\n\nConsistent business information across online directories builds trust with search engines. Focus on major directories like Yelp, YellowPages, and industry-specific platforms. Ensure your Name, Address, and Phone number (NAP) information is identical everywhere.\n\n## Review Management\n\nCustomer reviews are ranking factors and conversion drivers. Implement a systematic approach to requesting reviews from satisfied customers. Respond professionally to all reviews, both positive and negative, to demonstrate excellent customer service.\n\n## Local Content Marketing\n\nCreate content that speaks to local customers' needs. This includes location-specific landing pages, local event coverage, and community involvement stories. Local content helps establish your business as a trusted community resource.\n\n## Mobile Optimization\n\nLocal searches happen predominantly on mobile devices. Ensure your website loads quickly, displays properly on small screens, and makes it easy for customers to contact you with prominent click-to-call buttons.\n\nImplementing these strategies systematically will significantly improve your local search visibility and drive more qualified leads to your business.",
        excerpt: "Master local SEO with this comprehensive guide designed specifically for service businesses looking to dominate their local market.",
        author: "Mike Rodriguez",
        coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44443?w=800&h=600&fit=crop",
        readingTime: "15 min read",
        tags: ["Local SEO", "Service Business", "Google My Business"],
        publishedAt: "2024-12-10T00:00:00.000Z",
        createdAt: "2024-12-10T00:00:00.000Z"
      },
      {
        id: "c7bb1990-3203-245a-956a-bcd537e6076e",
        title: "Social Media Content Creation: From Strategy to Execution",
        slug: "social-media-content-creation-strategy-execution",
        content: "Creating compelling social media content that drives engagement and conversions requires a strategic approach. This guide walks you through the entire process, from initial planning to performance optimization.\n\n## Content Strategy Foundation\n\nSuccessful social media starts with understanding your audience deeply. Create detailed buyer personas that include demographics, interests, pain points, and social media behavior patterns. This foundation informs every content decision you make.\n\n## Platform-Specific Optimization\n\nEach social platform has unique characteristics and user expectations. Instagram favors visually stunning content, LinkedIn rewards professional insights, TikTok thrives on authentic, entertaining videos, and Facebook emphasizes community building. Tailor your content accordingly.\n\n## Content Calendar Planning\n\nConsistency is key to social media success. Develop a content calendar that balances promotional content with value-driven posts. Use the 80/20 rule: 80% valuable, entertaining, or educational content, and 20% promotional material.\n\n## Visual Content Creation\n\nVisual elements drive engagement across all platforms. Invest in high-quality photography, create branded graphics templates, and maintain consistent visual aesthetics. Tools like Canva and Adobe Creative Suite can help streamline your design process.\n\n## Engagement Strategies\n\nSocial media is about conversation, not broadcasting. Actively respond to comments, participate in relevant discussions, and use interactive features like polls, questions, and live videos to encourage audience participation.\n\n## Performance Tracking\n\nMonitor key metrics that align with your business goals: reach, engagement rate, website traffic, and conversions. Use platform analytics and third-party tools to gather insights and optimize your strategy continuously.\n\n## Content Repurposing\n\nMaximize your content investment by repurposing successful posts across platforms and formats. A blog post can become an infographic, video series, podcast episode, and multiple social media posts.\n\nWith these strategies, you'll create social media content that not only engages your audience but also drives meaningful business results.",
        excerpt: "Learn how to create engaging social media content that converts, with actionable strategies for every major platform.",
        author: "Jessica Chen",
        coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        readingTime: "10 min read",
        tags: ["Social Media", "Content Creation", "Strategy"],
        publishedAt: "2024-12-05T00:00:00.000Z",
        createdAt: "2024-12-05T00:00:00.000Z"
      },
      {
        id: "d6aa0889-2102-134a-845a-acd537e6076f",
        title: "Email Marketing Automation That Actually Converts",
        slug: "email-marketing-automation-converts",
        content: "Email marketing remains one of the highest ROI digital marketing channels, but only when executed strategically. This guide reveals how to create automated email sequences that nurture leads and drive conversions.\n\n## Segmentation Strategies\n\nGeneric email blasts are ineffective. Segment your audience based on behavior, demographics, purchase history, and engagement levels. Targeted messages to smaller, relevant groups consistently outperform mass communications.\n\n## Welcome Series Optimization\n\nYour welcome email series sets the tone for the entire customer relationship. Create a sequence that introduces your brand, sets expectations, and provides immediate value. Include social proof, helpful resources, and clear next steps.\n\n## Behavioral Trigger Campaigns\n\nAutomate emails based on specific user actions: website visits, cart abandonment, download completions, or purchase behavior. These timely, relevant messages have significantly higher open and conversion rates than scheduled campaigns.\n\n## Personalization Beyond Names\n\nTrue personalization goes beyond inserting a first name. Use data to customize content, product recommendations, send times, and frequency based on individual preferences and behavior patterns.\n\n## A/B Testing Framework\n\nContinuously optimize your campaigns through systematic testing. Test subject lines, send times, content length, call-to-action placement, and design elements. Small improvements compound into significant performance gains.\n\n## Mobile Optimization\n\nOver 60% of emails are opened on mobile devices. Ensure your templates are responsive, use clear hierarchies, and feature prominent, touch-friendly buttons. Test across multiple devices and email clients.\n\n## Re-engagement Campaigns\n\nDon't let inactive subscribers hurt your deliverability. Create automated sequences to re-engage dormant contacts with special offers, surveys, or valuable content. If they remain unresponsive, remove them to maintain list health.\n\nImplementing these automation strategies will transform your email marketing from a cost center into a profit driver.",
        excerpt: "Discover email marketing automation techniques that consistently deliver high conversion rates and measurable ROI.",
        author: "David Thompson",
        coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        readingTime: "8 min read",
        tags: ["Email Marketing", "Automation", "Conversion"],
        publishedAt: "2024-11-28T00:00:00.000Z",
        createdAt: "2024-11-28T00:00:00.000Z"
      },
      {
        id: "e5999778-1001-023a-734a-9cd537e6076g",
        title: "PPC Advertising: Maximizing ROI with Smart Bidding Strategies",
        slug: "ppc-advertising-smart-bidding-roi",
        content: "Pay-per-click advertising offers immediate visibility and measurable results, but success requires strategic campaign management. This guide covers advanced techniques to maximize your PPC return on investment.\n\n## Campaign Structure Optimization\n\nWell-organized campaigns are easier to manage and optimize. Group related keywords into tightly themed ad groups, create specific landing pages for each group, and use campaign types strategically to control budget allocation and targeting.\n\n## Keyword Research and Selection\n\nEffective PPC starts with comprehensive keyword research. Use a mix of broad, phrase, and exact match keywords to balance reach and relevance. Include negative keywords to prevent irrelevant clicks and protect your budget.\n\n## Ad Copy Testing\n\nCompelling ad copy is crucial for high click-through rates and quality scores. Test different headlines, descriptions, and calls-to-action. Highlight unique value propositions and include emotional triggers that resonate with your target audience.\n\n## Smart Bidding Implementation\n\nGoogle's smart bidding algorithms can optimize for your specific goals: conversions, conversion value, or target ROAS. These automated strategies use machine learning to adjust bids in real-time based on auction dynamics and user signals.\n\n## Landing Page Alignment\n\nYour landing page must align with your ad promise. Ensure message consistency, fast loading times, and clear conversion paths. A/B test different page elements to improve conversion rates and lower cost-per-acquisition.\n\n## Performance Monitoring\n\nRegular campaign monitoring identifies optimization opportunities quickly. Track key metrics: click-through rate, quality score, conversion rate, and return on ad spend. Set up automated alerts for significant performance changes.\n\n## Audience Targeting Refinement\n\nUse demographic data, interests, and remarketing lists to refine your targeting. Create custom audiences based on website behavior and customer data to reach high-value prospects more effectively.\n\nWith these strategies, your PPC campaigns will deliver consistent, profitable results while minimizing wasted ad spend.",
        excerpt: "Master PPC advertising with proven strategies for smart bidding, campaign optimization, and ROI maximization.",
        author: "Alex Peterson",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        readingTime: "11 min read",
        tags: ["PPC", "Google Ads", "ROI", "Bidding"],
        publishedAt: "2024-11-22T00:00:00.000Z",
        createdAt: "2024-11-22T00:00:00.000Z"
      },
      {
        id: "f4888667-0000-912a-623a-8cd537e6076h",
        title: "Content Marketing Strategy: Building Authority and Trust",
        slug: "content-marketing-strategy-authority-trust",
        content: "Content marketing builds long-term relationships with customers by providing value before asking for anything in return. This strategy-focused approach to content creation drives sustainable business growth through increased authority and trust.\n\n## Content Strategy Development\n\nSuccessful content marketing starts with a clear strategy aligned with business objectives. Define your target audience, establish content pillars, and create an editorial calendar that supports both SEO and business goals.\n\n## Authority Building Through Expertise\n\nDemonstrate industry expertise through in-depth, research-backed content. Cover trending topics, provide unique insights, and address complex challenges your audience faces. Thought leadership content positions your brand as the go-to resource.\n\n## Multi-Format Content Creation\n\nDiversify your content portfolio across different formats and platforms. Blog posts, videos, podcasts, infographics, and interactive content serve different audience preferences and consumption patterns.\n\n## SEO-Optimized Content\n\nOptimize content for search engines without sacrificing quality. Research keywords that align with customer intent, create comprehensive topic clusters, and build internal linking strategies that boost overall site authority.\n\n## Distribution and Amplification\n\nGreat content needs great distribution. Use owned channels (website, email), earned channels (PR, influencers), and paid channels (social ads, sponsored content) to maximize reach and engagement.\n\n## Community Building\n\nContent should spark conversations and build communities around your brand. Encourage user-generated content, host virtual events, and create spaces for customers to connect with each other.\n\n## Performance Measurement\n\nTrack content performance across multiple metrics: traffic, engagement, leads generated, and revenue attribution. Use these insights to refine your strategy and double down on high-performing content types.\n\nConsistent, value-driven content marketing transforms businesses from vendors into trusted advisors, creating lasting competitive advantages.",
        excerpt: "Build lasting customer relationships through strategic content marketing that establishes authority and drives sustainable business growth.",
        author: "Lisa Zhang",
        coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        readingTime: "9 min read",
        tags: ["Content Marketing", "Authority Building", "Trust"],
        publishedAt: "2024-11-15T00:00:00.000Z",
        createdAt: "2024-11-15T00:00:00.000Z"
      },
      {
        id: "g3777556-9999-801a-512a-7cd537e6076i",
        title: "Website Optimization: Converting Visitors into Customers",
        slug: "website-optimization-converting-visitors-customers",
        content: "Your website is your most important sales tool. Every element, from loading speed to checkout flow, impacts conversion rates. This comprehensive guide covers proven techniques to transform your website into a conversion machine.\n\n## User Experience Fundamentals\n\nGreat user experience starts with understanding your visitors' journey. Map out common user paths, identify friction points, and streamline navigation. A intuitive website structure reduces bounce rates and guides visitors toward conversion.\n\n## Page Load Speed Optimization\n\nWebsite speed directly impacts conversions. Even a one-second delay can reduce conversions by 7%. Optimize images, minimize HTTP requests, leverage browser caching, and use content delivery networks to ensure fast loading times.\n\n## Mobile Responsiveness\n\nMobile traffic accounts for over 50% of web traffic. Ensure your website provides excellent experiences across all devices. Test functionality, readability, and conversion flows on various screen sizes and browsers.\n\n## Trust Signal Implementation\n\nBuild credibility through strategic trust signals: customer testimonials, security badges, professional certifications, and social proof. Display these elements prominently on high-traffic pages and near conversion points.\n\n## Call-to-Action Optimization\n\nEffective CTAs are clear, compelling, and strategically placed. Use action-oriented language, create visual contrast, and test different colors, sizes, and positions. Limit choices to reduce decision paralysis.\n\n## Landing Page Best Practices\n\nDedicated landing pages for campaigns significantly improve conversion rates. Ensure message consistency between ads and landing pages, minimize distractions, and focus on single conversion goals.\n\n## A/B Testing Framework\n\nSystematic testing reveals what resonates with your audience. Test headlines, images, forms, and page layouts. Start with high-impact elements and use statistical significance to guide decisions.\n\nOptimizing these elements systematically will dramatically improve your website's ability to convert visitors into customers.",
        excerpt: "Transform your website into a conversion machine with proven optimization techniques that turn visitors into paying customers.",
        author: "Mark Johnson",
        coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
        readingTime: "13 min read",
        tags: ["Website Optimization", "Conversion", "UX"],
        publishedAt: "2024-11-08T00:00:00.000Z",
        createdAt: "2024-11-08T00:00:00.000Z"
      },
      {
        id: "h2666445-8888-690a-401a-6cd537e6076j",
        title: "Analytics and Data-Driven Marketing Decisions",
        slug: "analytics-data-driven-marketing-decisions",
        content: "Data-driven marketing eliminates guesswork and maximizes ROI. This guide shows you how to collect, analyze, and act on marketing data to make informed decisions that drive business growth.\n\n## Analytics Setup and Configuration\n\nProper analytics implementation is crucial for accurate data collection. Set up Google Analytics 4, configure conversion tracking, and implement event tracking for key user interactions. Ensure data accuracy through regular audits.\n\n## Key Performance Indicators (KPIs)\n\nIdentify metrics that align with business objectives. Focus on actionable KPIs rather than vanity metrics. Track customer acquisition cost, lifetime value, conversion rates, and return on ad spend across all marketing channels.\n\n## Attribution Modeling\n\nUnderstand how different touchpoints contribute to conversions. Move beyond last-click attribution to multi-touch models that provide fuller pictures of customer journeys. This insight optimizes budget allocation across channels.\n\n## Cohort Analysis\n\nAnalyze user behavior patterns over time through cohort analysis. Identify trends in customer retention, engagement, and value. Use these insights to improve onboarding processes and reduce churn.\n\n## Predictive Analytics\n\nLeverage historical data to predict future outcomes. Identify high-value prospects, forecast demand, and optimize inventory. Machine learning models can automate many predictive analysis tasks.\n\n## Data Visualization\n\nTransform complex data into actionable insights through effective visualization. Create dashboards that highlight key metrics and trends. Use clear, compelling charts that drive decision-making.\n\n## Action-Oriented Reporting\n\nMove beyond reporting to recommendation. Each data analysis should include specific, actionable next steps. Connect data insights directly to marketing strategies and budget allocations.\n\nMastering data-driven marketing transforms intuition-based decisions into strategic, measurable actions that consistently drive growth.",
        excerpt: "Master data-driven marketing with comprehensive analytics strategies that transform raw data into actionable growth insights.",
        author: "Amanda Rodriguez",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        readingTime: "14 min read",
        tags: ["Analytics", "Data-Driven", "KPIs"],
        publishedAt: "2024-11-01T00:00:00.000Z",
        createdAt: "2024-11-01T00:00:00.000Z"
      },
      {
        id: "i1555334-7777-579a-290a-5cd537e6076k",
        title: "Customer Retention Strategies for Digital Agencies",
        slug: "customer-retention-strategies-digital-agencies",
        content: "Acquiring new customers costs 5-25 times more than retaining existing ones. For digital agencies, client retention directly impacts profitability and growth. This guide outlines proven strategies to build lasting client relationships.\n\n## Onboarding Excellence\n\nFirst impressions matter tremendously. Create structured onboarding processes that set clear expectations, establish communication protocols, and deliver early wins. Successful onboarding reduces churn and builds long-term partnerships.\n\n## Regular Communication and Reporting\n\nTransparent, consistent communication builds trust and demonstrates value. Provide regular performance reports, schedule check-in calls, and proactively share insights and recommendations. Keep clients informed and engaged.\n\n## Value-Added Services\n\nGo beyond contracted services to provide additional value. Share industry insights, introduce beneficial connections, and offer strategic advice. These extra touches differentiate your agency and strengthen relationships.\n\n## Performance Monitoring\n\nContinuously track and optimize campaign performance. Use data to identify improvement opportunities and communicate wins clearly. Consistent results build confidence and justify continued investment.\n\n## Client Feedback Systems\n\nImplement systematic feedback collection through surveys, interviews, and informal check-ins. Address concerns promptly and use insights to improve service delivery. Show clients their opinions matter.\n\n## Account Management Best Practices\n\nAssign dedicated account managers who understand clients' businesses deeply. Maintain detailed client histories, anticipate needs, and provide personalized service. Strong relationships prevent churn.\n\n## Growth Partnership Approach\n\nPosition your agency as a growth partner rather than a service provider. Understand clients' business goals, recommend strategic initiatives, and share in their success. Partnership thinking creates mutual investment.\n\nImplementing these retention strategies transforms transactional client relationships into long-term partnerships that drive sustainable agency growth.",
        excerpt: "Build lasting client relationships with proven retention strategies that transform digital agency partnerships and drive sustainable growth.",
        author: "Tom Wilson",
        coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        readingTime: "11 min read",
        tags: ["Client Retention", "Digital Agency", "Relationships"],
        publishedAt: "2024-10-25T00:00:00.000Z",
        createdAt: "2024-10-25T00:00:00.000Z"
      }
    ];

    // Get query parameters
    const { pageSize = 10, page = 1 } = req.query;
    const pageSizeNum = Math.min(parseInt(pageSize) || 10, 50); // Limit to 50 max
    const pageNum = parseInt(page) || 1;
    
    // Calculate pagination
    const startIndex = (pageNum - 1) * pageSizeNum;
    const endIndex = startIndex + pageSizeNum;
    const paginatedPosts = BLOG_POSTS.slice(startIndex, endIndex);
    
    // Return paginated response
    const response = {
      data: paginatedPosts,
      meta: {
        pagination: {
          page: pageNum,
          pageSize: pageSizeNum,
          pageCount: Math.ceil(BLOG_POSTS.length / pageSizeNum),
          total: BLOG_POSTS.length
        }
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Blog posts API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch blog posts',
      message: error.message 
    });
  }
}