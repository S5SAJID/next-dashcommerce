import { FormPageLayout } from "@/components/layout/form-page-layout/layout";
import ProductForm from "@/components/organisms/forms/dashboard/products/product-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
  description: "here you can create your brand new product."
}

export default function ProductCreatePage() {
  return (
    <FormPageLayout>
      <ProductForm />
    </FormPageLayout>
  )
}