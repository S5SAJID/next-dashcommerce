import {
	boolean,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { StoreTable } from "./stores";

export const ApiKeyTable = pgTable("api_keys", {
	id: uuid().primaryKey().defaultRandom(),
	store_id: uuid()
		.notNull()
		.references(() => StoreTable.id, { onDelete: "cascade" }),
	name: varchar({ length: 255 }).notNull(),
	key_hash: text().notNull().unique(),
	key_preview: varchar({ length: 8 }).notNull(),
	permissions: jsonb().$type<string[]>().notNull(),
	is_active: boolean().default(true).notNull(),
	last_used_at: timestamp(),
	created_at: timestamp().defaultNow().notNull(),
	updated_at: timestamp().defaultNow().notNull(),
});
