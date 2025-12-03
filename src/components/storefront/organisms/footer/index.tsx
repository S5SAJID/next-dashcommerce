import { Button } from "@/components/ui/button";
import { InferSelectModel } from "drizzle-orm";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { StoreTable } from "@/db/schema";

type StoreFrontFooterProps = {
	store: InferSelectModel<typeof StoreTable>;
};

export default function StoreFrontFooter({ store }: StoreFrontFooterProps) {
	return (
		<footer className="w-full bg-muted pt-12 pb-6 md:pt-16">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 text-sm sm:px-6 md:grid-cols-3 lg:px-8">
				<div>
					<p className="font-bold">{store.name}</p>
				</div>
				<div>
					<ul>
						<li className="mb-2 font-bold">Shop</li>
						<li>
							<Link className="hover:underline" href="/products">
								All Products
							</Link>
						</li>
						<li>
							<Link className="hover:underline" href="#">
								Apparel
							</Link>
						</li>
						<li>
							<Link className="hover:underline" href="#">
								Accessories
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex justify-end gap-4">
					<Button
						asChild
						className="rounded-full"
						size="icon"
						variant="outline"
					>
						<Link href="#" target="_blank">
							<Twitter />
						</Link>
					</Button>
					<Button
						asChild
						className="rounded-full"
						size="icon"
						variant="outline"
					>
						<Link href="#" target="_blank">
							<Instagram />
						</Link>
					</Button>
					<Button
						asChild
						className="rounded-full"
						size="icon"
						variant="outline"
					>
						<Link href="#" target="_blank">
							<Facebook />
						</Link>
					</Button>
				</div>
			</div>
			<div className="pt-18 text-center text-muted-foreground text-sm">
				<p>© 2025 {store.name}. All rights reserved.</p>
			</div>
		</footer>
	);
}
