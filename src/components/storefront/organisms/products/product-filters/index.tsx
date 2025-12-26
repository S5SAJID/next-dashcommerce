"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useQueryStates, parseAsString } from "nuqs";
import { SearchIcon } from "lucide-react";
import ViewToggle from "@/components/storefront/molecules/view-toggle";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";

type ProductFiltersProps = {
	totalCount: number;
};

export default function ProductFilters({ totalCount }: ProductFiltersProps) {
	const [filters, setFilters] = useQueryStates(
		{
			search: parseAsString.withDefault(""),
			sortBy: parseAsString.withDefault("newest"),
		},
		{
			history: "push",
		},
	);

	return (
		<div className="flex flex-wrap items-center justify-between gap-4 py-4">
			<h1 className="text-lg font-medium">
				Products <span className="text-muted-foreground">({totalCount})</span>
			</h1>

			<div className="flex items-center gap-3">
				{/* Search */}
				<InputGroup className="max-w-[200px]">
					<InputGroupAddon>
						<SearchIcon className="text-muted-foreground" />
					</InputGroupAddon>
					<InputGroupInput
						onChange={(e) => setFilters({ search: e.target.value })}
						placeholder="Search..."
						type="text"
						value={filters.search}
					/>
				</InputGroup>

				{/* Sort */}
				<Select
					onValueChange={(value) => setFilters({ sortBy: value })}
					value={filters.sortBy}
				>
					<SelectTrigger className="h-9 w-[140px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="newest">Newest</SelectItem>
						<SelectItem value="oldest">Oldest</SelectItem>
						<SelectItem value="price-asc">Price: Low</SelectItem>
						<SelectItem value="price-desc">Price: High</SelectItem>
						<SelectItem value="name-asc">A to Z</SelectItem>
						<SelectItem value="name-desc">Z to A</SelectItem>
					</SelectContent>
				</Select>

				{/* View Toggle */}
				<ViewToggle />
			</div>
		</div>
	);
}
