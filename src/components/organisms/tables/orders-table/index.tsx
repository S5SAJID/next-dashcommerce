"use client";
import DataTable from "@/components/molecules/data-table";
import { order_columns } from "./columns";
import { DashboardOrder } from "./data";

export default function OrdersTable({
	orders = [],
}: {
	orders?: DashboardOrder[];
}) {
	return (
		<DataTable
			columns={order_columns}
			data={orders}
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
