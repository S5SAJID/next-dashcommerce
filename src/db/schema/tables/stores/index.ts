import {
	jsonb,
	pgEnum,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

// Define supported currencies as a const array for reusability across the app
export const SUPPORTED_CURRENCIES = [
	"PKR",
	"BDT",
	"USD",
	"EUR",
	"GBP",
	"CAD",
	"AUD",
	"JPY",
	"INR",
] as const;

// Currency type derived from SUPPORTED_CURRENCIES for type safety
export type Currency = (typeof SUPPORTED_CURRENCIES)[number];

// Drizzle enum for database-level validation
export const currencyEnum = pgEnum("currency", SUPPORTED_CURRENCIES);

type StoreSettingsType = {
	seo: {
		title: string;
		description: string;
		tags: string[];
	};
	heroSection: {
		title: string;
		description: string;
		image: string;
		ctaText: string;
		ctaLink: string;
		ctaTarget: "self" | "_blank";
	};
};

export const StoreTable = pgTable("stores", {
	id: uuid().primaryKey().notNull().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	domain: varchar({ length: 255 }).notNull().unique(),
	currency: currencyEnum().notNull().default("USD"),
	settings: jsonb("settings").$type<StoreSettingsType>().notNull(),
	created_at: timestamp("created_at").defaultNow().notNull(),
	updated_at: timestamp("updated_at").defaultNow().notNull(),
});
