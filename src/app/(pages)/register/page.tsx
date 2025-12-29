"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { onSubmitData } from "./SendData";
import { useForm } from "react-hook-form";
import { RegisterFormData } from "@/components/interface";

export default function Register() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch, 
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const handleRegistration = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const result = await onSubmitData(data);
      if (result.message === "success") {
        alert("Account created successfully!");
        router.push("/login"); 
      } else {
        
        alert(result.message || result.statusMsg);
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-linear-to-tr from-gray-900 to-gray-700 justify-around items-center hidden">
        <div className="z-10 text-center px-10">
          <h1 className="text-white font-bold text-4xl font-sans italic tracking-wider">
            Shopmark
          </h1>
          <p className="text-white mt-4 text-lg">
            Your Style, Defined. Shop the latest trends effortlessly.
          </p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-40 right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
      </div>

      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white overflow-y-auto">
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="w-5/6 max-w-md"
        >
          <h1 className="text-gray-800 font-bold text-3xl mb-1">
            Create Account
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Fill in your details to get started.
          </p>

          <div className="mb-4">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <UserIcon />
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Min length is 3" },
                })}
                className="pl-2 outline-none border-none w-full text-sm"
                type="text"
                placeholder="Full Name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <EmailIcon />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                className="pl-2 outline-none border-none w-full text-sm"
                type="email"
                placeholder="Email Address"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <PhoneIcon />
              <input
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^01[0125][0-9]{8}$/,
                    message: "Enter valid Egyptian phone",
                  },
                })}
                className="pl-2 outline-none border-none w-full text-sm"
                type="tel"
                placeholder="Phone Number"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <LockIcon />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="pl-2 outline-none border-none w-full text-sm"
                type="password"
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <LockIcon />
              <input
                {...register("rePassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="pl-2 outline-none border-none w-full text-sm"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            {errors.rePassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="block w-full mt-6 bg-black text-white hover:bg-gray-800 font-semibold py-2 rounded-md transition-all"
          >
            {isLoading ? "Processing..." : "Register Now"}
          </Button>

          <div className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Icons
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>
);
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
