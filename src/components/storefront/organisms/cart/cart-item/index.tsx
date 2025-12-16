"use client";
import StoreFrontQuantityInput from "@/components/storefront/molecules/quantity-input";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import type { CartModelItem } from "../cart-modal";
import { useCart } from "react-use-cart";
import { useCartModel } from "../context/cart-context";
import { CURRENCY_INFO } from "@/lib/currency";

export default function StoreFrontCartItem({
	product,
}: {
	product: CartModelItem;
}) {
	const { updateItemQuantity } = useCart();
	const { currency } = useCartModel();
	const currencyInfo = CURRENCY_INFO[currency];

	return (
		<div className="flex justify-between">
			<div className="flex gap-2">
				<Image
					alt={product.name}
					className="size-16 rounded-md border"
					height={100}
					src={product.image}
					width={100}
				/>
				<div>
					<h5 className="">{product.name}</h5>
					<p className="text-muted-foreground text-sm">
						{formatPrice({
							price: product.price,
							currency: currencyInfo.code,
							locale: currencyInfo.locale,
						})}{" "}
						× {product.quantity}
					</p>
				</div>
			</div>
			<div className="space-y-2">
				<p className="text-right text-sm">
					{formatPrice({
						price: (product.quantity ?? 1) * product.price,
						currency: currencyInfo.code,
						locale: currencyInfo.locale,
					})}
				</p>
				<StoreFrontQuantityInput
					onChange={(value) => updateItemQuantity(product.id, value)}
					value={product.quantity}
				/>
			</div>
		</div>
	);
}
