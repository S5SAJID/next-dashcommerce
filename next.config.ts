import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			// For Demo Products
			{ hostname: "cdn.dummyjson.com" },
		],
	},
	experimental: {
		typedEnv: true,
		
		serverActions: {
			// 5mb for uploading images to local storage
			bodySizeLimit: process.env.NODE_ENV === "development" ? "5mb" : "1mb",
		},
	},
};

export default nextConfig;
