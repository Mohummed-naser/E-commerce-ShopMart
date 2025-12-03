"use client";
import React, { useContext } from "react";
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
export default function Navbar() {
  const { cartData, isLoading } = useContext(CartContext);
  return (
    <>
      <nav className="bg-inherit sticky top-0 px-5 py-3 drop-shadow-sm text-2xl font-semibold">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link href={"/"} className="outline-0 font-bold">
              ShopMark
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Product</Link>
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
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserIcon className="outline-0" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={"/profile"}>
                    <DropdownMenuItem>profile</DropdownMenuItem>
                  </Link>
                  <Link href={"/login"}>
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <Link href={"/register"}>
                    <DropdownMenuItem>Register</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="">
                <Link href={"/phoppingCart"} className="outline-0 relative">
                  <ShoppingCartIcon className="cursor-pointer" />
                  <Badge className="absolute -top-3 -end-3 h-5 min-w-5 rounded-full px-1 font-mono">
                    {isLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      cartData?.numOfCartItems
                    )}
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
