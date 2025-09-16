"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardProduct } from "@/db/actions/dashboard/products/types";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateDashboardProduct } from "@/db/actions/dashboard/products/actions";
import { dashboardQueryClient } from "@/lib/dashboardQueryClient";

export const product_columns: ColumnDef<DashboardProduct >[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      return (
        <div className="space-x-4 flex items-center">
          <Image width={50} height={50} src={row.original.images[0]} alt={row.getValue("name")} className="h-8 w-8 bg-muted rounded-md" />
          <Link href={`products/details`} className="hover:underline">{row.getValue("name")}</Link>
        </div>
      );
    }
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.original.is_published;
      const badgeVariant = isPublished ? "secondary" : "outline";

      return (
        <Badge variant={badgeVariant}>
          {isPublished && <div className="bg-green-500 size-1 rounded-full dark:bg-green-400" />}
          <span>{isPublished ? "Published" : "Draft"}</span>
        </Badge>
      );
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="text-right">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency"
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "stock",
    header: () => <span className="block text-right">Stock</span>,
    cell: ({row}) => <span className="text-right block">{row.getValue("stock")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.name)}
              >
                Copy product name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{product.is_published? "Change to draft" : "Change to published"}</DropdownMenuItem>
              <DropdownMenuItem>View product details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },

]