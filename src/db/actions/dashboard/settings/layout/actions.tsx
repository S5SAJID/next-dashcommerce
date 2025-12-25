"use server";
import { storeLayoutSettingsSchema } from "@/components/organisms/forms/dashboard/settings/layout/schema";
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { checkPermission } from "@/lib/auth/check-permission";
import { applyCache, tags, updateCache } from "@/lib/cache/cache-manager";
import { dashboardActionClient } from "@/lib/safe-action-clients/dashboard-client";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export const updateLayoutSettings = dashboardActionClient
	.inputSchema(storeLayoutSettingsSchema)
	.action(async ({ ctx, parsedInput }) => {
		checkPermission(ctx, "store:write");
		const settings = {
			...parsedInput,
			heroSection: {
				...parsedInput.heroSection,
				image:
					"/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_1-3dgyNymA8r5pCl7OG4nEirKWxLjj3Y.jpg", // TODO: Provide a default image value if missing
			},
		};

		// TODO: fix image
		await db
			.update(StoreTable)
			.set({ settings })
			.where(eq(StoreTable.id, ctx.storeId));

		updateCache(tags.store(ctx.storeId));

		return { success: true, message: "Changes saved successfully." };
	});

export const getDashboadStore = dashboardActionClient.action(
	async ({ ctx }) => {
		"use cache";
		applyCache(tags.store(ctx.storeId));
		checkPermission(ctx, "store:read");
		const store = await db.query.StoreTable.findFirst({
			where: eq(StoreTable.id, ctx.storeId),
		});

		return store;
	},
);

export const getDashboadStoreDomain = dashboardActionClient.action(
	async ({ ctx }) => {
		"use cache";
		applyCache(tags.store(ctx.storeId));
		checkPermission(ctx, "store:read");
		const store = await db.query.StoreTable.findFirst({
			where: eq(StoreTable.id, ctx.storeId),
			columns: {
				domain: true,
				id: true,
			},
		});

		return store;
	},
);
