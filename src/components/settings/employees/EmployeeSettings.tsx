
import React, { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, User } from "lucide-react";
import { Employee } from "@/types/employee";
import { useGetInvitedEmployees, useInviteEmployee } from "@/zustand/hooks/useSetting";
import { EmployeeReq, EmployeeRes } from "@/zustand/types/employee";
import { ParamGlobal } from "@/zustand/types/apiT";
import TableTanstack, { CustomColumnDef } from "@/components/ui/table-tanstack";
import { formatIsoToDate } from "@/utils/format";
import { InviteEmployee } from "./InviteEmployee";

export const EmployeeSettings: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleAddEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const [modal, setModal] = useState({
    member: false,
  });

  const roleLabels = {
    sales: "Verkoop",
    installation: "Uitvoering",
    both: "Beide",
  };

  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const getInvitedEmployeesZ = useGetInvitedEmployees(params);
  const inviteEmployeeZ = useInviteEmployee();

  const columns = useMemo<CustomColumnDef<EmployeeRes>[]>(() => [
    { accessorKey: "name", header: "Name", cell: info => info.getValue() },
    { accessorKey: "email", header: "Email", cell: info => info.getValue() },
    { accessorKey: "phone", header: "Phone", cell: info => info.getValue() },
    // {
    //   accessorKey: "status", header: "Status", cell: info =>
    //   (
    //     <LeadStatusBadge
    //       status={info.row.original.status}
    //     />
    //   )
    // },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: info => formatIsoToDate(info.row.original.created_at),
    },
  ], []);

  const handleStoreMember = (data: EmployeeReq) => {
    // implementasikan jika sudah ada API untuk add member
  };

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

  return (
    <><Card>
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
          <Button onClick={() => setModal((prev) => ({ ...prev, member: true }))} className="mb-4">
            <UserPlus className="h-4 w-4 mr-2" />
            Nieuwe medewerker toevoegen
          </Button>

          <TableTanstack
            columns={columns}
            data={getInvitedEmployeesZ.data?.result?.data || []}
            meta={getInvitedEmployeesZ.data?.result?.meta}
            isLoading={getInvitedEmployeesZ.isLoading}
            params={params}
            onParamsChange={handleParamsChange} />
        </div>
      </CardContent>
    </Card>

      <InviteEmployee
        open={modal.member}
        onOpenChange={(open) => {
          if (!open) {
            // setTeamId(null);
            setModal((prev) => ({ ...prev, member: false }));
          }
        }}
        onSubmit={handleStoreMember} />
    </>
  );
};
