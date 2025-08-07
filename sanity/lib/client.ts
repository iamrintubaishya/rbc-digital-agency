import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '3prkr232',
  dataset: 'production',
  useCdn: true, // Enable for better performance in production
  apiVersion: '2024-08-07', // Use today's date
  
  // For write operations, you'll need a token
  // token: process.env.SANITY_API_TOKEN, // Only for mutations
})

export const writeClient = createClient({
  projectId: '3prkr232',
  dataset: 'production',
  useCdn: false, // Don't use CDN for writes
  apiVersion: '2024-08-07',
  token: process.env.SANITY_API_TOKEN, // Required for mutations
})

// Query helpers
export async function getAllBlogPosts() {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      content,
      author,
      coverImage,
      audioUrl,
      readingTime,
      tags,
      publishedAt
    }
  `)
}

export async function getBlogPost(slug: string) {
  return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      author,
      coverImage,
      audioUrl,
      readingTime,
      tags,
      publishedAt
    }
  `, { slug })
}

export async function createBlogPost(data: any) {
  return writeClient.create({
    _type: 'blogPost',
    ...data
  })
}

export async function updateBlogPost(id: string, data: any) {
  return writeClient.patch(id).set(data).commit()
}