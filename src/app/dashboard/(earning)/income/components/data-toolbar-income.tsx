'use client'

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/(dashboard-page)/(table)/components/data-table-view-option"
import { DataTableFacetedFilter } from "@/components/(dashboard-page)/(table)/components/data-table-faceted-filter"
import {  earnType, statuses } from "../data/earningtype"


interface DataTableToolbarProps<TData> {
    table: Table<TData>
  }
  

export function DataTableToolbar<TData>({
    table
}: DataTableToolbarProps<TData>){

    const isFiltered = table.getState().columnFilters.length > 0
    console.log("table",table.getColumn("earnType"))

    return (
        <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search Address..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("statuses") && (
            <DataTableFacetedFilter
              column={table.getColumn("statuses")}
              title="status"
              options={statuses}
            />
          )}
           {table.getColumn("earnType") && (
          <DataTableFacetedFilter
            column={table.getColumn("earnType")}
            title="EarningType"
            options={earnType}
          />
        )}
       
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
    )
}