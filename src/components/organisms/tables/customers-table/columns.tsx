import type { ColumnDef } from "@tanstack/react-table";
import { formatPrice } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/molecules/data-table/data-table-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { formatDashboardPrice } from "@/lib/shared/utils/format-dashboard-price";

export type CustomersType = {
	id: string;
	name: string;
	email: string;
	phone: string;
	created_at: Date;
	orders: number;
	total_spent: number;
};

export const customers_columns: ColumnDef<CustomersType>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue("name")}</div>
		),
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		accessorKey: "orders",
		header: "Orders",
	},
	{
		accessorKey: "total_spent",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Total Spent" />
		),
		cell: ({ row }) =>
			formatDashboardPrice({
				price: row.getValue("total_spent"),
			}),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const customer = row.original;

			return (
				<div className="flex justify-end">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="h-8 w-8 p-0" variant="ghost">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(customer.email)}
							>
								Copy email
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() =>
									navigator.clipboard.writeText(
										customer.phone ?? "no phone number",
									)
								}
							>
								Copy phone
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
