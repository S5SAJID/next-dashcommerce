"use server";
import { storeLayoutSettingsSchema, StoreLayoutSettingsSchemaType } from "@/components/organisms/forms/dashboard/settings/layout/schema";
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import z from "zod";

export async function updateLayoutSettings(data: StoreLayoutSettingsSchemaType) {
  const parsed = z.safeParse(storeLayoutSettingsSchema, data);
  if (!parsed.success) return { error: parsed.error.message, success: false }

  // TODO: make it user, store specific
  const settings = {
    ...parsed.data,
    heroSection: {
      ...parsed.data.heroSection,
      image: "/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_1-3dgyNymA8r5pCl7OG4nEirKWxLjj3Y.jpg", // TODO: Provide a default image value if missing
    },
  };

  // TODO: Store & User specific updating and fix image
  await db.update(StoreTable).set({ settings })
  return { success: true, message: "Changes saved successfully." }
}

export async function getDashboadStore() {
  const store = await db.query.StoreTable.findFirst();
  return store
}