"use client";
import { CartContext } from "@/components/context/CartContext";
import React, { useContext, useEffect, useState } from "react";
import { Loader2, Package } from "lucide-react";

// 1. Ensure it is a "default" export
// 2. Ensure it is a "function"
export default function AllOrders() {
  const { cartOwner } = useContext(CartContext);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserOrders() {
      const userId = typeof cartOwner === 'object' ? cartOwner?.cartOwner : cartOwner;
      const finalId = userId || "6407cf6f515bdcf347c09f17";

      try {
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${finalId}`
        );
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    getUserOrders();
  }, [cartOwner]);

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin inline" /></div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Order History</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded shadow-sm">
            <p className="font-bold">Order ID: #{order.id}</p>
            <p className="text-green-600">Total: {order.totalOrderPrice} EGP</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}