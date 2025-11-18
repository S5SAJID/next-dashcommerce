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
	// const _orders = await db
	// 	.select({
	// 		orderId: OrderTable.id,
	// 		status: OrderTable.status,
	// 		totalAmount: OrderTable.total_amount,
	// 		createdAt: OrderTable.created_at,
	// 		// Use the customer's name, but handle guest checkouts (customer_id is nullable)
	// 		// If customer is null, we can display 'Guest'
	// 		customerName: CustomerTable.full_name,
	// 		customerId: CustomerTable.email,
	// 		// We need to aggregate to get the count of items for each order
	// 		itemCount: count(OrderItemTable.id),
	// 	})
	// 	.from(OrderTable)
	// 	// Use a LEFT JOIN for customers because an order might not have a customer (guest checkout)
	// 	.leftJoin(CustomerTable, eq(OrderTable.customer_id, CustomerTable.id))
	// 	// Use a LEFT JOIN for items in case an order somehow has 0 items. It's safer.
	// 	.leftJoin(OrderItemTable, eq(OrderTable.id, OrderItemTable.order_id))
	// 	// When using an aggregate function (count), you MUST group by the other selected columns
	// 	.groupBy(OrderTable.id, CustomerTable.id)
	// 	.orderBy(desc(OrderTable.created_at)) // Show the most recent orders first
	// 	.limit(2);
	// const _store = await _insertDemoProducts()
	// const store = await db.query.StoreTable.findFirst({
	// 	where: eq(StoreTable.domain, "neeba"),
	// });
	// const products = await db.query.ProductTable.findMany({
	// 	columns: {name: true},
	// 	where: eq(ProductTable.store_id, store.id),
	// })
	// console.log(products)
	const producs = await _insertDemoProducts();
	console.log(producs);
	exit(0);
}

main();

function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

