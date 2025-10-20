"use server";

import { db } from "@/db/db";
import { ProductTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { product_form_schema } from "@/components/organisms/forms/dashboard/products/product-form/schema";
import z from "zod";
import { uploadDashboardFiles } from "../common/actions";
import { product_details_form_schema } from "@/components/organisms/forms/dashboard/products/product-details/schema";
import { dashboardActionClient } from "@/lib/safe-action-clients/dashboard-client";
import { revalidatePath } from "next/cache";

export const getDashboardProducts = dashboardActionClient
  .action(async ({ ctx }) => {
    const storeId = ctx.storeId;

    const products = await db.query.ProductTable.findMany({
      where: eq(ProductTable.store_id, storeId),
      columns: {
        store_id: false
      },
      orderBy: [desc(ProductTable.updated_at)]
    })

    return products
  })

export const getDashboardProduct = dashboardActionClient
  .inputSchema(z.object({ slug: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const slug = parsedInput.slug;

    const product = await db.query.ProductTable.findFirst({
      where: and(
        eq(ProductTable.slug, slug),
        eq(ProductTable.store_id, ctx.storeId)
      ),
      columns: {
        store_id: false
      }
    });

    return product
  })

export const updateDashboardProduct = dashboardActionClient
  .inputSchema(product_details_form_schema)
  .action(async ({ parsedInput, ctx }) => {
    const fileImages = parsedInput.images.filter(img => img instanceof File)
    const urlImages = parsedInput.images.filter(img => typeof img === "string")

    // TODO: implement image uploader. Currently saving to local harddisk
    const uploadedImages = await uploadDashboardFiles(fileImages);
    const images = [...urlImages, ...uploadedImages];

    const results = await db.update(ProductTable)
      .set({ ...parsedInput, images })
      .where(
        and(
          eq(ProductTable.id, parsedInput.id),
          eq(ProductTable.store_id, ctx.storeId)
        )
      )
      .returning({ id: ProductTable.id })
    return results[0]
  })


export const deleteDashboardProduct = dashboardActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    try {
      await db
        .delete(ProductTable)
        .where(
          and(
            eq(ProductTable.id, parsedInput.id),
            eq(ProductTable.store_id, ctx.storeId)
          )
        );
      revalidatePath("/products");
      return { success: true, message: "Product deleted successfully" }
    } catch (error: unknown) {
      console.log({ type: "Product Delete", error })
      return { success: false, error: "Error deleting product" }
    }
  })

export const createDashboardProduct = dashboardActionClient
  .inputSchema(product_form_schema)
  .action(async ({ parsedInput, ctx }) => {
    // TODO: implement image uploader. Currently saving to local harddisk
    const images = await uploadDashboardFiles(parsedInput.images);

    const product = await db.insert(ProductTable).values({
      ...parsedInput,
      images: images,
      store_id: ctx.storeId,
    }).returning({ id: ProductTable.id })

    if (!product[0].id) return { success: false, error: "Product not created." }

    return { success: true, message: "Product created" }
  })

export const updateDashboardProductDetails = dashboardActionClient
  .inputSchema(product_details_form_schema)
  .action(async ({ parsedInput, ctx }) => {

    const fileImages = parsedInput.images.filter(img => img instanceof File)
    const urlImages = parsedInput.images.filter(img => typeof img === "string")
    // TODO: implement image uploader. Currently saving to local harddisk
    const uploadedImages = await uploadDashboardFiles(fileImages);
    const images = [...urlImages, ...uploadedImages];

    await db
      .update(ProductTable)
      .set({ ...parsedInput, images })
      .where(
        and(
          eq(ProductTable.id, parsedInput.id),
          eq(ProductTable.store_id, ctx.storeId)
        )
      )

    return { success: true, message: "Product updated" }
  })