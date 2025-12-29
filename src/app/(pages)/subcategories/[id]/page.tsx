"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export default function SubcategoryDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [subcategory, setSubcategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSubcategoryData = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;

        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`
        );

        if (!response.ok) throw new Error("error");

        const result = await response.json();
        setSubcategory(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSubcategoryData();
  }, [params]); 

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{subcategory?.name}</h1>
      <p className="mt-4">Slug: {subcategory?.slug}</p>
    </div>
  );
}
