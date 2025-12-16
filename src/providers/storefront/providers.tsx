"use client";
import StoreFrontCartModel from "@/components/storefront/organisms/cart/cart-modal";
import { CartModalProvider } from "@/components/storefront/organisms/cart/context/cart-context";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@bprogress/next/app";
import type React from "react";
import { CartProvider } from "react-use-cart";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Currency } from "@/db/schema/tables/stores";

export default function StoreFrontProviders({
	currency,
	children,
}: {
	children: React.ReactNode;
	currency: Currency;
}) {
	return (
		<NuqsAdapter>
			<CartModalProvider currency={currency}>
				<CartProvider>
					<ProgressProvider>
						{children}
						<Toaster />
						<StoreFrontCartModel />
					</ProgressProvider>
				</CartProvider>
			</CartModalProvider>
		</NuqsAdapter>
	);
}
