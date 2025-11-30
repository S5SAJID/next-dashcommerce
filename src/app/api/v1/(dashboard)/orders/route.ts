import { getDashboardOrders } from "@/db/actions/dashboard/orders/actions";
import { apiDashboardOrderSchema } from "@/lib/apis/schemas/orders";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import z from "zod";

export const { GET } = route({
	listOrders: routeOperation({ method: "GET" })
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ data: z.array(apiDashboardOrderSchema) }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async () => {
			// Call Server Action directly - it will see the x-api-key header!
			const result = await getDashboardOrders();

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Extract the actual data from SafeActionResult
			const orders = result?.data ?? [];

			return TypedNextResponse.json({ data: orders }, { status: 200 });
		}),
});
