import { TypedNextResponse } from "next-rest-framework";
import { NextRequest } from "next/server";
import z from "zod";

export const COMMON_API_ERRORS = [
	{
		status: 401,
		contentType: "application/json",
		body: z.object({ error: z.string() }),
	},
	{
		status: 403,
		contentType: "application/json",
		body: z.object({ error: z.string() }),
	},
];

export async function checkAPIKeyFromAPI(req: NextRequest) {
	// just check api-key availbility, rest is handled by dashboardActionClient
	const apiKey = req.headers.get("x-api-key");
	if (!apiKey) {
		return TypedNextResponse.json(
			{ error: "API key required" },
			{ status: 401 }
		);
	}
}
