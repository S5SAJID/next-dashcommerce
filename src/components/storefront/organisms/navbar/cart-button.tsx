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
			<Button
				className="relative text-muted-foreground hover:text-foreground"
				onClick={() => setOpen(true)}
				size="icon"
				variant="ghost"
			>
				<ShoppingCart className="h-5 w-5" />
			</Button>
			{totalItems > 0 && (
				<Badge className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px]">
					{totalItems > 99 ? "99+" : totalItems}
				</Badge>
			)}
		</div>
	);
}
