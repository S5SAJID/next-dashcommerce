import type { Metadata } from "next";
import {
	DashboardHeader,
	DashboardLayout,
	DashboardTitle,
} from "@/components/layout/dashboard/layout";
import { OrdersPrimaryButtons } from "@/components/molecules/primary-buttons/orders";
import OrdersTable from "@/components/organisms/tables/orders-table";
import { getDashboardOrders } from "@/db/actions/dashboard/orders/actions";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/molecules/data-table/data-table-skeleton";

export const metadata: Metadata = {
	title: "Orders",
	description: "Manage your orders in the dashboard.",
};

export default function OrdersPage() {
	const ordersDataPromise = getDashboardOrders();

	return (
		<DashboardLayout>
			<DashboardHeader>
				<DashboardTitle
					description="Here you can manage all your products."
					title="Orders"
				/>
				<OrdersPrimaryButtons />
			</DashboardHeader>
			<Suspense fallback={<DataTableSkeleton columnCount={6} />}>
				<OrdersTable ordersDataPromise={ordersDataPromise} />
			</Suspense>
		</DashboardLayout>
	);
}
