import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const users = pgTable("users", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export const contacts = pgTable("contacts", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    businessType: text("business_type"),
    challenge: text("challenge"),
    createdAt: timestamp("created_at").defaultNow(),
});
export const bookings = pgTable("bookings", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: text("name").notNull(),
    email: text("email").notNull(),
    preferredDate: text("preferred_date"),
    hubspotContactId: text("hubspot_contact_id"),
    createdAt: timestamp("created_at").defaultNow(),
});
export const blogPosts = pgTable("blog_posts", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(),
    excerpt: text("excerpt"),
    author: text("author"),
    coverImage: text("cover_image"),
    contentImages: text("content_images").array(),
    audioUrl: text("audio_url"),
    readingTime: text("reading_time"),
    tags: text("tags").array(),
    strapiId: text("strapi_id").unique(),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
export const insertUserSchema = createInsertSchema(users).omit({
    id: true,
});
export const insertContactSchema = createInsertSchema(contacts).omit({
    id: true,
    createdAt: true,
}).extend({
    firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    businessType: z.string().optional(),
    challenge: z.string().optional(),
});
export const insertBookingSchema = createInsertSchema(bookings).omit({
    id: true,
    createdAt: true,
    hubspotContactId: true,
}).extend({
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    email: z.string().email("Invalid email address"),
    preferredDate: z.string().optional(),
});
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    strapiId: true,
}).extend({
    title: z.string().min(1, "Title is required").max(200, "Title too long"),
    slug: z.string().min(1, "Slug is required").max(200, "Slug too long"),
    content: z.string().min(1, "Content is required"),
    excerpt: z.string().optional(),
    author: z.string().optional(),
    coverImage: z.string().url().optional(),
    contentImages: z.array(z.string().url()).optional(),
    audioUrl: z.string().url().optional(),
    readingTime: z.string().optional(),
    tags: z.array(z.string()).optional(),
    publishedAt: z.string().datetime().optional(),
});
