import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Order confirmed",
	description: "Your order has been placed successfully.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
