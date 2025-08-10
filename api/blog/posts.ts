import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage, createMemStorageSync, MemStorage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`[Vercel Blog API] ${method} - Processing blog posts request`);

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

    if (method === 'GET') {
      console.log(`[Vercel Blog API] Fetching blog posts list`);
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const pageSize = parseInt(url.searchParams.get('pageSize') || '0');
      
      try {
        let allPosts = await storageInstance.getBlogPosts();
        console.log(`[Vercel Blog API] Blog posts found: ${allPosts.length}`);
        
        // Force initialization if no posts found (production fallback)
        if (allPosts.length === 0) {
          console.log('[Vercel Blog API] No posts found, forcing MemStorage initialization');
          try {
            const memStorage = createMemStorageSync();
            allPosts = await memStorage.getBlogPosts();
            console.log(`[Vercel Blog API] MemStorage initialized with ${allPosts.length} posts`);
            
            // If database is available but empty, populate it
            if (process.env.DATABASE_URL && allPosts.length > 0) {
              console.log('[Vercel Blog API] Populating empty database with MemStorage data');
              for (const post of allPosts) {
                try {
                  await storageInstance.createBlogPost({
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    excerpt: post.excerpt ?? undefined,
                    author: post.author ?? undefined,
                    coverImage: post.coverImage ?? undefined,
                    contentImages: post.contentImages ?? undefined,
                    audioUrl: post.audioUrl ?? undefined,
                    readingTime: post.readingTime ?? undefined,
                    tags: post.tags ?? undefined,
                    publishedAt: post.publishedAt?.toISOString(),
                  });
                } catch (insertError) {
                  console.warn('[Vercel Blog API] Failed to insert post:', post.title, insertError);
                }
              }
              // Refresh posts from database
              try {
                const dbPosts = await storageInstance.getBlogPosts();
                if (dbPosts.length > 0) {
                  allPosts = dbPosts;
                  console.log(`[Vercel Blog API] Database populated, now has ${allPosts.length} posts`);
                }
              } catch (refreshError) {
                console.warn('[Vercel Blog API] Failed to refresh posts from database:', refreshError);
              }
            }
          } catch (error) {
            console.error('[Vercel Blog API] MemStorage initialization failed:', error);
          }
        }
        
        // Limit posts if pageSize is specified
        const posts = pageSize > 0 ? allPosts.slice(0, pageSize) : allPosts;
        
        console.log(`[Vercel Blog API] Returning ${posts.length} blog posts`);
        return res.json({ 
          data: posts,
          meta: {
            pagination: {
              page: 1,
              pageSize: posts.length,
              pageCount: 1,
              total: allPosts.length,
            }
          }
        });
      } catch (error) {
        console.error('[Vercel Blog API] Error fetching blog posts:', (error as Error).message);
        // Ultimate fallback - return MemStorage posts
        try {
          console.log('[Vercel Blog API] Using ultimate MemStorage fallback');
          const memStorage = createMemStorageSync();
          const fallbackPosts = await memStorage.getBlogPosts();
          const posts = pageSize > 0 ? fallbackPosts.slice(0, pageSize) : fallbackPosts;
          console.log(`[Vercel Blog API] Fallback returning ${posts.length} blog posts`);
          
          return res.json({ 
            data: posts,
            meta: {
              pagination: {
                page: 1,
                pageSize: posts.length,
                pageCount: 1,
                total: fallbackPosts.length,
              }
            }
          });
        } catch (fallbackError) {
          console.error('[Vercel Blog API] Ultimate fallback failed:', (fallbackError as Error).message);
          return res.status(500).json({ 
            success: false, 
            message: 'Unable to fetch blog posts',
            error: (error as Error).message 
          });
        }
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