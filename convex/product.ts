import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAllProcucts = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("products").order("desc").collect();
  },
});

export const getByCategory = query({
  args: {
    category: v.union(v.literal("Men"), v.literal("Women"), v.literal("Teens")),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("category"), args.category))
      .order("desc")
      .collect();
  },
});

export const getProductById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
