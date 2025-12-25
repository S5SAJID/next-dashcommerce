"use client";
import DataTable from "@/components/molecules/data-table";
import { customers_columns, CustomersType } from "./columns";

export default function CustomersTable({
	customers = [],
}: {
	customers?: CustomersType[];
}) {
	return (
		<DataTable
			columns={customers_columns}
			data={customers}
			toolbar={{
				searchColumn: "name",
				searchPlaceholder: "Filter customer names...",
			}}
		/>
	);
}
