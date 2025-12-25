"use server";
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { applyCache, tags } from "@/lib/cache/cache-manager";
import { eq } from "drizzle-orm";

export const getPublicStoreFront = async (domain: string) => {
	"use cache";
	const store = await db
		.select()
		.from(StoreTable)
		.where(eq(StoreTable.domain, domain));

	applyCache(tags.store(store[0].id));
	return store[0];
};

export const getPublicStoreFrontCurrency = async (domain: string) => {
	"use cache";

	const store = await db.query.StoreTable.findFirst({
		columns: {
			id: true,
			currency: true,
		},
		where: eq(StoreTable.domain, domain),
	});

	if (!store) return undefined;

	applyCache(tags.store(store.id));

	return store.currency;
};
