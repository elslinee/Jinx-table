"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";

import { checkboxColumn, createColumn } from "@/utils/columnsUtils.jsx";
export default function JinxTable({
  filterFields = [],
  addData = {
    type: null,
    label: null,
    link: null,
    icon: <PlusIcon />,
    dialog: null,
  },
  data = [],
  keys = [],
  isCheckbox = false,
  isPagination = false,
  nextPage = () => {},
  previousPage = () => {},
  extraColumns = [],
  total = 0,
  page = 1,
  limit = 10,
  loading,
}) {
  const dataKeys = keys || [];
  const columns = [
    isCheckbox && checkboxColumn(),
    ...dataKeys.map((key) => {
      if (typeof key === "object" && key !== null && !Array.isArray(key)) {
        return createColumn({
          accessorKey: key.header,
          header: key.header,
          cell: key.cell,
        });
      }
      return createColumn({
        accessorKey: key,
        header: key,
      });
    }),
    ...extraColumns,
  ].filter(Boolean);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getRowId: (row, index) => row.id?.toString() || index.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, columnId, filterValue) => {
      if (filterFields.length === 0) return true;

      const searchValue = filterValue.toLowerCase();
      return filterFields.some((field) => {
        const cellValue = row.getValue(field);
        return (
          cellValue && cellValue.toString().toLowerCase().includes(searchValue)
        );
      });
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter,
    },
  });

  return (
    <div
      className={`w-full dark:bg-black bg-white  px-5 ${
        !isPagination && "pb-4"
      }`}
    >
      <div className="flex items-center py-4 gap-4 justify-between">
        <div className="flex gap-2 w-full">
          {filterFields.length > 0 && (
            <Input
              placeholder={`Search ${filterFields.join(", ")}...`}
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="w-full"
            />
          )}
        </div>
        {addData.type === "link" && (
          <Button variant="outline" className="cursor-pointer !p-0">
            <a
              href={addData.link}
              className="flex w-full h-full py-2 px-4 items-center gap-2"
            >
              <span className="flex"> {addData.label}</span>
              {addData.icon}
            </a>
          </Button>
        )}
        {addData.type === "dialog" && addData.dialog}
      </div>
      <div className="rounded-md border w-full">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className={""} key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {loading ? (
            <TableBody>
              <TableRow className={"h-100"}>
                <TableCell colSpan={columns.length}>
                  <div className="flex  !w-full h-full justify-center items-center">
                    <Loader2 className="size-6 flex  dark:text-white text-black rounded-full justify-center items-center animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      {isPagination && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Page {page} of {Math.ceil(total / limit)}
          </div>
          <div
            className={`space-x-2 ${
              loading && "pointer-events-none opacity-50 "
            }`}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={previousPage}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={Math.ceil(total / limit) === page}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
