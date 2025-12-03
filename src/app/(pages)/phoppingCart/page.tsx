"use client";
import Loading from "@/app/loading";
import { CartContext } from "@/components/context/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext } from "react";

export default function PhoppingCart() {
  const { cartData, isLoading } = useContext(CartContext);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
                        <span className="cursor-pointer rounded-lg border py-1 px-3.5 duration-100 hover:bg-black hover:text-blue-50">
                          -
                        </span>
                        <span className="w-auto text-center font-medium">
                          {item.count}
                        </span>
                        <span className="cursor-pointer rounded-lg border py-1 px-3 duration-100 hover:bg-black hover:text-blue-50">
                          +
                        </span>
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
                        aria-label="remove"
                        className="text-sm cursor-pointer flex text-destructive hover:underline hover:bg-transparent bg-transparent"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub total */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 lg:w-1/2">
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
              <Button className="mt-6 w-full rounded-md py-6 font-medium text-blue-50  cursor-pointer">
                Continue Shopping
              </Button>
              <Button className="mt-6 w-full rounded-md py-6 font-medium text-blue-50 cursor-pointer">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
