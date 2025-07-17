import { useCallback, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ExpensesHeader } from "@/components/expenses/ExpensesHeader";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";
import TableTanstack, { CustomColumnDef } from "@/components/ui/table-tanstack";
import { FilterType, ParamGlobal } from "@/zustand/types/apiT";
import { useNavigate } from "react-router-dom";
import { useGetExpenses } from "@/zustand/hooks/useExpense";
import { ExpenseRes, ExpenseStatusMap } from "@/zustand/types/expenseT";
import { formatEuro, formatIsoToDate } from "@/utils/format";
import ExpenseStatusBadge from "@/components/expenses/ExpenseStatusBadge";
import { ExpenseTypeIcon } from "@/components/expenses/ExpenseTypeIcon";
import { exportExpensesService } from "@/zustand/services/expenseService";

const Expenses = () => {
  const navigate = useNavigate();

  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const useGetExpensesZ = useGetExpenses(params);
  const data = useGetExpensesZ.data?.result.data ?? [];
  const meta = useGetExpensesZ.data?.result.meta;

  const columns = useMemo<CustomColumnDef<ExpenseRes>[]>(() => [
    {
      accessorKey: "type",
      header: "Type",
      cell: info => (
        <span className="text-sm text-gray-700">
          {ExpenseTypeIcon({
            type: info.row.original.type,
            className: "inline-block",
            size: 16
          })}
          {" "}{info.row.original.type.charAt(0).toUpperCase() + info.row.original.type.slice(1)}
        </span>
      )
    },
    // description column
    {
      accessorKey: "description",
      header: "Omschrijving",
      cell: info => (
        <span className="text-sm text-gray-700">
          {info.getValue() as string}
        </span>
      )
    },
    {
      accessorKey: "created_at",
      header: "Datum",
      cell: info => formatIsoToDate(info.row.original.created_at),
    },
    { accessorKey: "amount", header: "Bedrag", cell: info => formatEuro(info.getValue() as string) },
    {
      accessorKey: "status", header: "Status", cell: info =>
      (
        <ExpenseStatusBadge
          status={info.row.original.status}
        />
      )
    },
  ], []);

  const [modal, setModal] = useState({
    receipt: false,
  })

  const handleCreate = async () => {
    navigate("/expenses/create");
  }

  const handleExportExpenses = async () => {
    try {
      const blob = await exportExpensesService({
        filters: params.filters,
      });

      let filename = 'expenses_export.xlsx';

      const disposition = blob.type === "application/json" ? null : 'attachment; filename="expenses.xlsx"';

      const match = disposition?.match(/filename="?(.+)"?/);
      if (match && match[1]) {
        filename = match[1];
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  const handleShow = (data: ExpenseRes) => {
    navigate(`/expenses/${data.id}`);
  };

  const handleEdit = (data: ExpenseRes) => {
    navigate(`/expenses/edit/${data.id}`);
  };

  const handleDelete = async (ids: ExpenseRes[]) => {
  }

  const handleCreateReceipt = () => {
  };

  const handleStoreReceipt = () => {
  }

  /**
    * Handles changes to the table parameters such as pagination, sorting, and filtering.
    * 
    * @param changed - Partial object containing the parameters that have changed.
    * This function merges the new parameters with the existing ones in the state.
    */
  const handleParamsChange = useCallback(
    (changed: Partial<ParamGlobal>) => setParams(prev => ({ ...prev, ...changed })),
    [setParams]
  );

  /**
    * Maps the expense status to filter options for the table.
    * 
    * @returns An array of objects containing value and label for each expense status.
    */
  const statusFilterOptions = Object.entries(ExpenseStatusMap).map(
    ([value, { label }]) => ({ value, label })
  );

  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <ExpensesHeader
          handleCreateExpense={handleCreate}
          handleOpenModalReceipt={handleStoreReceipt}
          handleExportExpenses={handleExportExpenses}
        />

        <div className="space-y-4">
          <TableTanstack
            columns={columns}
            data={data}
            meta={meta}
            isLoading={useGetExpensesZ.isLoading}
            params={params}
            onParamsChange={handleParamsChange}
            onEdit={handleEdit}
            onShow={handleShow}
            onDelete={handleDelete}
            // onArchive={onArchive}
            filterOptions={{
              status: {
                label: "Status",
                type: FilterType.SELECT,
                options: statusFilterOptions,
              },
              created_at: {
                placeholder: "Van",
                type: FilterType.DATE
              }
            }}
          />
        </div>

        <ReceiptUploadDialog
          open={modal.receipt}
          onOpenChange={(open) => setModal({ ...modal, receipt: open })}
          onResult={handleStoreReceipt}
        />
      </div>
    </Layout>
  );
};

export default Expenses;
