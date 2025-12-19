"use cache";

import { db } from "@/db/db";
import { ProductTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getCachedDashboardProducts(storeId: string) {
	cacheTag(`tenant-${storeId}:products`);

	const products = await db.query.ProductTable.findMany({
		where: eq(ProductTable.store_id, storeId),
		columns: {
			store_id: false,
		},
		orderBy: [desc(ProductTable.updated_at)],
	});

	return products;
}

export async function getCachedDashboardProduct(storeId: string, slug: string) {
	cacheTag(`tenant-${storeId}:products`);
	cacheTag(`tenant-${storeId}:product-${slug}`);

	const product = await db.query.ProductTable.findFirst({
		where: and(eq(ProductTable.slug, slug), eq(ProductTable.store_id, storeId)),
		columns: {
			store_id: false,
		},
	});

	return product;
}
