import { DashboardHeader, DashboardLayout, DashboardTitle } from "@/components/layout/dashboard/layout";
import { ProductsPrimaryButtons } from "@/components/molecules/primary-buttons/products";
import ProductsTable from "@/components/organisms/tables/products-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage your products in the dashboard.",
}

export default function ProductsPage() {
  return (
    <DashboardLayout>
      
      <DashboardHeader>
        <DashboardTitle title="Products" description="Here you can manage all your products."/>
        <ProductsPrimaryButtons />
      </DashboardHeader>

      <ProductsTable />
    </DashboardLayout>
  )
}