import { ProductTable, StoreTable } from '@/db/schema';

// Infer the type for a single product with a nested store.
// Make sure to include the `with` clause in the inference.
export type ProductWithStore = typeof ProductTable.$inferSelect & { store: typeof StoreTable.$inferSelect };
