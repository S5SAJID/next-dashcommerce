import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
	getPublicStoreFront,
	getPublicStoreFrontCurrency,
} from "@/db/actions/storefront/store/public/actionts";
import { getPublicStorefrontProducts } from "@/db/actions/storefront/products/public/actionts";
import StoreFrontHero from "@/components/storefront/organisms/hero";
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import { FullPageSpinner } from "@/components/storefront/molecules/full-page-spinner";

const HOMEPAGE_PRODUCTS_LIMIT = 11;

async function StoreFrontContent({
	params,
}: {
	params: Promise<{ store_slug: string }>;
}) {
	const { store_slug } = await params;
	const store = await getPublicStoreFront(store_slug);

	if (!store) return notFound();

	const [products, currency] = await Promise.all([
		getPublicStorefrontProducts(store_slug),
		getPublicStoreFrontCurrency(store_slug),
	]);

	return (
		<>
			<StoreFrontHero
				cta={{
					link: store.settings.heroSection.ctaLink,
					text: store.settings.heroSection.ctaText,
					target:
						store.settings.heroSection.ctaTarget === "_blank"
							? "_blank"
							: "self",
				}}
				description={store.settings.heroSection.description}
				image={{ url: store.settings.heroSection.image, alt: "hero image" }}
				title={store.settings.heroSection.title}
			/>
			{products.length === 0 ? (
				<div className="p-12 flex items-center justify-center">
					<p>No products found. We’re currently adding our product line.</p>
				</div>
			) : (
				<StoreFrontProductList
					products={products.slice(0, HOMEPAGE_PRODUCTS_LIMIT)}
					currency={currency ?? "USD"}
				/>
			)}
		</>
	);
}

export default function StoreFrontPage({
	params,
}: {
	params: Promise<{ store_slug: string }>;
}) {
	return (
		<main className="space-y-4">
			<Suspense fallback={<FullPageSpinner />}>
				<StoreFrontContent params={params} />
			</Suspense>
		</main>
	);
}
