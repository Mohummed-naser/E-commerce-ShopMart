import { ProductI } from "@/components/interface";
import { Params } from "next/dist/server/request/params";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MyIconStar from "@/components/myIconStar/myIconStar";
import Carouesl from "@/components/caroueslCom/Carouesl";
import AddToCart from "@/components/addToCart/addToCardt";
export default async function ProductDetails({ params }: { params: Params }) {
  let { productId } = await params;
  // console.log(await params);
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId
  );
  const { data: product }: { data: ProductI } = await response.json();
  // console.log(product);
  return (
    <>
      <Card className="grid md:grid-cols-2 items-center w-3/4 mx-auto my-10">
        <div className="p-3">
          <Carouesl images={product.images} altContent={product.title} />
        </div>
        <div>
          <CardHeader>
            <CardDescription>{product.category.name}</CardDescription>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>{product.brand.name}</CardDescription>
            <div className="flex gap-1">
              <MyIconStar />
              <MyIconStar />
              <MyIconStar />
              <MyIconStar />
              <p>({product.ratingsQuantity})</p>
            </div>
            <div className="flex justify-between">
              <p>EGP {product.price}.00</p>
              <p className="font-bold">Quantity: {product.quantity}</p>
            </div>
          </CardContent>
          <AddToCart productId={product._id} />
        </div>
      </Card>
    </>
  );
}
