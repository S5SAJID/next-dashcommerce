"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import { FormPageGridContainer, FormPageHeader, FormPageTitle } from "@/components/layout/form-page-layout/layout";
import { product_form_schema, ProductFormType } from "../product-form/schema";
import { Button } from "@/components/ui/button";
import { ProductFormRightSide } from "@/components/organisms/forms/dashboard/products/product-form/right-side";
import { ProductFormLeftSide } from "@/components/organisms/forms/dashboard/products/product-form/left-side";

const DEMO_PRODUCT: ProductFormType = {
  name: "Classic men jeans",
  description: "- Best Quality\n- International\- Global standard",
  category: "electronics",
  compare_at_price: 500,
  price: 700,
  images: [],
  slug: "classic-men-jeans",
  status: "active",
  sku_code: "2392-AU-2",
  stock_quantity: 20
}

export default function ProductDetailsForm() {

  const form = useForm<ProductFormType>({
    resolver: zodResolver(product_form_schema),
    defaultValues: DEMO_PRODUCT
  });

  return (
    <Form {...form}>
      <form onSubmit={() => alert("FORM SUBMITION NOT IMPLEMENTED YET.")}>
        <FormPageHeader>
          <FormPageTitle enableBack title="Product Details" description="Here you can see details of a specific product." />
          <Button disabled={!form.formState.isDirty}>
            <span>Save Changes</span>
          </Button>
        </FormPageHeader>
        <FormPageGridContainer>
          <ProductFormLeftSide
            form={form}
            images={[]}
            handleImagesChange={() => {}}
          />
          <ProductFormRightSide form={form}/>
        </FormPageGridContainer>
      </form>
    </Form>
  )
}