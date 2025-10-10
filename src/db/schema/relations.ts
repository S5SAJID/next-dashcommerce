import { relations } from "drizzle-orm";
import { ProductTable, StoreTable } from "@/db/schema"
import { CustomerTable } from "./tables/storefront/customers/schema";
import { OrderItemTable, OrderTable } from "./tables/storefront/orders/schema";

export const StoreProductsRelation = relations(StoreTable, ({ many }) => ({
  products: many(ProductTable),
}));

export const ProductStoreRelation = relations(ProductTable, ({ one }) => ({
  store: one(StoreTable, {
    fields: [ProductTable.store_id],
    references: [StoreTable.id],
  }),
}));


export const StoreCustomersRelation = relations(StoreTable, ({ many }) => ({
  customers: many(CustomerTable, {
    relationName: "StoreCustomersRelation",
  }),
}));

export const CustomerStoreRelation = relations(CustomerTable, ({ one }) => ({
  store: one(StoreTable, {
    fields: [CustomerTable.store_id],
    references: [StoreTable.id],
  }),
}));


// Orders
export const OrderOrderItemsRelation = relations(OrderTable, ({ many }) => ({
  items: many(OrderItemTable, {
    relationName: "OrderOrderItemsRelation",
  }),
}));

export const OrderItemOrderRelation = relations(OrderItemTable, ({ one }) => ({
  order: one(OrderTable, {
    fields: [OrderItemTable.order_id],
    references: [OrderTable.id],
  }),
}));