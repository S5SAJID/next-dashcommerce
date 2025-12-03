import { type NextRequest, NextResponse } from "next/server";
import { extractSubdomain } from "./lib/subdomain";

export const proxy = (request: NextRequest) => {
	// first we wanna see if the request is from localhost or not if so then we wanna disable cors
	const { pathname, search } = request.nextUrl; // also used for subdoman
	if (pathname.startsWith("/api")) {
		if (request.method === "OPTIONS") {
			const response = new NextResponse(null, { status: 204 });
			handleLocalhostCORS(request, response);
			return response;
		}

		const response = NextResponse.next();
		handleLocalhostCORS(request, response);
		return response;
	}

	// subdomain part
	const subdomain = extractSubdomain(request);

	if (subdomain && pathname.startsWith("/")) {
		// Block access to admin page from subdomains
		// if (pathname.startsWith('/admin')) {
		//   return NextResponse.redirect(new URL('/', request.url));
		// }
		// For the root path on a subdomain, rewrite to the subdomain page
		// if (pathname === '/') {
		return NextResponse.rewrite(
			new URL(`/store/${subdomain}${pathname}${search}`, request.url)
		);
	}

	const response = NextResponse.next();

	// On the root domain, allow normal access
	return NextResponse.next();
};

// Function to handle dynamic CORS headers for localhost
function handleLocalhostCORS(request: NextRequest, response: NextResponse) {
	// Check environment first: only run this logic if we are in development
	if (process.env.NODE_ENV !== "development") {
		return;
	}

	const origin = request.headers.get("origin");
	const localhostRegex = /^https?:\/\/localhost(:\d+)?$/;

	if (origin && localhostRegex.test(origin)) {
		response.headers.set("Access-Control-Allow-Origin", origin);
		response.headers.set(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		response.headers.set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization, X-API-Key"
		);
		response.headers.set("Access-Control-Allow-Credentials", "true");
	}
}

// const developmentMatcher = "/((?!_next|[\\w-]+\\.\\w+).*)"; // Matches everything
// const productionMatcher = "/((?!api|_next|[\\w-]+\\.\\w+).*)"; // Excludes /api routes

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. all root files inside /public (e.g. /favicon.ico)
		 */
		"/((?!_next|[\\w-]+\\.\\w+).*)", // convert to production one when deploying
	],
};
