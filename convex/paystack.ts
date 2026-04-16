"use node"; // tells Convex this action runs in Node.js (needed for fetch)

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// ─── INITIALIZE PAYMENT ───────────────────────────────────────────────────────
// Creates a Paystack session. Called from your checkout page directly.
// Returns the authorization_url to redirect the user to.
export const initializePayment = action({
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
    deliveryAddress: v.object({
      fullName: v.string(),
      phone: v.string(),
      street: v.string(),
      city: v.string(),
      state: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const reference = `order_${args.clerkId}_${Date.now()}`;

    // 1. Create pending order in Convex (also checks stock)
    await ctx.runMutation(api.orders.createOrder, {
      ...args,
      paystackReference: reference,
    });

    // 2. Hit Paystack API
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: args.email,
        amount: args.totalAmount * 100,
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}/paystack-verify`,
      }),
    });

    const data = await res.json();
    if (!data.status) throw new Error(data.message || "Paystack init failed");

    return { url: data.data.authorization_url as string };
  },
});

// ─── VERIFY PAYMENT ───────────────────────────────────────────────────────────
// Called from the Convex HTTP route after Paystack redirects back.
export const verifyPayment = action({
  args: { reference: v.string() },
  handler: async (ctx, args) => {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${args.reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = await res.json();
    if (!data.status) throw new Error("Verification failed");

    if (data.data.status === "success") {
      // Mark paid and decrement stock
      await ctx.runMutation(api.orders.markPaid, {
        paystackReference: args.reference,
      });
    }

    return { status: data.data.status as string };
  },
});
