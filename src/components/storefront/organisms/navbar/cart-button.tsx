"use client";

import { ShoppingCart } from "lucide-react";
import { useCartModel } from "../cart/context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "react-use-cart";

export default function StoreFrontNavbarCartButton() {
  const { setOpen } = useCartModel();
  const { totalItems } = useCart();
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground" onClick={() => setOpen(true)}>
        <ShoppingCart className="h-5 w-5" />
      </Button>
      {totalItems > 0 && (
        <Badge
          className="absolute top-0 right-0 h-4 min-w-4 rounded-full px-1 flex items-center justify-center text-[10px]"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
    </div>
  )
}

