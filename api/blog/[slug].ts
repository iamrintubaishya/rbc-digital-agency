import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage, createMemStorageSync } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, query } = req;
  const { slug } = query;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`[Vercel Blog API] ${method} - Processing blog post: ${slug}`);

  try {
    // Initialize storage with timeout and fallback
    let storageInstance: Awaited<typeof storage>;
    try {
      storageInstance = await Promise.race([
        storage,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Storage initialization timeout')), 10000)
        )
      ]);
    } catch (storageError) {
      console.error('[Vercel Blog API] Storage initialization failed:', (storageError as Error).message);
      console.log('[Vercel Blog API] Using MemStorage fallback');
      storageInstance = createMemStorageSync();
    }

    if (method === 'GET' && typeof slug === 'string') {
      try {
        const post = await storageInstance.getBlogPostBySlug(slug);
        if (post) {
          console.log(`[Vercel Blog API] Blog post found: ${post.title}`);
          return res.json({ data: post });
        } else {
          console.log(`[Vercel Blog API] Blog post not found: ${slug}`);
          return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
      } catch (error) {
        console.error(`[Vercel Blog API] Error fetching blog post ${slug}:`, (error as Error).message);
        return res.status(500).json({ success: false, message: 'Error fetching blog post' });
      }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });

  } catch (error) {
    console.error('[Vercel Blog API] Handler error:', (error as Error).message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: (error as Error).message 
    });
  }
}