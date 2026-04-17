"use client";

import { useCartStore } from "@/app/hooks/use-cart-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Button } from "./ui/button";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { RedirectToSignIn, useAuth, useClerk } from "@clerk/nextjs";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ShoppingCartModal = ({ open, onOpenChange }: Props) => {
  const { isSignedIn } = useAuth();

  const { redirectToSignIn } = useClerk(); // ✅ function, not component
  const pathname = usePathname();

  const { items, removeItem, updateQuantity, getTotalPrice, setCheckoutMode } =
    useCartStore();
  const router = useRouter();

  const total = getTotalPrice();

  const handleCheckout = () => {
    if (!isSignedIn) {
      redirectToSignIn({ redirectUrl: pathname });
      return;
    }
    // Set mode to cart so checkout page reads from items[], not buyNowItem
    setCheckoutMode("cart");
    onOpenChange(false); // close modal
    router.push("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Your cart is empty."
              : `${items.length} item(s) in your cart`}
          </SheetDescription>
        </SheetHeader>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 border-b pb-4">
              <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-gray-500 text-xs">{item.category}</p>
                <p className="text-sm font-bold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.stock}
                    className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.productId)}
                className="text-gray-400 hover:text-red-500 transition self-start"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <Button className="w-full" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
