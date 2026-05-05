import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, newsletterSchema, leadMagnetSchema, blogPostSchema, checklistLeadSchema, emailLeadSchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendContactFormEmail, sendNewsletterNotification, sendLeadMagnetNotification, sendChecklistLeadNotification } from "./utils/email";
import { submitEmailHandler } from "./submit-email";

// Simple middleware for admin routes
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  // For a real app, use proper authentication
  // This is a minimal example for demonstration
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || token !== expected) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = newsletterSchema.parse(req.body);
      
      const result = await storage.addNewsletterSubscription(email);
      
      // Send email notification
      await sendNewsletterNotification(email);
      
      res.status(201).json({ 
        success: true, 
        message: "Newsletter subscription successful", 
        data: result 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid email address", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to process newsletter subscription" 
        });
      }
    }
  });
  
  // Lead magnet subscription
  app.post("/api/lead-magnet", async (req, res) => {
    try {
      const { email } = leadMagnetSchema.parse(req.body);
      
      const result = await storage.addLeadMagnetSubscription(email);
      
      // Send email notification
      await sendLeadMagnetNotification(email);
      
      res.status(201).json({ 
        success: true, 
        message: "Lead magnet subscription successful", 
        data: result 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid email address", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to process lead magnet subscription" 
        });
      }
    }
  });
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const formData = contactFormSchema.parse(req.body);
      
      const result = await storage.submitContactForm(formData);
      
      // Send email notification
      await sendContactFormEmail(formData);
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully", 
        data: result 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to process contact form submission" 
        });
      }
    }
  });

  // Admin routes
  // Get all newsletter subscribers
  app.get("/api/admin/newsletters", adminAuth, async (req, res) => {
    try {
      const subscribers = await storage.getAllNewsletterSubscriptions();
      res.status(200).json({ 
        success: true, 
        subscribers 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch newsletter subscribers" 
      });
    }
  });
  
  // Get all lead magnet subscribers
  app.get("/api/admin/lead-magnets", adminAuth, async (req, res) => {
    try {
      const subscribers = await storage.getAllLeadMagnetSubscriptions();
      res.status(200).json({ 
        success: true, 
        subscribers 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch lead magnet subscribers" 
      });
    }
  });
  
  // Get all contact form submissions
  app.get("/api/admin/contacts", adminAuth, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.status(200).json({ 
        success: true, 
        submissions 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact submissions" 
      });
    }
  });

  // Blog routes
  // Get all blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.status(200).json({ 
        success: true, 
        posts 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog posts" 
      });
    }
  });

  // Get single blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        post 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog post" 
      });
    }
  });

  // Create new blog post (admin only)
  app.post("/api/admin/blog", adminAuth, async (req, res) => {
    try {
      const postData = blogPostSchema.parse(req.body);
      const newPost = await storage.createBlogPost(postData);
      
      res.status(201).json({ 
        success: true, 
        message: "Blog post created successfully", 
        post: newPost 
      });
    } catch (error) {
      if (error instanceof ZodError) {
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

  // Update blog post (admin only)
  app.patch("/api/admin/blog/:slug", adminAuth, async (req, res) => {
    try {
      const { slug } = req.params;
      const updates = req.body;
      
      const updatedPost = await storage.updateBlogPost(slug, updates);
      
      if (!updatedPost) {
        return res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: "Blog post updated successfully", 
        post: updatedPost 
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update blog post" 
      });
    }
  });

  // AI Readiness Checklist routes
  app.post("/api/checklist-lead", async (req, res) => {
    try {
      const validation = checklistLeadSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid input data",
          details: validation.error.errors
        });
      }

      const lead = await storage.addChecklistLead(validation.data);
      
      // Send notification email
      try {
        await sendChecklistLeadNotification(validation.data.email, validation.data.name);
      } catch (emailError) {
        console.error("Failed to send checklist lead notification:", emailError);
      }

      res.json({ 
        success: true, 
        lead,
        downloadUrl: "/checklist/AI_Readiness_Checklist_FripseAI.pdf"
      });
    } catch (error) {
      console.error("Error creating checklist lead:", error);
      res.status(500).json({ success: false, error: "Failed to process checklist request" });
    }
  });

  app.get("/api/admin/checklist-leads", adminAuth, async (req, res) => {
    try {
      const leads = await storage.getAllChecklistLeads();
      res.json({ success: true, leads });
    } catch (error) {
      console.error("Error fetching checklist leads:", error);
      res.status(500).json({ success: false, error: "Failed to fetch checklist leads" });
    }
  });

  // Email lead capture route
  app.post("/api/submit-email", submitEmailHandler);

  app.get("/api/admin/email-leads", adminAuth, async (req, res) => {
    try {
      const emailLeads = await storage.getAllEmailLeads();
      res.json({ success: true, leads: emailLeads });
    } catch (error) {
      console.error("Error fetching email leads:", error);
      res.status(500).json({ success: false, error: "Failed to fetch email leads" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
