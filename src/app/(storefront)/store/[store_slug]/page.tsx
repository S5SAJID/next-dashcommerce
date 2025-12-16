import StoreFrontHero from "@/components/storefront/organisms/hero";
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import { getPublicStorefrontProducts } from "@/db/actions/storefront/products/public/actionts";
import {
	getPublicStoreFront,
	getPublicStoreFrontCurrency,
} from "@/db/actions/storefront/store/public/actionts";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ store_slug: string }>;
};

const HOMEPAGE_PRODUCTS_LIMIT = 11;

export default async function StoreFrontPage({ params }: Props) {
	const storeSlug = (await params).store_slug;
	const store = await getPublicStoreFront(storeSlug);

	const products = await getPublicStorefrontProducts(storeSlug);
	const currency = await getPublicStoreFrontCurrency(storeSlug);

	if (!store) {
		return notFound();
	}
	return (
		<main className="space-y-4">
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
				image={{
					url: store.settings.heroSection.image,
					alt: "hero image",
				}}
				title={store.settings.heroSection.title}
			/>
			{products.length === 0 && (
				<div className="p-12 flex items-center justify-center">
					<p>No products found, We’re currently adding our product line.</p>
				</div>
			)}
			<StoreFrontProductList
				products={products.slice(0, HOMEPAGE_PRODUCTS_LIMIT)}
				currency={currency ?? "USD"}
			/>
		</main>
	);
}
