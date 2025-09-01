import z from "zod";

export const storeSettingsSchema = z.object({
  name: z.string().max(100),
  contact_email: z.email().optional(),
  subdomain: z.string(),
})

export type StoreSettingsSchemaType = z.infer<typeof storeSettingsSchema>