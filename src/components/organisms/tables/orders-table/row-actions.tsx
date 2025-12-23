import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { DashboardOrder } from "./data";
import Link from "next/link";

export default function OrderTableRowActions({
	order,
}: {
	order: DashboardOrder;
}) {
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
						onClick={() => navigator.clipboard.writeText(order.orderId)}
					>
						Copy product id
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					{/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
					<DropdownMenuItem>
						<Link href={`orders/${order.orderId}`}>View order details</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
