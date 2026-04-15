"use client";

import { useState } from "react";

export function useCartModal() {
  const [open, setOpen] = useState(false);

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);
  const toggleCart = () => setOpen((prev) => !prev);

  return {
    open,
    setOpen,
    openCart,
    closeCart,
    toggleCart,
  };
}
