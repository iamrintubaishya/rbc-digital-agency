import { users, contacts, bookings, blogPosts, type User, type InsertUser, type Contact, type InsertContact, type Booking, type InsertBooking, type BlogPost, type InsertBlogPost } from "../shared/schema.js";
import { db } from "./db.js";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  createBooking(booking: InsertBooking & { hubspotContactId?: string }): Promise<Booking>;
  getContacts(): Promise<Contact[]>;
  getBookings(): Promise<Booking[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async createBooking(insertBooking: InsertBooking & { hubspotContactId?: string }): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    const posts = await db.select().from(blogPosts);
    
    // If posts exist but lack cover images, fall back to MemStorage with complete data
    if (posts.length > 0 && posts.some((post: any) => !post.coverImage || post.coverImage.startsWith('/images/blog/'))) {
      console.log('Database posts found but missing proper cover images, using MemStorage fallback');
      const memStorage = new MemStorage();
      return await memStorage.getBlogPosts();
    }
    
    return posts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    
    // If post exists but lacks cover image, fall back to MemStorage
    if (post && (!post.coverImage || post.coverImage.startsWith('/images/blog/'))) {
      console.log(`Database post '${slug}' missing proper cover image, using MemStorage fallback`);
      const memStorage = new MemStorage();
      return await memStorage.getBlogPostBySlug(slug);
    }
    
    return post || undefined;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const postData = {
      ...insertBlogPost,
      publishedAt: insertBlogPost.publishedAt ? new Date(insertBlogPost.publishedAt) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const [post] = await db
      .insert(blogPosts)
      .values(postData)
      .returning();
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const processedData = {
      ...updateData,
      publishedAt: updateData.publishedAt ? new Date(updateData.publishedAt) : undefined,
      updatedAt: new Date(),
    };
    const [post] = await db
      .update(blogPosts)
      .set(processedData)
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private bookings: Map<string, Booking>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.bookings = new Map();
    this.blogPosts = new Map();
    this.initializeSampleBlogPosts();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const userArray = Array.from(this.users.values());
    return userArray.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: randomUUID(),
      ...insertUser,
    };
    this.users.set(user.id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: randomUUID(),
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      phone: insertContact.phone ?? null,
      businessType: insertContact.businessType ?? null,
      challenge: insertContact.challenge ?? null,
      createdAt: new Date(),
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }

  async createBooking(insertBooking: InsertBooking & { hubspotContactId?: string }): Promise<Booking> {
    const booking: Booking = {
      id: randomUUID(),
      name: insertBooking.name,
      email: insertBooking.email,
      preferredDate: insertBooking.preferredDate || null,
      hubspotContactId: insertBooking.hubspotContactId || null,
      createdAt: new Date(),
    };
    this.bookings.set(booking.id, booking);
    return booking;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const postsArray = Array.from(this.blogPosts.values());
    return postsArray.find(post => post.slug === slug);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const post: BlogPost = {
      id: randomUUID(),
      title: insertBlogPost.title,
      slug: insertBlogPost.slug,
      content: insertBlogPost.content,
      excerpt: insertBlogPost.excerpt ?? null,
      author: insertBlogPost.author ?? null,
      coverImage: insertBlogPost.coverImage ?? null,
      contentImages: insertBlogPost.contentImages ?? null,
      audioUrl: insertBlogPost.audioUrl ?? null,
      readingTime: insertBlogPost.readingTime ?? null,
      tags: insertBlogPost.tags ?? null,
      strapiId: null,
      publishedAt: insertBlogPost.publishedAt ? new Date(insertBlogPost.publishedAt) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.set(post.id, post);
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;

    const updated: BlogPost = {
      ...existing,
      ...updateData,
      publishedAt: updateData.publishedAt ? new Date(updateData.publishedAt) : existing.publishedAt,
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  private initializeSampleBlogPosts() {
    // Calculate reading time (average 200 words per minute)
    const calculateReadingTime = (content: string): string => {
      const wordsPerMinute = 200;
      const words = content.trim().split(/\s+/).length;
      const minutes = Math.ceil(words / wordsPerMinute);
      return `${minutes} min read`;
    };

    const samplePosts = [
      {
        title: "5 Digital Marketing Strategies That Drive Local Business Growth",
        slug: "5-digital-marketing-strategies-local-business-growth",
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "12 min read",
        tags: ["Digital Marketing", "Trends", "AI", "Strategy"],
        content: "The digital marketing landscape continues to evolve at breakneck speed. As we head into 2025, businesses need to stay ahead of emerging trends to maintain their competitive edge. Here are the five most impactful trends that will shape digital marketing strategies this year.\n\n## 1. AI-Powered Personalization at Scale\n\nArtificial intelligence is revolutionizing how we deliver personalized experiences. From dynamic content optimization to predictive customer behavior analysis, AI enables marketers to create highly targeted campaigns that resonate with individual users. Smart automation tools can now adjust messaging, timing, and channel selection in real-time based on user interactions.\n\n## 2. Voice Search Optimization\n\nWith voice assistants becoming increasingly sophisticated, optimizing for voice search is no longer optional. Businesses must adapt their SEO strategies to accommodate natural language queries and conversational search patterns. This includes focusing on long-tail keywords and featured snippet optimization.\n\n## 3. Interactive Video Content\n\nStatic video content is giving way to interactive experiences. Features like clickable hotspots, branching narratives, and real-time polls are transforming passive viewers into active participants. This engagement boost translates directly into higher conversion rates and brand loyalty.\n\n## 4. Privacy-First Marketing\n\nWith increasing data privacy regulations and growing consumer awareness, marketers must prioritize transparent, consent-based data collection. First-party data strategies and contextual advertising are becoming essential alternatives to traditional tracking methods.\n\n## 5. Social Commerce Integration\n\nSocial platforms are evolving into comprehensive shopping destinations. Seamless integration between social content and e-commerce functionality allows customers to discover, research, and purchase products without leaving their favorite platforms.\n\nThese trends represent fundamental shifts in how consumers interact with brands online. Businesses that adapt early will capture the most significant advantages in the evolving digital marketplace.",
        excerpt: "Discover the five game-changing digital marketing trends that will define success in 2025, from AI-powered personalization to social commerce integration.",
        author: "Sarah Mitchell",
        publishedAt: new Date('2024-12-15'),
      },
      {
        title: "The Complete Guide to Local SEO for Service Businesses",
        slug: "complete-guide-local-seo-service-businesses",
        coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1486312338219-ce68e2c6068d?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "15 min read",
        tags: ["Local SEO", "Service Business", "Google My Business"],
        content: "Local SEO is the lifeblood of service-based businesses. Whether you're a plumber, dentist, or consultant, your ability to be found by nearby customers directly impacts your bottom line. This comprehensive guide covers everything you need to dominate local search results.\n\n## Understanding Local Search Intent\n\nLocal search queries fall into three categories: navigational (finding a specific business), informational (learning about local services), and transactional (ready to hire). Understanding these intents helps you create content that matches what customers are actually searching for.\n\n## Google Business Profile Optimization\n\nYour Google Business Profile is your digital storefront. Complete every section: business hours, contact information, services offered, and high-quality photos. Regular posts and prompt responses to reviews signal to Google that your business is active and customer-focused.\n\n## Citation Building Strategy\n\nConsistent business information across online directories builds trust with search engines. Focus on major directories like Yelp, YellowPages, and industry-specific platforms. Ensure your Name, Address, and Phone number (NAP) information is identical everywhere.\n\n## Review Management\n\nCustomer reviews are ranking factors and conversion drivers. Implement a systematic approach to requesting reviews from satisfied customers. Respond professionally to all reviews, both positive and negative, to demonstrate excellent customer service.\n\n## Local Content Marketing\n\nCreate content that speaks to local customers' needs. This includes location-specific landing pages, local event coverage, and community involvement stories. Local content helps establish your business as a trusted community resource.\n\n## Mobile Optimization\n\nLocal searches happen predominantly on mobile devices. Ensure your website loads quickly, displays properly on small screens, and makes it easy for customers to contact you with prominent click-to-call buttons.\n\nImplementing these strategies systematically will significantly improve your local search visibility and drive more qualified leads to your business.",
        excerpt: "Master local SEO with this comprehensive guide designed specifically for service businesses looking to dominate their local market.",
        author: "Mike Rodriguez",
        publishedAt: new Date('2024-12-10'),
      },
      {
        title: "Social Media Content Creation: From Strategy to Execution",
        slug: "social-media-content-creation-strategy-execution",
        coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "10 min read",
        tags: ["Social Media", "Content Creation", "Strategy"],
        content: "Creating compelling social media content that drives engagement and conversions requires a strategic approach. This guide walks you through the entire process, from initial planning to performance optimization.\n\n## Content Strategy Foundation\n\nSuccessful social media starts with understanding your audience deeply. Create detailed buyer personas that include demographics, interests, pain points, and social media behavior patterns. This foundation informs every content decision you make.\n\n## Platform-Specific Optimization\n\nEach social platform has unique characteristics and user expectations. Instagram favors visually stunning content, LinkedIn rewards professional insights, TikTok thrives on authentic, entertaining videos, and Facebook emphasizes community building. Tailor your content accordingly.\n\n## Content Calendar Planning\n\nConsistency is key to social media success. Develop a content calendar that balances promotional content with value-driven posts. Use the 80/20 rule: 80% valuable, entertaining, or educational content, and 20% promotional material.\n\n## Visual Content Creation\n\nVisual elements drive engagement across all platforms. Invest in high-quality photography, create branded graphics templates, and maintain consistent visual aesthetics. Tools like Canva and Adobe Creative Suite can help streamline your design process.\n\n## Engagement Strategies\n\nSocial media is about conversation, not broadcasting. Actively respond to comments, participate in relevant discussions, and use interactive features like polls, questions, and live videos to encourage audience participation.\n\n## Performance Tracking\n\nMonitor key metrics that align with your business goals: reach, engagement rate, website traffic, and conversions. Use platform analytics and third-party tools to gather insights and optimize your strategy continuously.\n\n## Content Repurposing\n\nMaximize your content investment by repurposing successful posts across platforms and formats. A blog post can become an infographic, video series, podcast episode, and multiple social media posts.\n\nWith these strategies, you'll create social media content that not only engages your audience but also drives meaningful business results.",
        excerpt: "Learn how to create engaging social media content that converts, with actionable strategies for every major platform.",
        author: "Jessica Chen",
        publishedAt: new Date('2024-12-05'),
      },
      {
        title: "Email Marketing Automation That Actually Converts",
        slug: "email-marketing-automation-converts",
        coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "8 min read",
        tags: ["Email Marketing", "Automation", "Conversion"],
        content: "Email marketing remains one of the highest ROI digital marketing channels, but only when executed strategically. This guide reveals how to create automated email sequences that nurture leads and drive conversions.\n\n## Segmentation Strategies\n\nGeneric email blasts are ineffective. Segment your audience based on behavior, demographics, purchase history, and engagement levels. Targeted messages to smaller, relevant groups consistently outperform mass communications.\n\n## Welcome Series Optimization\n\nYour welcome email series sets the tone for the entire customer relationship. Create a sequence that introduces your brand, sets expectations, and provides immediate value. Include social proof, helpful resources, and clear next steps.\n\n## Behavioral Trigger Campaigns\n\nAutomate emails based on specific user actions: website visits, cart abandonment, download completions, or purchase behavior. These timely, relevant messages have significantly higher open and conversion rates than scheduled campaigns.\n\n## Personalization Beyond Names\n\nTrue personalization goes beyond inserting a first name. Use data to customize content, product recommendations, send times, and frequency based on individual preferences and behavior patterns.\n\n## A/B Testing Framework\n\nContinuously optimize your campaigns through systematic testing. Test subject lines, send times, content length, call-to-action placement, and design elements. Small improvements compound into significant performance gains.\n\n## Mobile Optimization\n\nOver 60% of emails are opened on mobile devices. Ensure your templates are responsive, use clear hierarchies, and feature prominent, touch-friendly buttons. Test across multiple devices and email clients.\n\n## Re-engagement Campaigns\n\nDon't let inactive subscribers hurt your deliverability. Create automated sequences to re-engage dormant contacts with special offers, surveys, or valuable content. If they remain unresponsive, remove them to maintain list health.\n\nImplementing these automation strategies will transform your email marketing from a cost center into a profit driver.",
        excerpt: "Discover email marketing automation techniques that consistently deliver high conversion rates and measurable ROI.",
        author: "David Thompson",
        publishedAt: new Date('2024-11-28'),
      },
      {
        title: "PPC Advertising: Maximizing ROI with Smart Bidding Strategies",
        slug: "ppc-advertising-smart-bidding-roi",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "11 min read",
        tags: ["PPC", "Google Ads", "ROI", "Bidding"],
        content: "Pay-per-click advertising offers immediate visibility and measurable results, but success requires strategic campaign management. This guide covers advanced techniques to maximize your PPC return on investment.\n\n## Campaign Structure Optimization\n\nWell-organized campaigns are easier to manage and optimize. Group related keywords into tightly themed ad groups, create specific landing pages for each group, and use campaign types strategically to control budget allocation and targeting.\n\n## Keyword Research and Selection\n\nEffective PPC starts with comprehensive keyword research. Use a mix of broad, phrase, and exact match keywords to balance reach and relevance. Include negative keywords to prevent irrelevant clicks and protect your budget.\n\n## Ad Copy Testing\n\nCompelling ad copy is crucial for high click-through rates and quality scores. Test different headlines, descriptions, and calls-to-action. Highlight unique value propositions and include emotional triggers that resonate with your target audience.\n\n## Smart Bidding Implementation\n\nGoogle's smart bidding algorithms can optimize for your specific goals: conversions, conversion value, or target ROAS. These automated strategies use machine learning to adjust bids in real-time based on auction dynamics and user signals.\n\n## Landing Page Alignment\n\nYour landing page must align with your ad promise. Ensure message consistency, fast loading times, and clear conversion paths. A/B test different page elements to improve conversion rates and lower cost-per-acquisition.\n\n## Performance Monitoring\n\nRegular campaign monitoring identifies optimization opportunities quickly. Track key metrics: click-through rate, quality score, conversion rate, and return on ad spend. Set up automated alerts for significant performance changes.\n\n## Audience Targeting Refinement\n\nUse demographic data, interests, and remarketing lists to refine your targeting. Create custom audiences based on website behavior and customer data to reach high-value prospects more effectively.\n\nWith these strategies, your PPC campaigns will deliver consistent, profitable results while minimizing wasted ad spend.",
        excerpt: "Master PPC advertising with proven strategies for smart bidding, campaign optimization, and maximizing return on investment.",
        author: "Amanda Foster",
        publishedAt: new Date('2024-11-20'),
      },
      {
        title: "Building High-Converting Landing Pages: A Step-by-Step Guide",
        slug: "building-high-converting-landing-pages-guide",
        coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "14 min read",
        tags: ["Landing Pages", "Conversion", "CRO", "Design"],
        content: "Landing pages are where traffic turns into customers. A well-designed landing page can dramatically increase your conversion rates and ROI. This comprehensive guide covers every element of high-converting landing page design.\n\n## Clear Value Proposition\n\nYour value proposition should be immediately apparent to visitors. Communicate what you offer, who it's for, and why it matters within seconds. Use clear, benefit-focused headlines that address your audience's primary pain point or desire.\n\n## Compelling Headlines and Subheadings\n\nYour headline is often the first and last thing visitors read. Make it specific, benefit-driven, and emotionally engaging. Support it with subheadings that elaborate on key benefits and guide readers through your page structure.\n\n## Social Proof Integration\n\nTestimonials, reviews, case studies, and trust badges build credibility and reduce purchase anxiety. Place social proof strategically throughout your page, especially near conversion points. Use real customer photos and specific results when possible.\n\n## Optimized Call-to-Action Design\n\nYour CTA button should stand out visually and use action-oriented language. Test different colors, sizes, and text to find what resonates with your audience. Consider using urgency or scarcity elements to encourage immediate action.\n\n## Mobile-First Design\n\nWith mobile traffic dominating, design for mobile first, then scale up. Ensure fast loading times, easy navigation, and thumb-friendly button placement. Test your pages across different devices and browsers regularly.\n\n## Form Optimization\n\nOnly ask for information you absolutely need. Long forms reduce conversion rates significantly. Use smart form features like progressive profiling and conditional logic to gather information gradually over time.\n\n## A/B Testing Framework\n\nSystematic testing identifies what works best for your specific audience. Test one element at a time: headlines, images, CTAs, or form fields. Use statistical significance to make data-driven decisions about changes.\n\nImplementing these principles will significantly improve your landing page performance and overall marketing ROI.",
        excerpt: "Learn the essential elements of high-converting landing pages with practical tips and proven optimization techniques.",
        author: "Robert Kim",
        publishedAt: new Date('2024-11-15'),
      },
      {
        title: "Content Marketing Strategy: Creating Content That Drives Business Results",
        slug: "content-marketing-strategy-business-results",
        coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "13 min read",
        tags: ["Content Marketing", "Strategy", "ROI", "Business Growth"],
        content: "Content marketing builds trust, establishes authority, and drives profitable customer action. However, creating content that actually impacts your bottom line requires strategic planning and execution. This guide shows you how.\n\n## Content Strategy Framework\n\nAlign your content with business objectives and customer journey stages. Map content types to awareness, consideration, and decision phases. Create topic clusters around core business themes to establish topical authority.\n\n## Audience Research and Personas\n\nUnderstand your audience's challenges, goals, and content preferences. Use surveys, interviews, and analytics data to create detailed buyer personas. This research informs content topics, formats, and distribution strategies.\n\n## SEO-Driven Content Planning\n\nKeyword research reveals what your audience is searching for. Create content around high-value keywords with good search volume and manageable competition. Focus on user intent rather than just keyword density.\n\n## Content Formats and Channels\n\nDiversify your content across formats: blog posts, videos, podcasts, infographics, and interactive tools. Different audiences prefer different content types. Repurpose successful content across multiple channels and formats.\n\n## Editorial Calendar Management\n\nConsistent publishing builds audience expectations and improves SEO performance. Create an editorial calendar that balances evergreen and timely content. Plan content themes around seasonal trends and business cycles.\n\n## Performance Measurement\n\nTrack metrics that matter to your business: organic traffic, lead generation, conversion rates, and revenue attribution. Use Google Analytics, marketing automation platforms, and CRM data to measure content ROI.\n\n## Content Promotion Strategy\n\nCreating great content is only half the battle. Develop systematic promotion strategies using social media, email marketing, influencer outreach, and paid promotion to amplify your content reach.\n\nWith this strategic approach, your content marketing will generate measurable business results and sustainable competitive advantages.",
        excerpt: "Develop a content marketing strategy that drives real business results with this comprehensive planning and execution guide.",
        author: "Emily Watson",
        publishedAt: new Date('2024-11-08'),
      },
      {
        title: "Analytics and Data-Driven Marketing: Making Smarter Decisions",
        slug: "analytics-data-driven-marketing-decisions",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "16 min read",
        tags: ["Analytics", "Data-Driven Marketing", "KPIs", "ROI"],
        content: "Data-driven marketing eliminates guesswork and maximizes ROI. By leveraging analytics effectively, you can make informed decisions that consistently improve performance. This guide covers essential analytics strategies for modern marketers.\n\n## Setting Up Proper Tracking\n\nAccurate data collection is the foundation of effective analytics. Implement Google Analytics 4, set up conversion tracking, and use UTM parameters consistently. Ensure your tracking covers the entire customer journey from awareness to retention.\n\n## Key Performance Indicators (KPIs)\n\nFocus on metrics that directly impact business goals. Track leading indicators (traffic, engagement) and lagging indicators (conversions, revenue). Create dashboards that provide actionable insights rather than vanity metrics.\n\n## Customer Journey Analysis\n\nUnderstand how customers interact with your brand across touchpoints. Use attribution modeling to identify which channels and campaigns contribute most to conversions. This insight informs budget allocation and strategy optimization.\n\n## Cohort and Lifetime Value Analysis\n\nTrack customer behavior over time to identify trends and opportunities. Cohort analysis reveals how different customer segments perform, while lifetime value calculations help optimize acquisition spending and retention strategies.\n\n## A/B Testing and Experimentation\n\nSystematic testing drives continuous improvement. Test everything: ad copy, landing pages, email subject lines, and website elements. Use proper statistical methods to ensure reliable results and avoid false conclusions.\n\n## Data Visualization and Reporting\n\nPresent data in formats that facilitate decision-making. Use charts, graphs, and dashboards to communicate insights clearly. Automate regular reports and set up alerts for significant performance changes.\n\n## Privacy and Data Compliance\n\nStay compliant with data protection regulations while maintaining effective tracking. Implement consent management, data retention policies, and privacy-first analytics solutions. Balance personalization with privacy requirements.\n\nMastering these analytics fundamentals will transform your marketing from intuition-based to data-driven, resulting in better performance and higher ROI.",
        excerpt: "Transform your marketing with data-driven decision making using proven analytics strategies and measurement frameworks.",
        author: "Mark Johnson",
        publishedAt: new Date('2024-11-01'),
      },
      {
        title: "Customer Retention Strategies That Increase Lifetime Value",
        slug: "customer-retention-strategies-lifetime-value",
        coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "12 min read",
        tags: ["Customer Retention", "Lifetime Value", "Loyalty", "CX"],
        content: "Acquiring new customers costs five times more than retaining existing ones. Smart businesses focus on customer retention strategies that maximize lifetime value and create sustainable growth. Here's how to build lasting customer relationships.\n\n## Customer Experience Optimization\n\nExceptional experiences create loyal customers. Map the entire customer journey to identify pain points and opportunities. Streamline processes, reduce friction, and exceed expectations at every touchpoint.\n\n## Personalized Communication\n\nUse customer data to create personalized experiences. Segment customers based on behavior, preferences, and value. Deliver relevant content, offers, and recommendations that demonstrate you understand their needs.\n\n## Loyalty Program Design\n\nEffective loyalty programs reward valuable behaviors beyond just purchases. Consider engagement, referrals, and social sharing. Design tiers that encourage progression and make rewards meaningful and attainable.\n\n## Proactive Customer Support\n\nAnticipate customer needs and reach out proactively. Use data to identify at-risk customers and implement retention campaigns. Provide multiple support channels and ensure quick, helpful responses.\n\n## Value-Added Services\n\nOffer additional services that enhance the core product experience. Educational content, training, consulting, or premium support options increase customer investment and switching costs.\n\n## Feedback and Improvement Cycles\n\nRegularly collect and act on customer feedback. Use surveys, reviews, and direct communication to understand satisfaction levels. Demonstrate that you value input by implementing suggested improvements.\n\n## Re-engagement Campaigns\n\nWin back inactive customers with targeted campaigns. Understand why they disengaged and address those specific issues. Offer incentives, new features, or personal outreach to restart the relationship.\n\nFocusing on retention creates compound returns: loyal customers buy more, refer others, and provide valuable feedback for continuous improvement.",
        excerpt: "Boost customer lifetime value with proven retention strategies that turn one-time buyers into loyal brand advocates.",
        author: "Lisa Anderson",
        publishedAt: new Date('2024-10-25'),
      },
      {
        title: "Marketing Automation: Streamlining Your Digital Marketing Efforts",
        slug: "marketing-automation-streamlining-digital-efforts",
        coverImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop",
        contentImages: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
        ],
        audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        readingTime: "9 min read",
        tags: ["Marketing Automation", "Lead Nurturing", "Efficiency", "Scale"],
        content: "Marketing automation transforms how businesses nurture leads and engage customers. By automating repetitive tasks and personalizing communications at scale, you can improve efficiency while delivering better customer experiences.\n\n## Automation Platform Selection\n\nChoose platforms that integrate with your existing tools and support your specific use cases. Consider factors like ease of use, scalability, features, and pricing. Popular options include HubSpot, Marketo, and Pardot.\n\n## Lead Scoring and Qualification\n\nDevelop scoring models that identify sales-ready leads automatically. Assign points for behaviors like email opens, website visits, content downloads, and demo requests. This helps sales teams prioritize high-value prospects.\n\n## Drip Campaign Development\n\nCreate email sequences that nurture leads over time. Develop campaigns for different stages of the buyer's journey, customer segments, and use cases. Include valuable content, social proof, and clear calls-to-action.\n\n## Behavioral Trigger Setup\n\nAutomate responses to specific customer actions. Set up triggers for website behavior, email engagement, purchase activity, or support interactions. Timely, relevant communications significantly improve conversion rates.\n\n## CRM Integration\n\nConnect your marketing automation platform with your CRM system. This enables seamless lead handoffs, closed-loop reporting, and better alignment between marketing and sales teams.\n\n## Performance Optimization\n\nRegularly analyze automation performance and optimize based on data. Test different messaging, timing, and frequency. Use A/B testing to improve open rates, click-through rates, and conversions.\n\n## Compliance and Best Practices\n\nEnsure your automation respects subscriber preferences and follows regulations like GDPR and CAN-SPAM. Provide clear unsubscribe options and honor suppression lists to maintain sender reputation.\n\nWell-implemented marketing automation increases efficiency, improves lead quality, and enables personalized experiences that drive better business results.",
        excerpt: "Discover how marketing automation can streamline your processes while delivering personalized customer experiences at scale.",
        author: "Kevin Martinez",
        publishedAt: new Date('2024-10-18'),
      }
    ];

    samplePosts.forEach(post => {
      const id = randomUUID();
      const blogPost: BlogPost = {
        id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        author: post.author,
        publishedAt: post.publishedAt,
        createdAt: new Date(),
        updatedAt: new Date(),
        strapiId: null,
        coverImage: (post as any).coverImage || null,
        contentImages: (post as any).contentImages || null,
        audioUrl: (post as any).audioUrl || null,
        readingTime: calculateReadingTime(post.content),
        tags: (post as any).tags || null,
      };
      this.blogPosts.set(id, blogPost);
    });
  }
}

// Smart storage initialization with fallback handling
async function createStorage(): Promise<IStorage> {
  if (process.env.DATABASE_URL) {
    try {
      const dbStorage = new DatabaseStorage();
      // Test the connection by trying to fetch blog posts
      const posts = await dbStorage.getBlogPosts();
      console.log('✓ Database connection successful - using DatabaseStorage with', posts.length, 'posts');
      
      // If database has fewer than expected posts, populate with MemStorage data
      if (posts.length < 10) {
        console.log('Database missing posts, populating from MemStorage...');
        const memStorage = new MemStorage();
        const memPosts = await memStorage.getBlogPosts();
        
        for (const memPost of memPosts) {
          const existing = posts.find(p => p.slug === memPost.slug);
          if (!existing) {
            await dbStorage.createBlogPost({
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
            console.log('Added missing post:', memPost.title);
          }
        }
      }
      
      return dbStorage;
    } catch (error: any) {
      console.warn('Database connection failed, falling back to MemStorage:', error?.message || error);
      return new MemStorage();
    }
  } else {
    console.log('No DATABASE_URL found - using MemStorage');
    return new MemStorage();
  }
}

// Initialize storage with fallback
export const storage = createStorage();
