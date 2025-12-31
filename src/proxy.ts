import { type NextRequest, NextResponse } from "next/server";
import { extractSubdomain } from "./lib/subdomain";
import { auth } from "./lib/auth/auth";
import { headers } from "next/headers";

export const proxy = async (request: NextRequest) => {
	// first we wanna see if the request is from localhost or not if so then we wanna disable cors
	const { pathname, search } = request.nextUrl; // also used for subdoman
	const subdomain = extractSubdomain(request);

	// Storefront management
	if (subdomain && pathname.startsWith("/")) {
		return NextResponse.rewrite(
			new URL(`/store/${subdomain}${pathname}${search}`, request.url),
		);
	}

	if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return NextResponse.redirect(new URL("/signin", request.url));
		}
	}

	// Redirect authenticated users with storeId away from auth routes
	if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (session != null && session.user.storeId != null) {
			return NextResponse.redirect(new URL("/products", request.url));
		}
	}

	// On the root domain, allow normal access
	return NextResponse.next();
};

// const developmentMatcher = "/((?!_next|[\\w-]+\\.\\w+).*)"; // Matches everything
// const productionMatcher = "/((?!api|_next|[\\w-]+\\.\\w+).*)"; // Excludes /api routes

const PROTECTED_ROUTES = ["/products", "/customers", "/orders", "/settings"];
const AUTH_ROUTES = [
	"/signin",
	"/signup",
	"/reset-password",
	"/forgot-password",
];

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. all root files inside /public (e.g. /favicon.ico)
		 */
		"/((?!api|_next|[\\w-]+\\.\\w+).*)", // convert to production one when deploying
	],
};
