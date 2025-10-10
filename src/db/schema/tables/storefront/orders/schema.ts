import { pgTable, uuid, varchar, timestamp, pgEnum, integer, jsonb, decimal } from "drizzle-orm/pg-core";
import { StoreTable } from "../../stores";
import { CustomerTable } from "../customers/schema";
import { ProductTable } from "../../products";

const orderStatusEnum = pgEnum("order_status", ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]);

export const OrderTable = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  store_id: uuid().references(() => StoreTable.id).notNull(),
  customer_id: uuid().references(() => CustomerTable.id), // can be null for guest checkout
  status: orderStatusEnum().default("PENDING").notNull(),
  total_amount: varchar({ length: 50 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export const OrderItemTable = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  store_id: uuid().references(() => StoreTable.id).notNull(),
  order_id: uuid().references(() => OrderTable.id).notNull(),
  product_id: uuid().references(() => ProductTable.id).notNull(),
  quantity: integer().notNull(),
  price_at_purchase: decimal().notNull(),
  product_snapshot: jsonb().notNull(), // Store product details at the time of purchase
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});