#!/usr/bin/env tsx

/**
 * Migration script to populate Sanity CMS with existing blog posts
 * Usage: npx tsx scripts/migrate-to-sanity.ts
 */

import { createClient } from '@sanity/client'
import { MemStorage } from '../server/storage.js'

const client = createClient({
  projectId: '3prkr232',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-08-07',
  token: process.env.SANITY_API_TOKEN, // Required for writes
})

async function migrateBlogPosts() {
  console.log('🚀 Starting blog post migration to Sanity...')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN environment variable is required!')
    console.log('To get your token:')
    console.log('1. Go to https://sanity.io/manage/personal/tokens')
    console.log('2. Create a new token with Editor permissions')
    console.log('3. Add it to your .env file: SANITY_API_TOKEN=your_token_here')
    process.exit(1)
  }

  try {
    // Get existing blog posts from local storage
    const storage = new MemStorage()
    await storage.init()
    const localPosts = await storage.getBlogPosts()
    
    console.log(`📖 Found ${localPosts.length} blog posts in local storage`)

    // Check if posts already exist in Sanity
    const existingPosts = await client.fetch(`*[_type == "blogPost"]`)
    console.log(`📊 Found ${existingPosts.length} existing posts in Sanity`)

    const migratedPosts = []

    for (const post of localPosts) {
      console.log(`🔄 Migrating: ${post.title}`)

      // Check if post already exists
      const existingPost = await client.fetch(
        `*[_type == "blogPost" && slug.current == $slug][0]`,
        { slug: post.slug }
      )

      if (existingPost) {
        console.log(`⏭️  Skipping ${post.title} (already exists)`)
        continue
      }

      // Create the blog post document
      const sanityDoc = {
        _type: 'blogPost',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug
        },
        excerpt: post.excerpt,
        content: [
          {
            _type: 'block',
            style: 'normal',
            _key: 'content-block',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 'content-span',
                text: post.content,
                marks: []
              }
            ]
          }
        ],
        author: post.author,
        coverImage: post.coverImage,
        audioUrl: post.audioUrl,
        readingTime: post.readingTime,
        tags: post.tags || [],
        publishedAt: post.publishedAt || post.createdAt || new Date().toISOString()
      }

      try {
        const result = await client.create(sanityDoc)
        migratedPosts.push(result)
        console.log(`✅ Successfully migrated: ${post.title}`)
      } catch (error) {
        console.error(`❌ Failed to migrate ${post.title}:`, error)
      }
    }

    console.log(`🎉 Migration complete!`)
    console.log(`📊 ${migratedPosts.length} posts migrated to Sanity`)
    console.log(`🌐 You can now manage your content at: https://3prkr232.sanity.studio`)
    
    // Verify migration
    const finalCount = await client.fetch(`count(*[_type == "blogPost"])`)
    console.log(`📈 Total posts in Sanity: ${finalCount}`)

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateBlogPosts()
}

export { migrateBlogPosts }