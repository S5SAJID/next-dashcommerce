import StoreFrontAddToCart from "@/components/storefront/molecules/add-to-cart";
import StoreFrondProductImagePreview from "@/components/storefront/organisms/products/img-preview";
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import {
	getPublicStorefrontProduct,
	getPublicStorefrontProducts,
} from "@/db/actions/storefront/products/public/actionts";
import { getPublicStoreFrontCurrency } from "@/db/actions/storefront/store/public/actionts";
import { CURRENCY_INFO } from "@/lib/currency";
import { formatPrice, shuffleArray } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: PageProps<"/store/[store_slug]/products/[slug]">): Promise<Metadata> {
	const awaitedParams = await params;
	const product = await getPublicStorefrontProduct(
		awaitedParams.store_slug,
		awaitedParams.slug,
	);

	if (!product) {
		return notFound();
	}

	return { title: product.name, description: product.description };
}

const RECOMMENDED_PRODUCTS_LIMIT = 4;

export default async function ProductPage({
	params,
}: PageProps<"/store/[store_slug]/products/[slug]">) {
	const awaitedParams = await params;
	const product = await getPublicStorefrontProduct(
		awaitedParams.store_slug,
		awaitedParams.slug,
	);
	const recommendedProducts = await getPublicStorefrontProducts(
		awaitedParams.store_slug,
	);
	const currency = await getPublicStoreFrontCurrency(awaitedParams.store_slug);
	const currencyInfo = CURRENCY_INFO[currency ?? "USD"];

	// if not found return notfound page
	if (!product) {
		notFound();
	}

	return (
		<>
			<section className="grid gap-10 md:grid-cols-2 lg:gap-16">
				{/* Preview image */}
				<StoreFrondProductImagePreview product={product} />
				{/* Product Details */}
				<div className="flex flex-col gap-6">
					<div className="space-y-2">
						<h1 className="font-semibold text-4xl tracking-tight text-foreground">
							{product.name}
						</h1>
						<div className="flex items-center gap-4">
							<div className="flex items-baseline gap-2">
								<span className="font-semibold text-3xl">
									{formatPrice({
										locale: currencyInfo.locale,
										currency: currencyInfo.code,
										price: product.price,
									})}
								</span>
								{product.compare_at && product.compare_at > product.price && (
									<span className="text-lg text-muted-foreground line-through decoration-red-300">
										{formatPrice({
											locale: currencyInfo.locale,
											currency: currencyInfo.code,
											price: product.compare_at,
										})}
									</span>
								)}
							</div>
							{product.compare_at && product.compare_at > product.price && (
								<span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground text-xs">
									Save{" "}
									{formatPrice({
										locale: currencyInfo.locale,
										currency: currencyInfo.code,
										price: product.compare_at - product.price,
									})}
								</span>
							)}
						</div>
					</div>

					<div className="h-px w-full bg-border" />

					<div className="space-y-4">
						<p className="text-base text-muted-foreground leading-relaxed">
							{product.description}
						</p>

						<div className="flex flex-col gap-2 text-sm">
							{product.sku && (
								<div className="flex items-center gap-2 text-muted-foreground">
									<span className="font-medium text-foreground">SKU:</span>
									{product.sku}
								</div>
							)}
							{product.stock !== null && (
								<div className="flex items-center gap-2">
									<span className="font-medium text-foreground">
										Availability:
									</span>
									{product.stock > 0 ? (
										<span className="flex items-center gap-1.5 text-foreground">
											<span className="h-1.5 w-1.5 rounded-full bg-foreground" />
											In Stock {product.stock < 10 && `(${product.stock} left)`}
										</span>
									) : (
										<span className="flex items-center gap-1.5 text-muted-foreground">
											<span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
											Out of Stock
										</span>
									)}
								</div>
							)}
						</div>
					</div>

					<div className="mt-4">
						<StoreFrontAddToCart
							className="w-full rounded-full py-6 text-lg"
							isOutOfStock={product.stock === 0}
							product={{
								id: product.id,
								name: product.name,
								price: product.price,
								image: product.images[0],
								quantity: 1,
							}}
						/>
					</div>
				</div>
			</section>

			<div className="my-16" />
			<div className="space-y-8">
				<h3 className="text-2xl">You May Also Like</h3>
				<StoreFrontProductList
					dense
					products={shuffleArray(recommendedProducts).slice(
						0,
						RECOMMENDED_PRODUCTS_LIMIT,
					)}
					currency={currency ?? "USD"}
				/>
			</div>
		</>
	);
}
