"use client";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCartModel } from "@/components/storefront/organisms/cart/context/cart-context";
import { CURRENCY_INFO } from "@/lib/currency";
import { formatPrice } from "@/lib/utils";
import {
	parseAsString,
	parseAsFloat,
	parseAsInteger,
	useQueryState,
} from "nuqs";

export function OrderSuccessPageInner() {
	const [orderId] = useQueryState("orderId", parseAsString);
	const [total] = useQueryState("total", parseAsFloat);
	const [itemCount] = useQueryState("itemCount", parseAsInteger);
	const [name] = useQueryState("name", parseAsString);
	const [email] = useQueryState("email", parseAsString);
	const [country] = useQueryState("country", parseAsString);
	const [city] = useQueryState("city", parseAsString);
	const { currency } = useCartModel();
	const currencyInfo = CURRENCY_INFO[currency];

	if (!(orderId || total || itemCount || name || email || country || city)) {
		return (
			<main className="container mx-auto px-4 py-10">
				<h1 className="font-bold text-2xl">Order not found</h1>
				<p className="text-muted-foreground text-sm">
					We couldn&apos;t find your order. Please check your email for the
					confirmation or contact support.
				</p>
			</main>
		);
	}

	return (
		<main className="container mx-auto px-4 py-10">
			<div className="mx-auto max-w-2xl">
				<div className="mb-6 flex items-center gap-3">
					<CheckCircle2 aria-hidden="true" className="size-8 text-green-600" />
					<h1 className="text-balance font-bold text-2xl md:text-3xl">
						Order confirmed
					</h1>
				</div>

				<p className="mb-6 text-muted-foreground text-sm">
					Thank you for your purchase. Your order has been placed successfully.
					We’ve sent a confirmation email with your order details.
				</p>

				<section
					aria-labelledby="order-summary"
					className="mb-8 rounded-lg border p-6"
				>
					<h2 className="mb-4 font-semibold text-lg" id="order-summary">
						Order summary
					</h2>
					<dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Order number</dt>
							<dd className="font-medium">{orderId || "—"}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Items</dt>
							<dd className="font-medium">{itemCount || "0"}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Total</dt>
							<dd className="font-medium">
								{total
									? formatPrice({
											price: total,
											currency: currencyInfo.code,
											locale: currencyInfo.locale,
										})
									: "—"}
							</dd>
						</div>
					</dl>
				</section>

				<section
					aria-labelledby="contact-shipping"
					className="mb-8 rounded-lg border p-6"
				>
					<h2 className="mb-4 font-semibold text-lg" id="contact-shipping">
						Contact & shipping
					</h2>
					<dl className="space-y-2 text-sm">
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Name</dt>
							<dd className="font-medium">{name || "—"}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Email</dt>
							<dd className="font-medium">{email || "—"}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">City</dt>
							<dd className="font-medium">{city || "—"}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Country</dt>
							<dd className="font-medium">{country || "—"}</dd>
						</div>
					</dl>
				</section>

				<div className="flex flex-col gap-3 sm:flex-row">
					<Button asChild className="w-full sm:w-auto">
						<Link href="/">Continue shopping</Link>
					</Button>
					<Button asChild className="w-full sm:w-auto" variant="secondary">
						<Link href="/checkout">Back to checkout</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
