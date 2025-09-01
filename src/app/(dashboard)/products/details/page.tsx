import { FormPageLayout } from "@/components/layout/form-page-layout/layout";
import ProductDetailsForm from "@/components/organisms/forms/dashboard/products/product-details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product details",
  description: "here you can see details of a specific product"
}

export default function ProductDetailsPage() {
  return (
    <FormPageLayout>
      <ProductDetailsForm />
    </FormPageLayout>
  )
}