import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTagCategorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tag categories
  app.get("/api/tag-categories", async (req, res) => {
    try {
      const categories = await storage.getAllTagCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tag categories" });
    }
  });

  // Get single tag category
  app.get("/api/tag-categories/:id", async (req, res) => {
    try {
      const category = await storage.getTagCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Tag category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tag category" });
    }
  });

  // Create new tag category
  app.post("/api/tag-categories", async (req, res) => {
    try {
      const validatedData = insertTagCategorySchema.parse(req.body);
      const category = await storage.createTagCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create tag category" });
    }
  });

  // Update tag category
  app.put("/api/tag-categories/:id", async (req, res) => {
    try {
      const validatedData = insertTagCategorySchema.partial().parse(req.body);
      const category = await storage.updateTagCategory(req.params.id, validatedData);
      if (!category) {
        return res.status(404).json({ message: "Tag category not found" });
      }
      res.json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update tag category" });
    }
  });

  // Delete tag category (soft delete)
  app.delete("/api/tag-categories/:id", async (req, res) => {
    try {
      const success = await storage.deleteTagCategory(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Tag category not found" });
      }
      res.json({ message: "Tag category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete tag category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
