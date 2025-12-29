"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Subcategory } from "@/components/interface";
import Link from "next/link";

export default function SubcategoriesByCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [subCategories, setSubCategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const { id } = await params;

        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
        );

        if (!response.ok) {
          throw new Error("error");
        }

        const result = await response.json();
        setSubCategories(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSubCategories();
  }, [params]);

 

  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-10 text-center">Subcategories</h1>

        {subCategories.length === 0 ? (
          <p className="text-center text-gray-500">empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subCategories.map((sub) => (
              <div
                key={sub._id}
                className="border p-6 rounded-lg shadow-sm text-center bg-white hover:border-green-500 transition-all"
              >
                <h3 className="text-lg font-medium">{sub.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
