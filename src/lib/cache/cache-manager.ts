import { cacheLife, cacheTag, updateTag } from "next/cache";

/**
 * Registry of cache key templates.
 * Defines how data relationships are mapped to string identifiers.
 */
export const CacheTags = {
	store: (storeId: string) => `store-${storeId}`,

	storeProducts: (storeId: string) => `store-${storeId}-products`,
	storeProduct: (storeId: string, productId: string) =>
		`store-${storeId}-product-${productId}`,

	storeOrders: (storeId: string) => `store-${storeId}-orders`,
	storeOrder: (storeId: string, orderId: string) =>
		`store-${storeId}-order-${orderId}`,

	storeCustomers: (storeId: string) => `store-${storeId}-customers`,
	storeCustomer: (storeId: string, customerId: string) =>
		`store-${storeId}-customer-${customerId}`,

	storeIntegrations: (storeId: string) => `store-${storeId}-integrations`,
	storeIntegration: (storeId: string, integrationId: string) =>
		`store-${storeId}-integration-${integrationId}`,
	storeIntegrationInstallation: (
		storeId: string,
		integrationId: string,
		installationId: string,
	) =>
		`store-${storeId}-integration-${integrationId}-installation-${installationId}`,

	storeApiKeys: (storeId: string) => `store-${storeId}-api-keys`,
	storeApiKey: (storeId: string, apiKeyHash: string) =>
		`store-${storeId}-api-key-${apiKeyHash}`,

	userSession: (userId: string) => `user-${userId}-session`,
	storeUser: (storeId: string, userId: string) =>
		`store-${storeId}-user-${userId}`,
} as const;

type CacheTagKey = keyof typeof CacheTags;
type CacheTimeUnits =
	| "days"
	| "default"
	| "hours"
	| "max"
	| "minutes"
	| "seconds"
	| "weeks";

/**
 * A type-safe container for a tag key and its required arguments.
 */
export type TagResult<K extends CacheTagKey> = {
	key: K;
	args: Parameters<(typeof CacheTags)[K]>;
};

/**
 * Proxy factory that generates tag payloads.
 * Provides full IDE autocompletion for keys and their specific arguments.
 */
export const tags = new Proxy({} as any, {
	get(_, key: CacheTagKey) {
		return (...args: any[]) => ({ key, args });
	},
}) as {
	[K in CacheTagKey]: (
		...args: Parameters<(typeof CacheTags)[K]>
	) => TagResult<K>;
};

/**
 * Hooks data into the Next.js cache layer.
 * Registers one or more tags and optionally sets the cache duration (TTL).
 */
export function applyCache(...inputs: TagResult<CacheTagKey>[]) {
	const generatedStrings = inputs.map((input) => {
		// We cast to any here because we've already enforced safety at the 'tags' level
		const generator = CacheTags[input.key] as (...args: any[]) => string;
		return generator(...input.args);
	});

	cacheTag(...generatedStrings);
	cacheLife("max"); // if cacheLife is called multiple times in the same scope, the last one called takes precedence.

	return {
		life: (profile: CacheTimeUnits) => {
			cacheLife(profile as any);
		},
	};
}

/**
 * Triggers instant cache invalidation.
 * Use this in Server Actions to purge stale data after a mutation (Create/Update/Delete).
 */
export function updateCache(...inputs: TagResult<CacheTagKey>[]) {
	// 1. Generate the string tags using the same logic as applyCache
	const generatedStrings = inputs.map((input) => {
		const generator = CacheTags[input.key] as (...args: any[]) => string;
		return generator(...input.args);
	});

	// 2. Loop through and call revalidateTag for each
	// revalidateTag only accepts one string, so this ensures all are cleared.
	for (const tag of generatedStrings) {
		updateTag(tag);
	}
}
