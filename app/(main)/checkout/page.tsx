"use client";

import { useCartStore } from "@/app/hooks/use-cart-store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function CheckoutPage() {
  const { user } = useUser();
  const {
    getCheckoutItems,
    getCheckoutTotal,
    clearCart,
    clearBuyNowItem,
    checkoutMode,
  } = useCartStore();
  const initializePayment = useAction(api.paystack.initializePayment);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({
    fullName: user?.fullName || "",
    phone: "",
    street: "",
    city: "",
    state: "",
  });

  // Use mode-aware getters — works for both cart and buy now
  const checkoutItems = getCheckoutItems();
  const total = getCheckoutTotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state
    ) {
      setError("Please fill in all delivery details");
      return;
    }
    if (checkoutItems.length === 0) {
      setError("No items to checkout");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { url } = await initializePayment({
        clerkId: user!.id,
        email: user!.emailAddresses[0].emailAddress,
        items: checkoutItems.map((i) => ({
          productId: i.productId as Id<"products">,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
        })),
        totalAmount: total,
        deliveryAddress: address,
      });

      // Clear everything before redirecting
      clearCart();
      clearBuyNowItem();

      window.location.href = url;
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Please sign in to checkout.</p>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Nothing to checkout.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* ── LEFT: Delivery Address ── */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Delivery Details</h2>
        {checkoutMode === "buynow" && (
          <p className="text-sm text-primary mb-6">Buying this item directly</p>
        )}
        {checkoutMode === "cart" && (
          <p className="text-sm text-gray-400 mb-6">
            {checkoutItems.length} item(s) from your cart
          </p>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="08012345678"
            />
          </div>
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="12 Broad Street"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="Lagos"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="Lagos State"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>

      {/* ── RIGHT: Order Summary ── */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="space-y-4 border rounded-xl p-4">
          {checkoutItems.map((item) => (
            <div key={item.productId} className="flex gap-4 items-center">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-sm">
                ₦{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full mt-6 h-12 text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ₦${total.toLocaleString()} with Paystack`
          )}
        </Button>
      </div>
    </div>
  );
}

// https://famous-canary-754.convex.cloud/?trxref=order_user_3CR5vV9X2Tlr7eyKruRuiL6jmxR_1776360540066&reference=order_user_3CR5vV9X2Tlr7eyKruRuiL6jmxR_1776360540066
