"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// 1. Schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().nonempty("Password is required").min(8, "Min 8 characters"),
});

const forgotSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
});

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 2. Forms Setup
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const forgotForm = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 3. Handlers
  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/',
      redirect: true
    });
    if (result?.error) {
       toast.error(result.error);
    }
    setIsLoading(false);
  }

  async function onForgotSubmit(values: z.infer<typeof forgotSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      
      if (data.statusMsg === "success") {
        localStorage.setItem("resetEmail", values.email); 
        toast.success("Verification code sent to your email!");
        router.push("/verify-code");
      } else {
        toast.error(data.message || "Email not found");
      }
    } catch (error) {
      toast.error("Error connection to server");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isMounted) return null;

  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh] px-4 py-10 bg-gray-50/50">
      <h2 className="mb-6 text-3xl font-extrabold text-gray-900 tracking-tight transition-all">
        {isForgotMode ? "Reset Password" : "Login to Store"}
      </h2>
      
      <Card className="p-8 w-full max-w-md shadow-xl border-none ring-1 ring-gray-200 bg-white">
        {!isForgotMode ? (
          /* Login Form */
          <Form {...loginForm} key="login-form">
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} className="h-11 focus-visible:ring-black" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="font-bold text-gray-700">Password</FormLabel>
                      <button 
                        type="button"
                        onClick={() => setIsForgotMode(true)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <FormControl>
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} className="h-11 focus-visible:ring-black pr-10" />
                      </FormControl>
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {searchParams.get("error") && (
                <div className="bg-red-50 p-3 rounded-md border border-red-200 text-center text-xs text-red-700 font-bold">
                  {searchParams.get("error")}
                </div>
              )}

              <Button className="w-full h-12 font-bold bg-black hover:bg-zinc-800 text-white transition-all shadow-lg active:scale-95" type="submit" disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : "Sign In"}
              </Button>

              <p className="text-center text-sm text-gray-600">
                New user?{" "}
                <Link href="/register" className="font-bold text-black hover:underline">Create an account</Link>
              </p>
            </form>
          </Form>
        ) : (
          /* Forgot Password Form */
          <Form {...forgotForm} key="forgot-form">
            <form onSubmit={forgotForm.handleSubmit(onForgotSubmit)} className="space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-sm text-gray-500">We'll send a 6-digit verification code to your email to reset your password.</p>
              </div>
              
              <FormField
                control={forgotForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        {...field} 
                        className="h-11 focus-visible:ring-black bg-white" 
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full h-12 font-bold bg-black hover:bg-zinc-800 text-white shadow-lg transition-all cursor-pointer" type="submit" disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin mr-2 h-4 w-4" /> : "Send Code"}
              </Button>

              <button 
                type="button" 
                onClick={() => setIsForgotMode(false)}
                className="flex items-center justify-center w-full text-sm text-gray-700 hover:text-black font-bold gap-2 transition-colors py-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </button>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
}