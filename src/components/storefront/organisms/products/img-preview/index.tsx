"use client";

import { Product } from "@/components/organisms/tables/products-table/data";
import Image from "next/image";
import { useState } from "react";

type ExtendedProduct = Product & {
  images: {
    src: string
  }[]
}

export default function StoreFrondProductImagePreview({ product }: { product: ExtendedProduct }) {
  const [selectedImg, setSelectedImg] = useState(product.images[0]);

  return (
    <div className="w-full gap-2 grid grid-rows-[1fr_80px]">
      <div className="rounded relative overflow-hidden">
        {product.images.map(image => (
          <Image
            src={image.src}
            alt={product.name}
            width={1000}
            height={1000}
            key={image.src}
            className={`transition-all duration-500 ${image.src === selectedImg.src ? 'opacity-100' : 'opacity-0 hidden'}`}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {product.images.map(img => (
          <Image
            key={img.src}
            loading="lazy"
            src={img.src}
            alt={product.name}
            onClick={() => setSelectedImg(img)}
            width={80}
            height={80}
            className={`cursor-pointer border ${img.src === selectedImg.src ? 'border-primary' : 'border-transparent'} rounded`}
          />
        ))}
      </div>
    </div>
  )
}