import React, { useMemo, useCallback } from "react";
import TableTanstack, { CustomColumnDef } from "../ui/table-tanstack";
import { formatEuro, formatIsoToDate, formatPercentage } from "@/utils/format";
import { ApiError, ApiSuccessPaginated, ParamGlobal } from "@/zustand/types/apiT";
import { UseQueryResult } from "@tanstack/react-query";
import { QuotationRes } from "@/zustand/types/quotationT";

interface QuotesTableProps {
  params: ParamGlobal;
  setParams: React.Dispatch<React.SetStateAction<ParamGlobal>>;
  onShow?: (row: QuotationRes) => void;
  onEdit?: (row: QuotationRes) => void;
  onDelete?: (rows: QuotationRes[]) => void;
  onArchive?: (rows: QuotationRes[]) => void;
  getQuotationsZ: UseQueryResult<ApiSuccessPaginated<QuotationRes>, ApiError>
}

export const QuotesTable: React.FC<QuotesTableProps> = ({ params, setParams, onShow, onEdit, onDelete, onArchive, getQuotationsZ }) => {
  const data = getQuotationsZ.data?.result.data ?? [];
  const meta = getQuotationsZ.data?.result.meta;

  const columns = useMemo<CustomColumnDef<QuotationRes>[]>(() => [
    { accessorKey: "title", header: "Titel", cell: info => info.getValue() },
    { accessorKey: "unit", header: "Eenheid", cell: info => info.getValue() },
    { accessorKey: "price", header: "Prijs", cell: info => formatEuro(info.getValue() as string) },
    { accessorKey: "btw_percentage", header: "BTW", cell: info => formatPercentage(info.getValue() as string) },
    {
      accessorKey: "created_at",
      header: "Aangemaakt",
      cell: info => formatIsoToDate(info.row.original.created_at),
    },
  ], []);

  const handleParamsChange = useCallback(
    (changed: Partial<ParamGlobal>) => setParams(prev => ({ ...prev, ...changed })),
    [setParams]
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
      />
    </div>
  );
};
