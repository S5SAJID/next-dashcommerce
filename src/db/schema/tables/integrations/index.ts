import {
	pgTable,
	uuid,
	varchar,
	text,
	jsonb,
	timestamp,
	boolean,
	unique,
} from "drizzle-orm/pg-core";
import { type InferSelectModel } from "drizzle-orm";
import { StoreTable } from "../stores";

export type ConfigSchemaField = {
	name: string;
	label: string;
	type: "text" | "password" | "email" | "url" | "number";
	required: boolean;
	placeholder?: string;
	description?: string;
};

export const IntegrationDefinitionTable = pgTable("integration_definitions", {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull().unique(),
	description: text(),
	logo_url: varchar({ length: 500 }),
	target_endpoint_url: varchar({ length: 500 }).notNull(),
	subscribed_events: jsonb().$type<string[]>().notNull().default([]),
	config_schema: jsonb().$type<ConfigSchemaField[]>().notNull().default([]),

	// Multi-tenancy support
	is_global: boolean().default(true).notNull(),
	created_by_store_id: uuid().references(() => StoreTable.id),

	created_at: timestamp().defaultNow().notNull(),
	updated_at: timestamp().defaultNow().notNull(),
});

export type IntegrationDefinition = InferSelectModel<
	typeof IntegrationDefinitionTable
>;

export const IntegrationInstallationTable = pgTable(
	"integration_installations",
	{
		id: uuid().primaryKey().defaultRandom(),
		store_id: uuid()
			.references(() => StoreTable.id)
			.notNull(),
		integration_id: uuid()
			.references(() => IntegrationDefinitionTable.id)
			.notNull(),

		is_enabled: boolean().default(true).notNull(),
		config: jsonb().$type<Record<string, string>>().notNull().default({}),

		created_at: timestamp().defaultNow().notNull(),
		updated_at: timestamp().defaultNow().notNull(),
	},
	(table) => [
		// Ensure a store can only install an integration once
		unique("store_integration_unique").on(table.store_id, table.integration_id),
	],
);

export type IntegrationInstallation = InferSelectModel<
	typeof IntegrationInstallationTable
>;
