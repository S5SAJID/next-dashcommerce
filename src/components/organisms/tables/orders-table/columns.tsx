import type { ColumnDef } from "@tanstack/react-table";
import type { DashboardOrder } from "./data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/molecules/data-table/data-table-column-header";
import OrderTableRowActions from "./row-actions";
import { useDashboardStoreInfo } from "@/lib/context/dashboard/store-context-provider";
import { formatDashboardPrice } from "@/lib/shared/utils/format-dashboard-price";

export const order_columns: ColumnDef<DashboardOrder>[] = [
	{
		accessorKey: "orderId",
		header: "Order ID",
		cell: ({ row }) => (
			<Link
				className="hover:underline"
				href={`/orders/${row.original.orderId}`}
				key={row.id}
			>
				<span className="text-muted-foreground">#</span>
				<span>{row.original.orderId.toUpperCase().slice(0, 6)}</span>
			</Link>
		),
	},
	{
		accessorKey: "customerName",
		header: "Customer",
		cell: ({ row }) => (
			<div>
				<h4>{row.original.customerName}</h4>
				<p className="text-muted-foreground text-xs">
					{row.original.customerEmail}
				</p>
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const value = row.original.status;
			const badgeVariant = value === "SHIPPED" ? "secondary" : "outline";
			let indicator;

			switch (value) {
				case "PENDING":
					indicator = (
						<div className="size-1 rounded-full bg-amber-500 dark:bg-amber-400" />
					);
					break;
				case "DELIVERED":
					indicator = (
						<div className="size-1 rounded-full bg-emerald-500 dark:bg-emerald-400" />
					);
					break;
				case "PROCESSING":
					indicator = (
						<div className="size-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
					);
					break;
				case "SHIPPED":
					indicator = (
						<div className="size-1 rounded-full bg-blue-500 dark:bg-blue-400" />
					);
					break;
				default:
					indicator = (
						<div className="size-1 rounded-full bg-muted-foreground" />
					);
					break;
			}

			return (
				<Badge className="capitalize" variant={badgeVariant}>
					{indicator}
					<span>{row.getValue("status")}</span>
				</Badge>
			);
		},
	},
	{
		accessorKey: "totalAmount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Total Amount" />
		),
		cell: ({ row }) => {
			return formatDashboardPrice({
				price: row.getValue("totalAmount"),
			});
		},
	},
	{
		accessorKey: "itemCount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Products" />
		),
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => {
			const format = Intl.DateTimeFormat(undefined, {
				dateStyle: "medium",
			}).format(row.original.createdAt);
			return <span>{format}</span>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <OrderTableRowActions order={row.original} />,
	},
];
