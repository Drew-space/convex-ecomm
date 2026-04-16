import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(), // in kobo (₦5,000 = 500000)
    imageUrl: v.string(),
    images: v.array(v.string()), // multiple images for the gallery thumbnails
    // like in your screenshot (2 thumbnails on the left)
    category: v.union(v.literal("Men"), v.literal("Women"), v.literal("Teens")),
    stock: v.number(),
  }),
});
