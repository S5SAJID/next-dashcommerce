import { Metadata } from "next";

export const homePageMetaData: Metadata = {
	title: "S5ARC | Launch Your Online Store in 60s for Free.",
	description: "Launch your online store in 60 seconds—absolutely free. Perfect for COD businesses in Pakistan & India. No coding, no credit card, no complexity. Start selling today.",
	authors: [{ name: "S5SAJID", url: "https://s5sajid.github.io" }],
	publisher: "S5ARC",
	twitter: {
		card: "summary_large_image",
		title: "S5ARC | The Easiest Ecommerce Platform",
		description: "Launch your store in seconds before lunch. Free, fast, and start earning.",
		creator: "@s5sajid_dev",
	},
	openGraph: {
		title: "S5ARC | Start Your Online Store in Seconds",
		description: "Built for non-tech founders. No coding, no monthly fees. Start selling with Cash on Delivery support today.",
		url: "https://www.s5arc.store",
		siteName: "S5ARC",
		// images: [{
		// 	url: "https://www.s5arc.store", // Ensure this exists
		// 	width: 1200,
		// 	height: 630,
		// 	alt: "S5ARC Dashboard Preview"
		// }],
		locale: "en_US",
		type: "website",
	},
	icons: ["/favico.svg"],
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
	alternates: {
		canonical: "https://www.s5arc.store",
	},
};


export const homePageJsonLD = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebApplication",
			"@id": "https://www.s5arc.store",
			"name": "S5ARC",
			"url": "https://www.s5arc.store",
			"applicationCategory": "BusinessApplication",
			"operatingSystem": "All",
			"description": "The easiest ecommerce platform for Cash on Delivery businesses. Launch your store in 60 seconds with no-code tools.",
			"offers": {
				"@type": "Offer",
				"price": "0.00",
				"priceCurrency": "USD",
				"availability": "https://schema.org/InStock"
			},
			"creator": { "@id": "https://s5sajid.github.io" }
		},
		{
			"@type": "Organization",
			"@id": "https://www.s5arc.store",
			"name": "S5ARC",
			"url": "https://www.s5arc.store",
			"logo": "https://www.s5arc.store/favico.svg",
			// "sameAs": [
			// 	"https://twitter.com/s5sajid_dev",
			// 	"https://github.com/S5SAJID/next-dashcommerce"
			// ]
		},
		{
			"@type": "Person",
			"@id": "https://s5sajid.github.io",
			"name": "S5SAJID",
			"url": "https://s5sajid.github.io",
			"jobTitle": "Founder & Lead Developer",
			"knowsAbout": ["Ecommerce", "Next.js", "Software Development", "website development"]
		}
	]
}