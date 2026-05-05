import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (from the original template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Newsletter subscription schema
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull(),
});

export const newsletterSchema = createInsertSchema(newsletters).pick({
  email: true,
});

export type InsertNewsletter = z.infer<typeof newsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

// Lead magnet schema
export const leadMagnets = pgTable("lead_magnets", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull(),
});

export const leadMagnetSchema = createInsertSchema(leadMagnets).pick({
  email: true,
});

export type InsertLeadMagnet = z.infer<typeof leadMagnetSchema>;
export type LeadMagnet = typeof leadMagnets.$inferSelect;

// Contact form schema
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  company: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type Contact = typeof contacts.$inferSelect;

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  author: text("author").notNull().default("Fripse AI Team"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBlogPost = z.infer<typeof blogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// AI Readiness Checklist leads
export const checklistLeads = pgTable("checklist_leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const checklistLeadSchema = createInsertSchema(checklistLeads).pick({
  name: true,
  email: true,
});

export type InsertChecklistLead = z.infer<typeof checklistLeadSchema>;
export type ChecklistLead = typeof checklistLeads.$inferSelect;

// Email leads for simple email capture
export const emailLeads = pgTable("email_leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emailLeadSchema = createInsertSchema(emailLeads).pick({
  email: true,
});

export type InsertEmailLead = z.infer<typeof emailLeadSchema>;
export type EmailLead = typeof emailLeads.$inferSelect;
