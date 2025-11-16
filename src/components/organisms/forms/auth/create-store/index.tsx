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

	// Subdomain value to watch
	const subdomainFormVal = form.watch("subdomain");

	// Use the new and improved hook
	const { status, error } = useSubdomainAvailability(subdomainFormVal, 500);

	useEffect(() => {
		if (status === "unavailable") {
			form.setError("subdomain", {
				type: "manual",
				message: `The subdomain "${subdomainFormVal}" is already taken.`,
			});
		} else if (status === "error") {
			form.setError("subdomain", {
				type: "manual",
				message: error ?? "An unexpected error occurred.",
			});
		} else {
			form.clearErrors("subdomain");
		}
	}, [status, error, form, subdomainFormVal]);

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
				<FormField
					control={form.control}
					name="subdomain"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subdomain *</FormLabel>
							<div className="relative">
								<div className="flex items-center">
									<FormControl>
										<Input
											placeholder="Enter your store subdomain"
											{...field}
										/>
									</FormControl>
									{/* Status Indicator */}
									{status === "checking" ? (
										<Loader2 className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4 animate-spin text-primary" />
									) : status === "available" ? (
										<CheckCircle className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4 text-green-500" />
									) : null}
								</div>
							</div>
							<FormMessage />
							<FormDescription>
								This subdomain will form your store&apos;s url. eg: acme -{">"}{" "}
								acme.eco.com
							</FormDescription>
						</FormItem>
					)}
				/>
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
				{/* <FormDescription>Don&apos;t worry too much, you can always change these in the settings page later.</FormDescription> */}
			</form>
		</Form>
	);
}
