import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

type StoreSettingsType = {
  seo: {
    title: string,
    description: string,
    tags: string[],
  },
  heroSection: {
    title: string,
    description: string,
    image: string,
    ctaText: string,
    ctaLink: string,
    ctaTarget: "self" | "_blank",
  }
}

export const StoreTable = pgTable("stores", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  domain: varchar({ length: 255 }).notNull().unique(),
  settings: jsonb("settings").$type<StoreSettingsType>().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})