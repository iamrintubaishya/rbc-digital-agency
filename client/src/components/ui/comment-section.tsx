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
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <h4 className="font-medium text-slate-900 dark:text-white">Leave a Comment</h4>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Your name *"
                  value={newComment.author}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                  disabled={isSubmitting}
                  data-testid="input-comment-author"
                  className="border-slate-300 dark:border-slate-600"
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
                  className="border-slate-300 dark:border-slate-600"
                />
              </div>
            </div>
            <div>
              <Textarea
                placeholder="Write your comment here... *"
                value={newComment.content}
                onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                disabled={isSubmitting}
                rows={4}
                data-testid="textarea-comment-content"
                className="border-slate-300 dark:border-slate-600 resize-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                * Required fields
              </p>
              <Button 
                type="submit" 
                disabled={isSubmitting || !newComment.author.trim() || !newComment.content.trim()}
                data-testid="button-submit-comment"
                className="min-w-[120px]"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="py-8 text-center">
              <MessageCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                No comments yet. Be the first to share your thoughts!
              </p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="border-slate-200 dark:border-slate-700" data-testid={`comment-${comment.id}`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-medium text-slate-900 dark:text-white truncate">
                        {comment.author}
                      </h5>
                      <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}