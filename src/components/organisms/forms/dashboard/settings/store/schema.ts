import z from "zod";
import { sanitizeHeadCode } from "@/lib/utils/sanitize-html";

export const storeSettingsSchema = z.object({
	name: z.string().max(100),
	subdomain: z.string(),
	customHeadCode: z
		.string()
		.max(50000, "Custom head code must be less than 50,000 characters")
		.transform((val) => sanitizeHeadCode(val))
		.optional(),
});

export type StoreSettingsSchemaType = z.infer<typeof storeSettingsSchema>;
