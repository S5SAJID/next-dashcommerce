/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/db/db";
import { ProductTable, StoreTable } from "@/db/schema";
import { DEMO_PRODUCTS } from "@/lib/demoData";
import { eq } from "drizzle-orm";
import { exit } from "process";

async function main() {
  // await insertDemoProducts();
  console.log(await db.query.ProductTable.findMany({limit: 2}))
  exit(0);
}

main();

async function insertDemoProducts() {
  const store = await db.query.StoreTable.findFirst({
    where: eq(StoreTable.domain, "acme"),
  });

  if (!store) return;

  const demo_insert_products = DEMO_PRODUCTS.map((product) => {
    const { id, category, ...rest } = product;
    return { ...rest, store_id: store.id };
  }) as (typeof ProductTable.$inferInsert)[];

  const products = await db.insert(ProductTable)
    .values(demo_insert_products)
    .returning({name: ProductTable.name})

  console.log("✅Inserted products:", products, "\n\n\n");
}

async function insertDemoStore() {
  try {
    await db.insert(StoreTable).values({
      name: "Acme Store",
      domain: "acme",
      settings: {
        seo: {
          title: "Acme Store | The Best Premium Products Online",
          description:
            "Welcome to Acme Store, your go-to destination for high-quality and premium products. Shop now and experience the best in online shopping.",
          tags: ["premium", "quality", "online shopping", "acme"],
        },
        heroSection: {
          title: "Fast, Quick and Easy",
          description:
            "Discover our exclusive range of premium products designed to meet your needs. Enjoy top-notch quality and exceptional service at Acme Store.",
          image:
            "/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_1-3dgyNymA8r5pCl7OG4nEirKWxLjj3Y.jpg",
          ctaText: "Shop Now",
          ctaLink: "/store/acme.store/products",
          ctaTarget: "self",
        },
      },
    });
    const store = await db.query.StoreTable.findFirst({
      where: eq(StoreTable.domain, "acme"),
    });
    console.log({ store });
  } catch (error) {
    console.error("Error updating store:", error);
  }
}
