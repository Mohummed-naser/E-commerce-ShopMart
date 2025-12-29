import { ProductI } from "@/components/interface";
import WishlistItem from "@/components/interface/wishlist";
import { getUserToken } from "@/Helper/getUserToken";
import React from "react";
import Image from "next/image";
import AddToCart from "@/components/addToCart/addToCardt";

export default async function Wishlist() {
  const token = await getUserToken();

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "GET",
      headers: { token: token! },
      cache: "no-store",
      next: { revalidate: 10 },
    }
  );

  const result = await response.json();
  const products: any[] = result.data || [];

  return (
    <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12">
      <div className="flex flex-col justify-start items-start">
        <p className="text-sm leading-4 text-gray-600 dark:text-white">Home</p>

        <div className="mt-3">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">
            Favourites
          </h1>
        </div>

        <div className="mt-4">
          <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
            {products.length} {products.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 w-full">
          {products.map((item) => (
            <div key={item._id} className="flex flex-col group">
              <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <img
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  src={item.imageCover}
                  alt={item.title}
                />
                
              </div>

              <div className="mt-6 flex justify-between items-start">
                <div>
                  <p className="tracking-tight text-xl font-semibold leading-6 text-gray-800 dark:text-white">
                    {item.title.split(" ").slice(0, 3).join(" ")}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {item.category?.name}
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {item.price} EGP
                </p>
              </div>

              <div className="flex flex-col space-y-3 mt-6">
                <AddToCart productId={item._id} isFav={true} />
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500 text-xl">Your wishlist is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
