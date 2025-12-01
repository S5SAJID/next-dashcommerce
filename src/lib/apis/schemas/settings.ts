import { StoreTable } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";

// Schema for store settings (omit sensitive fields)
export const apiDashboardStoreSettingsSchema = createSelectSchema(
	StoreTable
).omit({
	id: true,
	created_at: true,
	updated_at: true,
});
