import { DashboardLayout } from "@/components/layout/dashboard/layout";
import ProductForm from "@/components/organisms/forms/product-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
  description: "here you can create your brand new product."
}

export default function ProductCreatePage() {
  return (
    <DashboardLayout>
      <ProductForm />
    </DashboardLayout>
  )
}