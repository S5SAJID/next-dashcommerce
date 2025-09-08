import z from "zod";
const requiredField = "Please fill this required field";

export const checkoutFormSchema = z.object({
  email: z.email().min(1, requiredField),
  name: z.string().min(1, requiredField),
  city: z.string().min(1, requiredField),
  country: z.string().min(1, requiredField),
  address: z.string().min(1, requiredField),
  postalCode: z.string().min(1, requiredField),
  state: z.string().optional(),
  phone: z.string().optional(),
})

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>;