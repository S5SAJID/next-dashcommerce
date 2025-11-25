import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import ProductFilters from "@/components/storefront/organisms/products/product-filters";
import { getPublicStorefrontProducts } from "@/db/actions/storefront/products/public/actionts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "All Products",
	description: "Explore all products.",
};

type Props = {
	params: Promise<{ store_slug: string }>;
};

export default async function ProductsPage({ params }: Props) {
	const storeSlug = (await params).store_slug;
	const products = await getPublicStorefrontProducts(storeSlug);

	return (
		<div className="container mx-auto space-y-6 py-8">
			<ProductFilters totalCount={products.length} />
			<StoreFrontProductList products={products} />
		</div>
	);
}
