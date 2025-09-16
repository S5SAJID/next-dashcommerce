"use server";

import { db } from "@/db/db";
import { DashboardProduct } from "./types";
import { ProductTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getDashboardProducts() {
  // TODO: Make it use to get specific user based products
  const results = await db.query.ProductTable.findMany()
  return results
}

export async function updateDashboardProduct(data:DashboardProduct) {
  const results = await db.update(ProductTable).set(data).where(eq(ProductTable.id, data.id)).returning({id: ProductTable.id})
  return results[0]
}