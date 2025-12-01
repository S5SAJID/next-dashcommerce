import { getDashboardIntegrations } from "@/db/actions/dashboard/integrations/actions";
import { apiDashboardIntegrationDefinitionSchema } from "@/lib/apis/schemas/integrations";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { ApiMetadata } from "@/lib/apis/types";
import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import z from "zod";

const listIntegrationsMetadata: ApiMetadata = {
	tags: ["Integrations"],
};

export const { GET } = route({
	listIntegrations: routeOperation({
		method: "GET",
		openApiOperation: listIntegrationsMetadata,
	})
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({
					data: z.array(apiDashboardIntegrationDefinitionSchema),
				}),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async () => {
			const result = await getDashboardIntegrations();

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Extract the actual data from SafeActionResult
			const integrations = result?.data ?? [];

			return TypedNextResponse.json({ data: integrations }, { status: 200 });
		}),
});
