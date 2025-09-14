import { db } from "@/db/db";
import { StoreTable } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { exit } from "process";

async function main() {
  await db.update(StoreTable).set({
    name: "Acme Store",
    domain: "acme",
    settings: {
      seo: {
        title: "Acme Store | The Best Premium Products Online",
        description: "Welcome to Acme Store, your go-to destination for high-quality and premium products. Shop now and experience the best in online shopping.",
        tags: ["premium", "quality", "online shopping", "acme"]
      },
      heroSection: {
        title: "Fast, Quick and Easy",
        description: "Discover our exclusive range of premium products designed to meet your needs. Enjoy top-notch quality and exceptional service at Acme Store.",
        image: "/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_1-3dgyNymA8r5pCl7OG4nEirKWxLjj3Y.jpg",
        ctaText: "Shop Now",
        ctaLink: "/store/acme.store/products",
        ctaTarget: "self"
      }
    }
  })
  const store = await db.query.StoreTable.findFirst();

  console.log({ store });
  exit(0);
}

main();
