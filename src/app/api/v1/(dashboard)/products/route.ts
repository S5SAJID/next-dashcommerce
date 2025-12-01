import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import {
	createDashboardProduct,
	getDashboardProducts,
} from "@/db/actions/dashboard/products/actions";
import z from "zod";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { apiDashboardProductSchema } from "@/lib/apis/schemas/products";
import { product_form_schema } from "@/components/organisms/forms/dashboard/products/product-form/schema";

export const { GET, POST } = route({
	listProducts: routeOperation({ method: "GET" })
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ data: z.array(apiDashboardProductSchema) }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async () => {
			// Call Server Action directly - it will see the x-api-key header!
			const result = await getDashboardProducts();

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Extract the actual data from SafeActionResult
			const products = result?.data ?? [];

			return TypedNextResponse.json({ data: products }, { status: 200 });
		}),

	createProduct: routeOperation({ method: "POST" })
		.input({
			contentType: "application/json",
			body: product_form_schema,
		})
		.outputs([
			{
				status: 201,
				contentType: "application/json",
				body: z.object({ message: z.string(), id: z.string().optional() }),
			},
			{
				status: 400,
				contentType: "application/json",
				body: z.object({ error: z.string() }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (req) => {
			const body = await req.json();

			const result = await createDashboardProduct(body);

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Check if creation was successful
			if (result?.data?.success === false) {
				return TypedNextResponse.json(
					{ error: result.data.error || "Failed to create product" },
					{ status: 400 }
				);
			}

			return TypedNextResponse.json(
				{
					message: result?.data?.message || "Product created successfully",
				},
				{ status: 201 }
			);
		}),
});
