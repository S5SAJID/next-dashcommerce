import { ColumnDef } from "@tanstack/react-table";
import { DashboardOrder } from "./data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Loader, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const order_columns: ColumnDef<DashboardOrder>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => <Link href={`/orders/`+row.original.orderId} key={row.id} className="hover:underline">
      <span className="text-muted-foreground">#</span><span>{row.original.orderId.toUpperCase().slice(0,6)}</span>
    </Link>
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      return <div>
        <h4>{row.original.customerName}</h4>
        <p className="text-muted-foreground text-xs">{row.original.customerEmail}</p>
      </div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.original.status;
      const badgeVariant = value == "SHIPPED" ? "secondary" : "outline";

      return (
        <Badge variant={badgeVariant} className="capitalize">
          {
            value == "DELIVERED"
              ? <div className="bg-green-500 size-1 rounded-full dark:bg-green-400" />
              : value == "PENDING"
                ? <Loader className="stroke-muted-foreground" />
                : <div className="bg-muted-foreground size-1 rounded-full" />

          }
          <span>{row.getValue("status")}</span>
        </Badge>
      );
    }
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => formatPrice({ price: row.original.totalAmount, locale: "en-US" })
  },
  {
    accessorKey: "itemCount",
    header: "Products",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const format = Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(row.original.createdAt)
      return <span>{format}</span>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original

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
                onClick={() => navigator.clipboard.writeText(order.orderId)}
              >
                Copy product id
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View order details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]