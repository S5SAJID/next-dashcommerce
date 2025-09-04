import { products } from "@/components/organisms/tables/products-table/data";
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";

export default function ProductsPage() {
  return (
    <div>
      <StoreFrontProductList products={products}/>
    </div>
  )
}