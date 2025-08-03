import { useState, useEffect } from 'react';
import { Button } from './button';
import { Textarea } from './textarea';
import { Input } from './input';
import { Card, CardContent, CardHeader } from './card';
import { User, MessageCircle, Clock, Reply, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  postSlug: string;
  isAdmin?: boolean;
  replyTo?: string;
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
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [adminMode, setAdminMode] = useState(false);
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
        postSlug,
        isAdmin: adminMode,
        replyTo: replyingTo || undefined
      };

      setComments(prev => [comment, ...prev]);
      setNewComment({ author: '', email: '', content: '' });
      setReplyingTo(null);
      
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
    <div className="space-y-6 font-inter" data-testid="comment-section">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent font-inter">
          Comments ({comments.length})
        </h3>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Share your thoughts and join the conversation
      </p>

      {/* Admin Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setAdminMode(!adminMode)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs transition-colors ${
            adminMode 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Shield className="w-3 h-3" />
          {adminMode ? 'Admin Mode' : 'User Mode'}
        </button>
      </div>

      {/* Comment Form */}
      <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 shadow-lg">
        <CardHeader className={`text-white rounded-t-lg ${
          adminMode 
            ? 'bg-gradient-to-r from-purple-500 to-indigo-500' 
            : 'bg-gradient-to-r from-blue-500 to-green-500'
        }`}>
          <h4 className="font-semibold text-lg flex items-center gap-2 font-inter">
            {adminMode ? <Shield className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
            {replyingTo ? 'Reply to Comment' : adminMode ? 'Admin Reply' : 'Leave a Comment'}
          </h4>
          <div className="flex items-center justify-between">
            <p className={`text-sm ${adminMode ? 'text-purple-100' : 'text-blue-100'}`}>
              {replyingTo ? 'Responding to a comment' : adminMode ? 'Posting as administrator' : 'We\'d love to hear your thoughts on this article'}
            </p>
            {replyingTo && (
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setAdminMode(false);
                }}
                className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
              >
                Cancel Reply
              </button>
            )}
          </div>
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
              className={`rounded-lg p-4 border transition-all duration-200 group ${
                comment.isAdmin 
                  ? 'bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600'
                  : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              } hover:bg-slate-50 dark:hover:bg-slate-800/50 ${comment.replyTo ? 'ml-8 border-l-4 border-l-blue-400' : ''}`}
              data-testid={`comment-${comment.id}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                    comment.isAdmin 
                      ? 'bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-900/50 dark:to-indigo-800/50 border-purple-200 dark:border-purple-700 group-hover:border-purple-300 dark:group-hover:border-purple-500'
                      : 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 border-blue-200 dark:border-blue-700 group-hover:border-blue-300 dark:group-hover:border-blue-500'
                  }`}>
                    {comment.isAdmin ? (
                      <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className={`font-semibold text-sm font-inter transition-colors ${
                      comment.isAdmin 
                        ? 'text-purple-900 dark:text-purple-200 group-hover:text-purple-700 dark:group-hover:text-purple-300'
                        : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }`}>
                      {comment.author}
                      {comment.isAdmin && (
                        <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">
                          <Shield className="w-3 h-3" />
                          Admin
                        </span>
                      )}
                    </h5>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full font-mono">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className={`p-3 rounded-md border ${
                    comment.isAdmin 
                      ? 'bg-white/80 dark:bg-slate-900/60 border-purple-100 dark:border-purple-800'
                      : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-700'
                  }`}>
                    <p className={`text-sm leading-relaxed font-inter ${
                      comment.isAdmin 
                        ? 'text-slate-800 dark:text-slate-200 font-medium'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {comment.content}
                    </p>
                  </div>
                  {!comment.isAdmin && (
                    <button
                      onClick={() => {
                        setReplyingTo(comment.id);
                        setAdminMode(true);
                        document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-2 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Reply className="w-3 h-3" />
                      Reply as Admin
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}