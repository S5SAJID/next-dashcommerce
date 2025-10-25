import z from "zod";

export const storeLayoutSettingsSchema = z.object({
	seo: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.string().array(),
	}),
	heroSection: z.object({
		title: z.string(),
		description: z.string(),
		// image: z.string().optional(),
		ctaText: z.string(),
		ctaLink: z.string(),
		ctaTarget: z.enum(["self", "_blank"]),
	}),
});

export type StoreLayoutSettingsSchemaType = z.infer<
	typeof storeLayoutSettingsSchema
>;
