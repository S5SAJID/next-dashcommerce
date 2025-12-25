import {
	DashboardHeader,
	DashboardLayout,
	DashboardTitle,
} from "@/components/layout/dashboard/layout";
import { DataTableSkeleton } from "@/components/molecules/data-table/data-table-skeleton";
import { CustomersPrimaryButtons } from "@/components/molecules/primary-buttons/customers";
import CustomersTable from "@/components/organisms/tables/customers-table";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Customers",
	description: "Manage your all your customers.",
};

export default function CustomersPage() {
	return (
		<DashboardLayout>
			<DashboardHeader>
				<DashboardTitle
					description="Manage your all your customers."
					title="Customers"
				/>
				<CustomersPrimaryButtons />
			</DashboardHeader>
			<Suspense fallback={<DataTableSkeleton columnCount={6} />}>
				<CustomersTable />
			</Suspense>
		</DashboardLayout>
	);
}
