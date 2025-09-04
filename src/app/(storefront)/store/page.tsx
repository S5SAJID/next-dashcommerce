import { products } from "@/components/organisms/tables/products-table/data";
import StoreFrontHero from "@/components/storefront/organisms/hero";
import StoreFrontProductList from "@/components/storefront/organisms/products/product-list";

// TODO: add dummy products

export default function StoreFrontPage() {
  return (
    <main className="space-y-4">
      <StoreFrontHero
        title="The fastest way to sell with Stripe."
        description="YNS is Stripe-native commerce. Open-Source, Next.js, zero bloat. Spin up a store in minutes, scale without the Shopify tax."
        cta={{
          link: "#explore",
          text: "Explore collection",
          target: "self"
        }}
        image={{
          url: "/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_1-3dgyNymA8r5pCl7OG4nEirKWxLjj3Y.jpg",
          alt: "hero image"
        }}
      />

      <StoreFrontProductList products={products}/>
    </main>
  );
}
