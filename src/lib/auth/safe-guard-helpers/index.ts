"use server";

import { auth } from "../auth";
import { db } from "@/db/db";
import { and, eq } from "drizzle-orm";
import { user } from "@/db/schema";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import {
	AVAILABLE_PERMISSIONS,
	AVAILABLE_PERMISSIONS_TYPE,
} from "@/db/actions/dashboard/settings/api-keys/const";

// type StoreRole = 'owner' | 'editor' | 'viewer';

export type AuthType = "session" | "api-key";

export type SecuredStoreContext = {
	storeId: string;
	authType: AuthType;
	// Session-specific (only populated when authType === 'session')
	userId?: string;
	// API-specific (only populated when authType === 'api-key')
	permissions?: AVAILABLE_PERMISSIONS_TYPE[];
};

export async function getSecuredStoreContext(
	headers: ReadonlyHeaders,
): Promise<SecuredStoreContext> {
	// Authentication Check
	const session = await auth.api.getSession({ headers });
	if (session == null || session.user == null) {
		throw new Error("Unauthorized: User not authenticated.");
	}

	// Get storeid from user
	const currentUser = session.user;
	const storeId = currentUser.storeId;

	if (storeId == null) {
		throw new Error("Context Error: Could not determine active store.");
	}

	// TODO: implement caching or something
	const storeMembership = await db.query.user.findFirst({
		where: and(eq(user.id, currentUser.id), eq(user.storeId, storeId)),
		columns: { id: true },
	});

	if (!storeMembership) {
		throw new Error("Forbidden: User is not a owner of this store.");
	}

	const context: SecuredStoreContext = {
		userId: currentUser.id,
		storeId,
		authType: "session",
	};

	return context;
}
