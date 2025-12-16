"use server";

import { db } from "@/db/db";
import { ApiKeyTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { createHash } from "node:crypto";
import type { SecuredStoreContext } from ".";
import { AVAILABLE_PERMISSIONS_TYPE } from "@/db/actions/dashboard/settings/api-keys/const";

/**
 * Hash API key using SHA-256
 */
export async function hashApiKey(apiKey: string): Promise<string> {
	return createHash("sha256").update(apiKey).digest("hex");
}

/**
 * Validate API key and return store context
 */
export async function getApiKeyContext(
	apiKey: string,
): Promise<SecuredStoreContext> {
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

	// Update last_used_at asynchronously (non-blocking)
	db.update(ApiKeyTable)
		.set({ last_used_at: new Date() })
		.where(eq(ApiKeyTable.id, apiKeyRecord.id))
		.then(() => {})
		.catch(() => {});

	return {
		storeId: apiKeyRecord.store_id,
		permissions: apiKeyRecord.permissions as AVAILABLE_PERMISSIONS_TYPE[],
		authType: "api-key",
	};
}
