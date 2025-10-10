import { relations } from "drizzle-orm";
import { ProductTable, StoreTable } from "@/db/schema"
import { CustomerTable } from "./tables/storefront/customers/schema";
import { OrderItemTable, OrderTable } from "./tables/storefront/orders/schema";

// Store Relations
export const StoreProductsRelation = relations(StoreTable, ({ many }) => ({
  products: many(ProductTable),
  customers: many(CustomerTable),
  orders: many(OrderTable),
  orderItems: many(OrderItemTable),
}));

// Product Relations
export const ProductStoreRelation = relations(ProductTable, ({ one, many }) => ({
  store: one(StoreTable, {
    fields: [ProductTable.store_id],
    references: [StoreTable.id],
  }),
  orderItems: many(OrderItemTable),
}));

// Customer Relations
export const CustomerStoreRelation = relations(CustomerTable, ({ one, many }) => ({
  store: one(StoreTable, {
    fields: [CustomerTable.store_id],
    references: [StoreTable.id],
  }),
  orders: many(OrderTable),
}));

// Order Relations
export const OrderRelations = relations(OrderTable, ({ one, many }) => ({
  store: one(StoreTable, {
    fields: [OrderTable.store_id],
    references: [StoreTable.id],
  }),
  customer: one(CustomerTable, {
    fields: [OrderTable.customer_id],
    references: [CustomerTable.id],
  }),
  items: many(OrderItemTable),
}));

// Order Item Relations
export const OrderItemRelations = relations(OrderItemTable, ({ one }) => ({
  store: one(StoreTable, {
    fields: [OrderItemTable.store_id],
    references: [StoreTable.id],
  }),
  order: one(OrderTable, {
    fields: [OrderItemTable.order_id],
    references: [OrderTable.id],
  }),
  product: one(ProductTable, {
    fields: [OrderItemTable.product_id],
    references: [ProductTable.id],
  }),
}));