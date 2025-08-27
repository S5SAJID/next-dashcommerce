import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductFormType } from "./schema";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ImageUploader } from "@/components/organisms/image-uploader";
import { FormPageGridPrimary } from "@/components/layout/form-page-layout/layout";
import { UseFormReturn } from "react-hook-form";

type ProductFormLeftSideProps = {
  form: UseFormReturn<ProductFormType>,
  images: File[],
  handleImagesChange: (newImages: File[]) => void
}

export function ProductFormLeftSide({ form, images, handleImagesChange }: ProductFormLeftSideProps) {
  return (
    <FormPageGridPrimary>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Product Name & Slug */}
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
            name="slug"
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
        {/* Product Description */}
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
      {/* Product Images */}
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
      </CardHeader>
      <CardContent>
        <ImageUploader
          images={images}
          onImagesChange={handleImagesChange} />
      </CardContent>
    </FormPageGridPrimary>
  );
}