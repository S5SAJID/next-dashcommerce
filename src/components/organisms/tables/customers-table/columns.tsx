import { ColumnDef } from "@tanstack/react-table";
import { CustomersType } from "./data";
import { formatPrice } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/molecules/data-table/data-table-column-header";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

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
    header: ({ column }) => <DataTableColumnHeader title="Total Spent" column={column} />,
    cell: ({ row }) => (
      formatPrice({
        locale: 'en-US',
        price: row.getValue("total_spent"),
      })
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original

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
                onClick={() => navigator.clipboard.writeText(customer.email)}
              >
                Copy email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.phone ?? "no phone number")} >
                Copy phone
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]