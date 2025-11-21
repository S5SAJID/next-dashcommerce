"use client";
import DataTable from "@/components/molecules/data-table";
import { customers_columns } from "./columns";
import type { CustomersType } from "./columns";

export default function CustomersTable({ data }: { data: CustomersType[] }) {
	return (
		<DataTable
			columns={customers_columns}
			data={data}
			toolbar={{
				searchColumn: "name",
				searchPlaceholder: "Filter customer names...",
			}}
		/>
	);
}
