import { docsRoute } from "next-rest-framework";

export const { GET } = docsRoute({
	openApiObject: {
		info: {
			title: "S5ARC. API Documentation",
			version: "1.0.0",
			description: "API documentation for S5ARC.",
			contact: {
				email: "s5sajidyt+s5arc_dev@gmail.com",
				name: "S5SAJID (SajidUllah K.)",
				url: "https://s5sajid.github.io",
			},
		},
		components: {
			securitySchemes: {
				"x-api-key": {
					type: "apiKey",
					in: "header",
					name: "X-API-Key",
					description: "API Key required for authentication.",
				},
			},
		},
		security: [
			{
				"x-api-key": [],
			},
		],
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
