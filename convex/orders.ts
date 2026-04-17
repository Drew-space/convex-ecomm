import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const addressValidator = v.object({
  fullName: v.string(),
  phone: v.string(),
  street: v.string(),
  city: v.string(),
  state: v.string(),
});

// ─── CREATE ORDER ─────────────────────────────────────────────────────────────
// Called before redirecting to Paystack. Status is "pending" until payment
// is confirmed. This means we have a record even if the user abandons.
export const createOrder = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        imageUrl: v.string(),
      }),
    ),
    totalAmount: v.number(),
    paystackReference: v.string(),
    deliveryAddress: addressValidator,
  },
  handler: async (ctx, args) => {
    // Check stock for every item before creating the order
    // This is the first stock gate — catches issues before payment even starts
    for (const item of args.items) {
      const product = await ctx.db.get(item.productId);
      if (!product) throw new Error(`Product not found: ${item.name}`);
      if (product.stock < item.quantity) {
        throw new Error(
          `"${product.name}" only has ${product.stock} left in stock`,
        );
      }
    }

    return await ctx.db.insert("orders", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

// ─── MARK ORDER PAID + DECREMENT STOCK ────────────────────────────────────────
// Called from the verify API route after Paystack confirms payment.
// Stock only decrements here — never at cart time.
export const markPaid = mutation({
  args: { paystackReference: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_reference", (q) =>
        q.eq("paystackReference", args.paystackReference),
      )
      .first();

    if (!order) throw new Error("Order not found");
    if (order.status === "paid") return order; // idempotent — safe to call twice

    // Mark order paid
    await ctx.db.patch(order._id, { status: "paid" });

    // Decrement stock for each item — second and final stock gate
    for (const item of order.items) {
      const product = await ctx.db.get(item.productId);
      if (!product) continue;

      // Race condition guard: two users bought the last unit at the same time
      if (product.stock < item.quantity) {
        throw new Error(`Stock ran out for "${item.name}" during payment`);
      }

      await ctx.db.patch(item.productId, {
        stock: product.stock - item.quantity,
      });
    }

    return order;
  },
});

// ─── GET ORDERS FOR A USER ────────────────────────────────────────────────────
// Used on the /orders page to show order history.
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .order("desc")
      .collect();
  },
});

// convex/orders.ts
export const getOrderByReference = query({
  args: { paystackReference: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_reference", (q) =>
        q.eq("paystackReference", args.paystackReference),
      )
      .first();
  },
});
