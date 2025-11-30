import z from "zod";

export const customers_schema = z.object({
	name: z.string().min(2).max(100),
	email: z.email(),
	phone: z.string().min(7).max(15).optional(),
	orders: z.number().min(0).optional(),
	total_spent: z.number().min(0).optional(),
});

export type CustomersType = z.infer<typeof customers_schema>;
