import z from "zod";

export const dashboardOrdersSchema = z.object({
	orderId: z.string(),
	status: z.enum([
		"PENDING",
		"PROCESSING",
		"SHIPPED",
		"DELIVERED",
		"CANCELLED",
	]),
	totalAmount: z.string(),
	createdAt: z.date(),
	customerName: z.string().nullable(),
	customerEmail: z.string().nullable(),
	itemCount: z.number(),
});

export type DashboardOrder = z.infer<typeof dashboardOrdersSchema>;
