"use client";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoreFrontCartItem from "../cart-item";
import { useCart } from "react-use-cart";
import type { CartModelItem } from "../cart-modal";
import { useState } from "react";
import { useCartModel } from "../context/cart-context";
import { CURRENCY_INFO } from "@/lib/currency";
import { formatPrice } from "@/lib/utils";

export default function StoreFrontCartSummery() {
	const { cartTotal, items } = useCart();
	const { currency } = useCartModel();
	const currencyInfo = CURRENCY_INFO[currency];
	const [open, setOpen] = useState(true);

	return (
		<div className="flex w-full flex-col self-start rounded-lg border">
			<Collapsible
				className="flex-1 overflow-hidden"
				onOpenChange={setOpen}
				open={open}
			>
				<CollapsibleTrigger className="flex w-full items-center justify-between border-b px-6 py-4 font-semibold text-lg">
					<span>Cart Summary</span>
					<Button size="icon" variant="ghost">
						<ChevronDown />
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent className="h-full">
					<div className="space-y-6 p-6">
						{items.length > 0 ? (
							items.map((item) => (
								<StoreFrontCartItem
									key={item.id}
									product={item as CartModelItem}
								/>
							))
						) : (
							<div className="text-center text-muted-foreground text-sm">
								Your cart is empty.
							</div>
						)}
					</div>
				</CollapsibleContent>
			</Collapsible>
			<div className="mt-auto flex justify-between border-t px-6 py-4 text-sm md:text-base">
				<span>Total</span>
				<span>
					{formatPrice({
						price: cartTotal,
						currency: currencyInfo.code,
						locale: currencyInfo.locale,
					})}
				</span>
			</div>
		</div>
	);
}
