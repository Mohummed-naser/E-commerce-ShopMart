import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="border-t-2">
        <div className="mx-auto max-w-7xl  p-5 pt-10">
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <div className="w-full md:w-1/3 lg:w-1/5 md:me-10">
              <h2 className="mb-5">ShopMart</h2>
              <p>
                Your one-stop destination for the<br></br> latest technology,
                fashion, and<br></br> lifestyle products. Quality<br></br>
                guaranteed with fast shipping and<br></br> excellent customer
                service.
              </p>
              <div className="pt-5 ">
                <p>123 Shop Street, Octoper City, DC 12345</p>
                <p>(+20) 01093333333</p>
                <p>support@shopmart.com</p>
              </div>
            </div>

            <div className="w-full md:w-1/3 lg:w-1/5 md:me-10">
              <h5 className="mb-5">SHOP</h5>
              <ul className="flex flex-col gap-2">
                <Link href={"/products"}>Electronics</Link>
                <Link href={"/products"}>Fashion</Link>
                <Link href={"/products"}>Home & Garden</Link>
                <Link href={"/products"}>Sports</Link>
                <Link href={"/products"}>Deals</Link>
              </ul>
            </div>

            <div className="w-full md:w-1/3 lg:w-1/5 md:me-10">
              <h5 className="mb-5">CUSTOMER SERVICE</h5>
              <ul className="flex flex-col gap-2">
                <Link href={"/products"}>Contact Us</Link>
                <Link href={"/products"}>Help Center</Link>
                <Link href={"/products"}>Track Your Order</Link>
                <Link href={"/products"}>Returns & Exchanges</Link>
                <Link href={"/products"}>Size Guide</Link>
              </ul>
            </div>

            <div className="w-full md:w-1/3 lg:w-1/5">
              <h2 className="mb-5">ABOUT</h2>
              <ul className="flex flex-col gap-2">
                <Link href={"/products"}>About shopmart</Link>
                <Link href={"/products"}>Careers</Link>
                <Link href={"/products"}>Press</Link>
                <Link href={"/products"}>Investor Relations</Link>
                <Link href={"/products"}>Sustainability</Link>
              </ul>
            </div>

            <div className="w-full md:w-1/3 lg:w-1/5">
              <h2 className="mb-5">POLICIES</h2>
              <ul className="flex flex-col gap-2">
                <Link href={"/products"}>Privacy Policy</Link>
                <Link href={"/products"}>Terms of Service</Link>
                <Link href={"/products"}>Cookie Policy</Link>
                <Link href={"/products"}>Shipping Policy</Link>
                <Link href={"/products"}>Refund Policy</Link>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
