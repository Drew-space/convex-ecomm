"use client";

import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { CircleArrowLeft02Icon } from "@hugeicons/core-free-icons";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center  gap-2 mb-8 rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 transition"
    >
      <HugeiconsIcon icon={CircleArrowLeft02Icon} />
      Go back
    </button>
  );
}
