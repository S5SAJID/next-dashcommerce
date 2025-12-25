"use server";

import { db } from "@/db/db";
import { ApiKeyTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { createHash } from "node:crypto";
import type { SecuredStoreContext } from ".";
import { AVAILABLE_PERMISSIONS_TYPE } from "@/db/actions/dashboard/settings/api-keys/const";
import { after } from "next/server";
import { applyCache, tags } from "@/lib/cache/cache-manager";

/**
 * Hash API key using SHA-256
 */
export async function hashApiKey(apiKey: string): Promise<string> {
	return createHash("sha256").update(apiKey).digest("hex");
}

export async function getCachedApiKeyContext(apiKey: string) {
	"use cache";
	const keyHash = await hashApiKey(apiKey);

	const apiKeyRecord = await db.query.ApiKeyTable.findFirst({
		where: and(
			eq(ApiKeyTable.key_hash, keyHash),
			eq(ApiKeyTable.is_active, true),
		),
		columns: { store_id: true, permissions: true, id: true },
	});

	if (!apiKeyRecord) {
		throw new Error("Unauthorized: Invalid or inactive API key");
	}

	applyCache(tags.storeApiKey(apiKeyRecord.store_id, keyHash));
	return apiKeyRecord;
}

/**
 * Validate API key and return store context
 */
export async function getApiKeyContext(
	apiKey: string,
): Promise<SecuredStoreContext> {
	const apiKeyRecord = await getCachedApiKeyContext(apiKey);

	// Update last_used_at asynchronously (non-blocking)
	after(async () => {
		await db
			.update(ApiKeyTable)
			.set({ last_used_at: new Date() })
			.where(eq(ApiKeyTable.id, apiKeyRecord.id))
			.then(() => {})
			.catch(() => {});
	});

	return {
		storeId: apiKeyRecord.store_id,
		permissions: apiKeyRecord.permissions as AVAILABLE_PERMISSIONS_TYPE[],
		authType: "api-key",
	};
}
