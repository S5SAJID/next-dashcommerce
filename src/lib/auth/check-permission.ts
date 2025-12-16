import { AVAILABLE_PERMISSIONS_TYPE } from "@/db/actions/dashboard/settings/api-keys/const";
import type { SecuredStoreContext } from "./safe-guard-helpers";

/**
 * Check if the context has the required permission
 * Session auth has all permissions, API key auth must have explicit permission
 */
export function checkPermission(
	ctx: SecuredStoreContext,
	required: AVAILABLE_PERMISSIONS_TYPE,
): void {
	// Session auth has all permissions
	if (ctx.authType === "session") return;

	// API key auth must have explicit permission
	if (ctx.authType === "api-key") {
		const hasWildcard = ctx.permissions?.includes("*:*");
		const hasPermission = ctx.permissions?.includes(required);

		if (!hasWildcard && !hasPermission) {
			throw new Error(`Forbidden: Missing permission '${required}'`);
		}
	}
}
