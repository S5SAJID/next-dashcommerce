import StoreFrontAddToCart from "@/components/storefront/molecules/add-to-cart";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { ProductTable } from "@/db/schema";
import { Currency } from "@/db/schema/tables/stores";
import { CURRENCY_INFO } from "@/lib/currency";
import { formatPrice } from "@/lib/utils";
import type { InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export default function StoreFrontProductCard({
	product,
	currency,
}: {
	product: InferSelectModel<typeof ProductTable>;
	currency: Currency;
}) {
	const currencyInfo = CURRENCY_INFO[currency];

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
						loading="lazy"
						width={450}
					/>
					{product.images.length > 1 ? (
						<Image
							alt={`${product.name} preview image`}
							className="hidden h-full w-full rounded-xl bg-muted object-cover group-hover:block"
							height={450}
							src={product.images[1]}
							loading="lazy"
							width={450}
						/>
					) : null}
				</Link>
				{product.stock === 0 ? (
					<div className="absolute top-2 left-2 z-10 rounded-md bg-muted/80 px-2 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
						Out of Stock
					</div>
				) : product.compare_at && product.compare_at > product.price ? (
					<div className="absolute top-2 left-2 z-10 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
						Sale
					</div>
				) : null}
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
			<CardContent className="flex flex-col space-y-1.5 p-3 text-left">
				<Link
					className="line-clamp-1 text-sm font-medium text-foreground hover:underline"
					href={`/products/${product.slug}`}
				>
					{product.name}
				</Link>
				<div className="flex items-center gap-2">
					<p className="text-sm font-medium">
						{formatPrice({
							locale: currencyInfo.locale,
							currency: currencyInfo.code,
							price: product.price,
						})}
					</p>
					{product.compare_at && product.compare_at > product.price ? (
						<p className="text-xs text-muted-foreground line-through decoration-red-300">
							{formatPrice({
								locale: currencyInfo.locale,
								currency: currencyInfo.code,
								price: product.compare_at,
							})}
						</p>
					) : null}
				</div>
			</CardContent>
		</Card>
	);
}
