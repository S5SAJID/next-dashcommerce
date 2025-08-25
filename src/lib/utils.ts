import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isActivePath(itemUrl: string, pathname: string) {
  if (!itemUrl || itemUrl === "#") return false;
  if (itemUrl === "/") return pathname === "/";
  return pathname === itemUrl || pathname.startsWith(itemUrl + "/");
}

type formatePriceParams = {
  price: string | number,
  locale: Intl.LocalesArgument,
}

export function formatPrice({ locale = "en-US", price }: formatePriceParams) {
  const amount = typeof price == "number" ? price : parseFloat(price);
  const formatted = new Intl.NumberFormat(locale, {
    currency: "USD",
    style: "currency"
  }).format(amount);
  return formatted
}

export function extractCountryCode(phone: string) {
  const match = phone.match(/^\s*(\+\d{1,3})/);
  return match ? match[1] : null;
}