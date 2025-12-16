"use server";
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getPublicStoreFront = cache(async (domain: string) => {
	const store = await db
		.select()
		.from(StoreTable)
		.where(eq(StoreTable.domain, domain));

	return store[0];
});

export const getPublicStoreFrontCurrency = cache(async (domain: string) => {
	const store = await db.query.StoreTable.findFirst({
		columns: {
			currency: true,
		},
		where: eq(StoreTable.domain, domain),
	});

	return store?.currency;
});
