import { ColumnDef } from "@tanstack/react-table";
import { Order } from "./data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Loader, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const order_columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <a href="#" key={row.id} className="hover:underline">
      <span className="text-muted-foreground">#</span><span>{row.getValue("id")}</span>
    </a>
  },
  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({row}) => {
      const order = row.original;
      return <div className="space-x-4 flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={order.product_img} alt={order.product_name} className="h-8 w-8 rounded-md" />
        <span>{order.product_name}</span>
      </div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status");
      const isActive = value === "done";
      const badgeVariant = isActive ? "secondary" : "outline";

      return (
        <Badge variant={badgeVariant} className="capitalize">
          {
            value == "done"
              ? <div className="bg-green-500 size-1 rounded-full dark:bg-green-400" />
              : value == "pending"
                ? <Loader className="stroke-muted-foreground" />
                : <div className="bg-muted-foreground size-1 rounded-full" />

          }
          <span>{row.getValue("status")}</span>
        </Badge>
      );
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatPrice({ price: row.original.price, locale: "en-US" })
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const format = Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(row.original.date)
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
                onClick={() => navigator.clipboard.writeText(order.id)}
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