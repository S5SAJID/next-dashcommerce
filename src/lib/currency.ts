import type { Currency } from "@/db/schema/tables/stores";

/**
 * Currency metadata for display and formatting purposes.
 * Provides symbols, names, and default locales for each supported currency.
 */
export const CURRENCY_INFO: Record<
	Currency,
	{
		code: Currency;
		symbol: string;
		name: string;
		locale: string;
	}
> = {
	PKR: { code: "PKR", symbol: "₨", name: "Pakistani Rupee", locale: "en-PK" },
	BDT: { code: "BDT", symbol: "৳", name: "Bangladesh Taka", locale: "en-BD" },
	USD: { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
	EUR: { code: "EUR", symbol: "€", name: "Euro", locale: "en-EU" },
	GBP: { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
	CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", locale: "en-CA" },
	AUD: {
		code: "AUD",
		symbol: "A$",
		name: "Australian Dollar",
		locale: "en-AU",
	},
	JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", locale: "ja-JP" },
	INR: { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
};

/**
 * Get a formatted display name for a currency.
 * Used primarily in UI dropdowns and selection components.
 *
 * @param currency - The currency code
 * @returns Formatted string like "USD - $ (US Dollar)"
 *
 * @example
 * ```ts
 * getCurrencyDisplayName('USD') // "USD - $ (US Dollar)"
 * getCurrencyDisplayName('EUR') // "EUR - € (Euro)"
 * ```
 */
export function getCurrencyDisplayName(currency: Currency): string {
	const info = CURRENCY_INFO[currency];
	return `${info.code} - ${info.symbol} (${info.name})`;
}
