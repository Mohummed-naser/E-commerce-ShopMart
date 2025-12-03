import React from "react";
import { ProductI } from "./../../../components/interface/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import MyIconStar from "@/components/myIconStar/myIconStar";
import Link from "next/link";
import AddToCart from "@/components/addToCart/addToCardt";
export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  const { data: products }: { data: ProductI[] } = await response.json(); //{ data: products } ==> Destructuring & Aliasing
  // console.log(products[0]);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 my-10 mx-10 xl:mx-0">
        {products.map((product) => (
          <div key={product._id}>
            <Card>
              <Link href={"/products/" + product.id}>
                <CardHeader>
                  <Image
                    src={product.imageCover}
                    alt=""
                    width={300}
                    height={300}
                    className="w-full"
                  />
                  <CardDescription>{product.brand.name}</CardDescription>
                  <CardTitle>{product.title.split(" ", 2).join(" ")}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex ">
                    <div className="flex">
                      <MyIconStar />
                      <MyIconStar />
                      <MyIconStar />
                      <MyIconStar />
                    </div>
                    <p>{product.ratingsAverage}</p>
                  </div>
                  <p className="pt-2">
                    Price: <span className="font-bold">{product.price}</span>EGP
                  </p>
                </CardContent>
              </Link>
              <AddToCart productId={product._id} />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
