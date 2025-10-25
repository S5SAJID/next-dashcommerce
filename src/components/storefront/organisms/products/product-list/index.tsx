import StoreFrontProductCard from "./product-card";
import type { InferSelectModel } from "drizzle-orm";
import type { ProductTable } from "@/db/schema";
import type { ProductWithStore } from "@/db/actions/storefront/products/public/types";

type StoreFrontProductListProps = {
	products: InferSelectModel<typeof ProductTable>[] | ProductWithStore[];
	dense?: boolean;
};

export default function StoreFrontProductList({
	products,
	dense = false,
}: StoreFrontProductListProps) {
	return (
		<section
			className={`grid grid-cols-1 ${dense ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"} gap-4`}
		>
			{products.map((product, index) => (
				<StoreFrontProductCard key={index} product={product} />
			))}
		</section>
	);
}
