import {
	getDashboardStore,
	updateStoreGeneralSettings,
} from "@/db/actions/dashboard/settings/general/actions";
import { apiDashboardStoreSettingsSchema } from "@/lib/apis/schemas/settings";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import z from "zod";

export const { GET, PATCH } = route({
	getSettings: routeOperation({ method: "GET" })
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ data: apiDashboardStoreSettingsSchema }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async () => {
			const result = await getDashboardStore();

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			const store = result?.data;

			if (!store) {
				return TypedNextResponse.json(
					{ error: "Store not found" },
					{ status: 404 }
				);
			}

			return TypedNextResponse.json({ data: store }, { status: 200 });
		}),

	updateSettings: routeOperation({ method: "PATCH" })
		.input({
			contentType: "application/json",
			body: apiDashboardStoreSettingsSchema.partial(),
		})
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ message: z.string() }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (req) => {
			const body = await req.json();

			const result = await updateStoreGeneralSettings(body);

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			return TypedNextResponse.json(
				{
					message: result?.data?.message || "Settings updated successfully",
				},
				{ status: 200 }
			);
		}),
});
