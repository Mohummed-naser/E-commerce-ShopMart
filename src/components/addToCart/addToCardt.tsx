"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader, ShoppingCartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
//
export default function AddToCart({ productId }: { productId: string }) {
  let { getCart } = useContext(CartContext);
  const [isloading, setIsLoading] = useState(false);
  async function addProductTocart() {
    setIsLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "POST",
        body: JSON.stringify({ productId }), //Convert JavaScript object → Raw JSON string //==>To convert data into raw JSON in JavaScript
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjBjZWZhZWQwZmEzYjU4ZGFiOGI4YiIsIm5hbWUiOiJhaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NDU1MDY4LCJleHAiOjE3NzIyMzEwNjh9.Njfu67zT57TCgEVW4Ks9J5H6D8_lFo5ioW5MNHYK5vs",
          "content-type": "application/json", // for row json,
        },
      }
    );
    const data = await response.json();
    data.status == "success" && toast.success('product added successfully')
    await getCart();
    // console.log(data);
    setIsLoading(false);
  }
  return (
    <CardFooter className="gap-2 mt-2">
      <Button onClick={addProductTocart} className="grow cursor-pointer ">
        {isloading ? <Loader className="animate-spin"/> : <ShoppingCartIcon />} Add to card
      </Button>
      <HeartIcon></HeartIcon>
    </CardFooter>
  );
}
