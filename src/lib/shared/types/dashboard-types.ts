import { SafeActionResult } from "next-safe-action";

export type DashboardUsable<T> = Promise<
	SafeActionResult<
		string,
		undefined,
		| {
				formErrors: string[];
				fieldErrors: {};
		  }
		| undefined,
		T
	>
>;
