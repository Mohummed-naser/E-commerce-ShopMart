"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const forgotSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof forgotSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.statusMsg === "success") {
        toast.success("Verification code sent to your email!");
        // تخزين الإيميل مؤقتاً لاستخدامه في الخطوات القادمة
        localStorage.setItem("resetEmail", values.email);
        router.push("/verify-code"); 
      } else {
        toast.error(data.message || "Email not found");
      }
    } catch (error) {
      toast.error("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh] px-4">
      <h2 className="my-5 text-3xl font-bold text-gray-800">Forgot Password</h2>
      <Card className="p-6 w-full max-w-sm shadow-lg border-t-4 border-t-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <p className="text-sm text-gray-500 text-center text-pretty">
              Enter your email address and we will send you a code to reset your password.
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full h-11 font-bold cursor-pointer" type="submit" disabled={isLoading}>
              {isLoading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : "Send Reset Code"}
            </Button>

            <Link href="/login" className="flex items-center justify-center text-sm text-gray-600 hover:text-black gap-2 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </form>
        </Form>
      </Card>
    </div>
  );
}