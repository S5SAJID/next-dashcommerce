"use client";
import { ProgressProvider } from "@bprogress/next/app";
import React from "react";

export default function StoreFrontProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressProvider>
        {children}
      </ProgressProvider>
    </>
  )
}