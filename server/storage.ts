import { User, InsertUser, ContactFormData, InsertNewsletter, InsertLeadMagnet, BlogPost, InsertBlogPost, ChecklistLead, InsertChecklistLead, EmailLead, InsertEmailLead } from "@shared/schema";
import { db } from "./db";
import { users, newsletters, leadMagnets, contacts, blogPosts, checklistLeads, emailLeads } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { sendContactFormEmail } from "./utils/email";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Newsletter functionality
  addNewsletterSubscription(email: string): Promise<{ id: number; email: string; }>;
  getAllNewsletterSubscriptions(): Promise<{ id: number; email: string; createdAt: string }[]>;
  
  // Lead magnet functionality
  addLeadMagnetSubscription(email: string): Promise<{ id: number; email: string; }>;
  getAllLeadMagnetSubscriptions(): Promise<{ id: number; email: string; createdAt: string }[]>;
  
  // Contact form functionality
  submitContactForm(formData: ContactFormData): Promise<{ id: number } & ContactFormData>;
  getAllContactSubmissions(): Promise<(ContactFormData & { id: number; createdAt: string })[]>;
  
  // Blog functionality
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(slug: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  
  // AI Readiness Checklist functionality
  addChecklistLead(lead: InsertChecklistLead): Promise<ChecklistLead>;
  getAllChecklistLeads(): Promise<ChecklistLead[]>;
  
  // Email lead functionality
  addEmailLead(email: string): Promise<EmailLead>;
  getAllEmailLeads(): Promise<EmailLead[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Newsletter methods
  async addNewsletterSubscription(email: string): Promise<{ id: number; email: string; }> {
    try {
      // First try to insert the new email
      const result = await db.insert(newsletters).values({
        email,
        createdAt: new Date().toISOString()
      }).returning({ id: newsletters.id, email: newsletters.email });
      
      return result[0];
    } catch (error) {
      // If insert fails due to unique constraint, get the existing record
      const existing = await db.select({
        id: newsletters.id,
        email: newsletters.email
      }).from(newsletters).where(eq(newsletters.email, email));
      
      if (existing.length > 0) {
        return existing[0];
      }
      
      throw error;
    }
  }
  
  async getAllNewsletterSubscriptions(): Promise<{ id: number; email: string; createdAt: string }[]> {
    return await db.select({
      id: newsletters.id,
      email: newsletters.email,
      createdAt: newsletters.createdAt
    }).from(newsletters).orderBy(newsletters.id);
  }
  
  // Lead magnet methods
  async addLeadMagnetSubscription(email: string): Promise<{ id: number; email: string; }> {
    try {
      // First try to insert the new email
      const result = await db.insert(leadMagnets).values({
        email,
        createdAt: new Date().toISOString()
      }).returning({ id: leadMagnets.id, email: leadMagnets.email });
      
      return result[0];
    } catch (error) {
      // If insert fails due to unique constraint, get the existing record
      const existing = await db.select({
        id: leadMagnets.id,
        email: leadMagnets.email
      }).from(leadMagnets).where(eq(leadMagnets.email, email));
      
      if (existing.length > 0) {
        return existing[0];
      }
      
      throw error;
    }
  }
  
  async getAllLeadMagnetSubscriptions(): Promise<{ id: number; email: string; createdAt: string }[]> {
    return await db.select({
      id: leadMagnets.id,
      email: leadMagnets.email,
      createdAt: leadMagnets.createdAt
    }).from(leadMagnets).orderBy(leadMagnets.id);
  }
  
  // Contact form methods
  async submitContactForm(formData: ContactFormData): Promise<{ id: number } & ContactFormData> {
    // Insert into database
    const result = await db.insert(contacts).values({
      ...formData,
      createdAt: new Date().toISOString()
    }).returning();
    
    // Send email notification
    await sendContactFormEmail(formData);
    
    return { id: result[0].id, ...formData };
  }
  
  async getAllContactSubmissions(): Promise<(ContactFormData & { id: number; createdAt: string })[]> {
    return await db.select({
      id: contacts.id,
      name: contacts.name,
      company: contacts.company,
      email: contacts.email,
      message: contacts.message,
      createdAt: contacts.createdAt
    }).from(contacts).orderBy(contacts.id);
  }

  // Blog methods
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async updateBlogPost(slug: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.slug, slug))
      .returning();
    return updatedPost || undefined;
  }

  async addChecklistLead(lead: InsertChecklistLead): Promise<ChecklistLead> {
    const [newLead] = await db
      .insert(checklistLeads)
      .values(lead)
      .returning();
    return newLead;
  }

  async getAllChecklistLeads(): Promise<ChecklistLead[]> {
    return await db.select().from(checklistLeads).orderBy(desc(checklistLeads.createdAt));
  }

  async addEmailLead(email: string): Promise<EmailLead> {
    const [newLead] = await db
      .insert(emailLeads)
      .values({ email })
      .returning();
    return newLead;
  }

  async getAllEmailLeads(): Promise<EmailLead[]> {
    return await db.select().from(emailLeads).orderBy(desc(emailLeads.createdAt));
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private newsletters: Map<number, { id: number; email: string; createdAt: string }>;
  private leadMagnets: Map<number, { id: number; email: string; createdAt: string }>;
  private contacts: Map<number, { id: number } & ContactFormData & { createdAt: string }>;
  private blogPosts: Map<number, BlogPost>;
  private checklistLeads: Map<number, ChecklistLead>;
  private emailLeads: Map<number, EmailLead>;
  private currentUserId: number;
  private currentNewsletterId: number;
  private currentLeadMagnetId: number;
  private currentContactId: number;
  private currentBlogPostId: number;
  private currentChecklistLeadId: number;
  private currentEmailLeadId: number;

  constructor() {
    this.users = new Map();
    this.newsletters = new Map();
    this.leadMagnets = new Map();
    this.contacts = new Map();
    this.blogPosts = new Map();
    this.checklistLeads = new Map();
    this.emailLeads = new Map();
    this.currentUserId = 1;
    this.currentNewsletterId = 1;
    this.currentLeadMagnetId = 1;
    this.currentContactId = 1;
    this.currentBlogPostId = 1;
    this.currentChecklistLeadId = 1;
    this.currentEmailLeadId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Newsletter methods
  async addNewsletterSubscription(email: string): Promise<{ id: number; email: string; }> {
    // Check if email already exists
    const existingSubscription = Array.from(this.newsletters.values()).find(
      (sub) => sub.email === email
    );
    
    if (existingSubscription) {
      return { id: existingSubscription.id, email };
    }
    
    const id = this.currentNewsletterId++;
    const newSubscription = { 
      id, 
      email, 
      createdAt: new Date().toISOString() 
    };
    
    this.newsletters.set(id, newSubscription);
    return { id, email };
  }
  
  async getAllNewsletterSubscriptions(): Promise<{ id: number; email: string; createdAt: string }[]> {
    return Array.from(this.newsletters.values());
  }
  
  // Lead magnet methods
  async addLeadMagnetSubscription(email: string): Promise<{ id: number; email: string; }> {
    // Check if email already exists
    const existingSubscription = Array.from(this.leadMagnets.values()).find(
      (sub) => sub.email === email
    );
    
    if (existingSubscription) {
      return { id: existingSubscription.id, email };
    }
    
    const id = this.currentLeadMagnetId++;
    const newSubscription = { 
      id, 
      email, 
      createdAt: new Date().toISOString() 
    };
    
    this.leadMagnets.set(id, newSubscription);
    return { id, email };
  }
  
  async getAllLeadMagnetSubscriptions(): Promise<{ id: number; email: string; createdAt: string }[]> {
    return Array.from(this.leadMagnets.values());
  }
  
  // Contact form methods
  async submitContactForm(formData: ContactFormData): Promise<{ id: number } & ContactFormData> {
    const id = this.currentContactId++;
    const contactSubmission = { 
      ...formData, 
      id, 
      createdAt: new Date().toISOString() 
    };
    
    this.contacts.set(id, contactSubmission);
    // Try to send email if SendGrid is configured
    try {
      await sendContactFormEmail(formData);
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }
    
    return { id, ...formData };
  }
  
  async getAllContactSubmissions(): Promise<(ContactFormData & { id: number; createdAt: string })[]> {
    return Array.from(this.contacts.values());
  }

  // Blog methods
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const now = new Date();
    const newPost: BlogPost = {
      ...post,
      id,
      author: post.author || "Fripse AI Team",
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    };
    
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async addChecklistLead(lead: InsertChecklistLead): Promise<ChecklistLead> {
    const id = this.currentChecklistLeadId++;
    const newLead: ChecklistLead = {
      id,
      name: lead.name,
      email: lead.email,
      createdAt: new Date(),
    };
    this.checklistLeads.set(id, newLead);
    return newLead;
  }

  async getAllChecklistLeads(): Promise<ChecklistLead[]> {
    return Array.from(this.checklistLeads.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async addEmailLead(email: string): Promise<EmailLead> {
    const id = this.currentEmailLeadId++;
    const newLead: EmailLead = {
      id,
      email,
      createdAt: new Date(),
    };
    this.emailLeads.set(id, newLead);
    console.log(`New email lead captured: ${email} (ID: ${id})`);
    return newLead;
  }

  async getAllEmailLeads(): Promise<EmailLead[]> {
    return Array.from(this.emailLeads.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateBlogPost(slug: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = Array.from(this.blogPosts.values()).find(post => post.slug === slug);
    if (!existingPost) return undefined;
    
    const updatedPost: BlogPost = {
      ...existingPost,
      ...updates,
      updatedAt: new Date()
    };
    
    this.blogPosts.set(existingPost.id, updatedPost);
    return updatedPost;
  }
}

// Use the database storage implementation
export const storage = new DatabaseStorage();
