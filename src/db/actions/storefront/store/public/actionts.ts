"use server";
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { applyCache, tags } from "@/lib/cache/cache-manager";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const getPublicStoreFront = async (domain: string) => {
	"use cache";
	const store = await db.query.StoreTable.findFirst({
		where: eq(StoreTable.domain, domain),
	});

	if (!store) return undefined;

	applyCache(tags.store(store.id));
	return store;
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
