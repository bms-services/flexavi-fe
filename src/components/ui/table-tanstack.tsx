import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MetaResponse, ParamsAction } from "@/@types/global-type";
import { useState } from "react";

type DataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  meta: MetaResponse;
  isLoading: boolean;
  onParamsChange: (params: Partial<ParamsAction>) => void;
  params: ParamsAction;
  onEdit?: (row: TData) => void;
onDelete?: (rows: TData[]) => void;
isMultipleDelete?: boolean;
};

export function DataTable<TData>({
  columns,
  data,
  meta = {
      current_page: 1,
      last_page: 1,
      total: 0,
      per_page: 10,
      from: 0,
      to: 0,
      next_page_url: "",
      prev_page_url: ""
  },
  isLoading,
  onParamsChange,
  params,
    onEdit,
    onDelete,
    isMultipleDelete = false,
}: DataTableProps<TData>) {
    const [rowSelection, setRowSelection] = useState({});

    const processedColumns: ColumnDef<TData, unknown>[] = [
        ...(isMultipleDelete
          ? [
              {
                id: "_select",
                header: ({ table }) => (
                  <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                  />
                ),
                cell: ({ row }) => (
                  <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                  />
                ),
              },
            ]
          : []),
        ...columns,
        ...(onEdit || onDelete
          ? [
              {
                id: "_actions",
                header: "Actions",
                cell: ({ row }) => (
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row.original)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete([row.original])}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ),
              },
            ]
          : []),
      ];
      
  const table = useReactTable({
    data,
    columns: processedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta?.last_page,
    state: {
      pagination: {
        pageIndex: params.page - 1,
        pageSize: params.per_page,
      },
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: !!isMultipleDelete,
});


  const handleSort = (columnId: string) => {
    const isAsc = params.sort_by === columnId && params.sort_dir === "asc";
    onParamsChange({ sort_by: columnId, sort_dir: isAsc ? "desc" : "asc" });
  };

  return (
   <div className="rounded-md border bg-white p-4">
      <div className="overflow-x-auto">
      {isMultipleDelete && onDelete && Object.keys(rowSelection).length > 0 && (
        <div className="mb-3">
            <button
            className="bg-red-500 text-white px-4 py-1 rounded"
            onClick={() => {
                const selected = table
                .getSelectedRowModel()
                .rows.map(row => row.original);
                onDelete(selected);
            }}
            >
            Delete Selected ({Object.keys(rowSelection).length})
            </button>
        </div>
        )}


        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-2 cursor-pointer select-none"
                    onClick={() =>
                      header.column.getCanSort()
                        ? handleSort(header.column.id)
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {params.sort_by === header.column.id ? (
                      <span className="ml-1">
                        {params.sort_dir === "asc" ? "↑" : "↓"}
                      </span>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
                  No data found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-t">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          Page {meta.current_page} of {meta.last_page}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={params.per_page}
            onChange={e =>
              onParamsChange({ per_page: Number(e.target.value), page: 1 })
            }
            className="border rounded px-2 py-1"
          >
            {[10, 25, 50, 100].map(size => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
          <button
            disabled={meta.current_page === 1}
            onClick={() => onParamsChange({ page: params.page - 1 })}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={meta.current_page === meta.last_page}
            onClick={() => onParamsChange({ page: params.page + 1 })}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
