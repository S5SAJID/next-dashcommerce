import { headers } from "next/headers";
import { getSecuredStoreContext, type SecuredStoreContext } from ".";

/**
 * HOF to secure Server Actions using the centralized context provider.
 * This function is extremely lean and performant.
 */
export function withStoreAuth<T extends never[]>(
	// requiredRoles: StoreRole[],
	action: (context: SecuredStoreContext, ...args: T) => Promise<never>
) {
	return async (...args: T) => {
		// 1. Establish Secure Context (TODO: ONE DB hit, cached for the request)
		const context = await getSecuredStoreContext(await headers());

		// // 2. Role Authorization Check (Pure CPU check)
		// if (!requiredRoles.includes(context.role)) {
		//   throw new Error(`Forbidden: Role '${context.role}' does not have permission.`);
		// }

		// ✅ All checks passed. Execute the business logic!
		return action(context, ...args);
	};
}
