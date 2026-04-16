"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import ShoppingCartModal from "@/components/ShoppingCartModal";
import { useCartModal, useMobileNav } from "../hooks/use-cart-modal";
import MobileNavbarModal from "@/components/MobileNavbarModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartModal = useCartModal();
  const mobileModal = useMobileNav();

  return (
    <div className={cn("h-full antialiased font-sans")}>
      <Navbar openCart={cartModal.openCart} openModal={mobileModal.openModal} />
      <ShoppingCartModal
        open={cartModal.open}
        onOpenChange={cartModal.setOpen}
      />
      <MobileNavbarModal
        open={mobileModal.open}
        onOpenChange={mobileModal.setOpen}
      />

      <main className="flex-1 pt-8">{children}</main>
    </div>
  );
}
