import z from "zod";
import { mixedImagesSchema } from "@/lib/shared/shema/image";

export const product_details_form_schema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name must be at most 100 characters"),
	id: z.uuid("Invalid product ID"),
	created_at: z.date(),
	updated_at: z.date(),
	slug: z
		.string()
		.min(1, "Slug is required")
		.max(100, "Slug must be at most 100 characters")
		.regex(
			/^[a-z0-9-]+$/,
			"Slug must contain only lowercase letters, numbers, and hyphens",
		),
	description: z
		.string()
		.max(1000, "Description must be at most 1000 characters"),
	price: z.number().positive().min(0, "Price must be at least 0"),
	compare_at: z
		.number()
		.positive()
		.min(0, "Compare at price must be at least 0")
		.nullable()
		.optional(),
	stock: z
		.number()
		.int()
		.min(0, "Stock must be at least 0")
		.nullable()
		.optional(),
	sku: z
		.string()
		.max(50, "SKU must be at most 50 characters")
		.nullable()
		.optional(),
	images: mixedImagesSchema
		.min(1, "At least one image is required")
		.max(6, "Maximum 6 images allowed"),
	is_published: z.boolean(),
});

export type ProductDetailsFormType = z.infer<
	typeof product_details_form_schema
>;
