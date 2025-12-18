import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import StoreFrontCartItem from "../cart-item";
import { useCartModel } from "../context/cart-context";
import { useCart } from "react-use-cart";
import React from "react";
import { formatPrice } from "@/lib/utils";
import { CURRENCY_INFO } from "@/lib/currency";

export type CartModelItem = {
	id: string;
	price: number;
	name: string;
	image: string;
	quantity?: number;
};

export default function StoreFrontCartModel() {
	const { open, setOpen, currency } = useCartModel();
	const { totalItems, cartTotal, items, emptyCart } = useCart();
	const currencyInfo = CURRENCY_INFO[currency];

	function handleClearCart() {
		if (confirm("Clear the cart?")) {
			emptyCart();
		}
	}

	if (!currencyInfo) throw "Currency not found";

	return (
		<Sheet onOpenChange={setOpen} open={open}>
			<SheetContent className="w-full !font-['DM_Sans'] md:w-3/4">
				<SheetHeader>
					<SheetTitle>My Cart</SheetTitle>
				</SheetHeader>
				<div className="grid flex-1 auto-rows-min gap-6 px-4">
					{items.length === 0 ? (
						<div className="py-8 text-center text-muted-foreground">
							Your cart is empty.
						</div>
					) : (
						items.map((item) => (
							<React.Fragment key={item.id}>
								<StoreFrontCartItem product={item as CartModelItem} />
								<Separator />
							</React.Fragment>
						))
					)}
				</div>
				<SheetFooter>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-muted-foreground">Taxes</TableCell>
								<TableCell align="right" className="text-lg">
									{currencyInfo.symbol}0.00
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Shipping
								</TableCell>
								<TableCell align="right" className="text-muted-foreground">
									Calculated at checkout
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">Total</TableCell>
								<TableCell align="right" className="text-lg">
									{formatPrice({
										price: cartTotal,
										currency: currencyInfo.code,
										locale: currencyInfo.locale,
									})}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					<Button
						asChild
						className="rounded-full"
						disabled={totalItems === 0}
						size="lg"
					>
						<Link href="/checkout">Proceed to Checkout</Link>
					</Button>
					<Button
						className="rounded-full"
						disabled={totalItems === 0}
						onClick={handleClearCart}
						size="lg"
						variant="ghost"
					>
						Clear cart
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
