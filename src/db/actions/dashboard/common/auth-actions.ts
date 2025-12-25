"use server";

import { auth } from "@/lib/auth/auth";
import { applyCache, tags } from "@/lib/cache/cache-manager";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentSession() {
	"use cache: private";
	const cookieStore = await cookies();
	const cookiesString = cookieStore.toString();
	const session = getCachedAuthSession(cookiesString);

	return session;
}

async function getCachedAuthSession(cookieHeader: string) {
	"use cache";
	const session = await auth.api.getSession({
		headers: { Cookie: cookieHeader },
	});

	if (!session) {
		redirect("/signin");
	}

	applyCache(tags.userSession(session.user.id));

	return session;
}
