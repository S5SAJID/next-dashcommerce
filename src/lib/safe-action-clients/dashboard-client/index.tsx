import { getSecuredStoreContext } from "@/lib/auth/safe-guard-helpers";
import { createSafeActionClient } from "next-safe-action";


export const dashboardActionClient = createSafeActionClient()
  .use(async ({ next }) => {
    try {
      const context = await getSecuredStoreContext();
      
      // ✅ Inject the complete, verified context into the next function
      return next({ ctx: context });

    } catch (e) {
      // Catch exceptions thrown by getSecuredStoreContext (e.g., "Unauthorized", "Forbidden")
      // Re-throw as a standardized ActionError for clean client-side messaging
      const errorMessage = e instanceof Error ? e.message : "Security check failed.";
      throw new Error(errorMessage);
    }
  });