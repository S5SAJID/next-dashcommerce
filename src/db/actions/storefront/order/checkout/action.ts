"use server";

import { checkoutFormSchema } from "@/components/storefront/organisms/forms/checkout/schema";
import { db } from "@/db/db";
import {
	CustomerTable,
	OrderItemTable,
	OrderTable,
	ProductTable,
} from "@/db/schema";
import { storeFrontActionClient } from "@/lib/safe-action-clients/storefront-client";
import { and, eq, inArray } from "drizzle-orm";
import { publishEvent } from "@/lib/events/event-publisher";

type CustomerInsert = typeof CustomerTable.$inferInsert;
type OrderItemInsert = typeof OrderItemTable.$inferInsert;

// Improved response type for consistency
type CheckoutResponse = {
	success: boolean;
	message: string;
	orderId?: string;
	error?: string;
};

export const checkoutFormAction = storeFrontActionClient
	.inputSchema(checkoutFormSchema)
	.action(async ({ parsedInput, ctx }): Promise<CheckoutResponse> => {
		const storeId = ctx.storeId.id;

		if (!storeId) {
			throw new Error("Store ID not found in context.");
		}

		const productIds = parsedInput.cartItems.map((c) => c.productId);

		const customerData: CustomerInsert = {
			full_name: parsedInput.name,
			address: parsedInput.address,
			email: parsedInput.email,
			phone: parsedInput.phone,
			store_id: storeId,
		};

		try {
			return await db.transaction(async (tx) => {
				// 1. Fetch products and validate availability
				const productRows = await tx
					.select({
						id: ProductTable.id,
						price: ProductTable.price,
						name: ProductTable.name,
						stock: ProductTable.stock,
						is_published: ProductTable.is_published,
					})
					.from(ProductTable)
					.where(
						and(
							eq(ProductTable.store_id, storeId),
							inArray(ProductTable.id, productIds),
						),
					);

				// Validate all products exist and are available
				const productMap = new Map(productRows.map((p) => [p.id, p]));

				for (const cartItem of parsedInput.cartItems) {
					const product = productMap.get(cartItem.productId);

					if (!product) {
						throw new Error(`Product with ID ${cartItem.productId} not found.`);
					}

					if (!product.is_published) {
						throw new Error(
							`Product "${product.name}" is not available for purchase.`,
						);
					}

					if (product.stock !== null && product.stock < cartItem.quantity) {
						throw new Error(
							`Insufficient stock for product "${product.name}". Available: ${product.stock}, Requested: ${cartItem.quantity}`,
						);
					}
				}

				// 2. Upsert customer (improved logic)
				let customer_id: string | undefined;
				const [customer] = await tx
					.insert(CustomerTable)
					.values(customerData)
					.onConflictDoNothing()
					.returning();

				if (customer) {
					customer_id = customer.id;
				} else {
					// If no ID returned, it means the customer already exists
					const cus = await tx
						.select({ id: CustomerTable.id })
						.from(CustomerTable)
						.where(
							and(
								eq(CustomerTable.store_id, storeId),
								eq(CustomerTable.email, parsedInput.email),
							),
						)
						.limit(1);
					customer_id = cus[0]?.id;
				}

				if (!customer_id) {
					throw new Error("Could not find or create customer.");
				}

				// 3. Build order items with proper decimal handling
				const items = parsedInput.cartItems.map((c) => {
					const product = productMap.get(c.productId)!;
					return {
						productId: c.productId,
						qty: c.quantity,
						price: product.price,
						snapshot: {
							name: product.name,
							price: product.price,
							sku: product.stock,
							// TODO: add sku
						},
					};
				});

				// 4. Calculate total with proper decimal precision
				const total = items.reduce(
					(sum, item) => sum + Number(item.price) * item.qty,
					0,
				);

				// Round to 2 decimal places for monetary precision
				const roundedTotal = Math.round(total * 100) / 100;

				// 5. Create the order
				const [order] = await tx
					.insert(OrderTable)
					.values({
						store_id: storeId,
						customer_id,
						status: "PENDING",
						total_amount: roundedTotal.toString(),
						shipping_address: {
							full_name: parsedInput.name,
							email: parsedInput.email,
							phone: parsedInput.phone,
							street_address: parsedInput.address,
							city: parsedInput.city,
							country: parsedInput.country,
							postal_code: parsedInput.postalCode,
							state: parsedInput.state,
						},
					})
					.returning({ id: OrderTable.id });

				if (!order) {
					throw new Error("Failed to create order.");
				}

				// 6. Create order items
				const orderItems: OrderItemInsert[] = items.map((item) => ({
					store_id: storeId,
					order_id: order.id,
					product_id: item.productId,
					quantity: item.qty,
					price_at_purchase: item.price.toString(),
					product_snapshot: item.snapshot,
				}));

				await tx.insert(OrderItemTable).values(orderItems);

				// 7. Update product stock (if stock tracking is enabled)
				for (const item of items) {
					const product = productMap.get(item.productId)!;
					if (product.stock !== null) {
						await tx
							.update(ProductTable)
							.set({
								stock: product.stock - item.qty,
								updated_at: new Date(),
							})
							.where(eq(ProductTable.id, item.productId));
					}
				}

				// 8. Publish order.created event for integrations
				// Note: Using .catch() to prevent event publishing failures from affecting the order
				// FIX: remove it out of the transaction
				publishEvent("order.created", storeId, {
					orderId: order.id,
					customerId: customer_id,
					totalAmount: roundedTotal,
					itemCount: items.length,
					shippingAddress: {
						full_name: parsedInput.name,
						email: parsedInput.email,
						city: parsedInput.city,
						country: parsedInput.country,
						phone: parsedInput.phone,
						street_address: parsedInput.address,
						state: parsedInput.state,
						postal_code: parsedInput.postalCode,
					},
					items: items.map((item) => ({
						productId: item.productId,
						productName: item.snapshot.name,
						quantity: item.qty,
						price: item.price,
					})),
				}).catch((error) => {
					// Log error but don't fail the order
					console.error("Failed to publish order.created event:", error);
				});

				return {
					success: true,
					message: "Order placed successfully!",
					orderId: order.id,
				};
			});
		} catch (error) {
			// Return consistent error format
			console.error(error);
			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: "An unexpected error occurred during checkout.",
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	});
