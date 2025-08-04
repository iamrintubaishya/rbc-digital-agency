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
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg mb-6 animate-pulse">
              <div className="w-6 h-6 bg-slate-300 dark:bg-slate-600 rounded"></div>
            </div>
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-80 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="h-48 bg-slate-200 dark:bg-slate-700"></div>
                <CardHeader className="pb-3">
                  <div className="flex gap-2 mb-3">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                  </div>
                  <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-4/5 mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
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
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg mb-6">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Latest Insights
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Unable to load blog posts at the moment. Please try again later.
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 dark:bg-white rounded-lg mb-6">
            <svg className="w-6 h-6 text-white dark:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Expert insights and proven strategies to grow your business
          </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-snug">
                      {post.title}
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-3 text-slate-600 dark:text-slate-400">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="group/link inline-flex items-center text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-200 font-medium transition-colors duration-200"
                    >
                      <span>Read article</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {posts.length >= 9 && (
              <div className="text-center mt-12">
                <Link href="/blog">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span>View All Articles</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}