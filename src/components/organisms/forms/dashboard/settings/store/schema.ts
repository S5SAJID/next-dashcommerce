import z from "zod";

export const storeSettingsSchema = z.object({
	name: z.string().max(100),
	subdomain: z.string(),
});

export type StoreSettingsSchemaType = z.infer<typeof storeSettingsSchema>;
