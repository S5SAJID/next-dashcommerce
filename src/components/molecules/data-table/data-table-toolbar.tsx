import { X } from 'lucide-react'
import { type Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from '@/components/molecules/data-table/datra-table-faceted-filter'
import { DataTableViewOptions } from '@/components/molecules/data-table/data-table-col-toggle'

export type DataTableToolbarFilters = {
  columnName: string,
  title: string,
  options: { label: string, value: string }[]
}

type DataTableToolbarProps<TData> = {
  table: Table<TData>,
  searchColumn: string,
  searchPlaceholder: string,
  filters?: DataTableToolbarFilters[]
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  searchPlaceholder,
  filters
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={searchPlaceholder}
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {filters && filters.length > 0 && (
          <>
            <div className='flex gap-x-2'>
              {filters.map(item => {
                const column = table.getColumn(item.columnName)
                return column ? (
                  <DataTableFacetedFilter
                    key={item.columnName}
                    column={column}
                    title={item.title}
                    options={item.options}
                  />
                ) : null
              })}
            </div>
            {isFiltered && (
              <Button
                variant='ghost'
                onClick={() => table.resetColumnFilters()}
                className='h-8 px-2 lg:px-3'
              >
                Reset
                <X className='ms-2 h-4 w-4' />
              </Button>
            )}
          </>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}