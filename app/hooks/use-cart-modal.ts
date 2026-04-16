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

export function useMobileNav() {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeMoal = () => setOpen(false);
  const toggleMoal = () => setOpen((prev) => !prev);

  return {
    open,
    setOpen,
    openModal,
    closeMoal,
    toggleMoal,
  };
}
