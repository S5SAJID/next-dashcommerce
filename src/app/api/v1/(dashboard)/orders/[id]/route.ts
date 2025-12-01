import {
	getDashboardOrder,
	updateOrderStatus,
} from "@/db/actions/dashboard/orders/actions";
import { apiDashboardOrderDetailsSchema } from "@/lib/apis/schemas/orders";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { ApiMetadata } from "@/lib/apis/types";
import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import z from "zod";

const updateOrderStatusSchema = z.object({
	status: z.enum([
		"PENDING",
		"PROCESSING",
		"SHIPPED",
		"DELIVERED",
		"CANCELLED",
	]),
});

const getOrderMetadata: ApiMetadata = {
	tags: ["Orders"],
};

const updateOrderMetadata: ApiMetadata = {
	tags: ["Orders"],
};

export const { GET, PATCH } = route({
	getOrder: routeOperation({
		method: "GET",
		openApiOperation: getOrderMetadata,
	})
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

	updateOrder: routeOperation({
		method: "PATCH",
		openApiOperation: updateOrderMetadata,
	})
		.input({
			contentType: "application/json",
			body: updateOrderStatusSchema,
		})
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ message: z.string() }),
			},
			{
				status: 404,
				contentType: "application/json",
				body: z.object({ error: z.string() }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (req, _ctx) => {
			const { id } = _ctx.params;
			const body = await req.json();

			const result = await updateOrderStatus({
				orderId: id,
				status: body.status,
			});

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			return TypedNextResponse.json(
				{ message: "Order status updated successfully" },
				{ status: 200 }
			);
		}),
});
