"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Currency } from "@/db/schema/tables/stores";

type CartModalProviderValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	currency: Currency;
};
const CartModelContext = createContext<CartModalProviderValue | null>(null);

export function CartModalProvider({
	children,
	currency,
}: {
	children: React.ReactNode;
	currency: Currency;
}) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, []);
	return (
		<CartModelContext value={{ open, setOpen, currency }}>
			{children}
		</CartModelContext>
	);
}

export function useCartModel() {
	const ctx = useContext(CartModelContext);
	if (!ctx) {
		throw new Error("useCartModal must be used within a provider");
	}
	return ctx;
}
