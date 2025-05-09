import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnMeta,
  Updater,
  RowSelectionState,
} from "@tanstack/react-table";
import { MetaResponse, ParamsAction } from "@/@types/global-type";
import { useEffect, useRef, useState } from "react";
import { BanIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { toastShow } from "./toast/toast-helper";
import { toastCreate } from "./toast/toast-create";
import { set } from "date-fns";


type DataTableProps<TData> = {
  columns: CustomColumnDef<TData>[];
  data: TData[];
  meta: MetaResponse;
  isLoading: boolean;
  onParamsChange: (params: Partial<ParamsAction>) => void;
  params: ParamsAction;
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
  onArchive,
}: DataTableProps<TData>) {
  const toastActionRef = useRef(toastCreate());
  const [rowSelection, setRowSelection] = useState({});

  const processedColumns: CustomColumnDef<TData>[] = [
    {
      id: "_select",
      meta: {
        className: "text-center align-middle",
      },
      header: ({ table }) => (
        <div className="flex justify-center items-center">
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(checked) => row.toggleSelected(!!checked)}
          />
        </div>
      ),
    },
    ...columns,
    ...(onEdit ? [
      {
        id: "_actions",
        header: "",
        meta: {
          className: "text-center align-middle",
        },
        cell: ({ row }) => (
          <div className="flex justify-center items-center gap-2">
            <Button
              onClick={() => onEdit(row.original)}
              className="py-0 px-1 text-black hover:text-blue-500"
              variant="link"
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
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
    onRowSelectionChange: (updaterOrValue: Updater<RowSelectionState> | RowSelectionState) => {
      console.log("updaterOrValue", updaterOrValue);
      setRowSelection(updaterOrValue);
    },
    enableRowSelection: true,
  });

  const handleSort = (columnId: string) => {
    const isAsc = params.sort_by === columnId && params.sort_dir === "asc";
    onParamsChange({ sort_by: columnId, sort_dir: isAsc ? "desc" : "asc" });
  };


  const handleResetActions = () => {
    setRowSelection({});
    toastActionRef.current?.dismiss();
  };

  useEffect(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);

    if (selectedRows.length > 0) {
      toastActionRef.current.show({
        title: `Selected ${selectedRows.length} row(s)`,
        type: "info",
        onDelete: () => {
          onDelete(selectedRows);
        },
        onArchive: () => {
          onArchive(selectedRows);
        },
        onDismiss: () => {
          setRowSelection({});
        },
      });
    } else {
      toastActionRef.current.dismiss();
      // setRowSelection({});
    }
  }, [rowSelection, onDelete, table, toastActionRef, onArchive]);


  // Cleanup function to reset row selection and dismiss toast when component unmounts
  useEffect(() => {
    return () => {
      handleResetActions();
    };
  }, []);

  // when params change, reset row selection
  useEffect(() => {
    handleResetActions();
  }, [params]);


  return (
    <div className="rounded-md border bg-white p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={`px-4 py-2 cursor-pointer select-none ${(header.column.columnDef.meta as CustomColumnMeta)?.className || ""}`}
                    // className={`px-4 py-2 cursor-pointer select-none ${header.column.columnDef.meta?.className || ""}`}

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
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse border-t">
                    {Array.from({ length: columns.length }).map((_, colIndex) => (
                      <td key={colIndex} className="px-4 py-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </>
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
                    <td key={cell.id} className={`px-4 py-2 ${(cell.column.columnDef.meta as CustomColumnMeta)?.className || ""}`}
                    >
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
            {[5, 10, 20, 50].map(size => (
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
