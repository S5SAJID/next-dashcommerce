import { Metadata } from "next"
import { DashboardHeader, DashboardLayout, DashboardTitle } from "@/components/layout/dashboard/layout"
import { OrdersPrimaryButtons } from "@/components/molecules/primary-buttons/orders"
import OrdersTable from "@/components/organisms/tables/orders-table"

export const metadata: Metadata = {
  title: "Orders",
  description: "Manage your orders in the dashboard.",
}

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <DashboardHeader>
        <DashboardTitle title="Orders" description="Here you can manage all your products."/>
        <OrdersPrimaryButtons />
      </DashboardHeader>
      <OrdersTable />
    </DashboardLayout>
  )
}