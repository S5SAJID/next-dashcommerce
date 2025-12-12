"use client";
import DataTable from "@/components/molecules/data-table";
import { customers_columns } from "./columns";
import type { CustomersType } from "./columns";
import { DashboardUsable } from "@/lib/shared/types/dashboard-types";
import { use } from "react";

export default function CustomersTable({
	customersDataPromise,
}: {
	customersDataPromise: DashboardUsable<CustomersType[]>;
}) {
	const customers = use(customersDataPromise);

	return (
		<DataTable
			columns={customers_columns}
			data={customers.data}
			toolbar={{
				searchColumn: "name",
				searchPlaceholder: "Filter customer names...",
			}}
		/>
	);
}
