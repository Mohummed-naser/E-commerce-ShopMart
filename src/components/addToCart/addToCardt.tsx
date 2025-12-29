"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader, ShoppingCartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import { addToCartActionAction } from "@/app/api/_action/addToCartAction.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addToWishlistAction } from "@/app/api/_action/addWishList";
import { WishlistResponse } from "../interface";
import { removeFromWishlistAction } from "@/app/api/_action/removeFromWishlistAction";

export default function AddToCart({
  productId,
  isFav = false,
}: {
  productId: string;
  isFav?: boolean;
}) {
  const { getCart, setCartData } = useContext(CartContext);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  async function addProductTocart() {
    if (session.status == "authenticated") {
      setIsLoading(true);
      const data = await addToCartActionAction(productId);
      data.status == "success" && toast.success("product added successfully");
      setCartData(data);
      setIsLoading(false);
    } else {
      router.push("/login");
    }
  }

  async function handleWishlist() {
    if (session.status !== "authenticated") return router.push("/login");

    setWishlistLoading(true);
    try {
      if (isFav) {
        const data = await removeFromWishlistAction(productId);
        if (data.status === "success") {
          toast.success("Removed from wishlist");
        }
      } else {
        const data = (await addToWishlistAction(productId)) as any;
        if (data.success) {
          toast.success("Added to wishlist");
        }
      }
    } catch (error) {
      toast.error("Process failed");
    } finally {
      setWishlistLoading(false);
    }
  }

  
  return (
    <CardFooter className="gap-2 mt-2">
      <Button onClick={addProductTocart} className="grow cursor-pointer ">
        {isloading ? <Loader className="animate-spin" /> : <ShoppingCartIcon />}
        Add to card
      </Button>
      <button
        type="button"
        disabled={wishlistLoading} 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleWishlist();
        }}
        className="p-1 cursor-pointer disabled:opacity-50"
      >
        {wishlistLoading ? (
          <Loader className="animate-spin w-6 h-6 text-red-500" />
        ) : (
          <HeartIcon
            className={`w-6 h-6 transition-colors ${
              isFav
                ? "text-red-500 fill-red-500"
                : "hover:text-red-500 hover:fill-red-500"
            }`}
          />
        )}
      </button>
    </CardFooter>
  );
}
