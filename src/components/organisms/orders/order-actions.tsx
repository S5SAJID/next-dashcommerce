"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateOrderStatus } from "@/db/actions/dashboard/orders/actions";
import { useAction } from "next-safe-action/hooks";
import { CircleX, Loader, Truck } from "lucide-react";
import { toast } from "sonner";

interface OrderActionsProps {
	orderId: string;
	currentStatus:
		| "PENDING"
		| "PROCESSING"
		| "SHIPPED"
		| "DELIVERED"
		| "CANCELLED";
}

export default function OrderActions({
	orderId,
	currentStatus,
}: OrderActionsProps) {
	const { execute, isExecuting } = useAction(updateOrderStatus, {
		onSuccess: () => {
			toast.success("Order status updated");
		},
		onError: ({ error }) => {
			toast.error(error.serverError || "Failed to update status");
		},
	});

	const handleStatusUpdate = (
		status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED",
	) => {
		execute({ orderId, status });
	};

	return (
		<div className="flex items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button disabled={isExecuting} variant="outline">
						Update status
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Set status</DropdownMenuLabel>
					<DropdownMenuItem
						disabled={currentStatus === "PROCESSING"}
						onClick={() => handleStatusUpdate("PROCESSING")}
					>
						<Loader className="mr-2 h-4 w-4 text-muted-foreground" /> Processing
					</DropdownMenuItem>
					<DropdownMenuItem
						disabled={currentStatus === "SHIPPED"}
						onClick={() => handleStatusUpdate("SHIPPED")}
					>
						<Truck className="mr-2 h-4 w-4 text-blue-500" /> Fulfilled
					</DropdownMenuItem>
					<DropdownMenuItem
						disabled={currentStatus === "CANCELLED"}
						onClick={() => handleStatusUpdate("CANCELLED")}
					>
						<CircleX className="mr-2 h-4 w-4 text-red-500" /> Cancelled
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{currentStatus !== "DELIVERED" && (
				<Button
					disabled={isExecuting}
					onClick={() => handleStatusUpdate("DELIVERED")}
				>
					<span>Mark Delivered</span>
				</Button>
			)}
		</div>
	);
}
