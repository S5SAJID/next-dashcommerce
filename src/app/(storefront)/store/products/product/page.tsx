import { products } from "@/components/organisms/tables/products-table/data"
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import Placeholder from "@/components/ui/placeholder";
import { Separator } from "@/components/ui/separator";

export default function ProductPage() {
  return (
    <>
      <div className="h-[50vh]">
        <Placeholder text="Product Details"/>
      </div>
      <Separator />
      <div className="py-16 space-y-8">
        <h3 className="text-2xl">You May Also Like</h3>
        <StoreFrontProductList products={products.slice(0,4)} dense/>
      </div>
    </>
  )
}