"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { storeSettingsSchema, type StoreSettingsSchemaType } from "./schema";
import { Button } from "@/components/ui/button";
import { useDashboardStoreInfo } from "@/lib/context/dashboard/store-context-provider";
import { updateStoreGeneralSettings } from "@/db/actions/dashboard/settings/general/actions";
import { toastPromise } from "@/hooks/use-promise-toaster";
import { Loader } from "lucide-react";
import DashboardSubdomainInput from "@/components/molecules/subdomain-input";

export default function StoreSettingsForm() {
	const { store } = useDashboardStoreInfo();
	if (!store) return;

	const form = useForm<StoreSettingsSchemaType>({
		resolver: zodResolver(storeSettingsSchema),
		defaultValues: {
			name: store.name,
			subdomain: store.domain,
		},
	});

	const onSubmit = async (data: StoreSettingsSchemaType) => {
		await toastPromise(updateStoreGeneralSettings(data), {
			loading: "Applying settings...",
			success: ({ data: responce }) => {
				// TODO: Add queryclient for it
				if (responce?.success) {
					// IMPROVE: better way to do this
					window.location.reload();
					return "Settings applied successfully";
				}
				return "Settings applying failed";
			},
			error: "Settings applying failed",
		});
	};

	return (
		<Form {...form}>
			<form
				className="space-y-8"
				onSubmit={form.handleSubmit((data) => onSubmit(data))}
			>
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
				{/* TODO: Add contact email & subdomain field */}
				<DashboardSubdomainInput defaultValue={store.domain} />
				<Button disabled={!form.formState.isDirty || form.formState.isLoading || form.formState.isSubmitting}>
					{form.formState.isSubmitting && <Loader className="animate-spin"/>}
					Save Changes
				</Button>
			</form>
		</Form>
	);
}
