import { type TagCategory, type InsertTagCategory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getTagCategory(id: string): Promise<TagCategory | undefined>;
  getAllTagCategories(): Promise<TagCategory[]>;
  createTagCategory(category: InsertTagCategory): Promise<TagCategory>;
  updateTagCategory(id: string, category: Partial<InsertTagCategory>): Promise<TagCategory | undefined>;
  deleteTagCategory(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private tagCategories: Map<string, TagCategory>;

  constructor() {
    this.tagCategories = new Map();
  }

  async getTagCategory(id: string): Promise<TagCategory | undefined> {
    return this.tagCategories.get(id);
  }

  async getAllTagCategories(): Promise<TagCategory[]> {
    return Array.from(this.tagCategories.values()).filter(cat => !cat.deleted);
  }

  async createTagCategory(insertCategory: InsertTagCategory): Promise<TagCategory> {
    const id = randomUUID();
    const now = Date.now();
    const category: TagCategory = { 
      ...insertCategory, 
      id,
      createdAt: now,
      lastUpdatedAt: now
    };
    this.tagCategories.set(id, category);
    return category;
  }

  async updateTagCategory(id: string, updateData: Partial<InsertTagCategory>): Promise<TagCategory | undefined> {
    const existing = this.tagCategories.get(id);
    if (!existing) return undefined;

    const updated: TagCategory = {
      ...existing,
      ...updateData,
      lastUpdatedAt: Date.now()
    };
    this.tagCategories.set(id, updated);
    return updated;
  }

  async deleteTagCategory(id: string): Promise<boolean> {
    const existing = this.tagCategories.get(id);
    if (!existing) return false;

    // Soft delete
    const deleted: TagCategory = {
      ...existing,
      deleted: true,
      lastUpdatedAt: Date.now()
    };
    this.tagCategories.set(id, deleted);
    return true;
  }
}

export const storage = new MemStorage();
