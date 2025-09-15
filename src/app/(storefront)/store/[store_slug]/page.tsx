import StoreFrontHero from "@/components/storefront/organisms/hero";
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";
import { getPublicStorefrontProducts } from "@/db/actions/storefront/products/public/actionts";
import { getPublicStoreFront } from "@/db/actions/storefront/store/public/actionts";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ store_slug: string }>
}

export default async function StoreFrontPage({ params }: Props) {
  const storeSlug = (await params).store_slug;
  const store = await getPublicStoreFront(storeSlug);
  
  const products = await getPublicStorefrontProducts(storeSlug);

  if (!store) return notFound();
  return (
    <main className="space-y-4">
      <StoreFrontHero
        title={store.settings.heroSection.title}
        description={store.settings.heroSection.description}
        cta={{
          link: store.settings.heroSection.ctaLink,
          text: store.settings.heroSection.ctaText,
          target: store.settings.heroSection.ctaTarget == "_blank" ? "_blank" : "self"
        }}
        image={{
          url: store.settings.heroSection.image,
          alt: "hero image"
        }}
      />

      <StoreFrontProductList products={products.slice(0,11)} />
    </main>
  );
}
