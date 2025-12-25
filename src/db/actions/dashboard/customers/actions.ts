"use server";
import { db } from "@/db/db";
import { CustomerTable, OrderTable } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { dashboardActionClient } from "@/lib/safe-action-clients/dashboard-client";
import z from "zod";
import { checkPermission } from "@/lib/auth/check-permission";
import { applyCache, tags } from "@/lib/cache/cache-manager";

export const getDashboardCustomers = dashboardActionClient.action(
	async ({ ctx }) => {
		"use cache";
		applyCache(tags.storeCustomers(ctx.storeId));
		checkPermission(ctx, "customers:read");

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
	},
);

export const getDashboardCustomer = dashboardActionClient
	.inputSchema(z.object({ customerId: z.string() }))
	.action(async ({ parsedInput, ctx }) => {
		"use cache";
		applyCache(tags.storeCustomer(ctx.storeId, parsedInput.customerId));
		checkPermission(ctx, "customers:read");

		const customer = await db
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
			.where(
				and(
					eq(CustomerTable.id, parsedInput.customerId),
					eq(CustomerTable.store_id, ctx.storeId),
				),
			)
			.leftJoin(OrderTable, eq(CustomerTable.id, OrderTable.customer_id))
			.groupBy(CustomerTable.id);

		return customer[0];
	});
