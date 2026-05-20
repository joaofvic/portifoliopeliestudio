import { pgTable, uuid, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
import type { GalleryItem } from '@/lib/media';

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  client: text('client').notNull().default(''),
  year: integer('year').notNull(),
  category: text('category').notNull(),
  cover: text('cover').notNull().default(''),
  gallery: jsonb('gallery').$type<GalleryItem[]>().notNull().default([]),
  excerpt: text('excerpt').notNull().default(''),
  featured: boolean('featured').notNull().default(false),
  content: text('content').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type ProjectRow = typeof projects.$inferSelect;
export type NewProjectRow = typeof projects.$inferInsert;

export const siteContent = pgTable('site_content', {
  key: text('key').primaryKey(),
  value: jsonb('value').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type SiteContentRow = typeof siteContent.$inferSelect;
export type NewSiteContentRow = typeof siteContent.$inferInsert;
