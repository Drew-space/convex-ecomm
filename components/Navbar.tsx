"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingBagIcon, ShoppingCart, ShoppingCartIcon } from "lucide-react";

const Navbar = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/Men" },
    { name: "Women", href: "/Women" },
    { name: "Teens", href: "/Teens" },
  ];

  const pathname = usePathname();

  return (
    <header className="mb-8 border-b ">
      <div className=" flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-base md:text-4xl font-bold ">
            Next<span className="text-primary">commerce</span>
          </h1>
        </Link>
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, i) => (
            <div key={i}>
              {pathname === link.href ? (
                <Link
                  key={i}
                  href={link.href}
                  className="text-lg font-semibold text-primary "
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className=" text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary "
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex divide-x  border-r sm:border-l">
          <Button
            variant={"outline"}
            className=" flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <ShoppingCart />
            <ShoppingCartIcon />

            <span className=" hidden text-xs font-semibold text-gray-500 sm:block ">
              Cart
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
