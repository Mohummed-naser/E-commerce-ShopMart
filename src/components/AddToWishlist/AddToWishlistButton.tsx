'use server'

import { getUserToken } from "@/Helper/getUserToken";

//Server action
export async function addToWishlistAction(productId: string) {
    const token = await getUserToken();
    console.log("SENDING TOKEN:", token);
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      method: "POST",
      body: JSON.stringify({ productId }), //Convert JavaScript object → Raw JSON string //==>To convert data into raw JSON in JavaScript
      headers: {
        token: token!,
        "content-type": "application/json", // for row json,
      },
    }
  );
  const data = await response.json();
  return data;
}
