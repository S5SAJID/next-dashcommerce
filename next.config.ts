import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
    img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
	images: {
		loaderFile: "./src/lib/image-loader.ts",
		remotePatterns: [
			// For Demo Products
			{ hostname: "cdn.dummyjson.com" },
			// For Cloudinary images
			{ hostname: "res.cloudinary.com" },
		],
	},
	async headers() {
		return [{
			source: '/store/:path*',
			headers: [{
				key: 'Content-Security-Policy',
				value: cspHeader
			}]
		}];
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
