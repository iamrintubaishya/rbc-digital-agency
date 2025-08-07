import React, { useState, useEffect } from 'react'
import { Card, Button, Stack, TextInput, TextArea } from '@sanity/ui'
import { neonAdapter } from '../lib/client'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  author?: string
  coverImage?: string
  contentImages?: string[]
  audioUrl?: string
  readingTime?: string
  tags?: string[]
  publishedAt?: string
}

export function CustomBlogPostInput() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const postsData = await neonAdapter.getAllPosts()
      setPosts(postsData)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSavePost = async () => {
    if (!selectedPost) return

    try {
      setSaving(true)
      await neonAdapter.updatePost(selectedPost.id, selectedPost)
      await loadPosts()
      alert('Post saved successfully!')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post')
    } finally {
      setSaving(false)
    }
  }

  const handlePostChange = (field: keyof BlogPost, value: any) => {
    if (!selectedPost) return
    
    setSelectedPost({
      ...selectedPost,
      [field]: value
    })
  }

  if (loading) {
    return <div>Loading posts from your Neon database...</div>
  }

  return (
    <Stack space={4}>
      <Card padding={4}>
        <h2>Your Blog Posts from Neon Database</h2>
        <Stack space={2}>
          {posts.map((post) => (
            <Card
              key={post.id}
              padding={3}
              tone={selectedPost?.id === post.id ? 'primary' : 'default'}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedPost(post)}
            >
              <h3>{post.title}</h3>
              <p>{post.excerpt || 'No excerpt'}</p>
              <small>Published: {post.publishedAt || 'Draft'}</small>
            </Card>
          ))}
        </Stack>
      </Card>

      {selectedPost && (
        <Card padding={4}>
          <Stack space={4}>
            <h2>Edit Post: {selectedPost.title}</h2>
            
            <TextInput
              placeholder="Post Title"
              value={selectedPost.title}
              onChange={(event) => handlePostChange('title', event.currentTarget.value)}
            />

            <TextInput
              placeholder="Slug"
              value={selectedPost.slug}
              onChange={(event) => handlePostChange('slug', event.currentTarget.value)}
            />

            <TextArea
              placeholder="Excerpt"
              value={selectedPost.excerpt || ''}
              onChange={(event) => handlePostChange('excerpt', event.currentTarget.value)}
              rows={3}
            />

            <TextArea
              placeholder="Content"
              value={selectedPost.content}
              onChange={(event) => handlePostChange('content', event.currentTarget.value)}
              rows={15}
            />

            <TextInput
              placeholder="Author"
              value={selectedPost.author || ''}
              onChange={(event) => handlePostChange('author', event.currentTarget.value)}
            />

            <TextInput
              placeholder="Cover Image URL"
              value={selectedPost.coverImage || ''}
              onChange={(event) => handlePostChange('coverImage', event.currentTarget.value)}
            />

            <TextInput
              placeholder="Audio URL"
              value={selectedPost.audioUrl || ''}
              onChange={(event) => handlePostChange('audioUrl', event.currentTarget.value)}
            />

            <TextInput
              placeholder="Reading Time"
              value={selectedPost.readingTime || ''}
              onChange={(event) => handlePostChange('readingTime', event.currentTarget.value)}
            />

            <TextInput
              placeholder="Tags (comma separated)"
              value={selectedPost.tags?.join(', ') || ''}
              onChange={(event) => 
                handlePostChange('tags', event.currentTarget.value.split(',').map(tag => tag.trim()))
              }
            />

            <Button
              tone="primary"
              onClick={handleSavePost}
              loading={saving}
              text={saving ? 'Saving...' : 'Save Changes to Neon Database'}
            />
          </Stack>
        </Card>
      )}
    </Stack>
  )
}