import { useMemo, useCallback, useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
  Table as ReactTable,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, MoveRightIcon, PencilIcon } from "lucide-react";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import { toastCreate } from "./toast/toast-create";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDebounce } from "use-debounce";
import { FilterOptionsMap, Meta, ParamGlobal } from "@/zustand/types/apiT";
import { TableTanstackFilter } from "./table-tanstack-filter";


// Constrain TData to have an 'id' field
type DataTableProps<TData> = {
  columns: CustomColumnDef<TData>[];
  data: TData[];
  meta?: Meta;
  isLoading: boolean;
  isLoadingAction?: boolean;
  params: ParamGlobal;
  filterOptions?: FilterOptionsMap;
  onParamsChange: (p: Partial<ParamGlobal>) => void;
  onShow?: (row: TData) => void;
  onEdit?: (row: TData) => void;
  onDelete?: (rows: TData[]) => void;
  onArchive?: (rows: TData[]) => void;
};

type CustomColumnMeta = {
  className?: string;
};
export type CustomColumnDef<TData> = ColumnDef<TData, unknown> & {
  meta?: CustomColumnMeta;
};

// Safe default meta
const defaultMeta: Meta = {
  current_page: 1,
  per_page: 10,
  first_page_url: "",
  last_page_url: "",
  total: 0,
  from: 0,
  to: 0,
  last_page: 1,
  next_page_url: "",
  prev_page_url: "",
};

function useRowSelectionToast<TData>(
  table: ReactTable<TData>,
  rowSelection: RowSelectionState,
  isLoadingAction: boolean | undefined,
  onDelete?: (rows: TData[]) => void,
  onArchive?: (rows: TData[]) => void
) {
  const toastRef = useRef(toastCreate(isLoadingAction ?? false));

  useEffect(() => {
    if (!onDelete && !onArchive) return;

    const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
    if (selectedRows.length > 0) {
      toastRef.current.show({
        title: `Selected ${selectedRows.length} row(s)`,
        type: "info",
        onDelete: () => onDelete?.(selectedRows),
        onArchive: () => onArchive?.(selectedRows),
        onDismiss: () => table.resetRowSelection(),
      });
    } else {
      toastRef.current.dismiss();
    }
  }, [rowSelection, onDelete, onArchive, table]);
}

