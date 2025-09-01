"use client";
import { useForm } from "react-hook-form";
import { product_form_schema, ProductFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import CreateProductPrimaryButtons from "../../../../../molecules/primary-buttons/creation-primary-buttons/product-create";
import { CheckCircle2, Loader } from "lucide-react";
import { FormPageGridContainer, FormPageHeader, FormPageTitle } from "@/components/layout/form-page-layout/layout";
import { ProductFormLeftSide } from "./left-side";
import { ProductFormRightSide } from "./right-side";
import { useRouter } from "@bprogress/next";

export default function ProductForm() {
  const router = useRouter();
  const form = useForm<ProductFormType>({
    resolver: zodResolver(product_form_schema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: undefined,
      compare_at_price: undefined,
      category: "",
      stock_quantity: undefined,
      sku_code: "",
      images: [],
      status: ""
    }
  })

  const [images, setImages] = useState<File[]>([])
  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages)
    form.setValue("images", newImages)
    console.log(
      "Images updated:",
      newImages.map((img) => img.name),
    )
  }

  const onSubmit = async (data: ProductFormType) => {
    try {
      toast("Uploading images...", {
        description: `Uploading ${data.images.length} image(s)`,
        icon: <Loader className="size-4 fill-muted-foreground animate-spin" />,
        id: "create-product"
      })

      // fake laoder
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("")
        }, 2000)
      })

      toast("Product created successfully!", {
        description: `${data.name} has been created with ${data.images.length} images`,
        id: "create-product",
        icon: <CheckCircle2 className="size-4 fill-muted-foreground" />,
      })

      // navigate to product details page
      router.push("/products/details")
    } catch (error: unknown) {
      toast("Upload failed", {
        description: "There was an error uploading your images",
      })
      console.error({ error })
    }
  }


  const handleSubmit = form.handleSubmit(
    (data) => { console.log('VALID submit:', data); onSubmit(data); },
    (errors) => { console.log('Validation errors:', { errors }); }
  );
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormPageHeader>
          <FormPageTitle
            title="Create product"
            enableBack
            description="Fill the form to create your new product." />
          <CreateProductPrimaryButtons />
        </FormPageHeader>
        <FormPageGridContainer>
          <ProductFormLeftSide form={form} handleImagesChange={handleImagesChange} images={images} />
          <ProductFormRightSide form={form} />
        </FormPageGridContainer>
      </form>
    </Form>
  )
}

