"use client";

import { useRouter } from "@bprogress/next";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-8"
      type="button"
      onClick={() => router.back()}
    >
      <ArrowLeft />
    </Button>
  )
}