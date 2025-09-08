"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type CartModalProviderValue = { open: boolean; setOpen: (open: boolean) => void }
const CartModelContext = createContext<CartModalProviderValue | null>(null);

export function CartModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname])
  return (
    <CartModelContext value={{ open, setOpen }}>
      {children}
    </CartModelContext>
  )
}

export function useCartModel() {
  const ctx = useContext(CartModelContext);
  if (!ctx) throw new Error("useCartModal must be used within a provider");
  return ctx
}