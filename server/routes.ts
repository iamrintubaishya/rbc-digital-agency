import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { hubspotService } from "./hubspot";
import { insertContactSchema, insertBookingSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import { 
  getAllBlogPostsFromSanity, 
  getBlogPostFromSanity, 
  createBlogPostInSanity, 
  updateBlogPostInSanity 
} from "./sanity.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Await storage initialization  
  const storageInstance = await storage;
  
  // Contact form submission with HubSpot integration
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      let hubspotContactId: string | undefined;
      
      // Try to create contact in HubSpot
      console.log('🔍 HubSpot service enabled:', hubspotService.isEnabled());
      console.log('🔍 Environment token present:', !!process.env.HUBSPOT_ACCESS_TOKEN);
      
      if (hubspotService.isEnabled()) {
        try {
          console.log('📝 Creating HubSpot contact with data:', {
            email: validatedData.email,
            firstname: validatedData.firstName,
            lastname: validatedData.lastName,
            phone: validatedData.phone,
            company: validatedData.businessType,
          });
          
          const hubspotContact = await hubspotService.createContact({
            email: validatedData.email,
            firstname: validatedData.firstName,
            lastname: validatedData.lastName,
            phone: validatedData.phone,
            company: validatedData.businessType,
          });
          
          hubspotContactId = hubspotContact.id;
          console.log('✅ HubSpot contact created successfully:', hubspotContactId);
        } catch (hubspotError) {
          console.error('❌ HubSpot integration failed:', hubspotError);
          // Continue with contact creation even if HubSpot fails
        }
      } else {
        console.warn('⚠️ HubSpot service not enabled - check HUBSPOT_ACCESS_TOKEN');
      }
      
      const contact = await storageInstance.createContact({
        ...validatedData,
        hubspotContactId,
      });
      
      res.json({ 
        success: true, 
        contact, 
        hubspotContactId,
        message: hubspotContactId ? `Contact created in HubSpot with ID: ${hubspotContactId}` : 'Contact saved locally'
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error('Contact form error:', error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Booking form submission with HubSpot integration
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      let hubspotContactId: string | undefined;
      
      // Try to create or find contact in HubSpot
      if (hubspotService.isEnabled()) {
        try {
          // First search for existing contact
          const searchResult = await hubspotService.searchContacts(validatedData.email);
          
          if (searchResult.results && searchResult.results.length > 0) {
            hubspotContactId = searchResult.results[0].id;
          } else {
            // Create new contact in HubSpot
            const hubspotContact = await hubspotService.createContact({
              email: validatedData.email,
              firstname: validatedData.name.split(' ')[0],
              lastname: validatedData.name.split(' ').slice(1).join(' ') || '',
            });
            hubspotContactId = hubspotContact.id;
          }
        } catch (hubspotError) {
          console.warn('HubSpot integration failed:', hubspotError);
          // Continue with booking creation even if HubSpot fails
        }
      }
      
      const booking = await storageInstance.createBooking({
        ...validatedData,
        hubspotContactId,
      });
      
      res.json({ success: true, booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid booking data", 
          errors: error.errors 
        });
      } else {
        console.error('Booking creation error:', error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create booking" 
        });
      }
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storageInstance.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contacts" 
      });
    }
  });

  // Get all bookings (admin endpoint)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storageInstance.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch bookings" 
      });
    }
  });

  // Blog API routes - using Sanity CMS
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const loadAll = req.query.loadAll === 'true';
      
      let allPosts = [];
      
      if (loadAll) {
        // Load all content including MemStorage when requested
        console.log('Loading all blog content including local storage');
        allPosts = await storageInstance.getBlogPosts();
        
        // Also try to get from Sanity and merge
        try {
          const sanityPosts = await getAllBlogPostsFromSanity();
          if (sanityPosts && sanityPosts.length > 0) {
            console.log(`Found ${sanityPosts.length} posts in Sanity, ${allPosts.length} in local storage`);
            // Merge Sanity posts with local posts, avoiding duplicates
            const sanityIds = new Set(sanityPosts.map((p: any) => p.slug));
            const uniqueLocalPosts = allPosts.filter((p: any) => !sanityIds.has(p.slug));
            allPosts = [...sanityPosts, ...uniqueLocalPosts];
          }
        } catch (error) {
          console.warn('Could not load from Sanity, using local content only:', error);
        }
      } else {
        // Default behavior - try Sanity first, fall back to local storage
        allPosts = await getAllBlogPostsFromSanity();
        
        // If Sanity returns no posts, fall back to local storage
        if (!allPosts || allPosts.length === 0) {
          console.log('Sanity returned no posts, using local storage fallback');
          allPosts = await storageInstance.getBlogPosts();
        }
      }
      
      // Apply pagination only if not loading all content
      let posts = allPosts;
      if (!loadAll) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        posts = allPosts.slice(startIndex, endIndex);
      }
      
      res.json({ 
        data: posts,
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount: Math.ceil(allPosts.length / pageSize),
            total: allPosts.length,
          }
        }
      });
    } catch (error) {
      console.error('Blog posts API error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog posts" 
      });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      // Try to get from Sanity first
      let post = await getBlogPostFromSanity(slug);
      
      // Fall back to local storage if not found in Sanity
      if (!post) {
        console.log(`Post ${slug} not found in Sanity, trying local storage`);
        const localPost = await storageInstance.getBlogPostBySlug(slug);
        if (localPost) {
          post = localPost;
        }
      }
      
      if (!post) {
        res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
        return;
      }
      
      res.json({ data: post });
    } catch (error) {
      console.error('Blog post fetch error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog post" 
      });
    }
  });

  // Update blog post in Sanity
  app.patch("/api/blog/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      // First try to find the post in Sanity
      let existingPost = await getBlogPostFromSanity(slug);
      
      if (existingPost && process.env.SANITY_API_TOKEN) {
        // Update in Sanity if found and token available
        const updatedPost = await updateBlogPostInSanity(existingPost.id, req.body);
        res.json({ success: true, data: updatedPost });
      } else {
        // Fall back to local storage update
        console.log(`Updating post ${slug} in local storage (Sanity not available)`);
        const localPost = await storageInstance.getBlogPostBySlug(slug);
        if (!localPost) {
          return res.status(404).json({ success: false, message: 'Blog post not found' });
        }
        
        const updatedPost = await storageInstance.updateBlogPost(localPost.id, req.body);
        if (updatedPost) {
          res.json({ success: true, data: updatedPost });
        } else {
          res.status(404).json({ success: false, message: 'Blog post not found' });
        }
      }
    } catch (error) {
      console.error('Blog update error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  app.post("/api/blog/posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      
      // Try to create in Sanity if token is available
      if (process.env.SANITY_API_TOKEN) {
        const post = await createBlogPostInSanity(validatedData);
        res.json({ success: true, post });
      } else {
        // Fall back to local storage
        console.log('Creating blog post in local storage (Sanity token not available)');
        const post = await storageInstance.createBlogPost(validatedData);
        res.json({ success: true, post });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid blog post data", 
          errors: error.errors 
        });
      } else {
        console.error('Blog post creation error:', error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create blog post" 
        });
      }
    }
  });

  // Serve the admin interface for blog management
  app.get("/admin", (req, res) => {
    res.sendFile("admin.html", { root: "." });
  });

  const httpServer = createServer(app);
  return httpServer;
}
