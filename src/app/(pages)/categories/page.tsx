import { CategoryI } from "@/components/interface";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  const { data: category }: { data: CategoryI[] } = await response.json();
  // console.log(category[0]._id);
  return (
    <>
      
      <div className="mt-10 text-3xl">
        <h2>Categories</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-10 mx-10 xl:mx-0">
        {category.map((category) => (
          <div key={category._id} className="cursor-pointer">
            <Card>
              <Link href={"/categories/" + category._id}>
                <CardHeader className="text-center h-110">
                  <Image
                    src={category.image}
                    alt=""
                    className="w-full"
                    width={400}
                    height={400}
                  />
                </CardHeader>
                <CardTitle className="text-center">{category.name}</CardTitle>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
