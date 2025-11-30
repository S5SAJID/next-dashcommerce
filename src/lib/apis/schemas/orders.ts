import { dashboardOrdersSchema } from "@/components/organisms/tables/orders-table/data";
import { CustomerTable, OrderTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const apiDashboardOrderSchema = dashboardOrdersSchema;

export const apiDashboardOrderDetailsSchema = z.object({
	order: createSelectSchema(OrderTable),
	customer: createSelectSchema(CustomerTable).nullable(),
	items: z.array(
		z.object({
			id: z.string(),
			quantity: z.number(),
			price: z.string(),
			product_name: z.string(),
			product_sku: z.string().nullable(),
			product_image: z.string().nullable(),
		})
	),
});