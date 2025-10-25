/* eslint-disable @typescript-eslint/no-unused-vars */
/** biome-ignore-all lint/correctness/noUnusedVariables: because its just a demo or testing stuff */
import { db } from "@/db/db";
import {
	CustomerTable,
	OrderItemTable,
	OrderTable,
	ProductTable,
	StoreTable,
} from "@/db/schema";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { count, desc, eq } from "drizzle-orm";
import { exit } from "node:process";

async function main() {
	// await insertDemoProducts();
	const _orders = await db
		.select({
			orderId: OrderTable.id,
			status: OrderTable.status,
			totalAmount: OrderTable.total_amount,
			createdAt: OrderTable.created_at,
			// Use the customer's name, but handle guest checkouts (customer_id is nullable)
			// If customer is null, we can display 'Guest'
			customerName: CustomerTable.full_name,
			customerId: CustomerTable.email,
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
		.limit(2);
	exit(0);
}

main();

async function _insertDemoProducts() {
	const store = await db.query.StoreTable.findFirst({
		where: eq(StoreTable.domain, "acme"),
	});

	if (!store) {
		return;
	}

	const demo_insert_products = DEMO_PRODUCTS.map((product) => {
		const { id, category, ...rest } = product;
		return { ...rest, store_id: store.id };
	}) as (typeof ProductTable.$inferInsert)[];

	const _products = await db
		.insert(ProductTable)
		.values(demo_insert_products)
		.returning({ name: ProductTable.name });
}

async function _insertDemoStore() {
	await db.insert(StoreTable).values({
		name: "Acme Store",
		domain: "acme",
		settings: {
			seo: {
				title: "Acme Store | The Best Premium Products Online",
				description:
					"Welcome to Acme Store, your go-to destination for high-quality and premium products. Shop now and experience the best in online shopping.",
				tags: ["premium", "quality", "online shopping", "acme"],
			},
			heroSection: {
				title: "Fast, Quick and Easy",
				description:
					"Discover our exclusive range of premium products designed to meet your needs. Enjoy top-notch quality and exceptional service at Acme Store.",
				image:
					"/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_1-3dgyNymA8r5pCl7OG4nEirKWxLjj3Y.jpg",
				ctaText: "Shop Now",
				ctaLink: "/store/acme.store/products",
				ctaTarget: "self",
			},
		},
	});
	const _store = await db.query.StoreTable.findFirst({
		where: eq(StoreTable.domain, "acme"),
	});
}
