"use server";
import { storeSettingsSchema } from "@/components/organisms/forms/dashboard/settings/store/schema";
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { dashboardActionClient } from "@/lib/safe-action-clients/dashboard-client";
import { eq } from "drizzle-orm";

export const getDashboardStore = dashboardActionClient.action(
	async ({ ctx }) => {
		const store = await db.query.StoreTable.findFirst({
			where: eq(StoreTable.id, ctx.storeId),
		});

		return store;
	}
);

export const updateStoreGeneralSettings = dashboardActionClient
	.inputSchema(storeSettingsSchema.partial())
	.action(async ({ ctx, parsedInput }) => {
		await db
			.update(StoreTable)
			.set(parsedInput)
			.where(eq(StoreTable.id, ctx.storeId));

		return { success: true, message: "Changes saved successfully." };
	});
