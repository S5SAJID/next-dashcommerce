import type { ProductTable } from "@/db/schema";

export type DashboardProduct = Omit<
	typeof ProductTable.$inferSelect,
	"store_id"
>;
