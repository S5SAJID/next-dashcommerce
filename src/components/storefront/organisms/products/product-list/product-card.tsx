import StoreFrontAddToCart from "@/components/storefront/molecules/add-to-cart";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { ProductTable } from "@/db/schema";
import { formatPrice } from "@/lib/utils";
import type { InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export default function StoreFrontProductCard({
	product,
}: {
	product: InferSelectModel<typeof ProductTable>;
}) {
	return (
		<Card className="gap-0 overflow-hidden border-none bg-none p-0 text-card-foreground shadow-none">
			<CardHeader className="group relative gap-0 overflow-hidden p-0">
				<Link
					className="group-hover:opacity-75"
					href={`/products/${product.slug}`}
				>
					<Image
						alt={`${product.name} preview image`}
						className={`h-full bg-muted ${product.images.length > 1 ? "group-hover:hidden" : ""} w-full rounded-xl object-cover`}
						height={450}
						src={product.images[0]}
						width={450}
					/>
					{product.images.length > 1 ? (
						<Image
							alt={`${product.name} preview image`}
							className="hidden h-full w-full rounded-xl bg-muted object-cover group-hover:block"
							height={450}
							src={product.images[1]}
							width={450}
						/>
					) : null}
				</Link>
				<div className="-bottom-14 absolute right-0 left-0 z-10 rounded-b-lg bg-muted-foreground/10 p-2 opacity-0 backdrop-blur-sm transition-[opacity_transform] duration-300 group-hover:bottom-0 group-hover:opacity-100">
					<StoreFrontAddToCart
						className="w-full cursor-pointer rounded-full bg-background hover:bg-background hover:text-foreground/80"
						product={{
							id: product.id,
							name: product.name,
							price: product.price,
							image: product.images[0],
							quantity: 1,
						}}
						variant={{ variant: "secondary", size: "lg" }}
					/>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col space-y-1 p-3 text-left">
				<Link
					className="text-primary/90 text-sm hover:underline"
					href={`/products/${product.slug}`}
				>
					{product.name}
				</Link>
				<p className="text-sm">
					{formatPrice({ locale: "en-US", price: product.price })}
				</p>
			</CardContent>
		</Card>
	);
}
