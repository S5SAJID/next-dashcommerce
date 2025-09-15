import StoreFrontAddToCart from "@/components/storefront/molecules/add-to-cart";
import StoreFrondProductImagePreview from "@/components/storefront/organisms/products/img-preview";
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import { getPublicStorefrontProduct, getPublicStorefrontProducts } from "@/db/actions/storefront/products/public/actionts";
import { formatPrice, shuffleArray } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ store_slug: string, slug: string }>,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;
  const product = await getPublicStorefrontProduct(awaitedParams.store_slug, awaitedParams.slug);

  if (!product) return notFound();

  return { title: product.name, description: product.description, }
}

export default async function ProductPage({ params }: Props) {
  const awaitedParams = await params;
  const product = await getPublicStorefrontProduct(awaitedParams.store_slug, awaitedParams.slug);
  const recommendedProducts = await getPublicStorefrontProducts(awaitedParams.store_slug);

  // if not found return notfound page
  if (!product) notFound();

  return (
    <>
      <section className="flex flex-col md:flex-row gap-8">
        {/* Preview image */}
        <StoreFrondProductImagePreview product={product} />
        {/* Product Details */}
        <div className="w-full flex flex-col">
          <h1 className="text-3xl leading-snug tracking-tight font-semibold">{product.name}</h1>
          <p className="mt-2 text-3xl font-medium leading-none tracking-tight">
            {formatPrice({ price: product.price })}
          </p>
          <p className="mt-8 text-muted-foreground">
            {product.description}
          </p>
          <StoreFrontAddToCart className="mt-8 rounded-full w-full" />
        </div>
      </section>


      <div className="my-16" />
      <div className="space-y-8">
        <h3 className="text-2xl">You May Also Like</h3>
        <StoreFrontProductList products={shuffleArray(recommendedProducts).slice(0,4)} dense />
      </div>
    </>
  )
}