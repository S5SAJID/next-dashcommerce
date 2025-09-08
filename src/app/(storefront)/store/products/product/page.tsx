import { products } from "@/components/organisms/tables/products-table/data"
import StoreFrontAddToCart from "@/components/storefront/molecules/add-to-cart";
import StoreFrondProductImagePreview from "@/components/storefront/organisms/products/img-preview";
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import { formatPrice } from "@/lib/utils";
import { Metadata } from "next";

// demo product
const product = products[0]

export const metadata: Metadata = {
  title: product.name
}

export default function ProductPage() {
  return (
    <>
      <section className="flex flex-col md:flex-row gap-8">
        {/* Preview image */}
        <StoreFrondProductImagePreview product={{...product, images: [
          { src: "/storefront/demo/products/36f6d2f6c696e6b732f4d44423859574e6a6446387854334.avif" },
          { src: "/storefront/demo/products/Default_product_image_of_a_hoodie_for_ecommerce_website_2-c1sZkXsTaSwqTEHUTMQS5DhKyyMmCD.jpg" },
        ]}}/>
        {/* Product Details */}
        <div className="w-full flex flex-col">
          <h1 className="text-3xl leading-snug tracking-tight font-semibold">{product.name}</h1>
          <p className="mt-2 text-3xl font-medium leading-none tracking-tight">
            {formatPrice({price: product.price})}
          </p>
          <p className="mt-8 text-muted-foreground">
            Ocean Bloom captures the spirit of coastal escapes — a wave-blue silhouette paired with sun-washed handles that feel straight out of a Mediterranean summer. Structured yet soft, it’s the kind of bag that moves effortlessly from city strolls to seaside aperitifs. Salt in the air; style in the details.
          </p>
          <StoreFrontAddToCart className="mt-8 rounded-full w-full" />
        </div>
      </section>

      
      <div className="my-16"/>
      <div className="space-y-8">
        <h3 className="text-2xl">You May Also Like</h3>
        <StoreFrontProductList products={products.slice(0,4)} dense/>
      </div>
    </>
  )
}