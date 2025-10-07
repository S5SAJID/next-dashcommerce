"use server";

import { db } from "@/db/db";
import { DashboardProduct } from "./types";
import { ProductTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { product_form_schema, ProductFormType } from "@/components/organisms/forms/dashboard/products/product-form/schema";
import z from "zod";
import { uploadDashboardFiles } from "../common/actions";
import { product_details_form_schema, ProductDetailsFormType } from "@/components/organisms/forms/dashboard/products/product-details/schema";

export async function getDashboardProducts() {
  // TODO: Make it use to get specific user based products
  const results = await db.query.ProductTable.findMany({
    orderBy: [desc(ProductTable.updated_at)]
  })
  return results
}

export async function getDashboardProduct(slug: string) {
  // TODO: Make it use to get specific user based products
  const product = await db.query.ProductTable.findFirst({
    where: eq(ProductTable.slug, slug),
    columns: {
      store_id: false
    }
  });
  return product
}

export async function updateDashboardProduct(data: DashboardProduct) {
  const results = await db.update(ProductTable).set(data).where(eq(ProductTable.id, data.id)).returning({ id: ProductTable.id })
  return results[0]
}

export async function deleteDashboardProduct(id: string) {
  try {
    // TODO: add store id as filter
    await db.delete(ProductTable).where(eq(ProductTable.id, id));
    return { success: true, message: "Product deleted successfully" }
  } catch (error: unknown) {
    console.log({ type: "Product Delete", error })
    return { success: false, error: "Error deleting product" }
  }
}

export async function createDashboardProduct(data: ProductFormType) {
  const parsedData = z.safeParse(product_form_schema, data)

  if (!parsedData.success) return { success: false, error: parsedData.error.message };

  // TODO: implement image uploader. Currently saving to local harddisk
  const images = await uploadDashboardFiles(parsedData.data.images);

  const product = await db.insert(ProductTable).values({
    ...parsedData.data,
    images: images,
    // TODO: Remove the hardcoded value
    store_id: "a66ba6dc-e9a5-4d17-a2fb-50c85c504f37",
  }).returning({ id: ProductTable.id })

  if (!product[0].id) return { success: false, error: "Product not created." }

  return { success: true, message: "Product created" }
}

export async function updateDashboardProductDetails(data: ProductDetailsFormType) {
  const parsedData = z.safeParse(product_details_form_schema, data);
  if (!parsedData.success) return { success: false, error: parsedData.error.message };

  const fileImages = parsedData.data.images.filter(img => img instanceof File)
  const urlImages = parsedData.data.images.filter(img => typeof img === "string")
  // TODO: implement image uploader. Currently saving to local harddisk
  const uploadedImages = await uploadDashboardFiles(fileImages);
  const images = [...urlImages, ...uploadedImages];
  await db.update(ProductTable).set({...data, images}).where(eq(ProductTable.id, data.id))
  return { success: true, message: "Product updated" }
}
