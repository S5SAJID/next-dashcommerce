import { relations } from "drizzle-orm";
import { StoreTable } from "../stores";
import { IntegrationDefinitionTable, IntegrationInstallationTable } from ".";

export const IntegrationDefinitionRelations = relations(
	IntegrationDefinitionTable,
	({ many, one }) => ({
		installations: many(IntegrationInstallationTable),
		createdByStore: one(StoreTable, {
			fields: [IntegrationDefinitionTable.created_by_store_id],
			references: [StoreTable.id],
		}),
	})
);

export const IntegrationInstallationRelations = relations(
	IntegrationInstallationTable,
	({ one }) => ({
		store: one(StoreTable, {
			fields: [IntegrationInstallationTable.store_id],
			references: [StoreTable.id],
		}),
		integration: one(IntegrationDefinitionTable, {
			fields: [IntegrationInstallationTable.integration_id],
			references: [IntegrationDefinitionTable.id],
		}),
	})
);
