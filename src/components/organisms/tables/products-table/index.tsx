"use client";
import DataTable from "@/components/molecules/data-table";
import { product_columns } from "./columns";
import { DataTableToolbarFilters } from "@/components/molecules/data-table/data-table-toolbar";
import { useQuery } from "@tanstack/react-query";
import { getDashboardProducts } from "@/db/actions/dashboard/products/actions";


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

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => getDashboardProducts(),
  })

  if (productsQuery.isError) {
    return <div className="w-full rounded border flex items-center justify-center h-[60vh]">
      <pre className="text-destructive">{productsQuery.error.name}</pre>
    </div>
  }

  return (
    <div>
      <DataTable
        columns={product_columns}
        toolbar={{
          searchColumn: "name",
          searchPlaceholder: "Filter products...",
          filters: filters,
        }}
        data={productsQuery.data}
        isLoading={productsQuery.isLoading}
      />
    </div>
  )
}