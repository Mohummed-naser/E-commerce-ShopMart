"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const changePasswordSchema = z.object({
  currentPassword: z.string().nonempty("Current password is required"),
  password: z.string().min(8, "New password must be at least 8 characters"),
  rePassword: z.string()
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
});

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    setIsLoading(true);
    
    const userToken = localStorage.getItem("userToken"); 

    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "token": userToken || "" 
        },
        body: JSON.stringify({
            currentPassword: values.currentPassword,
            password: values.password,
            rePassword: values.rePassword
        }),
      });

      const data = await response.json();

      if (data.message === "success") {
        toast.success('Password changed successfully!');
        form.reset();
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error('Connection error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh] px-4">
      <Card className="p-6 w-full max-w-md shadow-lg border-t-4 border-t-black">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Change Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full h-11 font-bold bg-black cursor-pointer" type="submit" disabled={isLoading}>
              {isLoading ? <Loader className="animate-spin h-4 w-4" /> : "Update Password"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}