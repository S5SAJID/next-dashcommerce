import { getDashboardOrder } from "@/db/actions/dashboard/orders/actions";
import { apiDashboardOrderDetailsSchema } from "@/lib/apis/schemas/orders";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import z from "zod";

export const { GET } = route({
	getOrder: routeOperation({ method: "GET" })
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ data: apiDashboardOrderDetailsSchema }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (_req, _ctx) => {
			// Call Server Action directly - it will see the x-api-key header!
			const { id } = _ctx.params;
			const result = await getDashboardOrder({ orderId: id });

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Extract the actual data from SafeActionResult
			const order = result?.data;

			// Handle case where order is not found
			if (!order) {
				return TypedNextResponse.json(
					{ error: "Order not found" },
					{ status: 404 }
				);
			}

			return TypedNextResponse.json({ data: order }, { status: 200 });
		}),
});
