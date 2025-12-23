"use server";
import { db } from "@/db/db";
import {
	CustomerTable,
	OrderItemTable,
	OrderTable,
	ProductTable,
} from "@/db/schema";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { dashboardActionClient } from "@/lib/safe-action-clients/dashboard-client";
import z from "zod";
import { revalidatePath } from "next/cache";
import { checkPermission } from "@/lib/auth/check-permission";
import { applyCache, tags, updateCache } from "@/lib/cache/cache-manager";

export const getDashboardOrders = dashboardActionClient.action(
	async ({ ctx }) => {
		"use cache";
		applyCache(tags.storeOrders(ctx.storeId));
		checkPermission(ctx, "orders:read");

		const orders = await db
			.select({
				orderId: OrderTable.id,
				status: OrderTable.status,
				totalAmount: OrderTable.total_amount,
				createdAt: OrderTable.created_at,
				// Use the customer's name, but handle guest checkouts (customer_id is nullable)
				// If customer is null, we can display 'Guest'
				customerName: CustomerTable.full_name,
				customerEmail: CustomerTable.email,
				// We need to aggregate to get the count of items for each order
				itemCount: count(OrderItemTable.id),
			})
			.from(OrderTable)
			.where(and(eq(OrderTable.store_id, ctx.storeId)))
			// Use a LEFT JOIN for customers because an order might not have a customer (guest checkout)
			.leftJoin(CustomerTable, eq(OrderTable.customer_id, CustomerTable.id))
			// Use a LEFT JOIN for items in case an order somehow has 0 items. It's safer.
			.leftJoin(OrderItemTable, eq(OrderTable.id, OrderItemTable.order_id))
			// When using an aggregate function (count), you MUST group by the other selected columns
			.groupBy(OrderTable.id, CustomerTable.id)
			.orderBy(desc(OrderTable.created_at)); // Show the most recent orders first

		return orders;
	},
);

export const getDashboardOrder = dashboardActionClient
	.inputSchema(z.object({ orderId: z.string() }))
	.action(async ({ ctx, parsedInput }) => {
		"use cache";

		checkPermission(ctx, "orders:read");
		const result = await db
			.select({
				// Select all fields from OrderTable
				order: OrderTable,
				// Select all fields from CustomerTable
				customer: CustomerTable,
				// Aggregate order items into a single JSON array field named 'items'
				items: sql<
					{
						id: string;
						quantity: number;
						price: string;
						product_name: string;
						product_sku: string | null;
						product_image: string | null;
					}[]
				>`json_agg(json_build_object(
            'id', ${OrderItemTable.id},
            'quantity', ${OrderItemTable.quantity},
            'price', ${OrderItemTable.price_at_purchase},
            'product_name', ${ProductTable.name},
            'product_sku', ${ProductTable.sku},
            'product_image', ${ProductTable.images}[1]
          ))`,
			})
			.from(OrderTable)
			.where(
				and(
					eq(OrderTable.store_id, ctx.storeId),
					eq(OrderTable.id, parsedInput.orderId),
				),
			)
			// Joins
			.leftJoin(CustomerTable, eq(OrderTable.customer_id, CustomerTable.id))
			.leftJoin(OrderItemTable, eq(OrderTable.id, OrderItemTable.order_id))
			.leftJoin(ProductTable, eq(OrderItemTable.product_id, ProductTable.id))
			// Group by the unique order and customer to collapse all items into the aggregate
			.groupBy(OrderTable.id, CustomerTable.id);

		const order = result[0];

		applyCache(
			tags.storeOrders(ctx.storeId),
			tags.storeOrder(ctx.storeId, order.order.id),
		);

		return order;
	});

export const updateOrderStatus = dashboardActionClient
	.inputSchema(
		z.object({
			orderId: z.string(),
			status: z.enum([
				"PENDING",
				"PROCESSING",
				"SHIPPED",
				"DELIVERED",
				"CANCELLED",
			]),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		checkPermission(ctx, "orders:write");
		await db
			.update(OrderTable)
			.set({ status: parsedInput.status })
			.where(
				and(
					eq(OrderTable.id, parsedInput.orderId),
					eq(OrderTable.store_id, ctx.storeId),
				),
			);

		updateCache(
			tags.storeOrders(ctx.storeId),
			tags.storeOrder(ctx.storeId, parsedInput.orderId),
		);

		revalidatePath(`/orders/${parsedInput.orderId}`);
	});
