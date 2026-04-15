"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import ShoppingCartModal from "@/components/ShoppingCartModal";
import { useCartModal } from "../hooks/use-cart-modal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartModal = useCartModal();

  return (
    <div className={cn("h-full antialiased font-sans")}>
      <Navbar openCart={cartModal.openCart} />

      <ShoppingCartModal
        open={cartModal.open}
        onOpenChange={cartModal.setOpen}
      />

      <main className="flex-1 pt-8">{children}</main>
    </div>
  );
}
