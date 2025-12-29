"use client";
import Loading from "@/app/loading";
import { CartContext } from "@/components/context/CartContext";
import { CartResponse } from "@/components/interface";
import { Button } from "@/components/ui/button";
import { Loader, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CheckOut from "@/components/checkOut/CheckOut";
import { useSession } from "next-auth/react";

export default function shoppingCart() {
  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext);
  const [removingId, setRemovingId] = useState<null | string>(null);
  const [updateId, setUpdateId] = useState<null | string>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isShopping, setIsShopping] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token;

  useEffect(() => {
    if (
      typeof cartData?.data.products[0]?.product == "string" ||
      cartData == null
    ) {
      getCart();
    }
  }, [cartData, getCart]);

 
  //method deletItem
  async function removeCartItem(productId: string) {
    setRemovingId(productId);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/` + productId,
      {
        method: "DELETE",
        headers: {
          token: token!,
        },
      }
    );
    const data: CartResponse = await response.json();
    // console.log(data);
    if (data.status == "success") {
      toast.success("product deleted successfully");
      setCartData(data);
    }
    setRemovingId(null);
  }

  //method udateItem
  async function updateCartItem(productId: string, count: number) {
    if (count == 0) {
      removeCartItem(productId);
    }
    setUpdateId(productId);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/` + productId,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token: token!,
          "content-type": "application/json", // for row json,
        },
      }
    );
    const data: CartResponse = await response.json();
    // console.log(data);
    if (data.status == "success") {
      toast.success("product quantity updated successfully");
      setCartData(data);
    }
    setUpdateId(null);
  }

  //method udateItem
  async function clearCard() {
    setIsClearing(true);
    setBtnLoading(true);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/`,
      {
        method: "DELETE",
        headers: {
          token: token!,
        },
      }
    );
    const data: CartResponse = await response.json();
    // console.log(data);
    if (data.message == "success") {
      toast.success("product quantity updated successfully");
      setCartData(null);
    }
    setIsClearing(false);
    setBtnLoading(false);
  }
  return (
    <>
      {isLoading || typeof cartData?.data.products[0]?.product == "string" ? (
        <Loading />
      ) : cartData?.numOfCartItems! > 0 ? (
        <div className="vh-screen pt-10 pb-50 mx-10 xl:mx-0">
          <div className="mb-10">
            <h1 className=" text-3xl font-bold">Shopping Cart</h1>
            <p>{cartData?.numOfCartItems} items in your cart</p>
          </div>
          {/* Shopping Card */}
          <div className="justify-between lg:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-4/4">
              {/* Loop here */}
              {cartData?.data.products.map((item) => (
                <div
                  key={item._id}
                  className="just1ify-between mb-6 rounded-lg border bg-white p-6 shadow-sm sm:flex sm:justify-start"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="rounded-lg w-24 h-24 md:w-24 md:h-24 object-cover"
                  />

                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <div className="mb-5">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.product.title}
                        </h2>
                        <div>
                          <p>
                            {item.product.brand.name}.
                            {item.product.category.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-gray-100">
                        <button
                          onClick={() =>
                            updateCartItem(item.product.id, item.count - 1)
                          }
                          className="cursor-pointer rounded-lg border py-1 px-3.5 duration-100 hover:bg-black hover:text-blue-50"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-medium">
                          {updateId == item.product.id ? (
                            <Loader className="animate-spin" />
                          ) : (
                            item.count
                          )}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(item.product.id, item.count + 1)
                          }
                          className="cursor-pointer rounded-lg border py-1 px-3 duration-100 hover:bg-black hover:text-blue-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className=" text-right ">
                        <div className="font-semibold">
                          <p className="text-sm">EGP{item.price}</p>
                        </div>
                        <span className="">each</span>
                      </div>
                      <button
                        onClick={() => removeCartItem(item.product.id)}
                        aria-label="remove"
                        className="text-sm cursor-pointer flex text-destructive hover:underline hover:bg-transparent bg-transparent"
                      >
                        {removingId == item.product.id && (
                          <Loader className="animate-spin" />
                        )}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Sub total */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 lg:w-1/2 relative">
              <h2>Order Summary</h2>
              <div className="my-2 flex justify-between">
                <p className="text-gray-700">
                  Subtotal: {cartData?.numOfCartItems}item
                </p>
                <p className="text-gray-700">
                  {cartData?.data.totalCartPrice} EGP
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-green-600 font-bold">Free</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">
                    {cartData?.data.totalCartPrice} EGP
                  </p>
                </div>
              </div>
              <Link href={"/products"}>
                <Button
                  onClick={async () => {
                    setIsShopping(true);
                    router.push("/products");
                  }}
                  className="mt-6 w-full rounded-md py-6 font-medium text-black bg-white hover:bg-gray-50 border cursor-pointer"
                >
                  Continue Shopping
                  {isShopping ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <ShoppingCartIcon />
                  )}
                </Button>
              </Link>
              <CheckOut cartId={cartData?.cartId!} />

              <Button
                onClick={() => clearCard()}
                className="absolute -bottom-13 right-0 rounded-md py-5 font-medium text-red-500 bg-transparent hover:bg-red-700 hover:text-white border cursor-pointer"
              >
                {isClearing ? (
                  <Loader className="animate-spin" />
                ) : (
                  <ShoppingCartIcon />
                )}
                Clear Card
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h[75vh] justify-center items-center gap-4 my-40">
          <h2 className="text-2xl">Your card is empty.</h2>
          <Button
            onClick={async () => {
              setBtnLoading(true);
              router.push("/products");
            }}
            className="px-8 py-6 me-5 cursor-pointer"
          >
            {btnLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <ShoppingCartIcon />
            )}
            Shoping Now
          </Button>
          <Link href={"/product"}></Link>
        </div>
      )}
    </>
  );
}
