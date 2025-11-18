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
import {
	storeLayoutSettingsSchema,
	type StoreLayoutSettingsSchemaType,
} from "./schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { updateLayoutSettings } from "@/db/actions/dashboard/settings/layout/actions";
import { useDashboardStoreInfo } from "@/lib/context/dashboard/store-context-provider";
import { toastPromise } from "@/hooks/use-promise-toaster";
import { Loader } from "lucide-react";

export default function StoreLayoutSettingsForm() {
	const { store } = useDashboardStoreInfo();
	if (!store) return "Error";

	const form = useForm<StoreLayoutSettingsSchemaType>({
		resolver: zodResolver(storeLayoutSettingsSchema),
		defaultValues: store.settings,
	});

	const onSubmit = async (data: StoreLayoutSettingsSchemaType) => {
		await toastPromise(updateLayoutSettings(data), {
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
					name="seo.title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Acme store" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="seo.description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Welcome to Acme Store, your go-to destination for high-quality and premium products."
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="seo.tags"
					render={({}) => (
						<FormItem>
							<FormLabel>
								Tags{" "}
								<span className="text-muted-foreground text-xs">
									(separated by comma)
								</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="acme"
									{...form.register("seo.tags", {
										setValueAs: (v) =>
											typeof v === "string"
												? v.split(",").map((tag: string) => tag.trim())
												: [],
									})}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator />
				<div className="relative">
					<h3 className="font-medium">Hero Section</h3>
					<p className="mb-8 text-muted-foreground text-sm">
						Settings to customise the hero section of your store.
					</p>
					<div className="space-y-8">
						<FormField
							control={form.control}
							name="heroSection.title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Heading</FormLabel>
									<FormControl>
										<Input {...field} placeholder="acme" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="heroSection.description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Short Description for hero section"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* TODO: Best UX FormField for CTA consist of link and text */}
						<div className="flex w-full justify-stretch gap-4">
							<FormField
								control={form.control}
								name="heroSection.ctaText"
								render={({ field }) => (
									<FormItem>
										<FormLabel>CTA Text</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Explore Products" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="heroSection.ctaLink"
								render={({ field }) => (
									<FormItem>
										<FormLabel>CTA Link</FormLabel>
										<FormControl>
											<Input {...field} placeholder="/produts" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>
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
