import { ProductTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

export const apiDashboardProductSchema = createSelectSchema(ProductTable).omit({
	store_id: true,
});
