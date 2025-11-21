"use server";
import { db } from "@/db/db";
import { CustomerTable, OrderTable } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { dashboardActionClient } from "@/lib/safe-action-clients/dashboard-client";

export const getDashboardCustomers = dashboardActionClient.action(
	async ({ ctx }) => {
		const customers = await db
			.select({
				id: CustomerTable.id,
				name: CustomerTable.full_name,
				email: CustomerTable.email,
				phone: CustomerTable.phone,
				created_at: CustomerTable.created_at,
				orders: sql<number>`count(${OrderTable.id})`,
				total_spent: sql<number>`coalesce(sum(${OrderTable.total_amount}), 0)`,
			})
			.from(CustomerTable)
			.where(eq(CustomerTable.store_id, ctx.storeId))
			.leftJoin(OrderTable, eq(CustomerTable.id, OrderTable.customer_id))
			.groupBy(CustomerTable.id)
			.orderBy(desc(CustomerTable.created_at));

		return customers;
	}
);
