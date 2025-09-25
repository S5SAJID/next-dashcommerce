import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductFormType } from "./schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormPageGridSecondary } from "@/components/layout/form-page-layout/layout";
import { UseFormReturn } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

type ProductFormRightSideProps = {
  form: UseFormReturn<ProductFormType>
}

export function ProductFormRightSide({ form }: ProductFormRightSideProps) {
  return <FormPageGridSecondary>
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
                  {...form.register("price", { setValueAs: (v) => (v === "" ? undefined : parseFloat(v)) })} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <FormField
          control={form.control}
          name="compare_at"
          render={() => (
            <FormItem>
              <FormLabel>Compare at price</FormLabel>
              <FormControl>
                <Input placeholder="300" {...form.register("compare_at", { setValueAs: (v) => (v === "" ? undefined : parseFloat(v)) })} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </div>
    </CardContent>
    <Separator />
    <CardHeader>
      <CardTitle>Invertory</CardTitle>
    </CardHeader>
    <CardContent className="flex gap-4">
      <FormField
        control={form.control}
        name="stock"
        render={() => (
          <FormItem>
            <FormLabel>Stock Quantity</FormLabel>
            <FormControl>
              <Input placeholder="50" {...form.register("stock", { setValueAs: (v) => (v === "" ? undefined : parseFloat(v)) })} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      <FormField
        control={form.control}
        name="sku"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SKU</FormLabel>
            <FormControl>
              <Input placeholder="3A-E00-2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </CardContent>
    <Separator />
    <CardHeader>
      <CardTitle>Other</CardTitle>
    </CardHeader>
    <CardContent className="flex space-x-4">
      <FormField
        control={form.control}
        name="is_published"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center space-x-2">
                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                <FormLabel htmlFor="airplane-mode">Publish</FormLabel>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </CardContent>
  </FormPageGridSecondary>;
}