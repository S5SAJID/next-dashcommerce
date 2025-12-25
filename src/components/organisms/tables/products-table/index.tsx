"use client";
import DataTable from "@/components/molecules/data-table";
import { product_columns } from "./columns";
import type { DataTableToolbarFilters } from "@/components/molecules/data-table/data-table-toolbar";
import { DashboardProduct } from "@/db/actions/dashboard/products/types";

export default function ProductsTable({
	products = [],
}: {
	products?: DashboardProduct[];
}) {
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
				data={products}
				toolbar={{
					searchColumn: "name",
					searchPlaceholder: "Filter products...",
					filters,
				}}
			/>
		</div>
	);
}
