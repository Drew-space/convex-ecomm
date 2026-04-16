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
    price: v.number(),
    imageUrl: v.string(),
    images: v.array(v.string()),
    category: v.union(v.literal("Men"), v.literal("Women"), v.literal("Teens")),
    stock: v.number(),
  }),

  orders: defineTable({
    clerkId: v.string(), // who placed the order
    email: v.string(), // needed by Paystack to send receipt
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(), // snapshot name so it shows even if product is deleted later
        price: v.number(), // snapshot price at time of purchase
        quantity: v.number(),
        imageUrl: v.string(),
      }),
    ),
    totalAmount: v.number(),
    paystackReference: v.string(),
    status: v.union(
      v.literal("pending"), // payment started, not confirmed yet
      v.literal("paid"), // Paystack confirmed payment
      v.literal("failed"),
    ),
    deliveryAddress: v.object({
      fullName: v.string(),
      phone: v.string(),
      street: v.string(),
      city: v.string(),
      state: v.string(),
    }),
    createdAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_reference", ["paystackReference"]),
});
