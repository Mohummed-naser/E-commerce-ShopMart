import { Button } from "@/components/ui/button";
import Image from "next/image";
import Categories from "./(pages)/categories/page";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <div className="text-center py-50">
          <h1 className="text-7xl">Welcome to ShopMart</h1>
          <p className="mt-10">
            Discover the latest technology, fashion, and lifestyle products.
            Quality guaranteed with <br></br>fast shipping and excellent
            customer service.
          </p>
          <div className="mt-10">
            <Button className="px-8 py-6 me-5 cursor-pointer ">
              <Link href={"/products"}>Shoping Now</Link>
            </Button>
            <Button className="px-8 py-6 bg-transparent border-2 text-black hover:bg-transparent cursor-pointer ">
              Browse Categories
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
