
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { ProjectEmployeeRes } from "@/zustand/types/projectT";
import TableTanstack, { CustomColumnDef } from "@/components/ui/table-tanstack";
import { useGetProjectEmployees } from "@/zustand/hooks/useProject";
import { useParams } from "react-router-dom";
import { ParamGlobal } from "@/zustand/types/apiT";


interface ProjectPersonnelTabProps {
  onOpenCreateEmployee?: () => void;
}

export const ProjectPersonnelTab: React.FC<ProjectPersonnelTabProps> = ({ onOpenCreateEmployee }) => {
  const { id } = useParams<{ id: string }>();


  const [params, setParams] = useState<ParamGlobal>(
    {
      page: 1,
      per_page: 20,
    }
  );
  const getProjectEmployeesZ = useGetProjectEmployees(id || "", params);


  const columns = useMemo<CustomColumnDef<ProjectEmployeeRes>[]>(() => [
    { accessorKey: "name", header: "Name", cell: info => info.getValue() },
    { accessorKey: "email", header: "Email", cell: info => info.getValue() },
    { accessorKey: "phone", header: "Phone", cell: info => info.getValue() },
    {
      accessorKey: "day_rate",
      header: "Dag tarief",
      cell: info => formatCurrency(info.getValue() as string),
    },
    {
      accessorKey: "number_of_days",
      header: "Aantal dagen",
      cell: info => info.getValue() as string,
    },
  ], []);

  const data = getProjectEmployeesZ.data?.result.data || [];
  const meta = getProjectEmployeesZ.data?.result.meta;

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


  // /**
  //  * Maps the lead status to filter options for the table.
  //  * 
  //  * @returns An array of objects containing value and label for each lead status.
  //  */
  // const statusFilterOptions = Object.entries(leadStatusMap).map(
  //   ([value, { label }]) => ({ value, label })
  // );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Personeel
          <span className="ml-2 text-muted-foreground">
            {/* Totaal: {formatCurrency(totalPersonnelCost)} */}
          </span>
        </h2>
        <Button onClick={onOpenCreateEmployee}>
          <Plus className="h-4 w-4 mr-2" />
          Personeel toevoegen
        </Button>
      </div>

      <TableTanstack
        columns={columns}
        data={data}
        meta={meta}
        isLoading={getProjectEmployeesZ.isLoading}
        // isLoadingAction={deleteLeadZ.isPending || deleteLeadZ.isPending}
        params={params}
        onParamsChange={handleParamsChange}
      // onEdit={onEdit}
      // onShow={onShow}
      // onDelete={onDelete}
      // onArchive={onArchive}
      // filterOptions={{
      //   status: {
      //     label: "Status",
      //     type: FilterType.SELECT,
      //     options: statusFilterOptions,
      //   },
      // }}
      />
    </div>
  )
};
