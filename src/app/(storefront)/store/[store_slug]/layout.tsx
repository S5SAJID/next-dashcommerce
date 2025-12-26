import { Suspense } from "react";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { getPublicStoreFront } from "@/db/actions/storefront/store/public/actionts";
import StoreFrontFooter from "@/components/storefront/organisms/footer";
import StoreFrontNavbar from "@/components/storefront/organisms/navbar";
import StoreFrontProviders from "@/providers/storefront/providers";
import CustomCode from "@/components/storefront/organisms/custom-code";
import { FullPageSpinner } from "@/components/storefront/molecules/full-page-spinner";
import { Metadata } from "next";
import { db } from "@/db/db";
import { CartModalProvider } from "@/components/storefront/organisms/cart/context/cart-context";

const dmSans = DM_Sans({ subsets: ["latin"] });

type Props = {
	params: Promise<{ store_slug: string }>;
	children: React.ReactNode;
};

export async function generateStaticParams() {
	const stores = await db.query.StoreTable.findMany({
		columns: { domain: true },
	});

	return stores.map((store) => {
		return {
			store_slug: store.domain,
		};
	});
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const storeSlug = (await params).store_slug;
	const store = await getPublicStoreFront(storeSlug);
	if (!store) {
		return notFound();
	}

	return {
		title: {
			template: `%s | ${store.name}`,
			default: store.settings.seo.title,
		},
		description: store.settings.seo.description,
		keywords: store.settings.seo.tags,
		icons: [{ url: "/store-favico.svg" }],
	};
}

// Internal component to handle async data fetching
async function LayoutContent({ children, params }: Props) {
	const { store_slug } = await params;
	const store = await getPublicStoreFront(store_slug);

	if (!store) return notFound();

	return (
		<StoreFrontProviders currency={store.currency}>
			<StoreFrontNavbar store={store} />
			<CustomCode customHeadCode={store.settings.customHeadCode} />
			<main className="mx-auto min-h-[70dvh] w-full max-w-7xl px-4 pt-2 pb-6 sm:px-6 lg:px-8">
				{children}
			</main>
			<StoreFrontFooter store={store} />
		</StoreFrontProviders>
	);
}

export default function Layout({ children, params }: Props) {
	// Return the static shell immediately
	return (
		<div className={`${dmSans.className} min-h-dvh`}>
			<Suspense fallback={null}>
				<LayoutContent params={params}>{children}</LayoutContent>
			</Suspense>
		</div>
	);
}
