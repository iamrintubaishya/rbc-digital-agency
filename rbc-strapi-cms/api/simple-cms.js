// Simple CMS API for Vercel deployment
// This replaces the complex Strapi setup with a lightweight solution

let blogPosts = [
  {
    id: 1,
    title: "5 Digital Marketing Trends That Will Dominate 2025",
    slug: "digital-marketing-trends-2025",
    excerpt: "Stay ahead of the competition with these emerging digital marketing trends that will shape the industry in 2025.",
    content: `<h2>The Future of Digital Marketing is Here</h2>
    <p>As we move into 2025, digital marketing continues to evolve at breakneck speed. Local service businesses need to stay ahead of these trends to maintain their competitive edge.</p>
    
    <h3>1. AI-Powered Personalization</h3>
    <p>Artificial intelligence is revolutionizing how businesses interact with customers. From chatbots to personalized content recommendations, AI is making customer experiences more relevant and engaging.</p>
    
    <h3>2. Voice Search Optimization</h3>
    <p>With smart speakers becoming ubiquitous, optimizing for voice search is no longer optional. Local businesses need to focus on conversational keywords and question-based content.</p>
    
    <h3>3. Video-First Content Strategy</h3>
    <p>Video content continues to dominate social media platforms. Short-form videos, live streaming, and interactive video content are driving engagement rates through the roof.</p>
    
    <h3>4. Hyper-Local Marketing</h3>
    <p>Location-based marketing is becoming more sophisticated. Businesses can now target customers within specific geographic areas with unprecedented precision.</p>
    
    <h3>5. Privacy-First Marketing</h3>
    <p>With increasing privacy regulations, businesses must adapt their marketing strategies to respect user privacy while still delivering effective campaigns.</p>`,
    author: "Sarah Mitchell",
    publishedAt: "2024-12-15T10:00:00.000Z",
    cover: null
  },
  {
    id: 2,
    title: "How to Measure ROI on Your Digital Marketing Investment",
    slug: "measure-digital-marketing-roi",
    excerpt: "Learn the essential metrics and tools you need to track the success of your digital marketing campaigns.",
    content: `<h2>Understanding Digital Marketing ROI</h2>
    <p>Return on Investment (ROI) is the holy grail of marketing metrics. For local service businesses, understanding which marketing efforts drive real results is crucial for sustainable growth.</p>
    
    <h3>Key Metrics to Track</h3>
    <ul>
    <li><strong>Customer Acquisition Cost (CAC)</strong> - How much it costs to acquire a new customer</li>
    <li><strong>Customer Lifetime Value (CLV)</strong> - The total value a customer brings over their relationship with your business</li>
    <li><strong>Conversion Rate</strong> - The percentage of visitors who take desired actions</li>
    <li><strong>Cost Per Lead (CPL)</strong> - How much you spend to generate each lead</li>
    </ul>
    
    <h3>Tools for Measuring ROI</h3>
    <p>Google Analytics, Facebook Ads Manager, and CRM systems provide valuable insights into campaign performance. Setting up proper tracking is essential for accurate measurement.</p>
    
    <h3>Attribution Models</h3>
    <p>Understanding how customers interact with your brand across multiple touchpoints helps you allocate budget more effectively across different marketing channels.</p>`,
    author: "Mike Johnson",
    publishedAt: "2024-12-10T14:30:00.000Z",
    cover: null
  },
  {
    id: 3,
    title: "Local SEO Secrets: Dominate Your Market in 2025",
    slug: "local-seo-secrets-2025",
    excerpt: "Discover the advanced local SEO strategies that will help your business rank higher in local search results.",
    content: `<h2>Local SEO is Your Secret Weapon</h2>
    <p>For local service businesses, appearing in local search results can make or break your marketing success. Here are the strategies that will set you apart from competitors.</p>
    
    <h3>Google Business Profile Optimization</h3>
    <p>Your Google Business Profile is your digital storefront. Keep it updated with accurate information, high-quality photos, and regular posts to improve visibility.</p>
    
    <h3>Local Keyword Strategy</h3>
    <p>Target location-specific keywords that your customers are actually searching for. "Plumber near me" and "best dentist in [city]" are goldmines for local businesses.</p>
    
    <h3>Online Reviews Management</h3>
    <p>Positive reviews are ranking factors and trust signals. Implement a systematic approach to encouraging and managing customer reviews across all platforms.</p>
    
    <h3>Local Link Building</h3>
    <p>Build relationships with local organizations, chambers of commerce, and complementary businesses to earn valuable local backlinks.</p>
    
    <h3>Mobile Optimization</h3>
    <p>Local searches happen on mobile devices. Ensure your website loads quickly and provides an excellent mobile experience.</p>`,
    author: "Jennifer Chen",
    publishedAt: "2024-12-05T09:15:00.000Z",
    cover: null
  },
  {
    id: 4,
    title: "Social Media Content That Converts: A Guide for Service Businesses",
    slug: "social-media-content-converts",
    excerpt: "Create social media content that not only engages your audience but also drives real business results.",
    content: `<h2>Beyond Likes and Shares: Content That Drives Business</h2>
    <p>Social media success isn't measured by vanity metrics. For service businesses, the goal is to create content that builds trust, showcases expertise, and converts followers into customers.</p>
    
    <h3>Content Types That Work</h3>
    <ul>
    <li><strong>Before/After Showcases</strong> - Visual proof of your work builds credibility</li>
    <li><strong>Educational Content</strong> - Position yourself as the expert in your field</li>
    <li><strong>Customer Testimonials</strong> - Social proof is incredibly powerful</li>
    <li><strong>Behind-the-Scenes</strong> - Humanize your brand and build connections</li>
    </ul>
    
    <h3>Platform-Specific Strategies</h3>
    <p>Each social media platform has its own culture and best practices. Tailor your content to match platform expectations while maintaining brand consistency.</p>
    
    <h3>Engagement Strategies</h3>
    <p>Respond promptly to comments and messages. Use social media as a customer service channel to build relationships and resolve issues publicly.</p>
    
    <h3>Conversion Optimization</h3>
    <p>Include clear calls-to-action in your posts. Whether it's booking a consultation or visiting your website, make it easy for followers to take the next step.</p>`,
    author: "David Rodriguez",
    publishedAt: "2024-11-28T16:45:00.000Z",
    cover: null
  },
  {
    id: 5,
    title: "Email Marketing Automation for Local Service Businesses",
    slug: "email-marketing-automation-local-services",
    excerpt: "Set up email automation sequences that nurture leads and keep your business top-of-mind with customers.",
    content: `<h2>Email Marketing: The Unsung Hero of Digital Marketing</h2>
    <p>While social media gets all the attention, email marketing consistently delivers the highest ROI for local service businesses. Here's how to automate your email marketing for maximum impact.</p>
    
    <h3>Welcome Series</h3>
    <p>Create a series of emails that introduce new subscribers to your business, share your story, and provide valuable tips related to your services.</p>
    
    <h3>Lead Nurturing Sequences</h3>
    <p>Not everyone is ready to buy immediately. Nurture leads with educational content that builds trust and positions you as the expert they'll think of when they're ready.</p>
    
    <h3>Seasonal Campaigns</h3>
    <p>Plan email campaigns around seasonal needs. HVAC companies can remind customers about maintenance before summer and winter, while landscapers can promote seasonal services.</p>
    
    <h3>Segmentation Strategies</h3>
    <p>Segment your email list based on customer behavior, interests, and demographics to send more relevant, targeted messages.</p>
    
    <h3>Performance Tracking</h3>
    <p>Monitor open rates, click-through rates, and conversions to optimize your email campaigns for better results.</p>`,
    author: "Lisa Thompson",
    publishedAt: "2024-11-20T11:30:00.000Z",
    cover: null
  }
];

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  
  try {
    // Parse URL and route requests
    if (url === '/api/articles' && method === 'GET') {
      // Return all articles
      res.status(200).json({
        data: blogPosts.map(post => ({
          id: post.id,
          attributes: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            publishedAt: post.publishedAt,
            cover: post.cover
          }
        }))
      });
    } else if (url === '/api/articles' && method === 'POST') {
      // Create new article
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const articleData = JSON.parse(body);
          const newId = Math.max(...blogPosts.map(p => p.id)) + 1;
          const newPost = {
            id: newId,
            title: articleData.title,
            slug: articleData.slug,
            excerpt: articleData.excerpt,
            content: articleData.content,
            author: articleData.author,
            publishedAt: new Date().toISOString(),
            cover: null
          };
          
          blogPosts.push(newPost);
          
          res.status(201).json({
            data: {
              id: newPost.id,
              attributes: {
                title: newPost.title,
                slug: newPost.slug,
                excerpt: newPost.excerpt,
                content: newPost.content,
                author: newPost.author,
                publishedAt: newPost.publishedAt,
                cover: newPost.cover
              }
            }
          });
        } catch (error) {
          res.status(400).json({
            error: {
              status: 400,
              name: 'ValidationError',
              message: 'Invalid JSON data'
            }
          });
        }
      });
      return;
    } else if (url.startsWith('/api/articles/') && method === 'GET') {
      // Return specific article by ID or slug
      const identifier = url.split('/api/articles/')[1];
      const post = blogPosts.find(p => 
        p.id.toString() === identifier || p.slug === identifier
      );
      
      if (post) {
        res.status(200).json({
          data: {
            id: post.id,
            attributes: {
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              content: post.content,
              author: post.author,
              publishedAt: post.publishedAt,
              cover: post.cover
            }
          }
        });
      } else {
        res.status(404).json({
          error: {
            status: 404,
            name: 'NotFoundError',
            message: 'Article not found'
          }
        });
      }
    } else if (url.startsWith('/api/articles/') && method === 'PUT') {
      // Update existing article
      const identifier = url.split('/api/articles/')[1];
      const postIndex = blogPosts.findIndex(p => 
        p.id.toString() === identifier || p.slug === identifier
      );
      
      if (postIndex !== -1) {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const articleData = JSON.parse(body);
            const updatedPost = {
              ...blogPosts[postIndex],
              title: articleData.title || blogPosts[postIndex].title,
              slug: articleData.slug || blogPosts[postIndex].slug,
              excerpt: articleData.excerpt || blogPosts[postIndex].excerpt,
              content: articleData.content || blogPosts[postIndex].content,
              author: articleData.author || blogPosts[postIndex].author
            };
            
            blogPosts[postIndex] = updatedPost;
            
            res.status(200).json({
              data: {
                id: updatedPost.id,
                attributes: {
                  title: updatedPost.title,
                  slug: updatedPost.slug,
                  excerpt: updatedPost.excerpt,
                  content: updatedPost.content,
                  author: updatedPost.author,
                  publishedAt: updatedPost.publishedAt,
                  cover: updatedPost.cover
                }
              }
            });
          } catch (error) {
            res.status(400).json({
              error: {
                status: 400,
                name: 'ValidationError',
                message: 'Invalid JSON data'
              }
            });
          }
        });
        return;
      } else {
        res.status(404).json({
          error: {
            status: 404,
            name: 'NotFoundError',
            message: 'Article not found'
          }
        });
      }
    } else if (url.startsWith('/api/articles/') && method === 'DELETE') {
      // Delete article
      const identifier = url.split('/api/articles/')[1];
      const postIndex = blogPosts.findIndex(p => 
        p.id.toString() === identifier || p.slug === identifier
      );
      
      if (postIndex !== -1) {
        const deletedPost = blogPosts.splice(postIndex, 1)[0];
        res.status(200).json({
          data: {
            id: deletedPost.id,
            message: 'Article deleted successfully'
          }
        });
      } else {
        res.status(404).json({
          error: {
            status: 404,
            name: 'NotFoundError',
            message: 'Article not found'
          }
        });
      }
    } else if (url === '/admin' || url.startsWith('/admin/')) {
      // Enhanced admin interface with edit functionality
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>RBC CMS Admin</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; background: #f8f9fa; }
            .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
            .header { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; }
            h1 { color: #2563eb; margin: 0 0 10px 0; font-size: 2.5em; }
            .subtitle { color: #6b7280; margin: 0; }
            .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
            .stat { background: white; padding: 20px; border-radius: 6px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .stat h3 { margin: 0; font-size: 2em; color: #2563eb; }
            .stat p { margin: 5px 0 0 0; color: #6b7280; }
            .actions { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; }
            .btn { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 14px; margin-right: 10px; text-decoration: none; display: inline-block; }
            .btn:hover { background: #1d4ed8; }
            .btn-danger { background: #dc2626; }
            .btn-danger:hover { background: #b91c1c; }
            .btn-success { background: #16a34a; }
            .btn-success:hover { background: #15803d; }
            .post { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .post h3 { margin: 0 0 10px 0; color: #1f2937; }
            .post p { color: #6b7280; margin: 5px 0; }
            .post-actions { margin-top: 15px; }
            .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; }
            .modal-content { background: white; margin: 50px auto; padding: 30px; border-radius: 8px; max-width: 800px; max-height: 90vh; overflow-y: auto; }
            .form-group { margin-bottom: 20px; }
            .form-group label { display: block; margin-bottom: 5px; font-weight: bold; color: #1f2937; }
            .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
            .form-group textarea { height: 120px; resize: vertical; }
            .form-group textarea.content { height: 300px; }
            .close { float: right; font-size: 28px; font-weight: bold; cursor: pointer; color: #6b7280; }
            .close:hover { color: #1f2937; }
            .success-message { background: #d1fae5; color: #065f46; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
            .error-message { background: #fee2e2; color: #991b1b; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 RBC Digital Agency CMS</h1>
              <p class="subtitle">Manage your blog content and articles</p>
            </div>
            
            <div class="stats">
              <div class="stat">
                <h3>${blogPosts.length}</h3>
                <p>Published Articles</p>
              </div>
              <div class="stat">
                <h3>✅</h3>
                <p>System Status</p>
              </div>
              <div class="stat">
                <h3>API</h3>
                <p>Ready & Working</p>
              </div>
            </div>
            
            <div class="actions">
              <button class="btn btn-success" onclick="openAddModal()">+ Add New Article</button>
              <a href="/api/articles" target="_blank" class="btn">View API Data</a>
              <button class="btn" onclick="refreshPage()">Refresh</button>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; color: #92400e; padding: 15px; margin-bottom: 20px; border-radius: 6px;">
              <strong>⚠️ Important:</strong> Changes are temporary in this demo. For persistent storage, deploy this CMS with a database backend.
            </div>
            
            <div id="message-area"></div>
            
            <h2>Published Articles</h2>
            ${blogPosts.map(post => `
              <div class="post" id="post-${post.id}">
                <h3>${post.title}</h3>
                <p><strong>Author:</strong> ${post.author}</p>
                <p><strong>Published:</strong> ${new Date(post.publishedAt).toLocaleDateString()}</p>
                <p><strong>Slug:</strong> /${post.slug}</p>
                <p>${post.excerpt}</p>
                <div class="post-actions">
                  <button class="btn" onclick="editPost(${post.id})">Edit</button>
                  <button class="btn" onclick="viewPost('${post.slug}')" target="_blank">View</button>
                  <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Edit/Add Modal -->
          <div id="editModal" class="modal">
            <div class="modal-content">
              <span class="close" onclick="closeModal()">&times;</span>
              <h2 id="modalTitle">Edit Article</h2>
              <form id="articleForm">
                <input type="hidden" id="articleId" value="">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" id="title" name="title" required>
                </div>
                <div class="form-group">
                  <label for="slug">Slug</label>
                  <input type="text" id="slug" name="slug" required>
                </div>
                <div class="form-group">
                  <label for="author">Author</label>
                  <input type="text" id="author" name="author" required>
                </div>
                <div class="form-group">
                  <label for="excerpt">Excerpt</label>
                  <textarea id="excerpt" name="excerpt" required></textarea>
                </div>
                <div class="form-group">
                  <label for="content">Content (HTML)</label>
                  <textarea id="content" name="content" class="content" required></textarea>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-success">Save Article</button>
                  <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                </div>
              </form>
            </div>
          </div>

          <script>
            const posts = ${JSON.stringify(blogPosts)};
            
            function openAddModal() {
              document.getElementById('modalTitle').textContent = 'Add New Article';
              document.getElementById('articleForm').reset();
              document.getElementById('articleId').value = '';
              document.getElementById('editModal').style.display = 'block';
            }
            
            function editPost(id) {
              const post = posts.find(p => p.id === id);
              if (!post) return;
              
              document.getElementById('modalTitle').textContent = 'Edit Article';
              document.getElementById('articleId').value = post.id;
              document.getElementById('title').value = post.title;
              document.getElementById('slug').value = post.slug;
              document.getElementById('author').value = post.author;
              document.getElementById('excerpt').value = post.excerpt;
              document.getElementById('content').value = post.content;
              document.getElementById('editModal').style.display = 'block';
            }
            
            function viewPost(slug) {
              window.open('https://rbc-digital-agency.vercel.app/blog/' + slug, '_blank');
            }
            
            async function deletePost(id) {
              if (confirm('Are you sure you want to delete this article?')) {
                try {
                  const response = await fetch('/api/articles/' + id, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
                  
                  if (response.ok) {
                    showMessage('Article deleted successfully!', 'success');
                    document.getElementById('post-' + id).remove();
                    updateStats();
                  } else {
                    const error = await response.json();
                    showMessage('Error deleting article: ' + error.error.message, 'error');
                  }
                } catch (error) {
                  showMessage('Error deleting article: ' + error.message, 'error');
                }
              }
            }
            
            function closeModal() {
              document.getElementById('editModal').style.display = 'none';
            }
            
            function refreshPage() {
              window.location.reload();
            }
            
            function updateStats() {
              const remainingPosts = document.querySelectorAll('.post').length;
              document.querySelector('.stat h3').textContent = remainingPosts;
            }
            
            function showMessage(text, type = 'success') {
              const messageArea = document.getElementById('message-area');
              messageArea.innerHTML = '<div class="' + type + '-message">' + text + '</div>';
              setTimeout(() => {
                messageArea.innerHTML = '';
              }, 5000);
            }
            
            document.getElementById('articleForm').addEventListener('submit', async function(e) {
              e.preventDefault();
              const formData = new FormData(e.target);
              const articleData = Object.fromEntries(formData.entries());
              const articleId = document.getElementById('articleId').value;
              
              try {
                let response;
                if (articleId) {
                  // Update existing article
                  response = await fetch('/api/articles/' + articleId, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(articleData)
                  });
                } else {
                  // Create new article
                  response = await fetch('/api/articles', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(articleData)
                  });
                }
                
                if (response.ok) {
                  const result = await response.json();
                  showMessage('Article saved successfully!', 'success');
                  closeModal();
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500);
                } else {
                  const error = await response.json();
                  showMessage('Error saving article: ' + error.error.message, 'error');
                }
              } catch (error) {
                showMessage('Error saving article: ' + error.message, 'error');
              }
            });
            
            // Close modal when clicking outside
            window.onclick = function(event) {
              const modal = document.getElementById('editModal');
              if (event.target === modal) {
                closeModal();
              }
            }
            
            // Auto-generate slug from title
            document.getElementById('title').addEventListener('input', function(e) {
              const slug = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              document.getElementById('slug').value = slug;
            });
          </script>
        </body>
        </html>
      `);
    } else {
      // Default response
      res.status(200).json({
        message: 'RBC Digital Agency CMS API',
        version: '1.0.0',
        endpoints: {
          articles: '/api/articles',
          admin: '/admin'
        },
        status: 'operational'
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: {
        status: 500,
        name: 'InternalServerError',
        message: error.message
      }
    });
  }
};