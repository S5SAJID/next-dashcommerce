"use client";
import StoreFrontCartModel from "@/components/storefront/organisms/cart/cart-modal";
import { CartModalProvider } from "@/components/storefront/organisms/cart/context/cart-context";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@bprogress/next/app";
import React from "react";

export default function StoreFrontProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartModalProvider>
        <ProgressProvider>
          {children}
          <Toaster />
          <StoreFrontCartModel />
        </ProgressProvider>
      </CartModalProvider>
    </>
  )
}