"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
	FormPageGridContainer,
	FormPageHeader,
	FormPageTitle,
} from "@/components/layout/form-page-layout/layout";
import { Button } from "@/components/ui/button";
import {
	product_details_form_schema,
	type ProductDetailsFormType,
} from "./schema";
import { ProductDetailsFormRightSide } from "./right-side";
import { ProductDetailsFormLeftSide } from "./left-side";
import { updateDashboardProductDetails } from "@/db/actions/dashboard/products/actions";
import { toast } from "sonner";

type ProductDetailsFormProps = {
	product: ProductDetailsFormType;
};

export default function ProductDetailsForm({
	product,
}: ProductDetailsFormProps) {
	const form = useForm<ProductDetailsFormType>({
		resolver: zodResolver(product_details_form_schema),
		defaultValues: product,
	});

	const onSubmit = (data: ProductDetailsFormType) => {
		toast.promise(updateDashboardProductDetails(data), {
			loading: "Upadting product...",
			success: (response) => {
				if (response.data?.success) {
					return "Product updated.";
				}
				return "Product updating failed";
			},
			error: {
				message: "Product updating failed",
				description: "Product can't be updated. Please try again.",
			},
		});
	};

	const handleSubmit = form.handleSubmit(
		(data) => {
			onSubmit(data);
		},
		(_errors) => console.error(_errors),
	);

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit}>
				<FormPageHeader>
					<FormPageTitle
						description="Here you can see details of a specific product."
						enableBack
						title="Product Details"
					/>
					<Button disabled={!form.formState.isDirty}>
						<span>Save Changes</span>
					</Button>
				</FormPageHeader>
				<FormPageGridContainer>
					<ProductDetailsFormLeftSide form={form} />
					<ProductDetailsFormRightSide form={form} />
				</FormPageGridContainer>
			</form>
		</Form>
	);
}
