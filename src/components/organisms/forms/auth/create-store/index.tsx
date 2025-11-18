"use client";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createDashboardStore } from "@/db/actions/dashboard/store/actions";
import { useSubdomainAvailability } from "@/hooks/dashboard/store/use-subdomain-availablity";
import { storeFormSchema } from "./schema";
import { toastPromise } from "@/hooks/use-promise-toaster";
import { useEffect } from "react";
import DashboardSubdomainInput from "@/components/molecules/subdomain-input";

type StoreFormSchema = z.infer<typeof storeFormSchema>;

export function StoreCreateForm({
	className,
	...props
}: React.HTMLAttributes<HTMLFormElement>) {
	const form = useForm<StoreFormSchema>({
		reValidateMode: "onChange",
		resolver: zodResolver(storeFormSchema),
		defaultValues: {
			name: "",
			description: "",
			subdomain: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	async function onSubmit(data: StoreFormSchema) {
		await toastPromise(createDashboardStore(data), {
			error: (error) => error.message || "Something went wrong!",
			success: () => {
				window.location.replace("/products");
				form.reset();
				return "Store created, Redirecting...";
			},
			loading: "Creating store...",
		});
	}

	return (
		<Form {...form}>
			<form
				className={cn("grid gap-3 space-y-4", className)}
				onSubmit={form.handleSubmit(onSubmit)}
				{...props}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name *</FormLabel>
							<FormControl>
								<Input placeholder="Enter your store name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DashboardSubdomainInput />
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description *</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter short description of your store"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid">
					<Button
						className="mt-2"
						disabled={isLoading || status !== "available"}
						type="submit"
					>
						{isLoading ? <Loader className="animate-spin" /> : null}
						Create store
					</Button>
				</div>
				<FormDescription>
					Don&apos;t worry too much, you can always change these in the settings
					page later.
				</FormDescription>
			</form>
		</Form>
	);
}
