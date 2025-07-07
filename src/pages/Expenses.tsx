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
    { accessorKey: "expense_number", header: "Nummer", cell: info => info.getValue() },
    // {
    //   accessorKey: "leads",
    //   header: "Klant",
    //   cell: info => {
    //     const leads = info.row.original.leads;
    //     if (Array.isArray(leads) && leads.length > 0) {
    //       return (
    //         <div className="flex flex-col">
    //           {leads.map(lead => (
    //             <span key={lead.id} className="text-sm text-gray-700">
    //               {lead.name} ({lead.email})
    //             </span>
    //           ))}
    //         </div>
    //       )
    //     }
    //     return "-";
    //   }
    // },
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

  const handleExportExpenses = () => {

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
