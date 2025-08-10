import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage, createMemStorageSync } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  console.log(`[Vercel Sync API] Manual sync triggered`);

  try {
    // Initialize storage
    let storageInstance: Awaited<typeof storage>;
    try {
      storageInstance = await Promise.race([
        storage,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Storage initialization timeout')), 10000)
        )
      ]);
    } catch (storageError) {
      console.error('[Vercel Sync API] Storage initialization failed:', (storageError as Error).message);
      console.log('[Vercel Sync API] Using MemStorage for sync source');
      
      // Return MemStorage data since database isn't available
      const memStorage = createMemStorageSync();
      const memPosts = await memStorage.getBlogPosts();
      return res.json({ 
        success: true, 
        message: `Database unavailable. MemStorage has ${memPosts.length} posts available.`,
        posts: memPosts.length 
      });
    }

    // Check current posts
    const allPosts = await storageInstance.getBlogPosts();
    console.log('Sync endpoint called, current posts:', allPosts.length);
    
    if (allPosts.length < 10) {
      // Get MemStorage posts to populate missing ones
      const memStorage = createMemStorageSync();
      const memPosts = await memStorage.getBlogPosts();
      
      for (const memPost of memPosts) {
        const existing = allPosts.find(p => p.slug === memPost.slug);
        if (!existing) {
          console.log('Adding missing post:', memPost.title);
          try {
            await storageInstance.createBlogPost({
              title: memPost.title,
              slug: memPost.slug,
              content: memPost.content,
              excerpt: memPost.excerpt ?? undefined,
              author: memPost.author ?? undefined,
              coverImage: memPost.coverImage ?? undefined,
              contentImages: memPost.contentImages ?? undefined,
              audioUrl: memPost.audioUrl ?? undefined,
              readingTime: memPost.readingTime ?? undefined,
              tags: memPost.tags ?? undefined,
              publishedAt: memPost.publishedAt?.toISOString(),
            });
          } catch (insertError) {
            console.warn('Failed to insert post:', memPost.title, insertError);
          }
        }
      }
    }
    
    const finalPosts = await storageInstance.getBlogPosts();
    return res.json({ 
      success: true, 
      message: `Sync complete. Total posts: ${finalPosts.length}`,
      posts: finalPosts.length
    });
    
  } catch (error) {
    console.error('Sync failed:', (error as Error).message);
    return res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
}