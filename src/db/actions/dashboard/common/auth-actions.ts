"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentSession() {
	"use cache: private";

	const session = getCachedAuthSession(await headers());

	return session;
}

async function getCachedAuthSession(headers: Headers) {
	"use cache";
	const session = await auth.api.getSession({
		headers: headers,
	});

	if (!session) {
		redirect("/signin");
	}

	return session;
}
