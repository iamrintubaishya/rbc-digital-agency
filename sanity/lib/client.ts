import { createClient } from '@sanity/client'

// This will be configured after setting up your Sanity project
export const client = createClient({
  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // For write operations
})

// Custom adapter to connect Sanity to your Neon database
export class NeonBlogAdapter {
  private apiUrl: string

  constructor(apiUrl = 'http://localhost:5000/api') {
    this.apiUrl = apiUrl
  }

  async getAllPosts() {
    const response = await fetch(`${this.apiUrl}/blog/posts`)
    const data = await response.json()
    return data.data || []
  }

  async getPost(id: string) {
    const response = await fetch(`${this.apiUrl}/blog/posts/${id}`)
    const data = await response.json()
    return data.data
  }

  async createPost(post: any) {
    const response = await fetch(`${this.apiUrl}/blog/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    const data = await response.json()
    return data.data
  }

  async updatePost(id: string, post: any) {
    const response = await fetch(`${this.apiUrl}/blog/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    const data = await response.json()
    return data.data
  }

  async deletePost(id: string) {
    const response = await fetch(`${this.apiUrl}/blog/posts/${id}`, {
      method: 'DELETE',
    })
    return response.ok
  }

  // Convert Sanity's rich text format to plain text for storage
  convertSanityContentToText(content: any[]): string {
    if (!content || !Array.isArray(content)) return ''
    
    return content
      .map(block => {
        if (block._type === 'block' && block.children) {
          return block.children.map((child: any) => child.text).join('')
        }
        return ''
      })
      .join('\n\n')
  }

  // Convert plain text back to Sanity's rich text format
  convertTextToSanityContent(text: string): any[] {
    const paragraphs = text.split('\n\n').filter(p => p.trim())
    
    return paragraphs.map(paragraph => ({
      _type: 'block',
      _key: Math.random().toString(36).substr(2, 9),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substr(2, 9),
          text: paragraph,
          marks: [],
        },
      ],
    }))
  }
}

export const neonAdapter = new NeonBlogAdapter()