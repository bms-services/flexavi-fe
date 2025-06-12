import React, { useMemo, useCallback } from "react";
import { leadStatusMap } from "@/types";
import { ParamsAction } from "@/@types/global-type";
import TableTanstack, { CustomColumnDef } from "../ui/table-tanstack";
import { formatIsoToDate } from "@/utils/format";
import LeadStatusBadge from "./status/LeadStatusBadge";
import { LeadRes } from "@/zustand/types/leadT";
import { useGetLeads } from "@/zustand/hooks/useLead";

interface LeadTableProps {
  params: ParamsAction;
  setParams: React.Dispatch<React.SetStateAction<ParamsAction>>;
  onEdit?: (row: LeadRes) => void;
  onDelete?: (rows: LeadRes[]) => void;
  onArchive?: (rows: LeadRes[]) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ params, setParams, onEdit, onDelete, onArchive }) => {
  // const leadIndexRedux = useSelector((state: RootState) => state.lead.index);
  const getLeadsZ = useGetLeads(params);

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
    // {
    //   accessorKey: "address",
    //   header: "Address",
    //   cell: info => {
    //     const lead = info.row.original;
    //     const addr = lead.address;
    //     if (addr) {
    //       return `${addr.street} ${addr.house_number}${addr.house_number_addition ? ' ' + addr.house_number_addition : ''}, ${typeof addr.postal_code === 'object' ? addr.postal_code.value : addr.postal_code} ${addr.city}`;
    //     }
    //     return "-";
    //   }
    // },
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
        data={getLeadsZ.data?.result?.data || []}
        meta={getLeadsZ.data?.result?.meta}
        isLoading={getLeadsZ.isLoading}
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