async function _insertDemoProducts() {
	const store = await db.query.StoreTable.findFirst({
		where: eq(StoreTable.domain, "sleek"),
	});

	if (!store) {
		return;
	}

  const productsWithoutMetadata: (typeof ProductTable.$inferInsert)[] = [
    {
      name: "Azure Drift Tote",
      slug: "azure-drift-tote",
      description:
        "A stylish and spacious tote bag, perfect for everyday use. Made from high-quality vegan leather.",
      images: [
        "/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_0-OPBBr1ShXHAVNYJwN4k5KIcu6mMEG3.jpg",
      ],
      price: 500,
      compare_at: 650,
      stock: 45,
      sku: "ADT-YLW-001",
      is_published: true,
    },
    {
      name: "Ocean Bloom Crossbody",
      slug: "ocean-bloom-crossbody",
      description:
        "Vibrant and versatile, the Ocean Bloom Crossbody bag adds a pop of color to any outfit.",
      images: [
        "/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_3-CcEwpnzNztUrPTdfCTDe06CKyd8o61.jpg",
      ],
      price: 450,
      compare_at: null,
      stock: 30,
      sku: "OBC-MULTI-002",
      is_published: true,
    },
    {
      name: "Beneath the Starless Sky (Ebook)",
      slug: "beneath-the-starless-sky-ebook",
      description:
        "A gripping sci-fi novel about hope and survival on a distant planet. Digital PDF download.",
      images: [
        "/storefront/demo/products/Leonardo_Phoenix_product_image_of_a_book_cover_for_an_PDF_for_1-4XHf0tvsC3ySb4h5UYQRRM5gAOFVN0.jpg",
      ],
      price: 39,
      compare_at: 49,
      stock: null,
      sku: "BTSS-EBOOK-003",
      is_published: false,
    },
    {
      name: "The 'Autre' Luxury Handbag",
      slug: "the-autre-luxury-handbag",
      description:
        "Exquisite craftsmanship and timeless design. The 'Autre' bag is a statement of luxury.",
      images: [
        "/storefront/demo/products/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfR05sR0lPdnJHZWRqZUtSZzlDUllxcmdV00ZcGYrZW8-crUhizquEMt0UF83hcyRdVXq4IH7Tu.avif",
      ],
      price: 1999,
      compare_at: null,
      stock: 5,
      sku: "TALH-BLK-004",
      is_published: true,
    },
    {
      name: "Aqua Stride Insulated Bottle",
      slug: "aqua-stride-insulated-bottle",
      description:
        "Keep your drinks cold for 24 hours or hot for 12. The perfect companion for any adventure.",
      images: [
        "/storefront/demo/products/Default_product_image_of_a_bottle_for_ecommerce_website_minim_2-GOjCmiuwEPPLwzFxtjnHCNSJ7Zy5Ut.jpg",
      ],
      price: 99,
      compare_at: null,
      stock: 150,
      sku: "ASB-BLUE-005",
      is_published: true,
    },
    {
      name: "Cloud Nine Comfort Hoodie",
      slug: "cloud-nine-comfort-hoodie",
      description:
        "Made from an ultra-soft fleece blend, this hoodie is your new go-to for ultimate comfort.",
      images: [
        "/storefront/demo/products/Default_product_image_of_a_hoodie_for_ecommerce_website_1-R3UTsUqqrEpZSAKXsUYe9IRDvqqZfs.jpg",
      ],
      price: 90,
      compare_at: 120,
      stock: 88,
      sku: "CNCH-WHT-006",
      is_published: true,
    },
    {
      name: "Zebra Blend Cotton T-Shirt",
      slug: "zebra-blend-cotton-t-shirt",
      description:
        "A classic crewneck t-shirt with a unique, subtle zebra-inspired texture. 100% premium cotton.",
      images: [
        "/storefront/demo/products/Default_product_image_of_a_tshirt_for_ecommerce_website_minim_3-EUmRjcP3ZstQY0gskRoEHRZIxX6YJv.jpg",
      ],
      price: 50,
      compare_at: null,
      stock: 210,
      sku: "ZBCT-GRY-007",
      is_published: true,
    },
    {
      name: "Horizon Gaze Aviators",
      slug: "horizon-gaze-aviators",
      description:
        "Timeless aviator style with modern, polarized lenses. Full UV400 protection.",
      images: [
        "/storefront/demo/products/36f6d2f6c696e6b732f4d44423859574e6a6446387854334.avif",
      ],
      price: 50,
      compare_at: 75,
      stock: 75,
      sku: "HGA-GOLD-008",
      is_published: true,
    },
    {
      name: "Shadow Stride Runners",
      slug: "shadow-stride-runners",
      description:
        "Lightweight, breathable, and designed for performance. These runners are built to last.",
      images: [
        "/storefront/demo/products/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfUnYydHRDRUNnb2dxSVhiOEtueEw4NGhk00gGycRyUx-oA5kIVgdS3KV66mv5BGQ9QcWFneSw2.avif",
      ],
      price: 120,
      compare_at: null,
      stock: 0,
      sku: "SSR-BLK-009",
      is_published: false,
    },
    {
      name: "Sunbeam Canvas Tote",
      slug: "sunbeam-canvas-tote",
      description:
        "Durable and bright, this canvas tote is perfect for the market, the beach, or just carrying your essentials.",
      images: [
        "/storefront/demo/products/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfVkxjN29KOEF1TG9NR0hLQlZwblRDWlJM00MJ1j137t-bnJi98uwa5mJ73gdBQ6jxyMZrERJks.avif",
      ],
      price: 99,
      compare_at: null,
      stock: 62,
      sku: "SCT-NAT-010",
      is_published: true,
    },
  ].map(product => ({
    ...product,
    store_id: store.id,
  }));

	type Product = typeof ProductTable.$inferInsert

	const _products = await db
		.insert(ProductTable)
		.values(productsWithoutMetadata)
		.returning({ name: ProductTable.name });

	console.log(_products)
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
