"use client"
import DataTable from "@/components/molecules/data-table";
import { order_columns } from "./columns";
import { orders } from "./data";

export default function OrdersTable() {
  return (
    <DataTable columns={order_columns} data={orders}/>
  )
}