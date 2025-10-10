"use client";
import StoreFrontQuantityInput from "@/components/storefront/molecules/quantity-input";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { CartModelItem } from "../cart-modal";
import { useCart } from "react-use-cart";

export default function StoreFrontCartItem({ product }: { product: CartModelItem }) {
  const { updateItemQuantity,} = useCart();
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Image src={product.image} alt={product.name} width={100} height={100} className="size-16 border rounded-md" />
        <div>
          <h5 className="">{product.name}</h5>
          <p className="text-muted-foreground text-sm">{formatPrice({ price: product.price })} × {product.quantity}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-right text-sm">{formatPrice({ price: (product.quantity ?? 1) * product.price })}</p>
        <StoreFrontQuantityInput value={product.quantity} onChange={(value) => updateItemQuantity(product.id, value)} />
      </div>
    </div>
  )
}