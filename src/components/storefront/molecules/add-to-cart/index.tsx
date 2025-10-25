"use client";
import { Button, type buttonVariants } from "@/components/ui/button";
import { useCartModel } from "../../organisms/cart/context/cart-context";
import { useCart } from "react-use-cart";
import type { CartModelItem } from "../../organisms/cart/cart-modal";
import type { VariantProps } from "class-variance-authority";

type StoreFrontAddToCartProps = React.ComponentProps<"button"> & {
	variant?: VariantProps<typeof buttonVariants>;
} & { product: CartModelItem };

export default function StoreFrontAddToCart({
	className,
	variant = { variant: "default", size: "lg" },
	product,
	...props
}: StoreFrontAddToCartProps) {
	const { addItem } = useCart();
	const { setOpen } = useCartModel();
	return (
		<Button
			{...props}
			{...variant}
			className={className}
			onClick={() => {
				addItem(product);
				setOpen(true);
			}}
			size="lg"
		>
			Add to cart
		</Button>
	);
}
