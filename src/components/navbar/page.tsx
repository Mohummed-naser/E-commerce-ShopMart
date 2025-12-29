"use client";
import React, { useContext, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { Loader, ShoppingCartIcon, UserIcon } from "lucide-react";
import { createContext } from "vm";
import { CartContext } from "../context/CartContext";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const session = useSession();
  // console.log(session);
  const { cartData, isLoading } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-inherit sticky top-0  px-5 py-3 drop-shadow z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo + Mobile Button */}
            <div className="flex items-center gap-3">
              <button className="lg:hidden" onClick={() => setOpen(!open)}>
                {open ? <X size={28} /> : <Menu size={28} />}
              </button>

              <Link href="/" className="font-bold text-2xl">
                ShopMark
              </Link>
            </div>

            {/* Desktop Menu */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="flex gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/subcategories">Sub categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              {session.status === "authenticated" && (
                <span className="hidden md:block text-sm">
                  Hi, {session.data.user.name}
                </span>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <UserIcon className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {session.status === "authenticated" ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link className="cursor-pointer" href="/profile">
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link className="cursor-pointer" href="/wishlist">
                          Wishlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link className="cursor-pointer" href="/allorders">
                          All orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link className="cursor-pointer" href="/profile/change-password">
                          Change password
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-500 cursor-pointer"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link className="cursor-pointer" href="/login">
                          Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register">Register</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {session.status === "authenticated" && (
                <Link href="/shoppingCart" className="relative">
                  <ShoppingCartIcon />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center">
                    {isLoading ? (
                      <Loader size={12} className="animate-spin" />
                    ) : (
                      cartData?.numOfCartItems || 0
                    )}
                  </Badge>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="lg:hidden mt-4 flex flex-col gap-4 text-lg">
              <Link href="/products" onClick={() => setOpen(false)}>
                Products
              </Link>
              <Link href="/brands" onClick={() => setOpen(false)}>
                Brands
              </Link>
              <Link href="/categories" onClick={() => setOpen(false)}>
                Categories
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
