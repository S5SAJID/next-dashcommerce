import {
	IntegrationDefinitionTable,
	IntegrationInstallationTable,
} from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

// Schema for integration definition (omit store-specific fields)
export const apiDashboardIntegrationDefinitionSchema = createSelectSchema(
	IntegrationDefinitionTable
).omit({ created_by_store_id: true });

// Schema for integration installation (omit sensitive fields)
export const apiDashboardIntegrationInstallationSchema = createSelectSchema(
	IntegrationInstallationTable
).omit({
	store_id: true,
});

// Combined schema for integration with installation status
export const apiDashboardIntegrationSchema = z.object({
	definition: apiDashboardIntegrationDefinitionSchema,
	installation: apiDashboardIntegrationInstallationSchema.nullable(),
});
