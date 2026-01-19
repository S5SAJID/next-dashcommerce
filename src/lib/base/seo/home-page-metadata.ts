import { Metadata } from "next";

export const homePageMetaData: Metadata = {
	title: "S5ARC | Launch Your Online Store in 60s for Free.",
	description:
		"Launch your online store in 60 seconds—absolutely free. Perfect for COD businesses in Pakistan & India. No coding, no credit card, no complexity. Start selling today.",
	authors: [{ name: "S5SAJID", url: "https://s5sajid.github.io" }],
	publisher: "S5ARC",
	twitter: {
		card: "summary_large_image",
		title: "S5ARC | The Easiest Ecommerce Platform",
		description:
			"Launch your store in seconds before lunch. Free, fast, and start earning.",
		creator: "@s5sajid_dev",
	},
	openGraph: {
		title: "S5ARC | Start Your Online Store in Seconds",
		description:
			"Built for non-tech founders. No coding, no monthly fees. Start selling with Cash on Delivery support today.",
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
			name: "S5ARC",
			url: "https://www.s5arc.store",
			applicationCategory: "BusinessApplication",
			operatingSystem: "All",
			description:
				"The easiest ecommerce platform for Cash on Delivery businesses. Launch your store in 60 seconds with no-code tools.",
			offers: {
				"@type": "Offer",
				price: "0.00",
				priceCurrency: "USD",
				availability: "https://schema.org/InStock",
			},
			creator: { "@id": "https://s5sajid.github.io" },
		},
		{
			"@type": "Organization",
			"@id": "https://www.s5arc.store",
			name: "S5ARC",
			url: "https://www.s5arc.store",
			logo: "https://www.s5arc.store/favico.svg",
			sameAs: [
				"https://twitter.com/s5sajid_dev",
				"https://github.com/S5SAJID/next-dashcommerce",
			],
		},
		{
			"@type": "Person",
			"@id": "https://s5sajid.github.io",
			name: "S5SAJID",
			url: "https://s5sajid.github.io",
			jobTitle: "Founder & Lead Developer",
			knowsAbout: [
				"Ecommerce",
				"Next.js",
				"Software Development",
				"website development",
			],
		},
		{
			"@type": "FAQPage",
			"@id": "https://www.s5arc.store#faq",
			mainEntity: [
				{
					"@type": "Question",
					name: "Is S5ARC really free to use?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Yes, S5ARC is currently in beta and completely free. You can create your store, add unlimited products, and start selling without any credit card or payment required.",
					},
				},
				{
					"@type": "Question",
					name: "Do I need coding skills to use S5ARC?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "No coding skills required. S5ARC is built for non-technical founders and small business owners. Simply add your products, customize your store name, and share your link.",
					},
				},
				{
					"@type": "Question",
					name: "What is Cash on Delivery (COD) and does S5ARC support it?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Cash on Delivery means your customers pay when they receive the product, not online. Yes, S5ARC is specifically built for COD businesses popular in Pakistan, India, and other South Asian markets.",
					},
				},
				{
					"@type": "Question",
					name: "How long does it take to set up my online store?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "You can have your store live in under 60 seconds. Create an account, claim your store name, add your first product, and you're ready to share your link.",
					},
				},
				{
					"@type": "Question",
					name: "Can I use my own domain name?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Currently, you get a free subdomain like yourstore.s5arc.store. Custom domain support is on our roadmap for future updates.",
					},
				},
				{
					"@type": "Question",
					name: "What features are included in the free plan?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "You get unlimited products, order management, customer tracking, COD payment support, image hosting, and your own storefront. No hidden fees or limitations during beta.",
					},
				},
				{
					"@type": "Question",
					name: "Which countries is S5ARC best suited for?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "S5ARC works globally, but it's particularly optimized for Cash on Delivery businesses in Pakistan, India, Bangladesh, and other markets where COD is the preferred payment method.",
					},
				},
				{
					"@type": "Question",
					name: "Can I integrate S5ARC with other tools?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Yes! We provide a REST API for developers to build custom integrations. You can connect S5ARC with your existing tools or build custom workflows.",
					},
				},
			],
		},
	],
};
