import z from "zod";

export const product_form_schema = z.object({
  name: z.string({ error: "Product title required" }).min(2).max(100),
  slug: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().min(0),
  compare_at_price: z.number().min(0),
  category: z.string().min(2).max(100),
  stock_quantity: z.number().optional(),
  sku_code: z.string().optional(),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required").max(6, "Maximum 6 images allowed"),
  status: z.string()
})

export type ProductFormType = z.infer<typeof product_form_schema>