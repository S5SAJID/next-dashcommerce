"use client";
import DataTable from "@/components/molecules/data-table";
import { product_columns } from "./columns";
import type { DataTableToolbarFilters } from "@/components/molecules/data-table/data-table-toolbar";
import type { DashboardProduct } from "@/db/actions/dashboard/products/types";
import { use } from "react";
import { DashboardUsable } from "@/lib/shared/types/dashboard-types";

export default function ProductsTable({
	productsPromise,
}: {
	productsPromise: DashboardUsable<DashboardProduct[]>;
}) {
	const products = use(productsPromise);

	const filters: DataTableToolbarFilters[] = [
		{
			columnName: "status",
			title: "Status",
			options: [
				{ label: "Active", value: "active" },
				{ label: "Inactive", value: "inactive" },
			],
		},
	];

	return (
		<div>
			<DataTable
				columns={product_columns}
				data={products.data}
				toolbar={{
					searchColumn: "name",
					searchPlaceholder: "Filter products...",
					filters,
				}}
			/>
		</div>
	);
}
