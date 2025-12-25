"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";
import { useMemo, useState } from "react";
import {
	DataTableToolbar,
	type DataTableToolbarFilters,
} from "./data-table-toolbar";
import { Skeleton } from "@/components/ui/skeleton";

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data?: TData[];
	toolbar: {
		searchColumn: string;
		searchPlaceholder: string;
		filters?: DataTableToolbarFilters[];
	};
	isLoading?: boolean;
};

export default function DataTable<TData, TValue>({
	columns,
	data = [],
	toolbar,
	isLoading = false,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const tableData: typeof data = useMemo(
		() => (isLoading ? new Array(30).fill({}) : data),
		[isLoading, data],
	);

	const tableColumns = useMemo(
		() =>
			isLoading
				? columns.map((column) => ({
						...column,
						cell: () => <Skeleton className="h-6" />,
					}))
				: columns,
		[isLoading, columns],
	);

	const table = useReactTable<TData>({
		data: tableData,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			columnFilters,
			sorting,
			columnVisibility,
		},
	});

	return (
		<div className="space-y-4">
			<DataTableToolbar
				filters={toolbar.filters}
				searchColumn={toolbar.searchColumn}
				searchPlaceholder={toolbar.searchPlaceholder}
				table={table}
			/>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									data-state={row.getIsSelected() && "selected"}
									key={row.id}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									className="h-24 text-center"
									colSpan={columns.length}
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="py-4">
				<DataTablePagination table={table} />
			</div>
		</div>
	);
}
