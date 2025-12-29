"use client";

import { useState, useEffect } from "react";

export default function AddressPage({ token }: { token: string }) {
    const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setLoading(true);

  const formData = new FormData(event.currentTarget);
  const addressData = {
    name: formData.get("name"),
    details: formData.get("details"),
    phone: formData.get("phone"),
    city: formData.get("city"),
  };

  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token, 
      },
      body: JSON.stringify(addressData),
    });

    const result = await response.json();
    console.log("Response from API:", result); 

    if (result.status === "success") {
      setAddresses(result.data); 
      (event.target as HTMLFormElement).reset();
      alert("تمت الإضافة بنجاح!");
    } else {
      alert(`خطأ: ${result.message}`);
    }
  } catch (error) {
    console.error("Error adding address:", error);
  } finally {
    setLoading(false);
  }
}

  return (
    <div>
       <div className="grid grid-cols-1 gap-4 mt-10">
         {addresses.map((addr) => (
           <div key={addr._id} className="p-4 border rounded shadow">
             <h3 className="font-bold">{addr.name}</h3>
             <p>{addr.details}</p>
             <p>{addr.phone}</p>
           </div>
         ))}
       </div>
    </div>
  );
}