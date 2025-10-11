import { db } from "@/db/db"
import { CustomerTable, OrderItemTable, OrderTable } from "@/db/schema";
import { count, desc, eq } from "drizzle-orm";

export async function getDashboardOrders() {
  // TODO: Make it use to get specific user based products
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
    // Use a LEFT JOIN for customers because an order might not have a customer (guest checkout)
    .leftJoin(CustomerTable, eq(OrderTable.customer_id, CustomerTable.id))
    // Use a LEFT JOIN for items in case an order somehow has 0 items. It's safer.
    .leftJoin(OrderItemTable, eq(OrderTable.id, OrderItemTable.order_id))
    // When using an aggregate function (count), you MUST group by the other selected columns
    .groupBy(OrderTable.id, CustomerTable.id)
    .orderBy(desc(OrderTable.created_at)) // Show the most recent orders first

    return orders
}