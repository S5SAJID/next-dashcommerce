"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ConfigSchemaField } from "@/db/schema/tables/integrations";

type Props = {
	schema: ConfigSchemaField[];
	initialValues?: Record<string, string>;
	onSubmit: (values: Record<string, string>) => void;
	submitLabel?: string;
};

export function DynamicConfigForm({
	schema,
	initialValues = {},
	onSubmit,
	submitLabel = "Submit",
}: Props) {
	// Generate Zod schema from config schema
	const zodSchema = z.object(
		schema.reduce(
			(acc, field) => {
				let fieldSchema = z.string();

				if (field.type === "email") {
					fieldSchema = fieldSchema.email("Invalid email address");
				} else if (field.type === "url") {
					fieldSchema = fieldSchema.url("Invalid URL");
				} else if (field.type === "number") {
					fieldSchema = z.string().regex(/^\d+$/, "Must be a number");
				}

				// Apply required/optional logic and assign directly to avoid type mismatch
				if (field.required) {
					acc[field.name] = fieldSchema.min(1, `${field.label} is required`);
				} else {
					acc[field.name] = fieldSchema.optional().default("");
				}

				return acc;
			},
			{} as Record<string, z.ZodTypeAny>,
		),
	);

	type FormData = z.infer<typeof zodSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(zodSchema),
		defaultValues: initialValues,
	});

	return (
		<form
			className="space-y-4"
			onSubmit={handleSubmit((data) =>
				onSubmit(data as Record<string, string>),
			)}
		>
			{schema.map((field) => (
				<div className="space-y-2" key={field.name}>
					<Label htmlFor={field.name}>
						{field.label}
						{field.required && <span className="text-destructive ml-1">*</span>}
					</Label>
					<Input
						id={field.name}
						placeholder={field.placeholder}
						type={field.type}
						{...register(field.name)}
						aria-invalid={!!errors[field.name]}
					/>
					{field.description && (
						<p className="text-sm text-muted-foreground">{field.description}</p>
					)}
					{errors[field.name] && (
						<p className="text-sm text-destructive">
							{errors[field.name]?.message as string}
						</p>
					)}
				</div>
			))}

			<Button className="w-full" disabled={isSubmitting} type="submit">
				{isSubmitting ? "Saving..." : submitLabel}
			</Button>
		</form>
	);
}
