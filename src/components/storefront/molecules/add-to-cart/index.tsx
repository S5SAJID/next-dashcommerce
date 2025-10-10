"use client";
import { Button } from "@/components/ui/button";
import { useCartModel } from "../../organisms/cart/context/cart-context";
import { useCart } from "react-use-cart";
import { CartModelItem } from "../../organisms/cart/cart-modal";


export default function StoreFrontAddToCart({ className, product, ...props }: React.ComponentProps<"button"> & { product: CartModelItem }) {
  const { addItem } = useCart();
  const { setOpen } = useCartModel();
  return (
    <Button className={className} {...props} onClick={() => {
      addItem(product);
      setOpen(true);
    }} size="lg">Add to cart</Button>
  )
}