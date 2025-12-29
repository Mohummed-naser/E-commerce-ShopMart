"use server";

import { getUserToken } from "@/Helper/getUserToken";
import { revalidatePath } from "next/cache";

export async function addToWishlistAction(productId: string) {
  const token = await getUserToken();

  if (!token) {
    return { success: false, message: "You must be logged in" };
  }

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ productId }),
      }
    );
    const data = await response.json();

      if (data.status === "success") {
        //To update the data periodically
        revalidatePath("/wishlist");
        return { success: true, message: data.message };
      }

    return { success: false, message: data.message };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
