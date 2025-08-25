import { ColumnDef } from "@tanstack/react-table";
import { CustomersType } from "./data";
import { formatPrice } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/molecules/data-table/data-table-column-header";

export const customers_columns: ColumnDef<CustomersType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
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
    header: ({column}) => <DataTableColumnHeader title="Total Spent" column={column} />,
    cell: ({ row }) => (
      formatPrice({
        locale: 'en-US',
        price: row.getValue("total_spent"),
      })
    ),
  }
]