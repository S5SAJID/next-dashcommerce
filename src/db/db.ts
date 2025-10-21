import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL as string, {
  logger: true,
  schema: schema
})

// const {
//   // TODO: Fix
//   // StoreProductsRelation,
//   // ProductStoreRelation,
//   // CustomerStoreRelation,
//   // OrderRelations,
//   // OrderItemRelations,
//   // userRelations,
//   // accountRelations,
//   // invitationRelations,
//   // memberRelations,
//   // organizationRelations,
//   // passkeyRelations,
//   // sessionRelations,
//   // twoFactorRelations,
//   // orderStatusEnum,
//   ...tables
// } = schema;

// export const db = drizzle(process.env.DATABASE_URL as string, {
//   logger: true,
//   schema: tables,
// });