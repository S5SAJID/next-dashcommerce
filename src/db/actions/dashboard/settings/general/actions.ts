"use server";
import { storeSettingsSchema } from "@/components/organisms/forms/dashboard/settings/store/schema";
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { checkPermission } from "@/lib/auth/check-permission";
import { applyCache, tags, updateCache } from "@/lib/cache/cache-manager";
import { dashboardActionClient } from "@/lib/safe-action-clients/dashboard-client";
import { eq } from "drizzle-orm";

export const getDashboardStore = dashboardActionClient.action(
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

export const updateStoreGeneralSettings = dashboardActionClient
	.inputSchema(storeSettingsSchema.partial())
	.action(async ({ ctx, parsedInput }) => {
		updateCache(tags.store(ctx.storeId));
		checkPermission(ctx, "store:write");

		try {
			// Separate customHeadCode from other fields
			const { customHeadCode, ...directFields } = parsedInput;

			// If customHeadCode is present, we need to update the settings field
			if (customHeadCode !== undefined && customHeadCode !== "") {
				// Get current store to merge with existing settings
				const currentStore = await db.query.StoreTable.findFirst({
					where: eq(StoreTable.id, ctx.storeId),
				});

				if (!currentStore) {
					throw new Error("Store not found");
				}

				// Update with merged settings
				await db
					.update(StoreTable)
					.set({
						...directFields,
						settings: {
							...currentStore.settings,
							customHeadCode,
						},
					})
					.where(eq(StoreTable.id, ctx.storeId));
			} else {
				// No customHeadCode update, just update direct fields
				await db
					.update(StoreTable)
					.set(directFields)
					.where(eq(StoreTable.id, ctx.storeId));
			}
		} catch (error) {
			console.error(error);
		}

		return {
			success: true,
			message: "Changes saved successfully.",
			parsedInput,
		};
	});
