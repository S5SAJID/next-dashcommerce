"use client";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@bprogress/next/app";
import LoginPagesProvider from "./loginPagesProvider";

export default function AuthPagesProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressProvider>
        <LoginPagesProvider>
          {children}
        </LoginPagesProvider>
        <Toaster />
      </ProgressProvider>
    </>
  )
}