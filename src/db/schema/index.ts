import { StoreTable } from "./tables/stores";
import { ProductTable } from "./tables/products";
import { CustomerTable } from "./tables/storefront/customers/schema";
import { OrderTable, OrderItemTable } from "./tables/storefront/orders/schema";
import {
  ProductStoreRelation,
  StoreProductsRelation,
  CustomerStoreRelation,
  OrderRelations,
  OrderItemRelations,
} from "./relations";

export {
  StoreTable,
  ProductTable,
  CustomerTable,
  OrderTable,
  OrderItemTable,
  StoreProductsRelation,
  ProductStoreRelation,
  CustomerStoreRelation,
  OrderRelations,
  OrderItemRelations,
};
