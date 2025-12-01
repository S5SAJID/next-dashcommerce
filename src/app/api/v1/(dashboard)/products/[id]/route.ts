import {
	deleteDashboardProduct,
	getDashboardProduct,
	updateDashboardProduct,
} from "@/db/actions/dashboard/products/actions";
import { apiDashboardProductSchema } from "@/lib/apis/schemas/products";
import { checkAPIKeyFromAPI, COMMON_API_ERRORS } from "@/lib/apis/shared";
import { route, routeOperation, TypedNextResponse } from "next-rest-framework";
import z from "zod";

export const { GET, PATCH, DELETE } = route({
	getProduct: routeOperation({ method: "GET" })
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ data: apiDashboardProductSchema }),
			},
			{
				status: 404,
				contentType: "application/json",
				body: z.object({ error: z.string() }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (_req, _ctx) => {
			const { id } = _ctx.params;
			const result = await getDashboardProduct({ slug: id });

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Extract the actual data from SafeActionResult
			const product = result?.data;

			// Handle case where product is not found
			if (!product) {
				return TypedNextResponse.json(
					{ error: "Product not found" },
					{ status: 404 }
				);
			}

			return TypedNextResponse.json({ data: product }, { status: 200 });
		}),

	updateProduct: routeOperation({ method: "PATCH" })
		.input({
			contentType: "application/json",
			body: apiDashboardProductSchema,
		})
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ data: apiDashboardProductSchema }),
			},
			{
				status: 404,
				contentType: "application/json",
				body: z.object({ error: z.string() }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (req, _ctx) => {
			const { id } = _ctx.params;
			const body = await req.json();

			const result = await updateDashboardProduct({ ...body, id });

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Get the updated product
			const updatedProduct = await getDashboardProduct({ slug: id });

			if (!updatedProduct?.data) {
				return TypedNextResponse.json(
					{ error: "Product not found after update" },
					{ status: 404 }
				);
			}

			return TypedNextResponse.json(
				{ data: updatedProduct.data },
				{ status: 200 }
			);
		}),

	deleteProduct: routeOperation({ method: "DELETE" })
		.outputs([
			{
				status: 200,
				contentType: "application/json",
				body: z.object({ message: z.string() }),
			},
			{
				status: 404,
				contentType: "application/json",
				body: z.object({ error: z.string() }),
			},
			...COMMON_API_ERRORS,
		])
		.middleware(checkAPIKeyFromAPI)
		.handler(async (_req, _ctx) => {
			const { id } = _ctx.params;
			const result = await deleteDashboardProduct({ id });

			// Handle Server Action errors
			if (result?.serverError) {
				return TypedNextResponse.json(
					{ error: result.serverError },
					{ status: 403 }
				);
			}

			// Check if deletion was successful
			if (result?.data?.success === false) {
				return TypedNextResponse.json(
					{ error: result.data.error || "Failed to delete product" },
					{ status: 500 }
				);
			}

			return TypedNextResponse.json(
				{ message: "Product deleted successfully" },
				{ status: 200 }
			);
		}),
});
