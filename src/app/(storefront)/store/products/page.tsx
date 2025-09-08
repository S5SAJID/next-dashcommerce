import { products } from "@/components/organisms/tables/products-table/data";
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Explore all products."
}

export default function ProductsPage() {
  return (
    <div>
      <StoreFrontProductList products={products}/>
    </div>
  )
}