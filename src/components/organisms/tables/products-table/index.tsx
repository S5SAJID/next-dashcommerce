import DataTable from "@/components/molecules/data-table";
import { product_columns } from "./columns";
import type { DataTableToolbarFilters } from "@/components/molecules/data-table/data-table-toolbar";
import { getDashboardProducts } from "@/db/actions/dashboard/products/actions";

export default async function ProductsTable() {
	const products = await getDashboardProducts();

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
