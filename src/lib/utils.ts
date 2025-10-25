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

type formatePriceParams = {
	price: string | number;
	locale?: Intl.LocalesArgument;
};

export function formatPrice({ locale = "en-US", price }: formatePriceParams) {
	const amount = typeof price === "number" ? price : Number.parseFloat(price);
	const formatted = new Intl.NumberFormat(locale, {
		currency: "USD",
		style: "currency",
	}).format(amount);
	return formatted;
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
