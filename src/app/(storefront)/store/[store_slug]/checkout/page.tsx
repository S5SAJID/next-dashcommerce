import StoreFrontCheckoutForm from "@/components/storefront/organisms/forms/checkout";
import type { Metadata } from "next";
import StoreFrontCartSummery from "@/components/storefront/organisms/cart/cart-summery";
import { Suspense } from "react";
import { FullPageSpinner } from "@/components/storefront/molecules/full-page-spinner";

export const metadata: Metadata = {
	title: "Checkout",
	description: "Complete your purchase",
};

export default function CheckoutPage() {
	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
			{/* Checkout Form */}
			<div className="order-last w-full py-6 md:order-none">
				<h2 className="font-bold text-3xl leading-none tracking-tight">
					Checkout
				</h2>
				<p className="mt-2 mb-4 text-muted-foreground text-sm">
					Please fill in your details to complete the purchase.
				</p>
				<Suspense fallback={<FullPageSpinner />}>
					<StoreFrontCheckoutForm />
				</Suspense>
			</div>
			{/* Cart Preview */}
			<Suspense fallback={<FullPageSpinner />}>
				<StoreFrontCartSummery />
			</Suspense>
		</div>
	);
}
