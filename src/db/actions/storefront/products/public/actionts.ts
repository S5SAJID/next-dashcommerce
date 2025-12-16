import { db } from "@/db/db";
import { ProductTable, StoreTable } from "@/db/schema";
import { and, desc, eq, exists } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getPublicStoreFront } from "../../store/public/actionts";

export async function getPublicStorefrontProducts(domain: string) {
	const store = await getPublicStoreFront(domain);
	if (!store) {
		return notFound();
	}

	const products = await db
		.select()
		.from(ProductTable)
		.orderBy(desc(ProductTable.updated_at))
		.where(
			and(
				eq(ProductTable.is_published, true),
				eq(ProductTable.store_id, store.id),
			),
		);
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
								eq(StoreTable.id, productTable.store_id), // Assuming `storeId` is the foreign key on ProductTable
							),
						),
				),
			),
		with: {
			store: true,
		},
	});

	return product;
}
