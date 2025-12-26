import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductListSkeleton({
	count = 6,
	dense = false,
}: {
	dense?: boolean;
	count?: number;
}) {
	const cards = Array.from({ length: count });
	return (
		<section
			className={`grid w-full grid-cols-1 ${dense ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"} gap-4`}
		>
			{cards.map((_p, index) => (
				<Card
					key={index}
					className="gap-0 border-none bg-none p-0 text-card-foreground shadow-none"
				>
					<CardHeader className="p-0">
						<Skeleton className={`w-full rounded-xl aspect-square`} />
					</CardHeader>
					<CardContent className="flex flex-col space-y-1.5 p-3">
						<Skeleton className="h-5 w-1/2" />
						<Skeleton className="h-4 w-1/4" />
					</CardContent>
				</Card>
			))}
		</section>
	);
}
