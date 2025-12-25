import { FormPageLoadingSkeleton } from "@/components/layout/dashboard/form-page/loading-skeleton";
import { FormPageLayout } from "@/components/layout/form-page-layout/layout";
import ProductDetailsForm from "@/components/organisms/forms/dashboard/products/product-details";
import { getDashboardProduct } from "@/db/actions/dashboard/products/actions";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Product details",
	description: "here you can see details of a specific product",
};

type ProductDetailsPageProps = {
	params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({
	params,
}: ProductDetailsPageProps) {
	return (
		<FormPageLayout>
			<Suspense fallback={<FormPageLoadingSkeleton />}>
				<ProductDetailsPageInner params={params} />
			</Suspense>
		</FormPageLayout>
	);
}

export async function ProductDetailsPageInner({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	const product = await getDashboardProduct({ slug });

	if (!product.data) {
		return notFound();
	}

	return <ProductDetailsForm product={product.data} />;
}
