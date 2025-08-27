"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { product_form_schema, ProductFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ImageUploader } from "@/components/organisms/image-uploader";
import { useState } from "react";
import { toast } from "sonner";
import CreateProductPrimaryButtons from "../../../molecules/primary-buttons/creation-primary-buttons/product-create";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import z from "zod";
import { CheckCircle2, Loader } from "lucide-react";
import { FormPageGridContainer, FormPageGridPrimary, FormPageGridSecondary, FormPageHeader, FormPageTitle } from "@/components/layout/form-page-layout/layout";

export default function ProductForm() {
  const form = useForm<z.infer<typeof product_form_schema>>({
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

      // Reset form after successful submission
      // form.reset()
      // setImages([])
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
          <FormPageGridPrimary>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Classic T-shirt" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="classic-t-shirt" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-32" placeholder="Product description..." {...field} />
                    </FormControl>
                    <FormDescription>Set a description to the product for better visibility.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploader
                images={images}
                onImagesChange={handleImagesChange}
              />
            </CardContent>
          </FormPageGridPrimary>
          <FormPageGridSecondary>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={() => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="400"
                          type="number"
                          {...form.register("price", { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="compare_at_price"
                  render={() => (
                    <FormItem>
                      <FormLabel>Compare at price</FormLabel>
                      <FormControl>
                        <Input placeholder="300" {...form.register("compare_at_price", { valueAsNumber: true })} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle>Invertory</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <FormField
                control={form.control}
                name="stock_quantity"
                render={() => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="50" {...form.register("stock_quantity", { valueAsNumber: true })} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sku_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="3A-E00-2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle>Other</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Product status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="Beauty">Beauty</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </FormPageGridSecondary>
        </FormPageGridContainer>
      </form>
    </Form>
  )
}

/*     <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="name">Name</Label>
              <Input placeholder="Name"/>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-none">

          </Card>
        </div>
      </div>
      */