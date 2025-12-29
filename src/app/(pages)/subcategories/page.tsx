"use client";
import React, { useEffect, useState } from "react";
import { Subcategory } from "@/components/interface";
import Link from "next/link";

export default function SubcategoriesPage() {
  const [subCategories, setSubCategories] = useState<Subcategory[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/subcategories"
        );
        if (!response.ok) throw new Error("eror");
        const result = await response.json();
        setSubCategories(result.data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    getSubCategories();
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-10">Subcategories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subCategories.map((sub) => (
            <Link href={`/subcategories/${sub._id}`} key={sub._id}>
              <div className="border p-6 rounded-lg shadow-sm cursor-pointer text-center bg-white hover:border-blue-500 hover:shadow-md transition-all h-full flex items-center justify-center">
                <h3 className="text-lg font-semibold">{sub.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
