"use client";
import { Button } from "@/components/ui/button";
import { useCartModel } from "../../organisms/cart/context/cart-context";


export default function StoreFrontAddToCart({ className, ...props }: React.ComponentProps<"button">) {
  const { setOpen } = useCartModel();
  return (
    <Button className={className} {...props} onClick={() => setOpen(true)} size="lg">Add to cart</Button>
  )
}