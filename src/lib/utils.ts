import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isActivePath(itemUrl: string, pathname: string) {
	if (!itemUrl || itemUrl === "#") {
		return false;
	}
	if (itemUrl === "/") {
		return pathname === "/";
	}
	return pathname === itemUrl || pathname.startsWith(`${itemUrl}/`);
}

import type { Currency } from "@/db/schema/tables/stores";

type FormatPriceParams = {
	price: string | number;
	currency: Currency;
	locale?: Intl.LocalesArgument;
	notation?: "standard" | "compact";
};

/**
 * Format a price value with the specified currency.
 * Framework-agnostic utility that can be used in Server Components, Client Components, and API routes.
 *
 * @param price - The price value to format (string or number)
 * @param currency - The currency code (e.g., 'USD', 'EUR')
 * @param locale - Optional locale for number formatting (defaults to 'en-US')
 * @param notation - Optional notation style: 'standard' or 'compact' (defaults to 'standard')
 * @returns Formatted price string with currency symbol
 *
 * @example
 * ```ts
 * formatPrice({ price: 29.99, currency: 'USD' }) // "$29.99"
 * formatPrice({ price: 29.99, currency: 'EUR', locale: 'de-DE' }) // "29,99 €"
 * formatPrice({ price: 1234.56, currency: 'USD', notation: 'compact' }) // "$1.2K"
 * ```
 */
export function formatPrice({
	price,
	currency,
	locale = "en-US",
	notation = "standard",
}: FormatPriceParams): string {
	const amount = typeof price === "number" ? price : Number.parseFloat(price);

	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		notation,
	}).format(amount);
}

/* Not in use
export function extractCountryCode(phone: string) {
	const match = phone.match(/^\s*(\+\d{1,3})/);
	return match ? match[1] : null;
}
*/

export function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		// Generate a random index from 0 to i
		const j = Math.floor(Math.random() * (i + 1));
		// Swap elements array[i] and array[j]
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
