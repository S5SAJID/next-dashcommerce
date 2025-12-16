import { getSecuredStoreContext } from "@/lib/auth/safe-guard-helpers";
import { getApiKeyContext } from "@/lib/auth/safe-guard-helpers/get-api-key-context";
import { createSafeActionClient } from "next-safe-action";
import { headers } from "next/headers";

export const dashboardActionClient = createSafeActionClient().use(
	async ({ next }) => {
		try {
			// Check for API key in headers
			const headersList = await headers();
			const apiKey = headersList.get("x-api-key");

			if (apiKey) {
				// API key authentication
				const context = await getApiKeyContext(apiKey);
				return next({ ctx: context });
			}

			// Session authentication (existing behavior)
			const context = await getSecuredStoreContext(headersList);
			return next({ ctx: context });
		} catch (e) {
			const errorMessage =
				e instanceof Error ? e.message : "Security check failed.";
			throw new Error(errorMessage);
		}
	},
);
