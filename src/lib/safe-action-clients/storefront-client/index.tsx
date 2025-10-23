import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { extractSubdomainFromString } from "@/lib/subdomain";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";
import { headers } from "next/headers";

export const storeFrontActionClient = createSafeActionClient()
  .use(async ({ next }) => {
    const allHeaders = await headers();

    // Access specific headers using the .get() method
    const referer = allHeaders.get("referer") || "unknown";
    const subdomain = extractSubdomainFromString(referer);
    if (!subdomain) {
      throw "Invalid referer subdomain";
    }

    const storeId = await db.query.StoreTable.findFirst({
      columns: {id: true},
      where: eq(StoreTable.domain, subdomain)
    })

    if (!storeId) {
      throw "The store does not exist"
    }

    // Return the context object
    return next({ ctx: { storeId } });
  })