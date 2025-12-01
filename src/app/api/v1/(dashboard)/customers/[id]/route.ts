import { getDashboardCustomer } from "@/db/actions/dashboard/customers/actions";
import { apiDashboardCustomerSchema } from "@/lib/apis/schemas/customers";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { ApiMetadata } from "@/lib/apis/types";
import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import z from "zod";

const getCustomerMetadata: ApiMetadata = {
	tags: ["Customers"],
};

export const { GET } = route({
	getCustomer: routeOperation({
		method: "GET",
		openApiOperation: getCustomerMetadata,
	})
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ data: apiDashboardCustomerSchema }),
			},
			{
				status: 404,
				contentType: "application/json",
				body: z.object({ error: z.string() }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (_req, _ctx) => {
			const { id } = _ctx.params;
			const result = await getDashboardCustomer({ customerId: id });

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Extract the actual data from SafeActionResult
			const customer = result?.data;

			// Handle case where customer is not found
			if (!customer) {
				return TypedNextResponse.json(
					{ error: "Customer not found" },
					{ status: 404 }
				);
			}

			return TypedNextResponse.json({ data: customer }, { status: 200 });
		}),
});
