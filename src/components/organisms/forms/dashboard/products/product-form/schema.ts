import { imageFilesSchema } from "@/lib/shared/shema/image";
import z from "zod";

const requiredField = "Field required";

export const product_form_schema = z.object({
	name: z
		.string({ error: "Product title required" })
		.min(2, requiredField)
		.max(100),
	slug: z.string().min(2, requiredField).max(100),
	description: z
		.string()
		.min(10, "Minimum characters of description should be 10")
		.max(1000),
	price: z.number().min(0, requiredField).positive(),
	compare_at: z.number().min(0, requiredField).positive().optional(),
	stock: z.number().optional(),
	sku: z.string().optional(),
	images: imageFilesSchema
		.min(1, "At least one image is required")
		.max(6, "Maximum 6 images allowed"),
	is_published: z.boolean().default(false).optional(),
});

export type ProductFormType = z.infer<typeof product_form_schema>;
