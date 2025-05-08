import React, { Dispatch } from "react";
import { Lead } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PaginationResponse, ParamsAction } from "@/@types/global-type";
import { DataTable } from "../ui/table-tanstack";

interface LeadTableProps {
  params?: ParamsAction;
  setParams: Dispatch<React.SetStateAction<ParamsAction>>
  onEdit?: (id: Lead) => void;
  onDelete?: (id: Lead[]) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ 
  params,
  setParams,
  onEdit,
  onDelete,
}) => {
  
  const columns: ColumnDef<Lead>[] = [
    { accessorKey: "name", header: "Name", cell: info => info.getValue() },
    { accessorKey: "email", header: "Email", cell: info => info.getValue() },
    { accessorKey: "phone", header: "Phone", cell: info => info.getValue() },
    { accessorKey: "status_label", header: "Status", cell: info => info.getValue() },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: info => info.getValue(),
    },
  
  ];

  const { loading:loadingLeadsIndex, response:reponseLeadIndex } = useSelector((state: RootState) => state.lead.index);
  const resultLeadIndex = reponseLeadIndex.result as PaginationResponse<Lead>;
  
  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={resultLeadIndex?.data || []}
        meta={resultLeadIndex?.meta}
        isLoading={loadingLeadsIndex}
        params={params}
        onParamsChange={changed => setParams(prev => ({ ...prev, ...changed }))}
        onDelete={onDelete}
        onEdit={onEdit}
        isMultipleDelete={true}
      />

    </div>
  );
};
