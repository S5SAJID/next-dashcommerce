"use server";

import { db } from "@/db/db";
import { ApiKeyTable } from "@/db/schema";
import { dashboardActionClient } from "@/lib/safe-action-clients/dashboard-client";
import z from "zod";
import { generateApiKey } from "@/lib/auth/generate-api-key";
import { hashApiKey } from "@/lib/auth/safe-guard-helpers/get-api-key-context";
import { and, eq } from "drizzle-orm";
import { AVAILABLE_PERMISSIONS } from "./const";

/**
 * Create a new API key for the authenticated store
 */
export const createApiKey = dashboardActionClient
	.inputSchema(
		z.object({
			name: z.string().min(1).max(255),
			permissions: z.array(z.enum(AVAILABLE_PERMISSIONS)),
		})
	)
	.action(async ({ parsedInput, ctx }) => {
		// Only session users can create keys
		if (ctx.authType !== "session") {
			throw new Error("Forbidden: API keys cannot create other API keys");
		}

		const rawKey = generateApiKey();
		const keyHash = await hashApiKey(rawKey);

		try {
			console.info(`${rawKey.slice(0, 4)}...${rawKey.slice(-4)}`);
			await db.insert(ApiKeyTable).values({
				store_id: ctx.storeId,
				name: parsedInput.name,
				key_hash: keyHash,
				key_preview: `${rawKey.slice(0, 2)}...${rawKey.slice(-3)}`,
				permissions: parsedInput.permissions,
				is_active: true,
			});
		} catch (error) {
			console.log(error);
		}

		return {
			apiKey: rawKey,
			preview: `${rawKey.slice(0, 4)}...${rawKey.slice(-4)}`,
		};
	});

/**
 * List all API keys for the authenticated store
 */
export const listApiKeys = dashboardActionClient.action(async ({ ctx }) => {
	if (ctx.authType !== "session") {
		throw new Error("Forbidden: API keys cannot list other API keys");
	}

	return db.query.ApiKeyTable.findMany({
		where: eq(ApiKeyTable.store_id, ctx.storeId),
		columns: { key_hash: false }, // Hide hash
		orderBy: (fields, { desc }) => [desc(fields.created_at)],
	});
});

/**
 * Revoke an API key
 */
export const revokeApiKey = dashboardActionClient
	.inputSchema(z.object({ id: z.string() }))
	.action(async ({ parsedInput, ctx }) => {
		if (ctx.authType !== "session") {
			throw new Error("Forbidden: API keys cannot revoke other API keys");
		}

		
		await db
			.update(ApiKeyTable)
			.set({ is_active: false })
			.where(
				and(
					eq(ApiKeyTable.id, parsedInput.id),
					eq(ApiKeyTable.store_id, ctx.storeId)
				)
			);
		return { success: true };
	});
