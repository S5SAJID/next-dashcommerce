import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/schema"

export const db = drizzle(process.env.DATABASE_URL as string, {
  logger: true,
  schema: schema
})