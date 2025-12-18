"use client";

import type React from "react";

import { useState, useCallback, useEffect, useRef } from "react";
import { Search, Loader2, SearchIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { storefrontSearchProducts } from "@/db/actions/storefront/products/search/action";
import Image from "next/image";
import Link from "next/link";
import { Table } from "@/components/ui/table";

type Product = {
	name: string;
	price: number;
	images: string[];
	description: string;
	slug: string;
};

export function SearchModal() {
	const [searchQuery, setSearchQuery] = useState("");
	const [results, setResults] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSelectProduct = useCallback((_product: Product) => {
		setIsModalOpen(false);
	}, []);

	// Debounced search function
	const performSearch = useCallback(async (query: string) => {
		if (query.length < 1 || !query.trim()) {
			return;
		}
		setIsLoading(true);
		const products = await storefrontSearchProducts({ query });

		if (!products.data) {
			return;
		}
		setResults(products.data);
		setIsLoading(false);
	}, []);

	// Debounce search input
	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchQuery(value);

			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}

			debounceTimer.current = setTimeout(() => {
				performSearch(value);
			}, 300);
		},
		[performSearch],
	);

	// Keyboard navigation
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					// Navigate through results
					break;
				case "ArrowUp":
					e.preventDefault();
					// Navigate through results
					break;
				case "Enter":
					e.preventDefault();
					if (results.length > 0) {
						handleSelectProduct(results[0]);
					}
					break;
				case "Escape":
					e.preventDefault();
					setIsModalOpen(false);
					break;
			}
		},
		[results, handleSelectProduct],
	);

	// Focus input when modal opens
	useEffect(() => {
		setTimeout(() => inputRef.current?.focus(), 0);
	}, []);

	// Cleanup debounce on unmount
	useEffect(
		() => () => {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}
		},
		[],
	);

	return (
		<Dialog onOpenChange={(open) => setIsModalOpen(open)} open={isModalOpen}>
			<DialogTrigger asChild>
				<Button
					className="text-muted-foreground hover:text-foreground"
					size="icon"
					variant="ghost"
				>
					<Search />
				</Button>
			</DialogTrigger>
			<DialogContent className="overflow-hidden font-['DM_Sans']">
				<DialogHeader>
					<DialogTitle>Search Products</DialogTitle>
				</DialogHeader>
				{/* Search Input Section */}
				<InputGroup>
					<InputGroupInput
						onChange={(e) => handleSearchChange(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Search..."
						ref={inputRef}
						value={searchQuery}
					/>
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
				</InputGroup>

				{/* Results Section */}
				<div className="max-h-[60vh] overflow-y-auto">
					{isLoading ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
						</div>
					) : results.length > 0 ? (
						<Table>
							{results.map((product) => (
								<Link
									className="block w-full px-3 py-4 text-left transition-colors hover:bg-muted/50"
									href={`/products/${product.slug}`}
									key={product.slug}
									onClick={() => setIsModalOpen(false)}
								>
									<div className="flex gap-4">
										{product.images.length > 0 && (
											<Image
												alt={product.name}
												className="h-16 w-16 rounded-lg bg-muted object-cover"
												height={100}
												src={product.images[0] || "/placeholder.svg"}
												width={100}
											/>
										)}
										<div className="min-w-0 flex-1">
											<div className="flex items-start justify-between gap-2">
												<div className="flex-1">
													<h3 className="line-clamp-1 font-medium text-foreground">
														{product.name}
													</h3>
													{product.description && (
														<p className="mt-1 line-clamp-1 text-muted-foreground text-sm">
															{product.description}
														</p>
													)}
													{/* <p className="mt-2 text-muted-foreground text-xs">
														{product.price }
													</p> */}
												</div>
												<div className="text-right">
													<p className="whitespace-nowrap font-semibold text-foreground">
														{product.price.toFixed(2)}
													</p>
												</div>
											</div>
										</div>
									</div>
								</Link>
							))}
						</Table>
					) : searchQuery ? (
						<div className="flex flex-col items-center justify-center px-6 py-12">
							<Search className="mb-3 h-8 w-8 text-muted-foreground/50" />
							<p className="text-center text-muted-foreground text-sm">
								No products found for &quot;{searchQuery}&quot;
							</p>
							<p className="mt-1 text-muted-foreground/70 text-xs">
								Try different keywords
							</p>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center px-6 py-12">
							<Search className="mb-3 h-8 w-8 text-muted-foreground/50" />
							<p className="text-center text-muted-foreground text-sm">
								Start typing to search products
							</p>
						</div>
					)}
				</div>

				<DialogFooter className="w-full sm:justify-stretch">
					{results.length > 0 && (
						<div className="w-full border-border border-t bg-muted/30 px-6 py-3">
							<p className="text-muted-foreground text-xs">
								{results.length} result{results.length !== 1 ? "s" : ""} found
							</p>
						</div>
					)}
				</DialogFooter>
				{/* Footer Info */}
			</DialogContent>
		</Dialog>
	);
}
