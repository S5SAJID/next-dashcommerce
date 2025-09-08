import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import { DEMO_PRODUCTS } from "@/lib/demoData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Explore all products."
}

export default function ProductsPage() {
  return (
    <div>
      <StoreFrontProductList products={DEMO_PRODUCTS}/>
    </div>
  )
}