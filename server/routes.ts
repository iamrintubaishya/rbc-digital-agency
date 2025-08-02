import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { hubspotService } from "./hubspot";
import { strapiService } from "./strapi";
import { insertContactSchema, insertBookingSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
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
      
      const booking = await storage.createBooking({
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
      const contacts = await storage.getContacts();
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
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch bookings" 
      });
    }
  });

  // Blog API routes with Strapi integration
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      
      // Try to fetch from Strapi first
      if (strapiService.isEnabled()) {
        try {
          const strapiResponse = await strapiService.getArticles({
            page,
            pageSize,
            sort: ['publishedAt:desc'],
            populate: ['cover'],
          });
          
          if (strapiResponse.data.length > 0) {
            // Sync articles to database
            for (const article of strapiResponse.data) {
              await strapiService.syncArticleToDatabase(article, await import('./db').then(m => m.db));
            }
          }
          
          res.json(strapiResponse);
          return;
        } catch (strapiError) {
          console.warn('Strapi integration failed, falling back to local database:', strapiError);
        }
      }
      
      // Fallback to local database
      const posts = await storage.getBlogPosts();
      res.json({ 
        data: posts,
        meta: {
          pagination: {
            page: 1,
            pageSize: posts.length,
            pageCount: 1,
            total: posts.length,
          }
        }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog posts" 
      });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      // Try Strapi first
      if (strapiService.isEnabled()) {
        try {
          const strapiResponse = await strapiService.getArticleBySlug(slug);
          if (strapiResponse.data) {
            // Sync article to database
            await strapiService.syncArticleToDatabase(strapiResponse.data, await import('./db').then(m => m.db));
            res.json(strapiResponse);
            return;
          }
        } catch (strapiError) {
          console.warn('Strapi integration failed, falling back to local database:', strapiError);
        }
      }
      
      // Fallback to local database
      const post = await storage.getBlogPostBySlug(slug);
      if (!post) {
        res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
        return;
      }
      
      res.json({ data: post });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog post" 
      });
    }
  });

  app.post("/api/blog/posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      
      // Create in Strapi first if available
      if (strapiService.isEnabled()) {
        try {
          const strapiResponse = await strapiService.createArticle(validatedData);
          // Sync to local database
          await strapiService.syncArticleToDatabase(strapiResponse.data, await import('./db').then(m => m.db));
          res.json({ success: true, post: strapiResponse.data });
          return;
        } catch (strapiError) {
          console.warn('Strapi creation failed, creating in local database:', strapiError);
        }
      }
      
      // Fallback to local database
      const post = await storage.createBlogPost(validatedData);
      res.json({ success: true, post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid blog post data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create blog post" 
        });
      }
    }
  });

  // Sync endpoint to pull articles from Strapi
  app.post("/api/blog/sync", async (req, res) => {
    if (!strapiService.isEnabled()) {
      res.status(400).json({
        success: false,
        message: "Strapi integration not configured"
      });
      return;
    }

    try {
      const strapiResponse = await strapiService.getArticles({
        pageSize: 100,
        populate: ['cover'],
      });
      
      let syncCount = 0;
      for (const article of strapiResponse.data) {
        try {
          await strapiService.syncArticleToDatabase(article, await import('./db').then(m => m.db));
          syncCount++;
        } catch (syncError) {
          console.error(`Failed to sync article ${article.id}:`, syncError);
        }
      }
      
      res.json({ 
        success: true, 
        message: `Synced ${syncCount} articles from Strapi`,
        syncedCount: syncCount,
        totalArticles: strapiResponse.data.length
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to sync articles from Strapi" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
