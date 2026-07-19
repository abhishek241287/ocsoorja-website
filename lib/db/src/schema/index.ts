import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const videosTable = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull().default("General"),
  type: text("type").notNull(), // "upload" | "youtube" | "vimeo"
  url: text("url").notNull(),   // "/api/videos/stream/xxx.mp4"  OR  YouTube/Vimeo URL
  thumbnail: text("thumbnail"), // "/images/videos/xxx.jpg"  OR  external thumb URL
  duration: text("duration"),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVideoSchema = createInsertSchema(videosTable).omit({
  id: true,
  createdAt: true,
});

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videosTable.$inferSelect;

export const VIDEO_CATEGORIES = [
  "General",
  "Projects",
  "Installations",
  "Testimonials",
  "Events",
  "Behind the Scenes",
] as const;
export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];
