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
import { toast } from "sonner";

// const layoutSettingsDefaultValues: StoreLayoutSettingsSchemaType = {
//   seo: {
//     title: "Acme Store | The Best Premium Products Online",
//     description: "Welcome to Acme Store, your go-to destination for high-quality and premium products. Shop now and experience the best in online shopping.",
//     tags: ["premium", "quality", "online shopping", "acme"]
//   },
//   heroSection: {
//     title: "Fast, Quick and Easy",
//     description: "Discover our exclusive range of premium products designed to meet your needs. Enjoy top-notch quality and exceptional service at Acme Store.",
//     ctaLink: "/products",
//     ctaTarget: "self",
//     ctaText: "Explore Products",
//   }
// }

type StoreLayoutSettingsFormProps = {
	settings?: StoreLayoutSettingsSchemaType;
};

export default function StoreLayoutSettingsForm(
	props: StoreLayoutSettingsFormProps
) {
	const form = useForm<StoreLayoutSettingsSchemaType>({
		resolver: zodResolver(storeLayoutSettingsSchema),
		defaultValues: props.settings,
	});

	const onSubmit = async (data: StoreLayoutSettingsSchemaType) => {
		toast.promise(updateLayoutSettings(data), {
			loading: "Applying settings...",
			success: async ({ data: responce }) => {
				// TODO: Add queryclient for it
				if (responce?.success) {
					return "Settings applied successfully";
				}
				return "Settings applying failed";
			},
			error: {
				message: "Settings applying failed",
				description: "Please try again.",
			},
		});
	};

	const handleSubmit = form.handleSubmit(
		(data) => {
			onSubmit(data);
		},
		(_errors) => {}
	);

	return (
		<Form {...form}>
			<form className="space-y-8" onSubmit={handleSubmit}>
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
				<Button disabled={!form.formState.isDirty || form.formState.isLoading}>
					Save Changes
				</Button>
			</form>
		</Form>
	);
}
