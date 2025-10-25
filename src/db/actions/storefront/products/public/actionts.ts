import { db } from "@/db/db";
import { ProductTable, StoreTable } from "@/db/schema";
import { and, desc, eq, exists } from "drizzle-orm";
import { notFound } from "next/navigation";

async function storeExists(domain: string) {
	const store = await db
		.select()
		.from(StoreTable)
		.where(eq(StoreTable.domain, domain));
	if (!store) {
		return;
	}
	return store[0].id;
}

export async function getPublicStorefrontProducts(domain: string) {
	const store_id = storeExists(domain);
	if (!store_id) {
		return notFound();
	}

	const products = await db
		.select()
		.from(ProductTable)
		.orderBy(desc(ProductTable.updated_at))
		.where(eq(ProductTable.is_published, true));
	return products;
}

export async function getPublicStorefrontProduct(domain: string, slug: string) {
	// Use a relational query with an `exists` subquery for filtering
	const product = await db.query.ProductTable.findFirst({
		where: (productTable) =>
			and(
				eq(productTable.slug, slug),
				eq(productTable.is_published, true),
				exists(
					db
						.select()
						.from(StoreTable)
						.where(
							and(
								eq(StoreTable.domain, domain),
								eq(StoreTable.id, productTable.store_id) // Assuming `storeId` is the foreign key on ProductTable
							)
						)
				)
			),
		with: {
			store: true,
		},
	});

	return product;
}
