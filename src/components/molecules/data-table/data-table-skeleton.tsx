import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const DataTableToolbarSkeleton = () => (
	<div className="flex items-center justify-between">
		{/* Search Input Skeleton */}
		<div className="flex items-center space-x-2">
			<Skeleton className="h-8 w-[200px] sm:w-[250px]" />
			<Skeleton className="hidden h-8 w-[80px] lg:flex" />
		</div>
		{/* Filters/View Options Skeleton */}
		<div className="flex items-center space-x-2">
			<Skeleton className="h-8 w-[80px]" />
			<Skeleton className="hidden h-8 w-[80px] lg:flex" />
		</div>
	</div>
);

const DataTablePaginationSkeleton = () => (
	<div className="flex items-center justify-between px-2">
		{/* Row Count Info */}
		<Skeleton className="h-4 w-[120px]" />
		<div className="flex items-center space-x-6 lg:space-x-8">
			{/* Rows per page selector */}
			<div className="flex items-center space-x-2">
				<Skeleton className="h-8 w-[100px]" />
				<Skeleton className="h-8 w-[70px]" />
			</div>
			{/* Navigation buttons */}
			<div className="flex items-center space-x-2">
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-8 w-8" />
			</div>
		</div>
	</div>
);

interface DataTableSkeletonProps {
	columnCount: number;
	rowCount?: number;
}

export function DataTableSkeleton({
	columnCount,
	rowCount = 10,
}: DataTableSkeletonProps) {
	const skeletonRows = Array.from({ length: rowCount });
	const skeletonColumns = Array.from({ length: columnCount });

	return (
		<div className="space-y-4">
			{/* Toolbar Skeleton */}
			<DataTableToolbarSkeleton />

			{/* Table Structure Skeleton */}
			<div className="overflow-hidden rounded-md border">
				<Table>
					{/* Table Header: Headers are typically visible immediately */}
					<TableHeader>
						<TableRow>
							{skeletonColumns.map((_column, index) => (
								<TableHead key={index}>
									{/* Mimic a loading header text size */}
									<Skeleton className="h-6 w-2/3 max-w-[150px]" />
								</TableHead>
							))}
						</TableRow>
					</TableHeader>

					{/* Table Body: Minimal and meaningful cell skeletons */}
					<TableBody>
						{skeletonRows.map((_, rowIndex) => (
							<TableRow key={rowIndex}>
								{skeletonColumns.map((_column, colIndex) => (
									<TableCell key={colIndex}>
										{/* Minimal text-like skeleton: h-4, w-3/4, rounded */}
										<Skeleton className="h-7 w-3/4 min-w-[50px]" />
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Skeleton */}
			<div className="py-4">
				<DataTablePaginationSkeleton />
			</div>
		</div>
	);
}
