import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    username: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
    updatedAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

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
