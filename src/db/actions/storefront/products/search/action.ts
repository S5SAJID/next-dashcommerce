"use server";
import { db } from "@/db/db";
import { ProductTable } from "@/db/schema";
import { storeFrontActionClient } from "@/lib/safe-action-clients/storefront-client";
import { and, eq, like, or } from "drizzle-orm";
import z from "zod";

export const storefrontSearchProducts = storeFrontActionClient
  .inputSchema(z.object({ query: z.string().trim().toLowerCase() }))
  .action(async ({ parsedInput, ctx }) => {
    const products = await db.query.ProductTable.findMany({
      where: and(
        eq(ProductTable.store_id, ctx.storeId.id),
        or(
          like(ProductTable.name, `%${parsedInput.query}%`),
          like(ProductTable.description, `%${parsedInput.query}%`),
        ),
      ),
      columns: {
        name: true,
        images: true,
        price: true,
        description: true,
        slug: true
      }
    });

    console.log(products)
    return products;
  })