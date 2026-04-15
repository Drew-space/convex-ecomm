import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const ShoppingCartModal = () => {
  return (
    <Sheet defaultOpen>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className="sm-max-w-lg w-[90vh]">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
