"use client";

import { Product } from "@/lib/demoData";
import Image from "next/image";
import { useState } from "react";

export default function StoreFrondProductImagePreview({ product }: { product: Product }) {
  const [selectedImg, setSelectedImg] = useState(product.images[0]);

  return (
    <div className="w-full gap-2 grid grid-rows-[1fr_80px]">
      <div className="rounded relative bg-muted overflow-hidden">
        {product.images.map(image => (
          <Image
            src={image}
            alt={product.name}
            width={1000}
            height={1000}
            key={image}
            className={`transition-all duration-500 ${image === selectedImg ? 'opacity-100' : 'opacity-0 hidden'}`}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {product.images.map(img => (
          <Image
            key={img}
            loading="lazy"
            src={img}
            alt={product.name}
            onClick={() => setSelectedImg(img)}
            width={80}
            height={80}
            className={`cursor-pointer border ${img === selectedImg ? 'border-primary' : 'border-transparent'} rounded`}
          />
        ))}
      </div>
    </div>
  )
}