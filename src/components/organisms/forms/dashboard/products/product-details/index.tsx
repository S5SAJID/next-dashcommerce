"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import { FormPageGridContainer, FormPageHeader, FormPageTitle } from "@/components/layout/form-page-layout/layout";
import { Button } from "@/components/ui/button";
import { product_details_form_schema, ProductDetailsFormType } from "./schema";
import { ProductDetailsFormRightSide } from "./right-side";
import { ProductDetailsFormLeftSide } from "./left-side";
import { updateDashboardProductDetails } from "@/db/actions/dashboard/products/actions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type ProductDetailsFormProps = {
  product: ProductDetailsFormType
}

export default function ProductDetailsForm({ product }: ProductDetailsFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<ProductDetailsFormType>({
    resolver: zodResolver(product_details_form_schema),
    defaultValues: product
  });

  const onSubmit = async (data: ProductDetailsFormType) => {
    toast.promise(updateDashboardProductDetails(data), {
      loading: "Upadting product...",
      success: async (data) => {
        if (data.success) {
          await queryClient.invalidateQueries({ queryKey: ['products'] })
          return "Product updated."
        }
        return "Product updating failed"
      },
      error: {
        message: "Product updating failed",
        description: "Product can't be updated. Please try again.",
      }
    })
  }

  const handleSubmit = form.handleSubmit(
    (data) => { console.log('VALID submit:', data); onSubmit(data); },
    (errors) => { console.log('Validation errors:', { errors }); }
  );


  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormPageHeader>
          <FormPageTitle enableBack title="Product Details" description="Here you can see details of a specific product." />
          <Button disabled={!form.formState.isDirty}>
            <span>Save Changes</span>
          </Button>
        </FormPageHeader>
        <FormPageGridContainer>
          <ProductDetailsFormLeftSide form={form} />
          <ProductDetailsFormRightSide form={form} />
        </FormPageGridContainer>
      </form>
    </Form>
  )
}