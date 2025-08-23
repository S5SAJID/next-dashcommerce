"use client";
import DataTable from "@/components/molecules/data-table";
import { products } from "./data";
import { product_columns } from "./columns";

export default function ProductsTable() {
  return (
     <div>
      <DataTable columns={product_columns} data={products}/>
     </div>
  )
}