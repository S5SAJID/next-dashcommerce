import type { NextRequest } from "next/server";

export const rootDomain = process.env.CUSTOM_ROOT_DOMAIN || "localhost:3000";

const localhostSubdomainRegex = /http:\/\/([^.]+)\.localhost/;

export function extractSubdomain(request: NextRequest): string | null {
	const host = request.headers.get("host") || "";
	const hostname = host.split(":")[0];

	// Local development environment
	if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
		// Try to extract subdomain from the full URL
		const fullUrlMatch = hostname.match(localhostSubdomainRegex);
		if (fullUrlMatch?.[1]) {
			return fullUrlMatch[1];
		}

		// Fallback to host header approach
		if (hostname.includes(".localhost")) {
			return hostname.split(".")[0];
		}

		return null;
	}

	// Production environment
	const rootDomainFormatted = rootDomain.split(":")[0];

	// Handle preview deployment URLs (tenant---branch-name.vercel.app)
	if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
		const parts = hostname.split("---");
		return parts.length > 0 ? parts[0] : null;
	}

	// Regular subdomain detection
	const isSubdomain =
		hostname !== rootDomainFormatted &&
		hostname !== `www.${rootDomainFormatted}` &&
		hostname.endsWith(`.${rootDomainFormatted}`);

	// Log the info for debugging purposes
	// console.log({
	// 	host,
	// 	hostname,
	// 	ENV_DOMAIN: rootDomain,
	// 	isSubdomain,
	// });

	return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, "") : null;
}

const localhostSubdomainRegexFromString = /http:\/\/([^.]+)\.localhost/;

export function extractSubdomainFromString(url: string): string | null {
	// Properly parse the URL to extract hostname
	let hostname: string;
	try {
		const parsedUrl = new URL(url);
		hostname = parsedUrl.hostname;
	} catch {
		// If URL parsing fails, try extracting hostname manually
		// Remove protocol if present
		const withoutProtocol = url.replace(/^https?:\/\//, "");
		// Get hostname (everything before the first slash or end of string)
		hostname = withoutProtocol.split("/")[0].split(":")[0];
	}

	// Local development environment
	if (url.includes("localhost") || url.includes("127.0.0.1")) {
		// Try to extract subdomain from the full URL
		const fullUrlMatch = url.match(localhostSubdomainRegexFromString);
		if (fullUrlMatch?.[1]) {
			return fullUrlMatch[1];
		}

		// Fallback to host header approach
		if (hostname.includes(".localhost")) {
			return hostname.split(".")[0];
		}

		return null;
	}

	// Production environment
	const rootDomainFormatted = rootDomain.split(":")[0];

	// Handle preview deployment URLs (tenant---branch-name.vercel.app)
	if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
		const parts = hostname.split("---");
		return parts.length > 0 ? parts[0] : null;
	}

	// Regular subdomain detection
	const isSubdomain =
		hostname !== rootDomainFormatted &&
		hostname !== `www.${rootDomainFormatted}` &&
		hostname.endsWith(`.${rootDomainFormatted}`);

	return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, "") : null;
}
