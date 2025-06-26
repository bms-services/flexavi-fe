import React, { useMemo, useCallback } from "react";
import TableTanstack, { CustomColumnDef } from "../ui/table-tanstack";
import { formatIsoToDate } from "@/utils/format";
import LeadStatusBadge from "./status/LeadStatusBadge";
import { LeadRes, leadStatusMap } from "@/zustand/types/leadT";
import { useDeleteLead } from "@/zustand/hooks/useLead";
import { ApiError, ApiSuccessPaginated, FilterType, ParamGlobal } from "@/zustand/types/apiT";
import { UseQueryResult } from "@tanstack/react-query";

interface LeadTableProps {
  params: ParamGlobal;
  setParams: React.Dispatch<React.SetStateAction<ParamGlobal>>;
  onShow?: (row: LeadRes) => void;
  onEdit?: (row: LeadRes) => void;
  onDelete?: (rows: LeadRes[]) => void;
  onArchive?: (rows: LeadRes[]) => void;
  getLeadsZ: UseQueryResult<ApiSuccessPaginated<LeadRes>, ApiError>
}

export const LeadTable: React.FC<LeadTableProps> = ({ params, setParams, onShow, onEdit, onDelete, onArchive, getLeadsZ }) => {
  const data = getLeadsZ.data?.result.data ?? [];
  const meta = getLeadsZ.data?.result.meta;

  const deleteLeadZ = useDeleteLead();
  const columns = useMemo<CustomColumnDef<LeadRes>[]>(() => [
    { accessorKey: "name", header: "Name", cell: info => info.getValue() },
    { accessorKey: "email", header: "Email", cell: info => info.getValue() },
    { accessorKey: "phone", header: "Phone", cell: info => info.getValue() },
    {
      accessorKey: "status", header: "Status", cell: info =>
      (
        <LeadStatusBadge
          status={info.row.original.status}
        />
      )
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: info => {
        const lead = info.row.original;
        const addr = lead.address;
        if (addr) {
          return `${addr.street} ${addr.house_number}${addr.house_number_addition ? ' ' + addr.house_number_addition : ''}, ${addr.postal_code
            ? (typeof addr.postal_code === 'object' ? addr.postal_code.value : addr.postal_code)
            : ''
            } ${addr.city}`;
        }
        return "-";
      }
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: info => formatIsoToDate(info.row.original.created_at),
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
   * Maps the lead status to filter options for the table.
   * 
   * @returns An array of objects containing value and label for each lead status.
   */
  const statusFilterOptions = Object.entries(leadStatusMap).map(
    ([value, { label }]) => ({ value, label })
  );

  return (
    <div className="space-y-4">
      <TableTanstack
        columns={columns}
        data={data}
        meta={meta}
        isLoading={getLeadsZ.isLoading}
        isLoadingAction={deleteLeadZ.isPending || deleteLeadZ.isPending}
        params={params}
        onParamsChange={handleParamsChange}
        onEdit={onEdit}
        onShow={onShow}
        onDelete={onDelete}
        onArchive={onArchive}
        filterOptions={{
          status: {
            label: "Status",
            type: FilterType.SELECT,
            options: statusFilterOptions,
          },
        }}
      />
    </div>
  );
};