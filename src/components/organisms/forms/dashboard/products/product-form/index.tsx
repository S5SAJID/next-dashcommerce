"use client";
import { useForm } from "react-hook-form";
import { product_form_schema, type ProductFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import CreateProductPrimaryButtons from "../../../../../molecules/primary-buttons/creation-primary-buttons/product-create";
import {
	FormPageGridContainer,
	FormPageHeader,
	FormPageTitle,
} from "@/components/layout/form-page-layout/layout";
import { ProductFormLeftSide } from "./left-side";
import { ProductFormRightSide } from "./right-side";
import { createDashboardProduct } from "@/db/actions/dashboard/products/actions";
import { useRouter } from "@bprogress/next";

export default function ProductForm() {
	const router = useRouter();
	const form = useForm<ProductFormType>({
		resolver: zodResolver(product_form_schema),
		defaultValues: {
			name: "",
			slug: "",
			description: "",
			price: 0,
			compare_at: undefined,
			stock: undefined,
			sku: "",
			images: [],
			is_published: true,
		},
	});

	const onSubmit = (data: ProductFormType) => {
		toast.promise(createDashboardProduct(data), {
			loading: "Creating product...",
			success: (response) => {
				if (response.data?.success) {
					// navigate to product details page
					router.push("/products/");
					form.reset();
					return "Product created.";
				}
				return "Product creation failed";
			},
			error: (error) => ({
				message: error.message || "Product creation failed",
				description: "Product can't be created. Please try again.",
			}),
		});
	};

	const handleSubmit = form.handleSubmit(
		(data) => {
			onSubmit(data);
		},
		(_errors) => {
			console.error(_errors);
		},
	);

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit}>
				<FormPageHeader>
					<FormPageTitle
						description="Fill the form to create your new product."
						enableBack
						title="Create product"
					/>
					<CreateProductPrimaryButtons />
				</FormPageHeader>
				<FormPageGridContainer>
					<ProductFormLeftSide form={form} />
					<ProductFormRightSide form={form} />
				</FormPageGridContainer>
			</form>
		</Form>
	);
}
