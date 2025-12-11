import { Metadata } from "next";

export const homePageMetaData: Metadata = {
	title: "S5ARC | The Easiest Ecommerce Platform",
	description:
		"S5ARC: The easiest ecommerce platform. Add Products, launch, and grow your online store effortlessly. Start selling products and succeed online with our intuitive tools.",
	keywords: [
		"Ecommerce",
		"S5ARC",
		"Easiest Ecommerce Platform",
		"Online Store",
		"Sell Products Online",
		"E-commerce Solutions",
		"Small Business E-commerce",
		"Launch Online Store",
		"Digital Commerce",
		"Product Selling Platform",
		"Shopify Alternative",
		"WooCommerce Alternative",
		"E-commerce for Beginners",
		"Grow Your Business Online",
	],
	authors: [{ name: "S5SAJID", url: "https://s5sajid.github.io" }],
	publisher: "S5ARC",
	twitter: {
		card: "summary_large_image",
		title: "S5ARC | The Easiest Ecommerce Platform",
		description:
			"S5ARC: The easiest ecommerce platform. Add Products, launch, and grow your online store effortlessly. Start selling products and succeed online with our intuitive tools.",
		creator: "@s5sajid_dev",
	},
	icons: [
		"/favico.svg"
	],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};