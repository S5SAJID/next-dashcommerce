"use client";

import type { ProductWithStore } from "@/db/actions/storefront/products/public/types";
import Image from "next/image";
import { useState } from "react";

export default function StoreFrondProductImagePreview({
	product,
}: {
	product: ProductWithStore;
}) {
	const [selectedImg, setSelectedImg] = useState(product.images[0]);

	return (
		<div className="grid w-full grid-rows-[1fr_80px] gap-2">
			<div className="relative overflow-hidden rounded-xl bg-muted">
				{product.images.map((image) => (
					<Image
						alt={product.name}
						className={`transition-all duration-500 ${image === selectedImg ? "opacity-100" : "hidden opacity-0"}`}
						height={1000}
						key={image}
						src={image}
						width={1000}
					/>
				))}
			</div>
			<div className="flex gap-2">
				{product.images.map((img) => (
					<Image
						alt={product.name}
						className={`cursor-pointer border ${img === selectedImg ? "border-primary" : "border-transparent"} rounded-xl`}
						height={80}
						key={img}
						loading="lazy"
						onClick={() => setSelectedImg(img)}
						src={img}
						width={80}
					/>
				))}
			</div>
		</div>
	);
}
