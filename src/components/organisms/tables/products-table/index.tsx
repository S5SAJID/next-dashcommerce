"use client";
import DataTable from "@/components/molecules/data-table";
import { products } from "./data";
import { product_columns } from "./columns";
import { DataTableToolbarFilters } from "@/components/molecules/data-table/data-table-toolbar";


export default function ProductsTable() {
  const filters: DataTableToolbarFilters[] = [
    {
      columnName: "status",
      title: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];
  return (
    <div>
      <DataTable
        columns={product_columns}
        toolbar={{
          searchColumn: "name",
          searchPlaceholder: "Filter products...",
          filters: filters,
        }}
        data={products}
      />
    </div>
  )
}