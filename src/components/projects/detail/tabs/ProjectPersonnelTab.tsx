
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { ProjectEmployeeReq, ProjectEmployeeRes } from "@/zustand/types/projectT";
import TableTanstack, { CustomColumnDef } from "@/components/ui/table-tanstack";
import { useCreateProjectEmployee, useDeleteProjectEmployees, useGetProjectEmployees } from "@/zustand/hooks/useProject";
import { useParams } from "react-router-dom";
import { defaultParams, ParamGlobal } from "@/zustand/types/apiT";
import { FormProvider, useForm } from "react-hook-form";
import { EmployeeDialog } from "./EmployeeDialog";

export const ProjectPersonnelTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState<boolean>(false);

  const formProjectEmployee = useForm<ProjectEmployeeReq>({
    defaultValues: {
      staffs: []
    }
  });

  const [params, setParams] = useState<ParamGlobal>(defaultParams);

  const getProjectEmployeesZ = useGetProjectEmployees(id || "", params);
  const deleteProjectEmployeeZ = useDeleteProjectEmployees(id || "");
  const createProjectEmployeeZ = useCreateProjectEmployee(id || "");

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

  const handleStoreEmployee = async (data: ProjectEmployeeReq) => {
    await createProjectEmployeeZ.mutateAsync({
      staffs: data.staffs.map((user) =>
        typeof user === "string" ? user : user.value
      ),
    });
  }

  const handleCreateEmployee = () => {
    setIsEmployeeDialogOpen(true);
  }

  const handleDelete = (ids: ProjectEmployeeRes[]) => {
    deleteProjectEmployeeZ.mutate({ employeeIds: ids.map(emp => emp.id) });
  };

  useEffect(() => {
    if (createProjectEmployeeZ.isSuccess) {
      formProjectEmployee.reset({ staffs: [] });
      setIsEmployeeDialogOpen(false);
    }
  }, [createProjectEmployeeZ.isSuccess, formProjectEmployee]);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Personeel
          <span className="ml-2 text-muted-foreground">
            {/* Totaal: {formatCurrency(totalPersonnelCost)} */}
          </span>
        </h2>
        <Button onClick={handleCreateEmployee} >
          <Plus className="h-4 w-4 mr-2" />
          Personeel toevoegen
        </Button>
      </div>

      <TableTanstack
        columns={columns}
        data={data}
        meta={meta}
        isLoading={getProjectEmployeesZ.isLoading}
        isLoadingAction={deleteProjectEmployeeZ.isPending}
        params={params}
        onParamsChange={handleParamsChange}
        onDelete={handleDelete}
      />

      <FormProvider {...formProjectEmployee}>
        <EmployeeDialog
          open={isEmployeeDialogOpen}
          onOpenChange={setIsEmployeeDialogOpen}
          handleStore={formProjectEmployee.handleSubmit(handleStoreEmployee)}
        />
      </FormProvider>
    </div>
  )
};
