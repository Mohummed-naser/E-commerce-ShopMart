"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function VerifyCode() {
  const [resetCode, setResetCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: resetCode }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "Success") {
        setMessage({ type: "success", text: "Code verified successfully!" });
        setTimeout(() => {
          router.push("/reset-password");
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Invalid or expired code",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to connect to server" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Verify Reset Code</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        Please enter the 6-digit code sent to your email.
      </p>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Reset Code</label>
          <input
            type="text"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-center tracking-widest font-bold text-lg"
            placeholder="000000"
            maxLength={6}
            required
          />
        </div>

        {message && (
          <p
            className={`p-2 text-sm rounded border ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-red-100 text-red-700 border-red-200"
            }`}
          >
            {message.text}
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer text-white py-2 rounded transition disabled:bg-gray-400 font-medium"
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
}
