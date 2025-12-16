"use client";
import { useDashboardStoreInfo } from "@/lib/context/dashboard/store-context-provider";
import { CURRENCY_INFO } from "@/lib/currency";
import { formatPrice } from "@/lib/utils";

type FormatDashboardPriceParams = {
	price: string | number;
};

export function formatDashboardPrice({ price }: FormatDashboardPriceParams) {
	const { store } = useDashboardStoreInfo();
	if (!store)
		throw new Error(
			"Dashboard store information not found. Use formatDashboardPrice within the storeinfo provider",
		);

	const currency = CURRENCY_INFO[store.currency];

	return formatPrice({
		currency: currency.code,
		locale: currency.locale,
		price,
	});
}
