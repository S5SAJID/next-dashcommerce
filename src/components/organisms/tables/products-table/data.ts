import { z } from "zod";

export const productSchema = z.object({
	name: z.string().nonempty(),
	price: z.number().nonnegative(),
	collections: z.array(z.string()).optional(),
	img: z.url().default("https://via.placeholder.com/150"),
	status: z.enum(["active", "inactive"]),
});

export type Product = z.infer<typeof productSchema>;

export const products: Product[] = [
	{
		name: "Azure Drift",
		img: "/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_0-OPBBr1ShXHAVNYJwN4k5KIcu6mMEG3.jpg",
		collections: ["bags", "accessories"],
		price: 500,
		status: "active",
	},
	{
		name: "Ocean Bloom",
		img: "/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_3-CcEwpnzNztUrPTdfCTDe06CKyd8o61.jpg",
		collections: ["bags", "accessories"],
		price: 450,
		status: "active",
	},
	{
		name: "Beneath the Starless Sky",
		img: "/storefront/demo/products/Leonardo_Phoenix_product_image_of_a_book_cover_for_an_PDF_for_1-4XHf0tvsC3ySb4h5UYQRRM5gAOFVN0.jpg",
		collections: ["books"],
		price: 39,
		status: "inactive",
	},
	{
		name: "Le Bag Autre",
		img: "/storefront/demo/products/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfR05sR0lPdnJHZWRqZUtSZzlDUllxcmdV00ZcGYrZW8-crUhizquEMt0UF83hcyRdVXq4IH7Tu.avif",
		collections: ["bags", "accessories"],
		price: 1999,
		status: "active",
	},
	{
		name: "Aqua Stride Bottle",
		img: "/storefront/demo/products/Default_product_image_of_a_bottle_for_ecommerce_website_minim_2-GOjCmiuwEPPLwzFxtjnHCNSJ7Zy5Ut.jpg",
		collections: ["bottole", "daily"],
		price: 99,
		status: "active",
	},
	{
		name: "Cloud Nine Hoodie",
		img: "/storefront/demo/products/Default_product_image_of_a_hoodie_for_ecommerce_website_1-R3UTsUqqrEpZSAKXsUYe9IRDvqqZfs.jpg",
		collections: ["t-shirts", "tops"],
		price: 90,
		status: "active",
	},
	{
		name: "Zebra Blend T-Shirt",
		img: "/storefront/demo/products/Default_product_image_of_a_tshirt_for_ecommerce_website_minim_3-EUmRjcP3ZstQY0gskRoEHRZIxX6YJv.jpg",
		collections: ["t-shirts", "tops"],
		price: 50,
		status: "active",
	},
	{
		name: "Horizon Gaze Sunglasses",
		img: "/storefront/demo/products/36f6d2f6c696e6b732f4d44423859574e6a6446387854334.avif",
		collections: ["glasses", "accessories"],
		price: 50,
		status: "active",
	},
	{
		name: "Shadow Stride Shoes",
		img: "/storefront/demo/products/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfUnYydHRDRUNnb2dxSVhiOEtueEw4NGhk00gGycRyUx-oA5kIVgdS3KV66mv5BGQ9QcWFneSw2.avif",
		collections: ["shoes", "accessories"],
		price: 120,
		status: "inactive",
	},
	{
		name: "Sunbeam Tote",
		img: "/storefront/demo/products/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfVkxjN29KOEF1TG9NR0hLQlZwblRDWlJM00MJ1j137t-bnJi98uwa5mJ73gdBQ6jxyMZrERJks.avif",
		collections: ["bag", "accessories"],
		price: 99,
		status: "active",
	},
];
