"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./data";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const product_columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      return (
        <div className="space-x-4 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={row.original.img} alt={row.getValue("name")} className="h-8 w-8 rounded-md" />
          <Link href={`products/details`} className="hover:underline">{row.getValue("name")}</Link>
        </div>
      );
    }
  },
  {
    accessorKey: "collection",
    header: "Collection",
    cell: ({ row }) => {
      const data = row.original;
      if (!data.collections) {
        return <span className="text-muted-foreground">No collection</span>;
      }

      return (
        <Link href={`#${data.collections[0]}`} className="capitalize hover:underline">
          {data.collections[0]}
        </Link>
      );
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status");
      const isActive = value === "active";
      const badgeVariant = isActive ? "secondary" : "outline";

      return (
        <Badge variant={badgeVariant}>
          {isActive && <div className="bg-green-500 size-1 rounded-full dark:bg-green-400" />}
          <span>{row.getValue("status")}</span>
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
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View product details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },

]