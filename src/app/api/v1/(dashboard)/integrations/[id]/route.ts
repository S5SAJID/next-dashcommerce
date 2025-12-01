import {
	createIntegrationInstallation,
	deleteIntegrationInstallation,
	getDashboardIntegration,
	getIntegrationInstallation,
	updateIntegrationInstallation,
} from "@/db/actions/dashboard/integrations/actions";
import {
	apiDashboardIntegrationDefinitionSchema,
	apiDashboardIntegrationInstallationSchema,
} from "@/lib/apis/schemas/integrations";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { ApiMetadata } from "@/lib/apis/types";
import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import z from "zod";

const installIntegrationSchema = z.object({
	config: z.record(z.string(), z.string()),
});

const updateIntegrationSchema = z.object({
	installationId: z.uuid(),
	config: z.record(z.string(), z.string()),
});

const getIntegrationMetadata: ApiMetadata = {
	tags: ["Integrations"],
};

const installIntegrationMetadata: ApiMetadata = {
	tags: ["Integrations"],
};

const updateIntegrationMetadata: ApiMetadata = {
	tags: ["Integrations"],
};

const uninstallIntegrationMetadata: ApiMetadata = {
	tags: ["Integrations"],
};

export const { GET, POST, PATCH, DELETE } = route({
	getIntegration: routeOperation({
		method: "GET",
		openApiOperation: getIntegrationMetadata,
	})
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({
					definition: apiDashboardIntegrationDefinitionSchema,
					installation: apiDashboardIntegrationInstallationSchema.nullable(),
				}),
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

			// Get integration definition
			const definitionResult = await getDashboardIntegration({ id });

			if (definitionResult?.serverError) {
				return TypedNextResponse.json(
					{ error: definitionResult.serverError },
					{ status: 403 }
				);
			}

			const definition = definitionResult?.data;

			if (!definition) {
				return TypedNextResponse.json(
					{ error: "Integration not found" },
					{ status: 404 }
				);
			}

			// Get installation status
			const installationResult = await getIntegrationInstallation({
				integrationId: id,
			});

			const installation = installationResult?.data ?? null;

			return TypedNextResponse.json(
				{ definition, installation },
				{ status: 200 }
			);
		}),

	installIntegration: routeOperation({
		method: "POST",
		openApiOperation: installIntegrationMetadata,
	})
		.input({
			contentType: "application/json",
			body: installIntegrationSchema,
		})
		.outputs([
			{
				status: 201,
				contentType: "application/json",
				body: z.object({
					message: z.string(),
					installation: apiDashboardIntegrationInstallationSchema,
				}),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (req, _ctx) => {
			const { id } = _ctx.params;
			const body = await req.json();

			const result = await createIntegrationInstallation({
				integrationId: id,
				config: body.config,
			});

			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			if (!result?.data?.success || !result.data.installation) {
				return TypedNextResponse.json(
					{ error: "Failed to install integration" },
					{ status: 500 }
				);
			}

			return TypedNextResponse.json(
				{
					message: "Integration installed successfully",
					installation: result.data.installation,
				},
				{ status: 201 }
			);
		}),

	updateIntegration: routeOperation({
		method: "PATCH",
		openApiOperation: updateIntegrationMetadata,
	})
		.input({
			contentType: "application/json",
			body: updateIntegrationSchema,
		})
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({
					message: z.string(),
					installation: apiDashboardIntegrationInstallationSchema,
				}),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (req) => {
			const body = await req.json();

			const result = await updateIntegrationInstallation({
				installationId: body.installationId,
				config: body.config,
			});

			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			if (!result?.data?.success || !result.data.installation) {
				return TypedNextResponse.json(
					{ error: "Failed to update integration" },
					{ status: 500 }
				);
			}

			return TypedNextResponse.json(
				{
					message: "Integration updated successfully",
					installation: result.data.installation,
				},
				{ status: 200 }
			);
		}),

	uninstallIntegration: routeOperation({
		method: "DELETE",
		openApiOperation: uninstallIntegrationMetadata,
	})
		.input({
			contentType: "application/json",
			body: z.object({
				installationId: z.uuid(),
			}),
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

			const result = await deleteIntegrationInstallation({
				installationId: body.installationId,
			});

			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			return TypedNextResponse.json(
				{
					message:
						result?.data?.message || "Integration uninstalled successfully",
				},
				{ status: 200 }
			);
		}),
});
