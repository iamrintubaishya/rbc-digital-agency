import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar, User, ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Link } from "wouter";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author?: string;
  coverImage?: string;
  publishedAt?: string;
  createdAt: string;
}

interface BlogResponse {
  data: BlogPost[];
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export function BlogPage() {
  const { data: blogData, isLoading, error } = useQuery<BlogResponse>({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts?pageSize=50');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
  });

  const posts = blogData?.data || [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-5xl font-bold mb-6">
              Digital Marketing Insights
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Expert insights, proven strategies, and the latest trends in digital marketing to help your business grow
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        {isLoading && (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-slate-600 dark:text-slate-400">Loading articles...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Unable to Load Articles
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We're having trouble loading the blog posts. Please try again later.
              </p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                No Articles Yet
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We're working on creating valuable content for you. Check back soon for expert insights and digital marketing strategies!
              </p>
              <Button variant="outline" asChild>
                <a href="mailto:contact@rbcdigital.com">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Subscribe for Updates
                </a>
              </Button>
            </div>
          </div>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-4 text-base leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="ghost" 
                      className="group/btn p-0 h-auto font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Read Full Article
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {blogData?.meta?.pagination && blogData.meta.pagination.total > posts.length && (
              <div className="text-center mt-16">
                <Button size="lg" variant="outline">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-slate-50 dark:bg-slate-800 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Let's discuss how our proven strategies can help your business grow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/#contact">
                  Get Started Today
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#services">
                  View Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}