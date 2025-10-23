import { Metadata } from "next"
import { DashboardHeader, DashboardLayout, DashboardTitle } from "@/components/layout/dashboard/layout"
import { OrdersPrimaryButtons } from "@/components/molecules/primary-buttons/orders"
import OrdersTable from "@/components/organisms/tables/orders-table"
import { getDashboardOrders } from "@/db/actions/dashboard/orders/actions"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Orders",
  description: "Manage your orders in the dashboard.",
}

export default async function ProductsPage() {
  const { data } = await getDashboardOrders();
  if (!data) notFound();

  return (
    <DashboardLayout>
      <DashboardHeader>
        <DashboardTitle title="Orders" description="Here you can manage all your products."/>
        <OrdersPrimaryButtons />
      </DashboardHeader>
      <OrdersTable orders={data} />
    </DashboardLayout>
  )
}