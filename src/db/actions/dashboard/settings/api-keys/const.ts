/**
 * Available API permissions
 */
export const AVAILABLE_PERMISSIONS = [
	"products:read",
	"products:write",
	"products:delete",
	"orders:read",
	"orders:write",
	"customers:read",
	"integrations:read",
	"integrations:write",
	"integrations:delete",
	"store:read",
	"store:write",
	"*:*",
] as const;

export type AVAILABLE_PERMISSIONS_TYPE = (typeof AVAILABLE_PERMISSIONS)[number];
