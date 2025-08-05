import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { hubspotService } from "./hubspot";
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

  // Blog API routes - using local database only
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      
      const allPosts = await storage.getBlogPosts();
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const posts = allPosts.slice(startIndex, endIndex);
      
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
        console.error('Blog post creation error:', error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to create blog post" 
        });
      }
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
