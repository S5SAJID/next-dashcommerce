import { DashboardHeader, DashboardLayout, DashboardTitle } from "@/components/layout/dashboard/layout";
import ProductForm from "@/components/molecules/forms/product-form";
import CreateProductPrimaryButtons from "@/components/molecules/primary-buttons/creation-primary-buttons/product-create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
  description: "here you can create your brand new product."
}

export default function ProductCreatePage() {
  return (
    <DashboardLayout>
      <DashboardHeader>
        <DashboardTitle
          title="Create product"
          enableBack
          description="Fill the form to create your new product." />
        <CreateProductPrimaryButtons />
      </DashboardHeader>
      <ProductForm />
    </DashboardLayout>
  )
}