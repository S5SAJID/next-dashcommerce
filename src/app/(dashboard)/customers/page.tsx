import {
	DashboardHeader,
	DashboardLayout,
	DashboardTitle,
} from "@/components/layout/dashboard/layout";
import { CustomersPrimaryButtons } from "@/components/molecules/primary-buttons/customers";
import CustomersTable from "@/components/organisms/tables/customers-table";
import { getDashboardCustomers } from "@/db/actions/dashboard/customers/actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Customers",
	description: "Manage your all your customers.",
};

export default async function CustomersPage() {
	const { data } = await getDashboardCustomers();

	return (
		<DashboardLayout>
			<DashboardHeader>
				<DashboardTitle
					description="Manage your all your customers."
					title="Customers"
				/>
				<CustomersPrimaryButtons />
			</DashboardHeader>
			<CustomersTable data={data || []} />
		</DashboardLayout>
	);
}
