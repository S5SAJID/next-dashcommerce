import z from "zod";

export const product_form_schema = z.object({
  name: z.string({ error: "Product title required" }).min(2).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().min(0),
  compare_at_price: z.number().min(0).optional(),
  category: z.string().min(2).max(100),
  stock_quantity: z.number().optional(),
  sku_code: z.string().optional(),
  images: z.array(
    z.object({
      url: z.url(),
      alt: z.string()
    })
  )
})

export type ProductFormType = z.infer<typeof product_form_schema>