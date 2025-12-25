import { FullPageSpinner } from "@/components/storefront/molecules/full-page-spinner";
import { OrderSuccessPageInner } from "@/components/storefront/organisms/order-success-page-inner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Order confirmed",
	description: "Your order has been placed successfully.",
};

export default function OrderSuccessPage() {
	return (
		<Suspense fallback={<FullPageSpinner />}>
			<OrderSuccessPageInner />
		</Suspense>
	);
}
