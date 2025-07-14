
import React, { useCallback, useMemo } from "react";
import { ApiError, ApiSuccessPaginated, FilterType, ParamGlobal } from "@/zustand/types/apiT";
import { ProjectRes, projectStatusMap } from "@/zustand/types/projectT";
import { UseQueryResult } from "@tanstack/react-query";
import TableTanstack, { CustomColumnDef } from "../ui/table-tanstack";
import { formatEuro } from "@/utils/format";
import ProjectStatusBadge from "./ProjectStatusBadge";

interface ProjectsTableProps {
  params: ParamGlobal;
  setParams: React.Dispatch<React.SetStateAction<ParamGlobal>>;
  onShow?: (row: ProjectRes) => void;
  onEdit?: (row: ProjectRes) => void;
  onDelete?: (rows: ProjectRes[]) => void;
  onArchive?: (rows: ProjectRes[]) => void;
  getProjectsZ: UseQueryResult<ApiSuccessPaginated<ProjectRes>, ApiError>
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({ params, setParams, onShow, onEdit, onDelete, onArchive, getProjectsZ }) => {
  const data = getProjectsZ.data?.result.data ?? [];
  const meta = getProjectsZ.data?.result.meta;

  const columns = useMemo<CustomColumnDef<ProjectRes>[]>(() => [
    { accessorKey: "project_number", header: "Nummer", cell: info => info.getValue() },
    {
      accessorKey: "name",
      header: "Naam",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "start_date",
      header: "Geplande Startdatum",
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: info => formatEuro(info.getValue() as string),
    },
    {
      accessorKey: "status", header: "Status", cell: info =>
      (
        <ProjectStatusBadge
          status={info.row.original.status}
        />
      )
    },
    {
      accessorKey: "profit",
      header: "Winst",
      cell: info => formatEuro(info.getValue() as string),
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
  const statusFilterOptions = Object.entries(projectStatusMap).map(
    ([value, { label }]) => ({ value, label })
  );



  return (
    <div className="space-y-4">
      <TableTanstack
        columns={columns}
        data={data}
        meta={meta}
        isLoading={getProjectsZ.isLoading}
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
          planned_start_date: {
            placeholder: "Planed Start Date",
            type: FilterType.DATE
          }
        }}
      />
    </div>
  );
};
