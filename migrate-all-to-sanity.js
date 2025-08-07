// Complete migration script to populate Sanity with all blog content
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '3prkr232',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const allBlogPosts = [
  {
    title: "5 Digital Marketing Strategies That Drive Local Business Growth",
    slug: "5-digital-marketing-strategies-local-business-growth",
    excerpt: "Discover proven digital marketing techniques that help local service businesses attract more customers and increase revenue in today's competitive market.",
    content: "Local businesses face unique challenges in digital marketing. Unlike national brands, they need to focus on their immediate community while competing against both local competitors and online giants. This guide outlines five proven strategies that consistently deliver results for local service businesses.\n\n## 1. Local SEO Optimization\n\nLocal SEO is the foundation of digital marketing for local businesses. Start by claiming and optimizing your Google My Business profile with accurate information, high-quality photos, and regular updates. Encourage satisfied customers to leave reviews, as they significantly impact local search rankings.\n\nOptimize your website for local keywords by including your city and service area in title tags, headers, and content. Create location-specific landing pages if you serve multiple areas. Build local citations by ensuring your business information is consistent across online directories.\n\n## 2. Content Marketing That Addresses Local Needs\n\nCreate content that speaks directly to your local community's needs and interests. Write blog posts about local events, seasonal services, or area-specific challenges your business can solve. This approach helps establish your expertise while improving local search visibility.\n\nShare customer success stories and case studies featuring local clients (with permission). These testimonials build trust and help potential customers visualize working with your business. Include local landmarks or references to make the content more relatable.\n\n## 3. Social Media Community Building\n\nFocus on building genuine relationships rather than just broadcasting promotional content. Share behind-the-scenes content, employee spotlights, and community involvement to humanize your brand. Engage with other local businesses and community groups to expand your network.\n\nUse location-based hashtags and geotag your posts to increase local visibility. Participate in local conversations and trending topics when appropriate. Consider partnering with other local businesses for cross-promotion opportunities.\n\n## 4. Email Marketing for Customer Retention\n\nDevelop an email marketing strategy that keeps your business top-of-mind for existing customers while nurturing new leads. Send seasonal reminders, maintenance tips, or exclusive offers to your subscriber list.\n\nSegment your email list based on customer type, location, or service history to deliver more relevant content. Include local news or events in your newsletters to add value beyond promotional messages.\n\n## 5. Online Reputation Management\n\nActively monitor and respond to online reviews across all platforms. Thank customers for positive reviews and address negative feedback professionally and promptly. Use review management tools to streamline this process.\n\nImplement a systematic approach to requesting reviews from satisfied customers. Follow up after service completion with a thank-you message that includes links to review platforms. Consider offering small incentives for honest reviews, following platform guidelines.\n\n## Measuring Success\n\nTrack these key performance indicators to measure your digital marketing success:\n\n- Local search ranking improvements\n- Website traffic from local searches\n- Online review quantity and ratings\n- Social media engagement rates\n- Email open and click-through rates\n- Customer acquisition cost\n- Customer lifetime value\n\n## Implementation Timeline\n\nStart with local SEO optimization as your foundation, then gradually implement other strategies. Focus on consistency rather than trying to execute all strategies simultaneously. Most local businesses see meaningful results within 3-6 months of consistent implementation.\n\nRemember that digital marketing is an ongoing process, not a one-time effort. Regular monitoring and adjustment ensure continued success as market conditions and customer behaviors evolve.",
    author: "Sarah Johnson",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    readingTime: "12 min read",
    tags: ["Digital Marketing", "Local SEO", "Business Growth", "Marketing Strategy"],
    publishedAt: "2024-12-01T10:00:00Z"
  },
  // Add the remaining 10 posts here...
];

async function migrateAllPosts() {
  console.log(`Migrating ${allBlogPosts.length} blog posts to Sanity...`);
  
  for (const post of allBlogPosts) {
    try {
      const doc = {
        _type: 'blogPost',
        title: post.title,
        slug: { current: post.slug },
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        coverImage: post.coverImage,
        readingTime: post.readingTime,
        tags: post.tags,
        publishedAt: post.publishedAt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const result = await client.create(doc);
      console.log(`✓ Created: ${post.title}`);
    } catch (error) {
      console.error(`✗ Error creating ${post.title}:`, error);
    }
  }
  
  console.log('Migration complete!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  migrateAllPosts().catch(console.error);
}