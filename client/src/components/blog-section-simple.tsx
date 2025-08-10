// Inline blog data to eliminate any import issues
const blogPosts = [
  {
    id: "1",
    title: "The Complete Guide to Local SEO for Service Businesses",
    slug: "complete-guide-local-seo-service-businesses",
    excerpt: "Master local SEO strategies that help service businesses dominate their geographic markets.",
    author: "Michael Rodriguez",
    coverImage: "https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    readingTime: "8 min read"
  },
  {
    id: "2", 
    title: "Analytics and Data-Driven Marketing: Making Smarter Decisions",
    slug: "analytics-data-driven-marketing-decisions",
    excerpt: "Learn how to leverage analytics and data science to make smarter marketing decisions.",
    author: "Dr. Sarah Kim",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    readingTime: "6 min read"
  },
  {
    id: "3",
    title: "Social Media Automation: Scale Your Content Without Losing Authenticity",
    slug: "social-media-automation-scale-content-authenticity",
    excerpt: "Discover how to automate your social media presence while maintaining genuine connections.",
    author: "Jessica Martinez",
    coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    readingTime: "7 min read"
  }
];

export function BlogSectionSimple() {
  const posts = blogPosts.slice(0, 3);
  
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Expert insights and proven strategies to grow your business
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-slate-500">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}