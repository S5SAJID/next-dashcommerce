"use server";

import { db } from "@/db/db";
import {
	IntegrationDefinitionTable,
	IntegrationInstallationTable,
} from "@/db/schema";
import { dashboardActionClient } from "@/lib/safe-action-clients/dashboard-client";
import { and, eq, or } from "drizzle-orm";
import { z } from "zod";
import { validateIntegrationEndpoint } from "@/lib/integrations/validate-endpoint";
import { revalidatePath } from "next/cache";
import { ConfigSchemaField } from "@/db/schema/tables/integrations";
import { checkPermission } from "@/lib/auth/check-permission";

/**
 * Get all available integrations for the current store
 * Includes global integrations and store-specific custom integrations
 */
export const getDashboardIntegrations = dashboardActionClient.action(
	async ({ ctx }) => {
		checkPermission(ctx, "integrations:read");

		const integrations = await db.query.IntegrationDefinitionTable.findMany({
			where: or(
				eq(IntegrationDefinitionTable.is_global, true),
				eq(IntegrationDefinitionTable.created_by_store_id, ctx.storeId),
			),
			orderBy: (integrations, { desc }) => [desc(integrations.created_at)],
		});

		return integrations;
	},
);

/**
 * Get a single integration by ID
 */
export const getDashboardIntegration = dashboardActionClient
	.inputSchema(z.object({ id: z.uuid() }))
	.action(async ({ parsedInput, ctx }) => {
		checkPermission(ctx, "integrations:read");

		const integration = await db.query.IntegrationDefinitionTable.findFirst({
			where: and(
				eq(IntegrationDefinitionTable.id, parsedInput.id),
				or(
					eq(IntegrationDefinitionTable.is_global, true),
					eq(IntegrationDefinitionTable.created_by_store_id, ctx.storeId),
				),
			),
		});

		return integration;
	});

/**
 * Get installation status for a specific integration
 */
export const getIntegrationInstallation = dashboardActionClient
	.inputSchema(z.object({ integrationId: z.uuid() }))
	.action(async ({ parsedInput, ctx }) => {
		checkPermission(ctx, "integrations:read");

		const installation = await db.query.IntegrationInstallationTable.findFirst({
			where: and(
				eq(
					IntegrationInstallationTable.integration_id,
					parsedInput.integrationId,
				),
				eq(IntegrationInstallationTable.store_id, ctx.storeId),
			),
		});

		return installation;
	});

/**
 * Connect/install an integration
 */