export default function TableTanstack<TData>({
  columns,
  data,
  meta,
  isLoading,
  filterOptions,
  onParamsChange,
  isLoadingAction = false,
  params,
  onShow,
  onEdit,
  onDelete,
  onArchive,
}: DataTableProps<TData>) {
  const safeMeta = meta ?? defaultMeta;
  const { per_page, search = "", filters = {}, sorts = {} } = params;
  const { current_page, last_page, from, to, total } = safeMeta;

  const [localSearch, setLocalSearch] = useState(search);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [debouncedSearch] = useDebounce(localSearch, 500);

  const didMountRef = useRef(false);

  const processedColumns = useMemo<CustomColumnDef<TData>[]>(() => {
    const base: CustomColumnDef<TData>[] = [];

    if (onDelete || onArchive) {
      base.push({
        id: "_select",
        meta: { className: "text-center align-middle" },
        header: ({ table }) => (
          <div className="flex justify-center items-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-center items-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(v) => row.toggleSelected(!!v)}
            />
          </div>
        ),
      });
    }

    base.push(...columns);

    if (onEdit || onShow) {
      base.push({
        id: "_actions",
        header: "",
        meta: { className: "text-center align-middle" },
        cell: ({ row }) => (
          <div className="flex justify-center items-center gap-2">
            {onEdit && (
              <Button
                variant="link"
                className="py-0 px-1 text-black hover:text-blue-500"
                onClick={() => onEdit(row.original)}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            )}
            {onShow && (
              <Button
                variant="link"
                className="py-0 px-1 text-black hover:text-blue-500"
                onClick={() => onShow(row.original)}
              >
                <MoveRightIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ),
      });
    }

    return base;
  }, [columns, onEdit, onShow, onDelete, onArchive]);

  const handleSort = useCallback((columnId: string) => {
    // 1) clone existing sorts
    const next: Record<string, "asc" | "desc"> = { ...sorts };
    const current = next[columnId];

    if (!current) {
      next[columnId] = "asc";
    } else if (current === "asc") {
      next[columnId] = "desc";
    } else {
      delete next[columnId];
    }

    onParamsChange({ sorts: next });
  }, [sorts, onParamsChange]);

  const table = useReactTable({
    data,
    columns: processedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: safeMeta.last_page,
    state: { pagination: { pageIndex: (params.page ?? 1) - 1, pageSize: params.per_page ?? 10 }, rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (originalRow: TData, index: number) => {
      if (typeof originalRow === "object" && originalRow !== null && "id" in originalRow) {
        return (originalRow as {
          id: string;
        }).id;
      }
      return index.toString();
    }
  });

  // Show delete/archive toast
  useRowSelectionToast(table, rowSelection, isLoadingAction, onDelete, onArchive);

  // Reset selection when parameters change
  useEffect(() => {
    setRowSelection({});
  }, [params.page, params.per_page, params.search, params.filters, params.sorts]);

  // Unmount cleanup
  useEffect(() => () => setRowSelection({}), []);

  // Handle sort changes
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    // only when the debounced value truly differs
    if (debouncedSearch !== search) {
      onParamsChange({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, search, onParamsChange]);

  // Handle search input change
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Handle page change
  const generatePages = () => {
    const pages: (number | "ellipsis")[] = [];
    for (let i = 1; i <= last_page; i++) {
      if (
        i === 1 ||
        i === last_page ||
        (i >= current_page - 2 && i <= current_page + 2)
      ) {
        pages.push(i);
      } else if (
        i === current_page - 3 ||
        i === current_page + 3
      ) {
        pages.push("ellipsis");
      }
    }
    return pages;
  };

  const pageSize = [5, 10, 20, 50];

  return (
    <div className="rounded-md border bg-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-2">
        {/* Search */}
        <div className="w-full sm:w-2/6">
          <Input
            type="text"
            placeholder="Search…"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>

        {Object.entries(filterOptions ?? {}).map(([key, config]) => (
          <div key={key} className="w-full sm:w-1/6">
            <TableTanstackFilter
              keyName={key}
              config={config}
              value={filters?.[key]}
              onChange={(key, val) => {
                const next = { ...filters };
                if (val === undefined || val === null) delete next[key];
                else next[key] = val;
                onParamsChange({ filters: next, page: 1 });
              }}
            />
          </div>
        ))}

      </div>
      <div className="overflow-x-auto overflow-y-auto h-[calc(100vh-350px)]">
        <table className="min-w-full text-left text-sm">
          <thead className="text-muted-foreground bg-[#eee]">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`
                      sticky top-0 bg-white z-10 p-2 cursor-pointer select-none font-medium
                      ${(header.column.columnDef.meta as CustomColumnMeta)?.className || ""}
                    `}
                    onClick={() => header.column.getCanSort() && handleSort(header.column.id)}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {sorts[header.id] === "asc" && <span>↑</span>}
                    {sorts[header.id] === "desc" && <span>↓</span>}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: safeMeta.per_page }).map((_, i) => (
                <tr key={i} className="animate-pulse border-b">
                  {Array.from({ length: processedColumns.length }).map((__, j) => (
                    <td key={j} className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={processedColumns.length} className="text-center py-6">
                  No data found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={`p-2 ${(cell.column.columnDef.meta as CustomColumnMeta)?.className || ""}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm space-y-2 md:space-y-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onParamsChange({ page: current_page - 1 })}
            disabled={current_page === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1">
            {generatePages().map((item, idx) =>
              item === "ellipsis" ? (
                <span key={`e-${idx}`} className="px-2 text-muted-foreground">…</span>
              ) : (
                <button
                  key={item}
                  onClick={() => onParamsChange({ page: item as number })}
                  className={`
            px-3 py-1 rounded border text-sm transition
            ${item === current_page
                      ? "bg-primary text-white font-semibold border-primary"
                      : "bg-white hover:bg-gray-100 border-gray-300"
                    }
          `}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => onParamsChange({ page: current_page + 1 })}
            disabled={current_page === last_page}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center w-fit gap-4">
          <div className="text-muted-foreground w-fit">
            {from ?? 0} - {to ?? 0} of {total} items
          </div>
          <Select
            value={(per_page ?? 10).toString()}
            onValueChange={(value) => {
              const size = Number(value);
              onParamsChange({ per_page: size, page: 1 });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              {pageSize.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} items
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

    </div >
  );
}