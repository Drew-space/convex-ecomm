"use client";

import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "./ui/sheet";
import { links } from "@/constants";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MobileNavbarModal = ({ open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[85vw] sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-6 items-center">
          {links.map((link) => (
            <SheetClose asChild key={link.name}>
              <Link
                href={link.href}
                className="text-lg font-medium text-gray-700 hover:text-black transition"
              >
                {link.name}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbarModal;
