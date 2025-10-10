import { StoreTable } from "./tables/stores";
import { ProductTable } from "./tables/products";
import { CustomerTable } from "./tables/storefront/customers/schema";
import { OrderTable, OrderItemTable } from "./tables/storefront/orders/schema";
import {
  ProductStoreRelation,
  StoreProductsRelation,
  StoreCustomersRelation,
  CustomerStoreRelation,
  OrderOrderItemsRelation,
  OrderItemOrderRelation
} from "./relations";

export {
  StoreTable,
  ProductTable,
  CustomerTable,
  OrderTable,
  OrderItemTable,
  OrderItemOrderRelation,
  OrderOrderItemsRelation,
  StoreProductsRelation,
  ProductStoreRelation,
  StoreCustomersRelation,
  CustomerStoreRelation,
};
