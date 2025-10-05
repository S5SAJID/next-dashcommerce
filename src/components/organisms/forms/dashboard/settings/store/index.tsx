"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { storeSettingsSchema, StoreSettingsSchemaType } from "./schema";
import { Button } from "@/components/ui/button";
import { showSubmittedData } from "@/lib/showSubmittedData";

const storeSettingsDefaultValues: StoreSettingsSchemaType = {
  name: "",
  contact_email: "",
  subdomain:""
}

export default function StoreSettingsForm() {
  const form = useForm<StoreSettingsSchemaType>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: storeSettingsDefaultValues
  });

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))} 
        className="space-y-8" >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Acme store" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="m@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subdomain</FormLabel>
              <FormControl>
                <Input {...field} placeholder="acme" />
              </FormControl>
              <FormDescription>This subdomain will form your store&apos;s url. eg: acme -{">"} acme.eco.com</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isDirty || form.formState.isLoading}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  )
}