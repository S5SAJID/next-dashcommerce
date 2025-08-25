import { ColumnDef } from "@tanstack/react-table";
import { CustomersType } from "./data";
import { extractCountryCode, formatPrice } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/molecules/data-table/data-table-column-header";
import Flag from 'react-flagpack'

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
    cell: ({ row }) => {
      const countryCode = extractCountryCode(row.original.phone!);
      if (!countryCode) return row.original.phone;
      const flag = <Flag code={countryCode} />;
      if (!flag) return row.original.phone;
      return (
        <div className="flex space-x-4">
          {flag} <span>{row.original.phone}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "orders",
    header: "Orders",
  },
  {
    accessorKey: "total_spent",
    header: ({ column }) => <DataTableColumnHeader title="Total Spent" column={column} />,
    cell: ({ row }) => (
      formatPrice({
        locale: 'en-US',
        price: row.getValue("total_spent"),
      })
    ),
  }
]