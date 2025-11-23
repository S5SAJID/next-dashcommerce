export const AVAILABLE_EVENTS = [
	"order.created",
	"order.updated",
	"order.shipped",
	"order.delivered",
	"order.cancelled",
	"product.created",
	"product.updated",
	"product.deleted",
	"customer.created",
	"customer.updated",
] as const;

export type EventName = (typeof AVAILABLE_EVENTS)[number];
