import React, { useMemo, useCallback } from "react";
import { Lead, leadStatusMap } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PaginationResponse, ParamsAction } from "@/@types/global-type";
import TableTanstack, { CustomColumnDef } from "../ui/table-tanstack";
import { formatIsoToDate } from "@/utils/format";
import LeadStatusBadge from "./status/LeadStatusBadge";

interface LeadTableProps {
  params: ParamsAction;
  setParams: React.Dispatch<React.SetStateAction<ParamsAction>>;
  onEdit?: (row: Lead) => void;
  onDelete?: (rows: Lead[]) => void;
  onArchive?: (rows: Lead[]) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ params, setParams, onEdit, onDelete, onArchive }) => {
  const leadIndexRedux = useSelector((state: RootState) => state.lead.index);

  const columns = useMemo<CustomColumnDef<Lead>[]>(() => [
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
    // { accessorKey: "address", header: "Address", cell: info => info.getValue() },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: info => formatIsoToDate(info.row.original.created_at),
    },
  ], []);

  const handleParamsChange = useCallback(
    (changed: Partial<ParamsAction>) => setParams(prev => ({ ...prev, ...changed })),
    [setParams]
  );

  const statusFilterOptions = Object.entries(leadStatusMap).map(
    ([value, { label }]) => ({ value, label })
  );

  return (
    <div className="space-y-4">
      <TableTanstack
        columns={columns}
        data={leadIndexRedux.result?.data ?? []}
        meta={leadIndexRedux.result?.meta}
        isLoading={leadIndexRedux.loading}
        params={params}
        onParamsChange={handleParamsChange}
        onEdit={onEdit}
        onDelete={onDelete}
        onArchive={onArchive}
        filterOptions={{
          status: {
            label: "Status",
            options: statusFilterOptions,
          }
        }}
      />
    </div>
  );
};