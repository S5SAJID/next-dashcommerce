import { ColumnDef } from "@tanstack/react-table";
import { Order } from "./data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export const order_columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({row}) => <a href="#" className="hover:underline">
      <span className="text-muted-foreground">#</span><span>{row.getValue("id")}</span>
    </a>
  },
  {
    accessorKey: "product_name",
    header: "Product"
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
                ? <Loader className="stroke-muted-foreground"/>
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
  }
]