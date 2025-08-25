"use client"
import DataTable from "@/components/molecules/data-table";
import { customers_columns } from "./columns";
import { customers } from "./data";

export default function CustomersTable() {
  return (
    <DataTable 
      columns={customers_columns}
      data={customers}
      toolbar={{
        searchColumn: "name",
        searchPlaceholder: "Filter customer names...",
      }}
    />
  )
}