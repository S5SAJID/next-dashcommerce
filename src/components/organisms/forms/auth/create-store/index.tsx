"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader } from "lucide-react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createDashboardStore } from "@/db/actions/dashboard/store/actions";
import { storeFormSchema } from "./schema";
import { toastPromise } from "@/hooks/use-promise-toaster";
import DashboardSubdomainInput from "@/components/molecules/subdomain-input";
import { SUPPORTED_CURRENCIES } from "@/db/schema/tables/stores";
import { getCurrencyDisplayName } from "@/lib/currency";

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
			currency: "PKR",
		},
	});

	const isLoading = form.formState.isSubmitting;

	async function onSubmit(data: StoreFormSchema) {
		await toastPromise(createDashboardStore(data), {
			error: (error) => error.message || "Something went wrong!",
			success: ({ serverError, data }) => {
				if (serverError) {
					console.error(serverError);
					return `Something went wrong.`;
				}
				if (!data?.success) {
					return data?.message || "Something went wrong!";
				}
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
				<FormField
					control={form.control}
					name="currency"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Store Currency *</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select your store currency" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{SUPPORTED_CURRENCIES.map((currency) => (
										<SelectItem key={currency} value={currency}>
											{getCurrencyDisplayName(currency)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Alert>
								<AlertCircle className="size-4" />
								<AlertDescription className="text-xs">
									Your currency selection is permanent and cannot be changed
									after store creation. Choose carefully.
								</AlertDescription>
							</Alert>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid">
					<Button
						className="mt-2"
						disabled={
							isLoading || Object.keys(form.formState.errors).length > 0
						}
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
