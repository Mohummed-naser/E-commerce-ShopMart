import React from "react";
import { Params } from "next/dist/server/request/params";
import { ProductI } from "@/components/interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import MyIconStar from "@/components/myIconStar/myIconStar";
import AddToCart from "@/components/addToCart/addToCardt";
export default async function BrandDetails({ params }: { params: Params }) {
  let { brandId } = await params;
  //   console.log(brandId);
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
  );
  const { data: products }: { data: ProductI[] } = await response.json();
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">
          No products found for this brand
        </h2>
      </div>
    );
  }
  return (
    <>
      <div className="mt-10 text-3xl">
        <h2 className="text-3xl">{products[0].brand.name}</h2>
        <p className="text-gray-700 text-lg">Products from this brand</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-10 mx-10 xl:mx-0">
        {products.map((product) => (
          <Card key={product._id}>
            <Link href={"/products/" + product.id}>
              <CardHeader>
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full"
                />
                <CardDescription>{product.brand.name}</CardDescription>
                <CardTitle>{product.title.split(" ", 2).join(" ")}</CardTitle>
                <CardDescription>{product.category.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <MyIconStar />
                    <MyIconStar />
                    <MyIconStar />
                    <MyIconStar />
                  </div>
                  <p>{product.ratingsAverage}</p>
                </div>
                <p className="pt-2">
                  Price: <span className="font-bold">{product.price}</span> EGP
                </p>
              </CardContent>
            </Link>
            <AddToCart productId={product._id} />
          </Card>
        ))}
      </div>
    </>
  );
}
