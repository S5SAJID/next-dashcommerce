"use client";
import DataTable from "@/components/molecules/data-table";
import { order_columns } from "./columns";
import type { DashboardOrder } from "./data";
import { DashboardUsable } from "@/lib/shared/types/dashboard-types";
import { use } from "react";

type OrdersTableProps = {
	ordersDataPromise: DashboardUsable<DashboardOrder[]>;
};

export default function OrdersTable({ ordersDataPromise }: OrdersTableProps) {
	const orders = use(ordersDataPromise);

	return (
		<DataTable
			columns={order_columns}
			data={orders.data}
			toolbar={{
				searchColumn: "orderId",
				searchPlaceholder: "Filter order IDs...",
				filters: [
					{
						columnName: "status",
						title: "Status",
						options: [
							{ label: "Delivered", value: "DELIVERED" },
							{ label: "Processing", value: "PROCESSING" },
							{ label: "Shipped", value: "SHIPPED" },
							{ label: "Pending", value: "PENDING" },
							{ label: "Cancelled", value: "CANCELLED" },
						],
					},
				],
			}}
		/>
	);
}
