import { useState, useEffect } from 'react';
import { Button } from './button';
import { Textarea } from './textarea';
import { Input } from './input';
import { Card, CardContent, CardHeader } from './card';
import { User, MessageCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  postSlug: string;
}

interface CommentSectionProps {
  postSlug: string;
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load comments from localStorage on component mount
  useEffect(() => {
    const loadComments = () => {
      try {
        const storedComments = localStorage.getItem(`comments-${postSlug}`);
        if (storedComments) {
          const parsed = JSON.parse(storedComments);
          setComments(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.warn('Failed to load comments from localStorage:', error);
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [postSlug]);

  // Save comments to localStorage whenever comments change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(`comments-${postSlug}`, JSON.stringify(comments));
      } catch (error) {
        console.warn('Failed to save comments to localStorage:', error);
      }
    }
  }, [comments, postSlug, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author.trim() || !newComment.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and comment.",
        variant: "destructive",
      });
      return;
    }

    if (newComment.content.length < 3) {
      toast({
        title: "Comment Too Short",
        description: "Please write a comment with at least 3 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const comment: Comment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        author: newComment.author.trim(),
        email: newComment.email.trim(),
        content: newComment.content.trim(),
        createdAt: new Date().toISOString(),
        postSlug
      };

      setComments(prev => [comment, ...prev]);
      setNewComment({ author: '', email: '', content: '' });
      
      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully!",
      });
    } catch (error) {
      console.error('Failed to submit comment:', error);
      toast({
        title: "Error",
        description: "Failed to post your comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Loading Comments...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="comment-section">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Comments ({comments.length})
        </h3>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Share your thoughts and join the conversation
      </p>

      {/* Comment Form */}
      <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Leave a Comment
          </h4>
          <p className="text-blue-100 text-sm">
            We'd love to hear your thoughts on this article
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Your name *"
                  value={newComment.author}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                  disabled={isSubmitting}
                  data-testid="input-comment-author"
                  className="border-blue-300 dark:border-blue-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your email (optional)"
                  value={newComment.email}
                  onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                  disabled={isSubmitting}
                  data-testid="input-comment-email"
                  className="border-blue-300 dark:border-blue-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>
            </div>
            <div>
              <Textarea
                placeholder="Write your comment here... *"
                value={newComment.content}
                onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                disabled={isSubmitting}
                rows={3}
                data-testid="textarea-comment-content"
                className="border-blue-300 dark:border-blue-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                * Required fields
              </p>
              <Button 
                type="submit" 
                disabled={isSubmitting || !newComment.author.trim() || !newComment.content.trim()}
                data-testid="button-submit-comment"
                className="min-w-[120px] bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
            <CardContent className="py-12 text-center">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Start the conversation!
              </h4>
              <p className="text-slate-500 dark:text-slate-400">
                No comments yet. Be the first to share your thoughts on this article.
              </p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment, index) => (
            <div 
              key={comment.id} 
              className="bg-slate-50/50 dark:bg-slate-800/30 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group" 
              data-testid={`comment-${comment.id}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors">
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {comment.author}
                    </h5>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/50 p-3 rounded-md border border-slate-100 dark:border-slate-700">
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}