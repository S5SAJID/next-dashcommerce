import { ColumnDef } from "@tanstack/react-table";
import { DashboardOrder } from "./data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/molecules/data-table/data-table-column-header";
import OrderTableRowActions from "./row-actions";

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
      let indicator;

      switch (value) {
        case "PENDING":
          indicator = <div className="bg-amber-500 size-1 rounded-full dark:bg-amber-400" />
          break;
        case "DELIVERED":
          indicator = <div className="bg-emerald-500 size-1 rounded-full dark:bg-emerald-400" />
          break;
        case "PROCESSING":
          indicator = <div className="bg-indigo-500 size-1 rounded-full dark:bg-indigo-400" />
          break;
        case "SHIPPED":
          indicator = <div className="bg-blue-500 size-1 rounded-full dark:bg-blue-400" />
          break;
        default:
          indicator = <div className="bg-muted-foreground size-1 rounded-full" />
          break;
      }

      return (
        <Badge variant={badgeVariant} className="capitalize">
          {indicator}
          <span>{row.getValue("status")}</span>
        </Badge>
      );
    }
  },
  {
    accessorKey: "totalAmount",
    header: ({column}) => <DataTableColumnHeader title="Total Amount" column={column}/>,
    cell: ({ row }) => (
      formatPrice({
        locale: 'en-US',
        price: row.getValue("totalAmount"),
      })
    ),
  },
  {
    accessorKey: "itemCount",
    header: ({column}) => <DataTableColumnHeader title="Products" column={column}/>,
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
    cell: ({ row }) => <OrderTableRowActions order={row.original} />,
  },
]