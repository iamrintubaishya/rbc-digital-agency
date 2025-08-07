import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Save, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  readingTime?: number;
  publishedAt?: string;
}

interface EditingPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage?: string;
  tags: string[];
}

export default function AdminPage() {
  const [editingPost, setEditingPost] = useState<EditingPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      return data.data || [];
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (post: EditingPost) => {
      const response = await fetch(`/api/blog/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (!response.ok) throw new Error('Failed to update post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      setEditingPost(null);
      toast({ title: "Post updated successfully!" });
    },
    onError: (error) => {
      toast({ title: "Error updating post", description: error.message, variant: "destructive" });
    }
  });

  const createMutation = useMutation({
    mutationFn: async (post: Omit<EditingPost, 'id'>) => {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      setIsCreating(false);
      setEditingPost(null);
      toast({ title: "Post created successfully!" });
    },
    onError: (error) => {
      toast({ title: "Error creating post", description: error.message, variant: "destructive" });
    }
  });

  const startEditing = (post: BlogPost) => {
    setEditingPost({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      coverImage: post.coverImage,
      tags: post.tags || []
    });
    setIsCreating(false);
  };

  const startCreating = () => {
    setEditingPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      tags: []
    });
    setIsCreating(true);
  };

  const savePost = () => {
    if (!editingPost) return;
    
    if (isCreating) {
      createMutation.mutate(editingPost);
    } else {
      updateMutation.mutate(editingPost);
    }
  };

  const updateField = (field: keyof EditingPost, value: string | string[]) => {
    if (!editingPost) return;
    setEditingPost({ ...editingPost, [field]: value });
  };

  const updateTags = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    updateField('tags', tags);
  };

  if (isLoading) {
    return <div className="p-8">Loading blog posts...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Admin</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your blog posts</p>
          </div>
          <Button onClick={startCreating} className="flex items-center gap-2">
            <Plus size={16} />
            New Post
          </Button>
        </div>

        {editingPost && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{isCreating ? 'Create New Post' : 'Edit Post'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={editingPost.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <Input
                    value={editingPost.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    placeholder="post-url-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <Textarea
                  value={editingPost.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  placeholder="Brief description of the post"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <Textarea
                  value={editingPost.content}
                  onChange={(e) => updateField('content', e.target.value)}
                  placeholder="Full post content"
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Author</label>
                  <Input
                    value={editingPost.author}
                    onChange={(e) => updateField('author', e.target.value)}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                  <Input
                    value={editingPost.coverImage || ''}
                    onChange={(e) => updateField('coverImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                  <Input
                    value={editingPost.tags.join(', ')}
                    onChange={(e) => updateTags(e.target.value)}
                    placeholder="marketing, social media, SEO"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={savePost} 
                  disabled={updateMutation.isPending || createMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Save size={16} />
                  {isCreating ? 'Create Post' : 'Save Changes'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            All Posts ({posts?.length || 0})
          </h2>
          
          {posts?.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>By {post.author}</span>
                      <span>/{post.slug}</span>
                      {post.readingTime && <span>{post.readingTime} min read</span>}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startEditing(post)}
                    className="flex items-center gap-1"
                  >
                    <Pencil size={14} />
                    Edit
                  </Button>
                </div>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}