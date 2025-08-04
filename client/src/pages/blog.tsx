import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar, User, ArrowLeft, ExternalLink, Loader2, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { SearchBar } from "../components/ui/search-bar";
import { Link, useLocation } from "wouter";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  author?: string | null;
  coverImage?: string | null;
  contentImages?: string[] | null;
  audioUrl?: string | null;
  readingTime?: string | null;
  tags?: string[] | null;
  publishedAt?: string | null;
  createdAt: string | null;
  updatedAt?: string | null;
  strapiId?: string | null;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLocation] = useLocation();
  const pageSize = 12;

  const { data: blogData, isLoading, error } = useQuery<BlogResponse>({
    queryKey: ['/api/blog/posts', currentPage],
    queryFn: async () => {
      const response = await fetch(`/api/blog/posts?page=${currentPage}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
  });

  const posts = blogData?.data || [];

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [posts, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSelectPost = (slug: string) => {
    setLocation(`/blog/${slug}`);
  };

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
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Expert insights, proven strategies, and the latest trends in digital marketing to help your business grow
            </p>
            
            {/* Search Bar */}
            <SearchBar 
              blogPosts={posts.map(post => ({
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                author: post.author
              }))}
              onSearch={handleSearch}
              onSelectPost={handleSelectPost}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 py-16">
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
            {searchQuery && (
              <div className="mb-8">
                <p className="text-slate-600 dark:text-slate-400">
                  {filteredPosts.length === 0 
                    ? `No results found for "${searchQuery}"`
                    : `Showing ${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''} for "${searchQuery}"`
                  }
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
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
                  <CardHeader className="pb-4 p-4 sm:p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{post.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">
                          {format(new Date(post.publishedAt || post.createdAt || new Date()), 'MMM d, yyyy')}
                        </span>
                      </div>
                      {post.readingTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">{post.readingTime}</span>
                        </div>
                      )}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <CardTitle className="line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight cursor-pointer hover:underline">
                        {post.title}
                      </CardTitle>
                    </Link>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-4 text-base leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <Link href={`/blog/${post.slug}`}>
                      <Button 
                        variant="ghost" 
                        className="group/btn w-full justify-between hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-white transition-all duration-300 font-medium text-sm sm:text-base"
                      >
                        <span>Read Full Article</span>
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform flex-shrink-0" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {blogData?.meta?.pagination && blogData.meta.pagination.pageCount > currentPage && (
              <div className="text-center mt-16">
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More Articles'
                  )}
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