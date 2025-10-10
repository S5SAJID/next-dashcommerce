import { uuid, varchar, pgTable, timestamp, unique} from "drizzle-orm/pg-core";
import { StoreTable } from "../../stores";

// SPARKLE: implement the shipping and billing address tables later
export const CustomerTable = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  store_id: uuid().references(() => StoreTable.id).notNull(),
  user_id: uuid(), // can be null for guest checkout
  email: varchar({ length: 255 }).notNull(),
  full_name: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  address: varchar({ length: 500 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
}, (table) => [
  unique("store_email_idx").on(table.store_id, table.email),
]);