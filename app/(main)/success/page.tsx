// app/(main)/success/page.tsx  (or wherever your success route is)
"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/app/hooks/use-cart-store"; // ✅ correct path
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart(); // clears items + buyNowItem + resets mode — all in one
  }, [clearCart]);

  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Successful!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for your purchase. We hope you enjoy it!
          </p>
          <p>Have a great day!</p>
          <Button asChild className="mt-5">
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
