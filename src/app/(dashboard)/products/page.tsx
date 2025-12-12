import {
	DashboardHeader,
	DashboardLayout,
	DashboardTitle,
} from "@/components/layout/dashboard/layout";
import { DataTableSkeleton } from "@/components/molecules/data-table/data-table-skeleton";
import { ProductsPrimaryButtons } from "@/components/molecules/primary-buttons/products";
import ProductsTable from "@/components/organisms/tables/products-table";
import { product_columns } from "@/components/organisms/tables/products-table/columns";
import { getDashboardProducts } from "@/db/actions/dashboard/products/actions";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Products",
	description: "Manage your products in the dashboard.",
};

export default async function ProductsPage() {
	const products = getDashboardProducts();
	return (
		<DashboardLayout>
			<DashboardHeader>
				<DashboardTitle
					description="Here you can manage all your products."
					title="Products"
				/>
				<ProductsPrimaryButtons />
			</DashboardHeader>
			<Suspense fallback={<DataTableSkeleton columnCount={5} />}>
				<ProductsTable productsPromise={products} />
			</Suspense>
		</DashboardLayout>
	);
}
