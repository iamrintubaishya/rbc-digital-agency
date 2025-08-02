import { useQuery } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { format } from 'date-fns';
import { Calendar, User, ArrowLeft, Share2, Loader2 } from "lucide-react";
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

export function BlogPostPage() {
  const [match, params] = useRoute('/blog/:slug');
  const slug = params?.slug;

  const { data: blogData, isLoading, error } = useQuery<{ data: BlogPost | null }>({
    queryKey: ['/api/blog/posts', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/posts/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const post = blogData?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600 dark:text-slate-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || 'Check out this article from RBC Digital Agency',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            {/* Article Meta */}
            <div className="flex items-center gap-4 text-sm text-blue-100 mb-4">
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(post.publishedAt || post.createdAt), 'MMMM d, yyyy')}
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-blue-100 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            
            <div className="mt-8">
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {post.coverImage && (
            <div className="relative mb-12 rounded-lg overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}
          
          <div 
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-slate-900 dark:prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-50 dark:bg-slate-800 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Implement These Strategies?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Let RBC Digital Agency help you put these insights into action for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/#contact">
                  Get Started Today
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">
                  Read More Articles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}