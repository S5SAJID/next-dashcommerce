import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import ProductFilters from "@/components/storefront/organisms/products/product-filters";
import { getPublicStorefrontProducts } from "@/db/actions/storefront/products/public/actionts";
import type { Metadata } from "next";
import {
	getPublicStoreFront,
	getPublicStoreFrontCurrency,
} from "@/db/actions/storefront/store/public/actionts";
import { applyCache, tags } from "@/lib/cache/cache-manager";
import { Suspense } from "react";
import { FullPageSpinner } from "@/components/storefront/molecules/full-page-spinner";

export const metadata: Metadata = {
	title: "All Products",
	description: "Explore all products.",
};

export default async function ProductsPage({
	params,
}: PageProps<"/store/[store_slug]/products">) {
	"use cache";

	const pageParams = await params;
	const storeSlug = pageParams.store_slug;
	const currency = await getPublicStoreFrontCurrency(pageParams.store_slug);
	const products = await getPublicStorefrontProducts(storeSlug);
	const store = await getPublicStoreFront(storeSlug);

	applyCache(
		tags.store(store.id),
		tags.storeProducts(store.id),
		tags.storeOrders(store.id),
	);

	return (
		<div className="container mx-auto space-y-6 py-8">
			<Suspense fallback={<FullPageSpinner />}>
				<ProductFilters totalCount={products.length} />
				<StoreFrontProductList
					products={products}
					currency={currency ?? "USD"}
				/>
			</Suspense>
		</div>
	);
}
