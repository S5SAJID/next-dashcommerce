import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import { getDashboardProducts } from "@/db/actions/dashboard/products/actions";
import z from "zod";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { apiDashboardProductSchema } from "@/lib/apis/schemas/products";

export const { GET } = route({
	list: routeOperation({ method: "GET" })
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ data: z.array(apiDashboardProductSchema) }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async () => {
			// Call Server Action directly - it will see the x-api-key header!
			const result = await getDashboardProducts();

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Extract the actual data from SafeActionResult
			const products = result?.data ?? [];

			return TypedNextResponse.json({ data: products }, { status: 200 });
		}),
});
