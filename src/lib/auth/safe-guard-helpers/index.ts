"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { db } from "@/db/db";
import { and, eq } from "drizzle-orm";
import { user } from "@/db/schema";

// type StoreRole = 'owner' | 'editor' | 'viewer';

export type SecuredStoreContext = {
	userId: string;
	storeId: string;
	// role: StoreRole;
};

export async function getSecuredStoreContext(): Promise<SecuredStoreContext> {
	// Authentication Check
	const session = await auth.api.getSession({ headers: await headers() });
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
	};

	return context;
}
