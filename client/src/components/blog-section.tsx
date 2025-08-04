import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar, User, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

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

export function BlogSection() {
  const { data: blogData, isLoading, error } = useQuery<BlogResponse>({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts?pageSize=9');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
  });

  const posts = blogData?.data || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl mb-6 animate-pulse">
              <div className="w-8 h-8 bg-white/20 rounded"></div>
            </div>
            <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg w-80 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-96 mx-auto animate-pulse"></div>
            <div className="mt-6 w-24 h-1 bg-slate-200 dark:bg-slate-700 mx-auto rounded-full animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="animate-pulse border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <div className="h-48 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex gap-2 mb-3">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div>
                    <div className="h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full w-24"></div>
                  </div>
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-4/5 mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-green-700 dark:from-white dark:via-blue-200 dark:to-green-200 bg-clip-text text-transparent mb-6">
              Latest Insights
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              Unable to load blog posts at the moment. Please try again later.
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="mt-4 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800/50">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-green-700 dark:from-white dark:via-blue-200 dark:to-green-200 bg-clip-text text-transparent mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Stay ahead of the curve with expert insights, proven strategies, and actionable tips to transform your digital marketing success
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No blog posts available yet. Check back soon for valuable insights!
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <a href="mailto:contact@rbcdigital.com">
                <ExternalLink className="w-4 h-4 mr-2" />
                Subscribe for Updates
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Card key={post.id} className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <Badge variant="secondary" className="bg-white/90 text-slate-700 hover:bg-white">
                          #{String(index + 1).padStart(2, '0')}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                      {post.author && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                          <User className="w-3.5 h-3.5" />
                          <span className="font-medium">{post.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="font-medium">
                          {format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg leading-tight">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="group/link inline-flex items-center justify-between w-full text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-all duration-300 py-3 px-4 bg-blue-50/50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {posts.length >= 9 && (
              <div className="text-center mt-16">
                <Link href="/blog">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-xl"
                  >
                    <span>Explore All Articles</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                  Discover more insights and strategies to grow your business
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}