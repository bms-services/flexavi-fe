import React, { useMemo, useCallback } from "react";
import TableTanstack, { CustomColumnDef } from "../ui/table-tanstack";
import { formatEuro, formatIsoToDate } from "@/utils/format";
import { ApiError, ApiSuccessPaginated, FilterType, ParamGlobal } from "@/zustand/types/apiT";
import { UseQueryResult } from "@tanstack/react-query";
import QuoteStatusBadge from "../leads/badges/QuoteStatusBadge";
import { InvoiceRes, InvoiceStatus, InvoiceStatusMap } from "@/zustand/types/invoiceT";

interface InvoiceTableProps {
    params: ParamGlobal;
    setParams: React.Dispatch<React.SetStateAction<ParamGlobal>>;
    onShow?: (row: InvoiceRes) => void;
    onEdit?: (row: InvoiceRes) => void;
    onDelete?: (rows: InvoiceRes[]) => void;
    onArchive?: (rows: InvoiceRes[]) => void;
    getInvoicesZ: UseQueryResult<ApiSuccessPaginated<InvoiceRes>, ApiError>
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ params, setParams, onEdit, onDelete, onArchive, getInvoicesZ }) => {
    const data = getInvoicesZ.data?.result.data ?? [];
    const meta = getInvoicesZ.data?.result.meta;

    const columns = useMemo<CustomColumnDef<InvoiceRes>[]>(() => [
        { accessorKey: "invoice_number", header: "Nummer", cell: info => info.getValue() },
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
            header: "Datum Start Planning",
            cell: info => formatIsoToDate(info.row.original.planned_start_date),
        },
        { accessorKey: "total_amount", header: "Bedrag", cell: info => formatEuro(info.getValue() as string) },
        { accessorKey: "description", header: "Omschrijving", cell: info => info.getValue() },
        {
            accessorKey: "status", header: "Status", cell: info =>
            (
                <QuoteStatusBadge
                    status={
                        typeof info.row.original.status === 'object'
                            ? info.row.original.status.value as InvoiceStatus
                            : info.row.original.status as InvoiceStatus
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
      * Maps the invoice status to filter options for the table.
      * 
      * @returns An array of objects containing value and label for each invoice status.
      */
    const statusFilterOptions = Object.entries(InvoiceStatusMap).map(
        ([value, { label }]) => ({ value, label })
    );


    return (
        <div className="space-y-4">
            <TableTanstack
                columns={columns}
                data={data}
                meta={meta}
                isLoading={getInvoicesZ.isLoading}
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
