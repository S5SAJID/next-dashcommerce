import { Skeleton } from "@/components/ui/skeleton";
import ProductListSkeleton from "../product-list/product-list-skeleton";

// TODO: split into indivisual component scope skeleton
export default function StorefrontProductPageSkeleton() {
	return (
		<>
			<section className="grid gap-10 md:grid-cols-2 lg:gap-16">
				<div className="grid w-full grid-rows-[1fr_80px] gap-2">
					{/* Product Images */}
					<Skeleton className="rounded-xl h-[576px]" />
					<Skeleton className="rounded-xl size-20" />
				</div>
				{/* Product Details */}
				<div className="flex flex-col gap-6">
					<div className="space-y-2">
						<Skeleton className="h-12 w-2/3" />
						<div className="flex items-center gap-4">
							<div className="flex items-baseline gap-2">
								<Skeleton className="h-10 w-24" />
								<Skeleton className="h-10 w-20" />
							</div>
						</div>
					</div>

					<div className="h-px" />

					<div className="space-y-4">
						<Skeleton className="h-20 w-full" />

						<div className="flex flex-col gap-2 text-sm">
							<Skeleton className="h-6 w-26" />
							<Skeleton className="h-6 w-30" />
						</div>
					</div>

					<div className="mt-4">
						<Skeleton className="h-13 w-full rounded-full" />
					</div>
				</div>
			</section>
			<div className="my-16" />
			<div className="space-y-8">
				<h3 className="text-2xl">You May Also Like</h3>
				<ProductListSkeleton dense count={4} />
			</div>
		</>
	);
}
