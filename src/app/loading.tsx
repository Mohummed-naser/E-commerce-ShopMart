import { Loader, LoaderCircle } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <h1>
          <LoaderCircle className="animate-spin"/>
        </h1>
      </div>
    </>
  );
}
