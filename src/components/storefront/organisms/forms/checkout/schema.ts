import z from "zod";
const requiredField = "This field is required";
const invalidPostalCode = "Please enter a valid postal code";
const invalidPhone = "Please enter a valid phone number";

export const checkoutFormSchema = z.object({
	email: z.email().min(1, requiredField),
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters")
		.trim()
		.refine((val) => !/\d/.test(val), {
			message: "Name cannot contain numbers",
		}),
	city: z
		.string()
		.min(2, "City must be at least 2 characters")
		.max(50, "City must be less than 50 characters")
		.trim(),
	country: z
		.string()
		.min(2, "Country must be at least 2 characters")
		.max(50, "Country must be less than 50 characters")
		.trim(),
	address: z
		.string()
		.min(5, "Address must be at least 5 characters")
		.max(100, "Address must be less than 100 characters")
		.trim(),
	postalCode: z
		.string()
		.min(3, invalidPostalCode)
		.max(12, invalidPostalCode)
		.regex(/^[A-Za-z0-9\- ]+$/, invalidPostalCode),
	state: z.string().max(50, "State must be less than 50 characters").optional(),
	phone: z
		.string()
		// Accepts formats like 0345..., 92345..., +92345..., +92 345..., etc.
		.regex(/^(\+?92|92|0)?3\d{2}[- ]?\d{7}$/, invalidPhone),
	cartItems: z
		.array(
			z.object({
				productId: z.uuid().min(1).nonoptional(),
				quantity: z.number().min(1, "Quantity must be at least 1"),
			}),
		)
		.min(1, "Cart cannot be empty"),
});

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>;
