"use client";

import { ShoppingCart } from "lucide-react";
import { useCartModel } from "../cart/context/cart-context";
import { Button } from "@/components/ui/button";

export default function StoreFrontNavbarCartButton() {
  const { setOpen } = useCartModel();
  return (
    <Button size="icon" variant="outline" className="relative" onClick={() => setOpen(true)}>
      <ShoppingCart />
      {/* <div className="absolute -top-[0.2rem] -right-[0.2rem] size-2 rounded-full bg-blue-500 dark:bg-blue-400"></div> */}
    </Button>
  )
}