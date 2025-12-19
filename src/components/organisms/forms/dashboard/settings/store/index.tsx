"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { storeSettingsSchema, type StoreSettingsSchemaType } from "./schema";
import { Button } from "@/components/ui/button";
import { useDashboardStoreInfo } from "@/lib/context/dashboard/store-context-provider";
import { updateStoreGeneralSettings } from "@/db/actions/dashboard/settings/general/actions";
import { toastPromise } from "@/hooks/use-promise-toaster";
import { Info, InfoIcon, Loader } from "lucide-react";
import DashboardSubdomainInput from "@/components/molecules/subdomain-input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function StoreSettingsForm() {
	const { store } = useDashboardStoreInfo();
	if (!store) return;

	const form = useForm<StoreSettingsSchemaType>({
		resolver: zodResolver(storeSettingsSchema),
		defaultValues: {
			name: store.name,
			subdomain: store.domain,
			customHeadCode: store.settings?.customHeadCode,
		},
	});

	const onSubmit = async (data: StoreSettingsSchemaType) => {
		await toastPromise(updateStoreGeneralSettings(data), {
			loading: "Applying settings...",
			success: ({ serverError, data }) => {
				if (serverError) {
					return serverError;
				}
				if (data?.success) {
					form.reset(data.parsedInput);
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

				<FormField
					control={form.control}
					name="customHeadCode"
					render={({ field }) => {
						const charCount = field.value?.length || 0;
						const maxChars = 50000;
						return (
							<FormItem>
								<FormLabel>Custom Head Code</FormLabel>
								<FormControl>
									<InputGroup>
										<InputGroupTextarea
											{...field}
											className="font-mono text-sm"
											rows={20}
											placeholder={`<script src="https://example.com/analytics.js"></script>\n<meta name="custom-tag" content="value" />\n<link rel="stylesheet" href="https://example.com/styles.css" />`}
										/>
										<InputGroupAddon
											align="block-end"
											className="border-t flex justify-between"
										>
											<InputGroupText
												className={`text-xs tabular-nums ${
													charCount > maxChars
														? "text-destructive"
														: "text-muted-foreground"
												}`}
											>
												{charCount.toLocaleString()} /{" "}
												{maxChars.toLocaleString()}
											</InputGroupText>
											<Tooltip>
												<TooltipTrigger asChild>
													<InputGroupButton
														variant="ghost"
														aria-label="Help"
														className="ml-auto rounded-full"
														size="icon-xs"
													>
														<InfoIcon />
													</InputGroupButton>
												</TooltipTrigger>
												<TooltipContent side="bottom" className="max-w-md">
													<p>
														All code is automatically sanitized to prevent XSS
														attacks. Dangerous attributes and inline event
														handlers will be removed.
													</p>
												</TooltipContent>
											</Tooltip>
										</InputGroupAddon>
									</InputGroup>
								</FormControl>
								<FormDescription className="flex-1 text-xs">
									<>
										Inject custom HTML into your storefront's{" "}
										<code className="rounded bg-muted px-1 py-0.5 text-xs">
											&lt;head&gt;
										</code>{" "}
										section for verifications purposes. Only tags:{" "}
										{/* <code className="rounded bg-muted px-1 py-0.5">
											&lt;script&gt;
										</code> */}
										,{" "}
										<code className="rounded bg-muted px-1 py-0.5">
											&lt;meta&gt;
										</code>
										,{" "}
										<code className="rounded bg-muted px-1 py-0.5">
											&lt;link&gt;
										</code>{" "}
										are allowed.
									</>
								</FormDescription>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<Button
					disabled={
						!form.formState.isDirty ||
						form.formState.isLoading ||
						form.formState.isSubmitting
					}
				>
					{form.formState.isSubmitting && <Loader className="animate-spin" />}
					Save Changes
				</Button>
			</form>
		</Form>
	);
}