export const createIntegrationInstallation = dashboardActionClient
	.inputSchema(
		z.object({
			integrationId: z.uuid(),
			config: z.record(z.string(), z.string()),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		checkPermission(ctx, "integrations:write");

		const installation = await db
			.insert(IntegrationInstallationTable)
			.values({
				integration_id: parsedInput.integrationId,
				store_id: ctx.storeId,
				config: parsedInput.config,
				is_enabled: true,
			})
			.returning();

		revalidatePath("/settings/integrations");
		return { success: true, installation: installation[0] };
	});

/**
 * Update integration configuration
 */
export const updateIntegrationInstallation = dashboardActionClient
	.inputSchema(
		z.object({
			installationId: z.uuid(),
			config: z.record(z.string(), z.string()),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		checkPermission(ctx, "integrations:write");

		const installation = await db
			.update(IntegrationInstallationTable)
			.set({
				config: parsedInput.config,
				updated_at: new Date(),
			})
			.where(
				and(
					eq(IntegrationInstallationTable.id, parsedInput.installationId),
					eq(IntegrationInstallationTable.store_id, ctx.storeId),
				),
			)
			.returning();

		revalidatePath("/settings/integrations");
		return { success: true, installation: installation[0] };
	});

/**
 * Toggle integration enabled status
 */
export const toggleIntegrationStatus = dashboardActionClient
	.inputSchema(
		z.object({
			installationId: z.uuid(),
			isEnabled: z.boolean(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		checkPermission(ctx, "integrations:write");

		const installation = await db
			.update(IntegrationInstallationTable)
			.set({
				is_enabled: parsedInput.isEnabled,
				updated_at: new Date(),
			})
			.where(
				and(
					eq(IntegrationInstallationTable.id, parsedInput.installationId),
					eq(IntegrationInstallationTable.store_id, ctx.storeId),
				),
			)
			.returning();

		revalidatePath("/settings/integrations");
		return { success: true, installation: installation[0] };
	});

/**
 * Disconnect/delete an integration installation
 */
export const deleteIntegrationInstallation = dashboardActionClient
	.inputSchema(z.object({ installationId: z.uuid() }))
	.action(async ({ parsedInput, ctx }) => {
		checkPermission(ctx, "integrations:delete");

		await db
			.delete(IntegrationInstallationTable)
			.where(
				and(
					eq(IntegrationInstallationTable.id, parsedInput.installationId),
					eq(IntegrationInstallationTable.store_id, ctx.storeId),
				),
			);

		revalidatePath("/settings/integrations");
		return { success: true, message: "Integration disconnected" };
	});

/**
 * Validate an integration endpoint
 */
export const validateEndpoint = dashboardActionClient
	.inputSchema(z.object({ url: z.url() }))
	.action(async ({ parsedInput }) => {
		const result = await validateIntegrationEndpoint(parsedInput.url);
		return result;
	});

/**
 * Create a custom integration (store-specific)
 */
export const createCustomIntegration = dashboardActionClient
	.inputSchema(
		z.object({
			name: z.string().min(1),
			slug: z.string().min(1),
			description: z.string().optional(),
			logoUrl: z.url().optional(),
			targetEndpointUrl: z.url(),
			subscribedEvents: z.array(z.string()),
			configSchema: z.array(
				z.object({
					name: z.string(),
					label: z.string(),
					type: z.enum(["text", "password", "email", "url", "number"]),
					required: z.boolean(),
					placeholder: z.string().optional(),
					description: z.string().optional(),
				}),
			),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		checkPermission(ctx, "integrations:write");

		// Validate endpoint first
		const validation = await validateIntegrationEndpoint(
			parsedInput.targetEndpointUrl,
		);

		if (!validation.isValid) {
			return {
				success: false,
				error: "Endpoint validation failed",
				validationErrors: validation.errors,
			};
		}

		// Create the integration
		const integration = await db
			.insert(IntegrationDefinitionTable)
			.values({
				name: parsedInput.name,
				slug: parsedInput.slug,
				description: parsedInput.description,
				logo_url: parsedInput.logoUrl,
				target_endpoint_url: parsedInput.targetEndpointUrl,
				subscribed_events: parsedInput.subscribedEvents,
				config_schema: parsedInput.configSchema as ConfigSchemaField[],
				is_global: false,
				created_by_store_id: ctx.storeId,
			})
			.returning();

		revalidatePath("/settings/integrations");
		return {
			success: true,
			integration: integration[0],
			validationWarnings: validation.warnings,
		};
	});

/**
 * Delete a custom integration (only if owned by current store)
 */
export const deleteCustomIntegration = dashboardActionClient
	.inputSchema(z.object({ integrationId: z.uuid() }))
	.action(async ({ parsedInput, ctx }) => {
		checkPermission(ctx, "integrations:delete");
		// First, delete all installations of this integration for this store
		await db
			.delete(IntegrationInstallationTable)
			.where(
				and(
					eq(
						IntegrationInstallationTable.integration_id,
						parsedInput.integrationId,
					),
					eq(IntegrationInstallationTable.store_id, ctx.storeId),
				),
			);

		// Then delete the integration itself (only if owned by this store)
		await db
			.delete(IntegrationDefinitionTable)
			.where(
				and(
					eq(IntegrationDefinitionTable.id, parsedInput.integrationId),
					eq(IntegrationDefinitionTable.created_by_store_id, ctx.storeId),
					eq(IntegrationDefinitionTable.is_global, false),
				),
			);

		revalidatePath("/settings/integrations");
		return { success: true, message: "Custom integration deleted" };
	});
