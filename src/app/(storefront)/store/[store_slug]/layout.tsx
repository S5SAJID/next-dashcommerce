import { Suspense } from "react";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { getPublicStoreFront } from "@/db/actions/storefront/store/public/actionts";
import StoreFrontFooter from "@/components/storefront/organisms/footer";
import StoreFrontNavbar from "@/components/storefront/organisms/navbar";
import StoreFrontProviders from "@/providers/storefront/providers";
import CustomCode from "@/components/storefront/organisms/custom-code";
import { FullPageSpinner } from "@/components/storefront/molecules/full-page-spinner";
import { applyCache, tags } from "@/lib/cache/cache-manager";

const dmSans = DM_Sans({ subsets: ["latin"] });

type Props = {
	params: Promise<{ store_slug: string }>;
	children: React.ReactNode;
};

// Internal component to handle async data fetching
async function LayoutContent({ children, params }: Props) {
	const { store_slug } = await params;
	const store = await getPublicStoreFront(store_slug);

	if (!store) return notFound();

	applyCache(
		tags.store(store.id),
		tags.storeProducts(store.id),
		tags.storeOrders(store.id),
	);

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
		<div className={dmSans.className}>
			<Suspense fallback={<FullPageSpinner />}>
				<LayoutContent params={params}>{children}</LayoutContent>
			</Suspense>
		</div>
	);
}
