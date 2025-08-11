import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, boolean, bigint } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tagCategories = pgTable("tag_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gameId: text("game_id").notNull(),
  group: jsonb("group").$type<{ label: string; value: string | number; disabled?: boolean; id?: string }>().notNull(),
  name: text("name").notNull(),
  precisionType: text("precision_type").notNull(),
  status: text("status").notNull(),
  metadataConfig: jsonb("metadata_config").$type<Array<{
    component: string;
    key: string;
    label: string;
    required?: boolean;
    readOnly?: boolean;
    type?: string;
    mode?: string;
    multiple?: boolean;
    options?: Array<{ label: string; value: string | number; disabled?: boolean; id?: string }>;
    query?: string;
  }>>().notNull().default([]),
  subCategories: jsonb("sub_categories").$type<Record<string, { 
    label: string; 
    config: Array<{
      component: string;
      key: string;
      label: string;
      required?: boolean;
      readOnly?: boolean;
      type?: string;
      mode?: string;
      multiple?: boolean;
      options?: Array<{ label: string; value: string | number; disabled?: boolean; id?: string }>;
      query?: string;
    }>
  }>>().notNull().default({}),
  isParentTag: boolean("is_parent_tag").notNull().default(false),
  isReplay: boolean("is_replay").notNull().default(false),
  nameStructure: jsonb("name_structure").$type<string[]>().notNull().default([]),
  createdAt: bigint("created_at", { mode: "number" }).notNull().default(sql`extract(epoch from now()) * 1000`),
  lastUpdatedAt: bigint("last_updated_at", { mode: "number" }).notNull().default(sql`extract(epoch from now()) * 1000`),
  deleted: boolean("deleted").notNull().default(false),
});

export const insertTagCategorySchema = createInsertSchema(tagCategories).omit({
  id: true,
  createdAt: true,
  lastUpdatedAt: true,
});

export type InsertTagCategory = z.infer<typeof insertTagCategorySchema>;
export type TagCategory = typeof tagCategories.$inferSelect;
