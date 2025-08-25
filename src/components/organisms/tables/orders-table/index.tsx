"use client"
import DataTable from "@/components/molecules/data-table";
import { order_columns } from "./columns";
import { orders } from "./data";

export default function OrdersTable() {
  return (
    <DataTable 
      columns={order_columns} 
      data={orders}
      toolbar={{
        searchColumn: "id",
        searchPlaceholder: "Filter order IDs...",
        filters: [
          {
            columnName: 'status',
            title: "Status",
            options: [
              { label: "Done", value: "done" },
              { label: "Active", value: "active" },
              { label: "Pending", value: "pending" },
            ]
          }
        ]
      }}
    />
  )
}