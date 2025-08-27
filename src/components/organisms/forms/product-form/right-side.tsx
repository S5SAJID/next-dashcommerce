import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductFormType } from "./schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormPageGridSecondary } from "@/components/layout/form-page-layout/layout";
import { UseFormReturn } from "react-hook-form";

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
                  {...form.register("price", { valueAsNumber: true })} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
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
        name="stock_quantity"
        render={() => (
          <FormItem>
            <FormLabel>Stock Quantity</FormLabel>
            <FormControl>
              <Input placeholder="50" {...form.register("stock_quantity", { valueAsNumber: true })} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
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
        )} />
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
        )} />
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
        )} />
    </CardContent>
  </FormPageGridSecondary>;
}