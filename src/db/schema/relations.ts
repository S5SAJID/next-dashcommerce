import { relations } from "drizzle-orm";
import { ProductTable, StoreTable } from "@/db/schema"

export const StoreProductsRelation = relations(StoreTable, ({ many }) => ({
  products: many(ProductTable),
}));

export const ProductStoreRelation = relations(ProductTable, ({ one }) => ({
  store: one(StoreTable, {
    fields: [ProductTable.store_id],
    references: [StoreTable.id],
  }),
}));
