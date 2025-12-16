import {
	boolean,
	pgTable,
	real,
	timestamp,
	unique,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { StoreTable } from "@/db/schema";

export const ProductTable = pgTable(
	"products",
	{
		id: uuid().primaryKey().notNull().defaultRandom(),
		store_id: uuid()
			.references(() => StoreTable.id)
			.notNull(),
		name: varchar({ length: 255 }).notNull(),
		slug: varchar({ length: 255 }).notNull(),
		description: varchar().notNull(),
		price: real().default(0).notNull(),
		compare_at: real(),
		stock: real(),
		sku: varchar({ length: 255 }),
		images: varchar({ length: 300 }).array().notNull(),
		is_published: boolean().default(false).notNull(),
		created_at: timestamp("created_at").defaultNow().notNull(),
		updated_at: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => [unique("store_slug_idx").on(table.store_id, table.slug)],
);
