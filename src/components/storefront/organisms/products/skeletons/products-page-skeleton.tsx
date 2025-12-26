import { Skeleton } from "@/components/ui/skeleton";
import ProductListSkeleton from "../product-list/product-list-skeleton";

export default function StorefrontProductsPageSkeleton() {
	return (
		<div className="container mx-auto space-y-6 py-8">
			<div className="flex flex-wrap items-center justify-between gap-4 py-4">
				<h1 className="text-lg font-medium">Products</h1>
				<div className="flex items-center gap-4">
					<Skeleton className="h-7 w-40" />
					<Skeleton className="h-7 w-32" />
					<Skeleton className="h-7 w-20 hidden md:block" />
				</div>
			</div>
			<ProductListSkeleton />
		</div>
	);
}
