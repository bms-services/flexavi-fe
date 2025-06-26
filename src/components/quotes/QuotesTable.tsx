import React, { useMemo, useCallback } from "react";
import TableTanstack, { CustomColumnDef } from "../ui/table-tanstack";
import { formatEuro, formatIsoToDate } from "@/utils/format";
import { ApiError, ApiSuccessPaginated, FilterType, ParamGlobal } from "@/zustand/types/apiT";
import { UseQueryResult } from "@tanstack/react-query";
import { QuotationRes, QuotationStatus, quotationStatusMap } from "@/zustand/types/quotationT";
import QuoteStatusBadge from "../leads/badges/QuoteStatusBadge";

interface QuotesTableProps {
  params: ParamGlobal;
  setParams: React.Dispatch<React.SetStateAction<ParamGlobal>>;
  onShow?: (row: QuotationRes) => void;
  onEdit?: (row: QuotationRes) => void;
  onDelete?: (rows: QuotationRes[]) => void;
  onArchive?: (rows: QuotationRes[]) => void;
  getQuotationsZ: UseQueryResult<ApiSuccessPaginated<QuotationRes>, ApiError>
}

export const QuotesTable: React.FC<QuotesTableProps> = ({ params, setParams, onEdit, onDelete, onArchive, getQuotationsZ }) => {
  const data = getQuotationsZ.data?.result.data ?? [];
  const meta = getQuotationsZ.data?.result.meta;

  const columns = useMemo<CustomColumnDef<QuotationRes>[]>(() => [
    { accessorKey: "quote_number", header: "Nummer", cell: info => info.getValue() },
    {
      accessorKey: "leads",
      header: "Klant",
      cell: info => {
        const leads = info.row.original.leads;
        if (Array.isArray(leads) && leads.length > 0) {
          return (
            <div className="flex flex-col">
              {leads.map(lead => (
                <span key={lead.id} className="text-sm text-gray-700">
                  {lead.name} ({lead.email})
                </span>
              ))}
            </div>
          )
        }
        return "-";
      }
    },
    {
      accessorKey: "planned_start_date",
      header: "Datum",
      cell: info => formatIsoToDate(info.row.original.created_at),
    },
    { accessorKey: "total_amount", header: "Bedrag", cell: info => formatEuro(info.getValue() as string) },
    { accessorKey: "description", header: "Omschrijving", cell: info => info.getValue() },
    {
      accessorKey: "status", header: "Status", cell: info =>
      (
        <QuoteStatusBadge
          status={
            typeof info.row.original.status === 'object'
              ? info.row.original.status.value as QuotationStatus
              : info.row.original.status as QuotationStatus
          }
        />
      )
    },
  ], []);

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
    * Maps the quotation status to filter options for the table.
    * 
    * @returns An array of objects containing value and label for each quotation status.
    */
  const statusFilterOptions = Object.entries(quotationStatusMap).map(
    ([value, { label }]) => ({ value, label })
  );


  return (
    <div className="space-y-4">
      <TableTanstack
        columns={columns}
        data={data}
        meta={meta}
        isLoading={getQuotationsZ.isLoading}
        params={params}
        onParamsChange={handleParamsChange}
        onEdit={onEdit}
        onDelete={onDelete}
        onArchive={onArchive}
        filterOptions={{
          status: {
            label: "Status",
            type: FilterType.SELECT,
            options: statusFilterOptions,
          },
          planned_start_date: {
            placeholder: "Planed Start Date",
            type: FilterType.DATE
          }
        }}
      />
    </div>
  );
};
