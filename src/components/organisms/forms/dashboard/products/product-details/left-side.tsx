import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductDetailsFormType } from "./schema";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ImageUploader } from "@/components/organisms/image-uploader";
import { FormPageGridPrimary } from "@/components/layout/form-page-layout/layout";
import type { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import slugify from "slugify";

type ProductDetailsFormLeftSideProps = {
	form: UseFormReturn<ProductDetailsFormType>;
};

export function ProductDetailsFormLeftSide({
	form,
}: ProductDetailsFormLeftSideProps) {
	const { watch, setValue } = form;
	const name = watch("name");

	useEffect(() => {
		if (name) {
			const generatedSlug = slugify(name, { lower: true, strict: true });
			setValue("slug", generatedSlug);
		}
	}, [name, setValue]);

	return (
		<FormPageGridPrimary>
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Product Name & Slug */}
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Classic T-shirt" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Slug</FormLabel>
								<FormControl>
									<Input placeholder="classic-t-shirt" readOnly {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{/* Product Description */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									className="min-h-32"
									placeholder="Product description..."
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Set a description to the product for better visibility.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
			<Separator />
			{/* Product Images */}
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
			</CardHeader>
			<CardContent>
				<FormField
					control={form.control}
					name="images"
					render={({ field }) => (
						<FormItem>
							<ImageUploader
								images={field.value}
								onImagesChange={field.onChange}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</FormPageGridPrimary>
	);
}
