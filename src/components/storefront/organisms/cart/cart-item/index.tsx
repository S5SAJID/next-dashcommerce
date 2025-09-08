"use client";
import { Product } from "@/components/organisms/tables/products-table/data";
import StoreFrontQuantityInput from "@/components/storefront/molecules/quantity-input";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function StoreFrontCartItem({ product, quantity }: { product: Product, quantity: number }) {
  const [product_quantity, setProduct_quantity] = useState(quantity);
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Image src={product.img} alt={product.name} width={100} height={100} className="size-16 border rounded-md" />
        <div>
          <h5 className="font-bold">{product.name}</h5>
          <p className="text-muted-foreground text-sm">{formatPrice({price: product.price})} × {product_quantity}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-right text-sm">{formatPrice({price: product_quantity*product.price})}</p>
        <StoreFrontQuantityInput value={product_quantity} onChange={(value) => setProduct_quantity(value)} />
      </div>
    </div>
  )
}