import { Product } from "@/lib/demoData";
import StoreFrontProductCard from "./product-card";

type StoreFrontProductListProps = {
  products: Product[],
  dense?: boolean
}

export default function StoreFrontProductList({ products, dense=false }: StoreFrontProductListProps) {
  return (
    <section className={`grid grid-cols-1 ${dense ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"} gap-4`}>
      {products.map((product, index) => (
        <StoreFrontProductCard product={product} key={index} />
      ))}
    </section>
  )
}