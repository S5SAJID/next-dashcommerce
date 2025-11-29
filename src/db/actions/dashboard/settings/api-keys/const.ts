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
	"*:*",
] as const;

export type AVAILABLE_PERMISSIONS_TYPE = (typeof AVAILABLE_PERMISSIONS)[number];
