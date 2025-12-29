import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center flex-col gap-4">
      <Loader className="animate-spin text-black" size={48} />
    </div>
  );
}