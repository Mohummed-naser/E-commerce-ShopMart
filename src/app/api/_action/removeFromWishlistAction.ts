"use server";
import { getUserToken } from "@/Helper/getUserToken";
import { revalidatePath } from "next/cache";

export async function removeFromWishlistAction(productId: string) {
  const token = await getUserToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token!,
      },
    }
  );
  const data = await response.json();

  revalidatePath("/wishlist");
  return data;
}
