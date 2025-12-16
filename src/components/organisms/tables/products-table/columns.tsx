"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { DashboardProduct } from "@/db/actions/dashboard/products/types";
import Image from "next/image";
import ProductTableRowActions from "./row-actions";
import { formatDashboardPrice } from "@/lib/shared/utils/format-dashboard-price";

export const product_columns: ColumnDef<DashboardProduct>[] = [
	{
		accessorKey: "name",
		header: "Product Name",
		cell: ({ row }) => (
			<div className="flex items-center space-x-4">
				<Image
					alt={row.getValue("name")}
					className="h-8 w-8 rounded-md bg-muted"
					height={50}
					src={row.original.images[0]}
					width={50}
				/>
				<Link
					className="hover:underline"
					href={`products/${row.original.slug}`}
				>
					{row.getValue("name")}
				</Link>
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const isPublished = row.original.is_published;
			const badgeVariant = isPublished ? "secondary" : "outline";

			return (
				<Badge variant={badgeVariant}>
					{isPublished && (
						<div className="size-1 rounded-full bg-green-500 dark:bg-green-400" />
					)}
					<span>{isPublished ? "Published" : "Draft"}</span>
				</Badge>
			);
		},
	},
	{
		accessorKey: "price",
		header: ({ column }) => (
			<div className="text-right">
				<Button
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					variant="ghost"
				>
					Price
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			</div>
		),
		cell: ({ row }) => {
			const formatedPrice = formatDashboardPrice({
				price: row.getValue("price"),
			});

			return <div className="text-right font-medium">{formatedPrice}</div>;
		},
	},
	{
		accessorKey: "stock",
		header: () => <span className="block text-right">Stock</span>,
		cell: ({ row }) => (
			<span className="block text-right">{row.getValue("stock")}</span>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <ProductTableRowActions product={row.original} />,
	},
];
