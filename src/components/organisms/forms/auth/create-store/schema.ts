import { SUPPORTED_CURRENCIES } from "@/db/schema/tables/stores";
import z from "zod";

const SUBDOMAIN_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const storeFormSchema = z.object({
	name: z
		.string({ error: "Store name is required." })
		.min(1, { error: "Store name is required." }),

	subdomain: z
		.string()
		.trim()
		.toLowerCase()
		.min(3, { error: "Subdomain must be at least 3 characters long." })
		.max(20, { error: "Subdomain cannot exceed 20 characters." })
		.regex(SUBDOMAIN_REGEX, {
			error:
				"Subdomain can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.",
		})
		.refine(
			(val) =>
				!["www", "api", "app", "mail", "admin", "blog", "cms"].includes(val),
			{ error: "The subdomain is reserved and cannot be used." },
		),

	currency: z.enum(SUPPORTED_CURRENCIES, {
		error: "Please select a valid currency.",
	}),

	description: z
		.string({ error: "Description is required." })
		.min(1, { error: "Description is required." }),
});
