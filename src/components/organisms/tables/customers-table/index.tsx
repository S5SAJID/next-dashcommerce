import DataTable from "@/components/molecules/data-table";
import { customers_columns } from "./columns";
import { getDashboardCustomers } from "@/db/actions/dashboard/customers/actions";

export default async function CustomersTable() {
	const customers = await getDashboardCustomers();

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
