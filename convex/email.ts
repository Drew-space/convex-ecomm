// convex/email.ts
"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";
import { createElement } from "react";
import OrderConfirmation from "./emails/OrderConfirmation";

export const sendOrderConfirmation = action({
  args: {
    customerName: v.string(),
    email: v.string(),
    reference: v.string(),
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
  handler: async (_, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Nextcommerce <onboarding@resend.dev>",
      to: args.email,
      subject: `Order Confirmed — ${args.reference}`,
      react: createElement(OrderConfirmation, {
        customerName: args.customerName,
        items: args.items,
        totalAmount: args.totalAmount,
        deliveryAddress: args.deliveryAddress,
        reference: args.reference,
      }),
    });
  },
});
