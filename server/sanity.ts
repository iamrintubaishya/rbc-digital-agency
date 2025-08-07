import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '3prkr232',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-08-07',
  token: process.env.SANITY_API_TOKEN, // Required for mutations
})

// Read-only client for public queries
export const publicSanityClient = createClient({
  projectId: '3prkr232',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-08-07',
  // No token needed for reads
})

// Blog post queries
export async function getAllBlogPostsFromSanity() {
  try {
    const posts = await publicSanityClient.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        content,
        author,
        coverImage,
        audioUrl,
        readingTime,
        tags,
        publishedAt,
        _createdAt,
        _updatedAt
      }
    `)
    
    // Transform Sanity data to match our existing schema
    return posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: Array.isArray(post.content) 
        ? post.content.map((block: any) => 
            block._type === 'block' 
              ? block.children?.map((child: any) => child.text).join('') || ''
              : block
          ).join('\n\n')
        : post.content,
      author: post.author,
      coverImage: post.coverImage,
      audioUrl: post.audioUrl,
      readingTime: post.readingTime,
      tags: post.tags || [],
      publishedAt: post.publishedAt || post._createdAt,
      createdAt: post._createdAt,
      updatedAt: post._updatedAt
    }))
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return []
  }
}

export async function getBlogPostFromSanity(slug: string) {
  try {
    const post = await publicSanityClient.fetch(`
      *[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        content,
        author,
        coverImage,
        audioUrl,
        readingTime,
        tags,
        publishedAt,
        _createdAt,
        _updatedAt
      }
    `, { slug })
    
    if (!post) return null
    
    // Transform Sanity data to match our existing schema
    return {
      id: post._id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: Array.isArray(post.content) 
        ? post.content.map((block: any) => 
            block._type === 'block' 
              ? block.children?.map((child: any) => child.text).join('') || ''
              : block
          ).join('\n\n')
        : post.content,
      author: post.author,
      coverImage: post.coverImage,
      audioUrl: post.audioUrl,
      readingTime: post.readingTime,
      tags: post.tags || [],
      publishedAt: post.publishedAt || post._createdAt,
      createdAt: post._createdAt,
      updatedAt: post._updatedAt
    }
  } catch (error) {
    console.error('Error fetching post from Sanity:', error)
    return null
  }
}

export async function createBlogPostInSanity(data: any) {
  try {
    const doc = {
      _type: 'blogPost',
      title: data.title,
      slug: {
        _type: 'slug',
        current: data.slug
      },
      excerpt: data.excerpt,
      content: typeof data.content === 'string' 
        ? [{ 
            _type: 'block', 
            children: [{ _type: 'span', text: data.content }] 
          }]
        : data.content,
      author: data.author,
      coverImage: data.coverImage,
      audioUrl: data.audioUrl,
      readingTime: data.readingTime,
      tags: data.tags || [],
      publishedAt: data.publishedAt || new Date().toISOString()
    }
    
    return await sanityClient.create(doc)
  } catch (error) {
    console.error('Error creating post in Sanity:', error)
    throw error
  }
}

export async function updateBlogPostInSanity(id: string, data: any) {
  try {
    const updates: any = {}
    
    if (data.title) updates.title = data.title
    if (data.slug) updates.slug = { _type: 'slug', current: data.slug }
    if (data.excerpt) updates.excerpt = data.excerpt
    if (data.content) {
      updates.content = typeof data.content === 'string' 
        ? [{ 
            _type: 'block', 
            children: [{ _type: 'span', text: data.content }] 
          }]
        : data.content
    }
    if (data.author) updates.author = data.author
    if (data.coverImage) updates.coverImage = data.coverImage
    if (data.audioUrl) updates.audioUrl = data.audioUrl
    if (data.readingTime) updates.readingTime = data.readingTime
    if (data.tags) updates.tags = data.tags
    if (data.publishedAt) updates.publishedAt = data.publishedAt
    
    return await sanityClient.patch(id).set(updates).commit()
  } catch (error) {
    console.error('Error updating post in Sanity:', error)
    throw error
  }
}