"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Building2, Trash2, Home, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AddressPage({ token: serverToken }: { token: string }) {
  const { data: session, status } = useSession();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  // Retrieve token from either Server Props or Client Session
  const activeToken = serverToken || (session as any)?.user?.token || (session as any)?.accessToken;

  // 1. Fetch addresses on mount or session change
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!activeToken) {
        if (status !== "loading") setFetching(false);
        return;
      }

      try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
          method: "GET",
          headers: { token: activeToken },
        });
        const result = await response.json();
        
        if (result.status === "success") {
          setAddresses(result.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    if (status !== "loading") {
      fetchAddresses();
    }
  }, [activeToken, status]);

  // 2. Add New Address Function
 async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  
  if (!activeToken) {
    toast.error('Please login first');
    router.push("/login");
    return;
  }

  const formData = new FormData(event.currentTarget);
  const addressData = Object.fromEntries(formData);

  const isDuplicate = addresses.some(
    (addr) => 
      addr.name.toLowerCase().trim() === (addressData.name as string).toLowerCase().trim() &&
      addr.details.toLowerCase().trim() === (addressData.details as string).toLowerCase().trim() &&
      addr.city.toLowerCase().trim() === (addressData.city as string).toLowerCase().trim()
  );

  if (isDuplicate) {
    toast.error("This exact address is already registered!");
    return; 
  }

  setLoading(true);

  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: activeToken,
      },
      body: JSON.stringify(addressData),
    });

    const result = await response.json();

    if (result.status === "success") {
      setAddresses(result.data); 
      (event.target as HTMLFormElement).reset();
      toast.success('Address added successfully!');
    } else {
      toast.error(result.message || "Failed to add address");
    }
  } catch (error) {
    console.error("Add error:", error);
    toast.error("Network error, please try again");
  } finally {
    setLoading(false); 
  }
}

  // 3. Delete Address Function with Toast Confirmation
  async function deleteAddress(id: string) {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <span className="font-medium text-slate-800">
          Are you sure you want to delete this address?
        </span>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id); 
              await executeDelete(id); 
            }}
            className="px-3 py-1 text-xs font-semibold bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 5000, 
      position: "top-center",
    });
  }

  async function executeDelete(id: string) {
    const loadingToast = toast.loading("Deleting address...");
    try {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        method: "DELETE",
        headers: { token: activeToken },
      });
      const result = await response.json();
      
      if (result.status === "success") {
        setAddresses(result.data);
        toast.success("Address deleted successfully", { id: loadingToast });
      } else {
        toast.error(result.message || "Failed to delete", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Network error", { id: loadingToast });
    }
  }
  // Check authentication status
  const isLoggedIn = status === "authenticated" || !!activeToken;

  return (
    <div className="container mx-auto p-5 space-y-10">
      {/* Alert shown if no valid token is found */}
      {!isLoggedIn && status !== "loading" && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-3 text-red-700 animate-pulse">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold">Attention: You are not currently logged in with a valid session.</span>
        </div>
      )}

      {/* Form Section */}
      <Card className="max-w-md mx-auto shadow-xl border-t-4 border-t-slate-800">
        <CardHeader>
          <CardTitle className="text-center font-bold text-xl uppercase tracking-wider">Add New Address</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input name="name" placeholder="Address Name (e.g., Home)" required />
              <Input name="details" placeholder="Full Address Details" required />
              <Input name="phone" placeholder="Phone Number" required />
              <Input name="city" placeholder="City" required />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 cursor-pointer" 
              disabled={loading || !isLoggedIn}
            >
              {loading ? (
                <span className="flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Adding...</span>
              ) : (
                "Add Address"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-muted-foreground font-bold text-lg">My Registered Addresses</span>
        </div>
      </div>

      {/* Address Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fetching ? (
          <div className="col-span-full text-center py-10">
            <Loader2 className="animate-spin mx-auto h-10 w-10 text-slate-400" />
            <p className="mt-2 text-slate-500">Loading your addresses...</p>
          </div>
        ) : addresses.length > 0 ? (
          addresses.map((addr) => (
            <Card key={addr._id} className="hover:border-slate-400 transition-all shadow-md relative group border-slate-200">
              <CardHeader className="flex flex-row justify-between items-center pb-2 bg-slate-50/50">
                <CardTitle className="text-slate-800 flex items-center gap-2 font-bold">
                  <Home className="w-4 h-4 text-slate-500" /> {addr.name}
                </CardTitle>
                <button 
                  onClick={() => deleteAddress(addr._id)} 
                  className="text-slate-300 hover:text-red-600 transition-colors cursor-pointer"
                  title="Delete Address"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </CardHeader>
              <CardContent className="text-sm space-y-3 text-slate-600 border-t pt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{addr.details}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{addr.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{addr.phone}</span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-slate-500 font-medium">No addresses found. Start by adding your first one above.</p>
          </div>
        )}
      </div>
    </div>
  );
}