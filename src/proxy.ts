import { type NextRequest, NextResponse } from "next/server";
import { extractSubdomain } from "./lib/subdomain";

export const proxy = (request: NextRequest) => {
	// first we wanna see if the request is from localhost or not if so then we wanna disable cors
	const { pathname, search } = request.nextUrl; // also used for subdoman
	const subdomain = extractSubdomain(request);

	if (subdomain && pathname.startsWith("/")) {
		return NextResponse.rewrite(
			new URL(`/store/${subdomain}${pathname}${search}`, request.url),
		);
	}

	// On the root domain, allow normal access
	return NextResponse.next();
};

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
