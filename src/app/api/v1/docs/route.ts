import { docsRoute } from "next-rest-framework";

export const { GET } = docsRoute({
	openApiObject: {
		info: {
			title: "S5ARC. API Documentation",
			version: "1.0.0",
			description: "API documentation for S5ARC.",
		},
	},
	docsConfig: {
		provider: "redoc",
		title: "S5ARC. API Documentation",
		description: "API documentation for S5ARC.",
		faviconUrl: "/favico.svg",
		logoUrl: "/favico-black.svg",
		ogConfig: {
			imageUrl: "/favico.svg",
			title: "S5ARC. API Documentation",
			type: "website",
			url: "https://localhost:3000/api/v1/docs",
		},
	},
});
