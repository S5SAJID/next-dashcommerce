import { getDashboardCustomers } from "@/db/actions/dashboard/customers/actions";
import { apiDashboardCustomerSchema } from "@/lib/apis/schemas/customers";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { ApiMetadata } from "@/lib/apis/types";
import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import z from "zod";

const listCustomersMetadata: ApiMetadata = {
	tags: ["Customers"],
};

export const { GET } = route({
	listCustomers: routeOperation({
		method: "GET",
		openApiOperation: listCustomersMetadata,
	})
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ data: z.array(apiDashboardCustomerSchema) }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async () => {
			// Call Server Action directly - it will see the x-api-key header!
			const result = await getDashboardCustomers();

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Extract the actual data from SafeActionResult
			const customers = result?.data ?? [];

			return TypedNextResponse.json({ data: customers }, { status: 200 });
		}),
});
