"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const resetSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Required"),
  newPassword: z.string().min(6, "Min 6 characters").nonempty("Required"),
});

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "", newPassword: "" },
  });

  // تحديث الإيميل من الـ localStorage بمجرد التحميل
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (savedEmail) {
      form.setValue("email", savedEmail);
    }
  }, [form]);

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.token) {
        toast.success("Password Updated Successfully!");
        localStorage.removeItem("resetEmail");
        router.push("/login");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error, please check your connection");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh] px-4">
      <h2 className="my-5 text-3xl font-bold text-gray-800">New Password</h2>
      
      <Card className="p-6 w-full max-w-sm shadow-lg border-t-4 border-t-black bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <p className="text-sm text-gray-500 text-center">
              Please enter your registered email and your new password.
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-black">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="name@example.com" 
                      {...field} 
                      className="bg-white text-black border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-black">New Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                        className="bg-white text-black border-gray-300 pr-10"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              className="w-full h-11 font-bold bg-black hover:bg-zinc-800 text-white transition-all cursor-pointer" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : "Update Password"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}