
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPublicStoreFront(domain: string) {
  "use server";
  const store = await db.select()
    .from(StoreTable)
    .where(eq(StoreTable.domain, domain));
  
  return store[0]
}
