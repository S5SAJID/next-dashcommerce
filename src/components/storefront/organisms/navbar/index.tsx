import { Button } from "@/components/ui/button";
import Link from "next/link";
import StoreFrontNavbarCartButton from "./cart-button";
import type { StoreTable } from "@/db/schema";
import { SearchModal } from "../search-modal";

export default function StoreFrontNavbar({
	store,
}: {
	store: typeof StoreTable.$inferSelect;
}) {
	const links = [
		{ title: "All", href: "/products" },
		{ title: "Digital", href: "/category/digital" },
		{ title: "Beauty", href: "/category/beauty" },
		{ title: "Apparel", href: "/category/apparel" },
	];
	return (
		<nav className="sticky top-0 z-50 bg-background/90 py-4 backdrop-blur-xs">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Left side */}
				<div className="flex items-center gap-4">
					<h1 className="font-semibold text-xl">
						<Link href={"/"}>{store.name}</Link>
					</h1>
					<div className="hidden md:block">
						{links.map((link) => (
							<Button asChild key={link.href} variant="link">
								<Link href={link.href} prefetch={false}>
									{link.title}
								</Link>
							</Button>
						))}
					</div>
				</div>
				{/* Right side */}
				<div className="flex">
					<SearchModal />
					<StoreFrontNavbarCartButton />
				</div>
			</div>
		</nav>
	);
}
