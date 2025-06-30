
import React, { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, EllipsisVerticalIcon, MoreHorizontal } from "lucide-react";
import { EmployeeInvitationStatusMap, EmployeeReq, EmployeeRes, EmployeeStatus, EmployeeStatusMap } from "@/zustand/types/employeeT";
import { FilterType, ParamGlobal } from "@/zustand/types/apiT";
import TableTanstack, { CustomColumnDef } from "@/components/ui/table-tanstack";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useGetMyEmployees, useUpdateMyEmployee } from "@/zustand/hooks/useSetting";
import EmployeeUserStatusBadge from "./EmployeeUserStatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
export const EmployeeSettings: React.FC = () => {
  const [modal, setModal] = useState({
    activate: false,
    inactivate: false,
  });

  const [employee, setEmployee] = useState<EmployeeRes | null>(null);

  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const getMyEmployeesZ = useGetMyEmployees(params);
  const updateMyEmployeeZ = useUpdateMyEmployee();

  const columns = useMemo<CustomColumnDef<EmployeeRes>[]>(() => [
    { accessorKey: "user.name", header: "Name", cell: info => info.getValue() },
    { accessorKey: "user.email", header: "Email", cell: info => info.getValue() },
    { accessorKey: "user.phone", header: "Phone", cell: info => info.getValue() },
    {
      accessorKey: "status", header: "Status",
      meta: { className: "text-center align-middle" },
      cell: info =>
      (
        <EmployeeUserStatusBadge
          status={info.row.original.status}
        />
      )
    },
    {
      accessorKey: "joined_at",
      header: "Joined At",
      meta: { className: "text-center align-middle" },
    },
    {
      id: "actions",
      header: "Actions",
      meta: { className: "text-center align-middle" },
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-3.5 w-3.5" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleOpenModalStatus(row.original)}>
                {row.original.status === "active" ? "Deactivate" : "Activate"} Employee
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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

  const handleOpenModalStatus = (data: EmployeeRes) => {
    setEmployee(data);
    if (data.status === "active") {
      setModal((prev) => ({ ...prev, inactivate: true }));
    } else {
      setModal((prev) => ({ ...prev, activate: true }));
    }
  };


  const handleUpdateEmployeeStatus = async (employee: EmployeeRes | null) => {
    if (!employee) return;

    try {
      await updateMyEmployeeZ.mutateAsync({
        id: employee.id,
        formData: { ...employee, status: employee.status === "active" ? "inactive" : "active" },
      });
      setModal((prev) => ({ ...prev, activate: false, inactivate: false }));
      getMyEmployeesZ.refetch();
    } catch (error) {
      console.error("Failed to update employee status:", error);
    }

  }

  const statusFilterOptions = Object.entries(EmployeeInvitationStatusMap).map(
    ([value, { label }]) => ({ value, label })
  );

  const data = getMyEmployeesZ.data?.result?.data || [];
  const meta = getMyEmployeesZ.data?.result?.meta;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Medewerkers
        </CardTitle>
        <CardDescription>
          Beheer alle medewerkers, hun rollen en toegangsrechten binnen het systeem.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TableTanstack
            columns={columns}
            data={data}
            meta={meta}
            isLoading={getMyEmployeesZ.isLoading}
            params={params}
            onParamsChange={handleParamsChange}
            filterOptions={{
              status: {
                label: "Status",
                type: FilterType.SELECT,
                options: statusFilterOptions,
              },
            }}
          />
        </div>

        <ConfirmDialog
          open={modal.activate}
          onCancel={() => setModal((prev) => ({ ...prev, activate: false }))}
          onConfirm={() => handleUpdateEmployeeStatus(employee)}
          title="Activate Employee"
          isConfirm
          description={`Are you sure you want to activate ${employee?.name}? This will allow them to access the system and perform their duties.`}
          loading={updateMyEmployeeZ.isPending}
        />

        <ConfirmDialog
          open={modal.inactivate}
          onCancel={() => setModal((prev) => ({ ...prev, inactivate: false }))}
          onConfirm={() => handleUpdateEmployeeStatus(employee)}
          title="Inactivate Employee"
          description={`Are you sure you want to inactivate ${employee?.name}? This will prevent them from accessing the system until reactivated.`}
          loading={updateMyEmployeeZ.isPending}
        />
      </CardContent>
    </Card>
  );
};
