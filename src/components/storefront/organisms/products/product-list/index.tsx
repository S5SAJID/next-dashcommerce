"use client";

import StoreFrontProductCard from "./product-card";
import type { InferSelectModel } from "drizzle-orm";
import type { ProductTable } from "@/db/schema";
import type { ProductWithStore } from "@/db/actions/storefront/products/public/types";
import { useQueryStates, parseAsString, parseAsStringEnum } from "nuqs";
import { useMemo } from "react";
import { Currency } from "@/db/schema/tables/stores";

type StoreFrontProductListProps = {
	products: InferSelectModel<typeof ProductTable>[] | ProductWithStore[];
	dense?: boolean;
	currency: Currency;
};

export default function StoreFrontProductList({
	products,
	currency,
	dense = false,
}: StoreFrontProductListProps) {
	const [filters] = useQueryStates(
		{
			search: parseAsString.withDefault(""),
			sortBy: parseAsString.withDefault("newest"),
		},
		{
			history: "push",
		},
	);

	const [viewMode] = useQueryStates({
		view: parseAsStringEnum(["default", "dense"] as const).withDefault(
			dense ? "dense" : "default",
		),
	});

	// Filter and sort products client-side
	const filteredProducts = useMemo(() => {
		let filtered = [...products];

		// Apply search filter
		if (filters.search) {
			const searchLower = filters.search.toLowerCase();
			filtered = filtered.filter(
				(product) =>
					product.name.toLowerCase().includes(searchLower) ||
					product.description.toLowerCase().includes(searchLower),
			);
		}

		// Apply sorting
		switch (filters.sortBy) {
			case "newest":
				filtered.sort(
					(a, b) =>
						new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
				);
				break;
			case "oldest":
				filtered.sort(
					(a, b) =>
						new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
				);
				break;
			case "price-asc":
				filtered.sort((a, b) => a.price - b.price);
				break;
			case "price-desc":
				filtered.sort((a, b) => b.price - a.price);
				break;
			case "name-asc":
				filtered.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "name-desc":
				filtered.sort((a, b) => b.name.localeCompare(a.name));
				break;
			default:
				break;
		}

		return filtered;
	}, [products, filters]);

	if (filteredProducts.length === 0) {
		return (
			<div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
				<div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
					<svg
						className="size-10 text-muted-foreground"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>No products found</title>
						<path
							d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
						/>
					</svg>
					<h3 className="mt-4 text-lg font-semibold">No products found</h3>
					<p className="mb-4 mt-2 text-muted-foreground text-sm">
						Try adjusting your filters or search terms to find what you're
						looking for.
					</p>
				</div>
			</div>
		);
	}

	return (
		<section
			className={`grid grid-cols-1 ${viewMode.view === "dense" ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"} gap-4`}
		>
			{filteredProducts.map((product) => (
				<StoreFrontProductCard
					key={product.id}
					product={product}
					currency={currency}
				/>
			))}
		</section>
	);
}
