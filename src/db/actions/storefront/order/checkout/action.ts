"use server";
import { checkoutFormSchema } from "@/components/storefront/organisms/forms/checkout/schema";
import { db } from "@/db/db";
import {
  CustomerTable,
  OrderItemTable,
  OrderTable,
  ProductTable,
} from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { and, eq, inArray } from "drizzle-orm";

type CustomerInsert = typeof CustomerTable.$inferInsert;
type OrderItemInsert = typeof OrderItemTable.$inferInsert;

export const checkoutFormAction = actionClient
  .inputSchema(checkoutFormSchema)
  .action(async ({ parsedInput }) => {
    const store_id = "a66ba6dc-e9a5-4d17-a2fb-50c85c504f37"; // TODO: Fix hardcoded
    const productIds = parsedInput.cartItems.map((c) => c.productId);

    const customerData: CustomerInsert = {
      full_name: parsedInput.name,
      address: parsedInput.address,
      email: parsedInput.email,
      phone: parsedInput.phone,
      store_id: store_id,
    };

    try {
      return await db.transaction(async (tx) => {
        // upsert customer
        const [customer] = await tx
          .insert(CustomerTable)
          .values(customerData)
          .onConflictDoNothing()
          .returning();
        const customer_id =
          customer.id ??
          (await tx
            .select({ id: CustomerTable.id })
            .from(CustomerTable)
            .where(
              and(
                eq(CustomerTable.store_id, store_id),
                eq(CustomerTable.email, parsedInput.email)
              )
            )
            .then((r) => r[0]!.id));
        if (!customer_id) {
          throw new Error("Could not find or create customer.");
        }

        // fetch current prices and build snapshot
        const productRows = await tx
          .select({
            id: ProductTable.id,
            price: ProductTable.price,
            name: ProductTable.name,
          })
          .from(ProductTable)
          .where(
            and(
              eq(ProductTable.store_id, store_id),
              inArray(ProductTable.id, productIds)
            )
          );

        // Use a Map for O(1) lookup to improve performance.
        const productMap = new Map(productRows.map((p) => [p.id, p]));

        // Build the items list.
        const items = parsedInput.cartItems.map((c) => {
          const p = productMap.get(c.productId);
          if (!p) {
            throw new Error(`Product with ID ${c.productId} not found.`);
          }
          return {
            productId: c.productId,
            qty: c.quantity,
            price: p.price,
            snapshot: { name: p.name, price: p.price },
          };
        });

        // Calculate total amount. Use `toFixed` for safe monetary calculations if needed later.
        const total = items.reduce((s, i) => s + Number(i.price) * i.qty, 0);

        // 5. Create the order.
        const [order] = await tx
          .insert(OrderTable)
          .values({
            store_id: store_id,
            customer_id: customer_id,
            status: "PENDING",
            total_amount: total.toString(),
          })
          .returning({ id: OrderTable.id });

        if (!order) {
          throw new Error("Failed to create order.");
        }

        // 6. Create line items using a single bulk insert.
        const orderItems: OrderItemInsert[] = items.map((i) => ({
          store_id: store_id,
          order_id: order.id,
          product_id: i.productId,
          quantity: i.qty,
          price_at_purchase: i.price.toString(),
          product_snapshot: i.snapshot,
        }));

        await tx.insert(OrderItemTable).values(orderItems);

        return {
          success: true,
          message: "Order placed successfully!",
          orderId: order.id,
        };
      });
    } catch (error) {
      // Catch any errors that occur during the transaction and return a generic error message.
      console.error('Checkout failed:', error);
      return { error: 'An unexpected error occurred during checkout.' };
    }
  });
