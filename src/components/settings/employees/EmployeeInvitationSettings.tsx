
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, User, XIcon, MailIcon } from "lucide-react";
import { useGetInvitedEmployees, useInviteEmployee, useResendInviteEmployee, useCancelInvitedEmployee } from "@/zustand/hooks/useSetting";
import { EmployeeInvitationRes, EmployeeInvitationStatus, EmployeeInvitationStatusMap, EmployeeReq } from "@/zustand/types/employeeT";
import { FilterType, ParamGlobal } from "@/zustand/types/apiT";
import TableTanstack, { CustomColumnDef } from "@/components/ui/table-tanstack";
import { formatIsoToDate } from "@/utils/format";
import { InviteEmployee } from "./InviteEmployee";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import EmployeeInvitationStatusBadge from "./EmployeeInvitationStatusBadge";
import { useForm } from "react-hook-form";

const defaultValues: EmployeeReq = {
  email: "",
  name: "",
  phone: "",
  company_user_role_id: "",
  work_days: [],
  start_time: "09:00",
  end_time: "17:00",
};

const RESEND_KEY = "employee_resend_timers";

const saveResendTime = (id: string) => {
  const data = JSON.parse(localStorage.getItem(RESEND_KEY) || "{}");
  data[id] = Date.now();
  localStorage.setItem(RESEND_KEY, JSON.stringify(data));
};

const getRemainingTime = (id: string): number => {
  const data = JSON.parse(localStorage.getItem(RESEND_KEY) || "{}");
  const last = data[id];
  if (!last) return 0;

  const now = Date.now();
  const elapsed = (now - last) / 1000;
  const remaining = 30 - elapsed;
  return remaining > 0 ? Math.ceil(remaining) : 0;
};

export const EmployeeInvitationSettings: React.FC = () => {
  const methods = useForm<EmployeeReq>({
    defaultValues,
  });

  const [modal, setModal] = useState({
    member: false,
    resend: false,
    cancel: false,
  });
  const [resendDelay, setResendDelay] = useState<{ [id: string]: number }>({});

  const [employeeId, setEmployeeId] = useState<string>("");
  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const getInvitedEmployeesZ = useGetInvitedEmployees(params);
  const inviteEmployeeZ = useInviteEmployee(methods);
  const resendInviteEmployeeZ = useResendInviteEmployee();
  const cancelInvitedEmployeeZ = useCancelInvitedEmployee();


  const columns = useMemo<CustomColumnDef<EmployeeInvitationRes>[]>(() => [
    { accessorKey: "name", header: "Name", cell: info => info.getValue() },
    { accessorKey: "email", header: "Email", cell: info => info.getValue() },
    { accessorKey: "phone", header: "Phone", cell: info => info.getValue() },
    {
      accessorKey: "status", header: "Status",
      meta: { className: "text-center align-middle" },
      cell: info =>
      (
        <EmployeeInvitationStatusBadge
          status={info.row.original.status}
        />
      )
    },
    {
      accessorKey: "created_at",
      header: "Invited At",
      meta: { className: "text-center align-middle" },
      cell: info => formatIsoToDate(info.row.original.created_at),
    },
    {
      id: "actions",
      header: "Actions",
      meta: { className: "text-center align-middle" },
      cell: ({ row }) => {
        const { id, status } = row.original;
        const allowedStatuses: EmployeeInvitationStatus[] = ["invited", "resent"];

        if (!allowedStatuses.includes(status)) {
          return null;
        }

        return (
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="link"
              onClick={() => handleOpenModalResend(id)}
              className="py-0 px-1 text-black hover:text-blue-500"
              disabled={!!resendDelay[id]}
            >
              {resendDelay[id] ? (
                <span className="text-gray-500">
                  {resendDelay[id]}
                </span>
              ) : (
                <MailIcon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="link"
              onClick={() => handleOpenModalCancel(id)}
              className="py-0 px-1 text-black hover:text-red-500"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ], [resendDelay]);


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

  const startResendTimer = (id: string, duration: number) => {
    const tick = (remaining: number) => {
      if (remaining <= 0) {
        setResendDelay(prev => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
        return;
      }

      setResendDelay(prev => ({ ...prev, [id]: remaining }));
      setTimeout(() => tick(remaining - 1), 1000);
    };

    tick(duration);
  };

  /**
   * Function for open modal create employee.
   * 
   * @returns {void}
   * 
   */
  const handleOpenModalCreate = () => {
    setModal((prev) => ({ ...prev, member: true }));
  };

  const handleOpenModalResend = (id: string) => {
    setEmployeeId(id);
    setModal((prev) => ({ ...prev, resend: true }));
  };

  const handleOpenModalCancel = (id: string) => {
    setEmployeeId(id);
    setModal((prev) => ({ ...prev, cancel: true }));
  };

  const handleInviteEmployee = async (data: EmployeeReq) => {
    await inviteEmployeeZ.mutateAsync(data);
    setModal((prev) => ({ ...prev, member: false }));
  };


  const handleResendEmployeeInvite = async (id: string) => {
    try {
      await resendInviteEmployeeZ.mutateAsync(id);
      setModal((prev) => ({ ...prev, resend: false }));

      saveResendTime(id);
      startResendTimer(id, 30);
    } catch (error) {
      setModal((prev) => ({ ...prev, resend: false }));
    }
  };
  const handleCancelEmployeeInvite = async (id: string) => {
    await cancelInvitedEmployeeZ.mutateAsync(id);
    setModal((prev) => ({ ...prev, cancel: false }));
  };


  const statusFilterOptions = Object.entries(EmployeeInvitationStatusMap).map(
    ([value, { label }]) => ({ value, label })
  );

  const data = getInvitedEmployeesZ.data?.result?.data;
  const meta = getInvitedEmployeesZ.data?.result?.meta;

  useEffect(() => {
    const timers: { [id: string]: number } = {};
    if (!data) return;

    data.forEach((user) => {
      const remaining = getRemainingTime(user.id);
      if (remaining > 0) {
        timers[user.id] = remaining;
        startResendTimer(user.id, remaining);
      }
    });

    setResendDelay(timers);
  }, [data]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Medewerkers uitnodigingen
        </CardTitle>
        <CardDescription>
          Hier kun je medewerkers uitnodigen om zich aan te sluiten bij je team. Je kunt hun status beheren en uitnodigingen opnieuw verzenden of annuleren.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            onClick={handleOpenModalCreate}
            className="mb-4">
            <UserPlus className="h-4 w-4 mr-2" />
            Nieuwe medewerker toevoegen
          </Button>

          <TableTanstack
            columns={columns}
            data={data || []}
            meta={meta}
            isLoading={getInvitedEmployeesZ.isLoading}
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
        <InviteEmployee
          open={modal.member}
          onOpenChange={(open) => {
            if (!open) {
              setModal((prev) => ({ ...prev, member: false }));
            }
          }}
          onSubmit={handleInviteEmployee}
          methods={methods}
        />

        <ConfirmDialog
          open={modal.resend}
          onCancel={() => setModal((prev) => ({ ...prev, resend: false }))}
          onConfirm={() => handleResendEmployeeInvite(employeeId)}
          title="Weet je het zeker?"
          description="Weet je zeker dat je de uitnodiging opnieuw wilt verzenden?"
          isConfirm
          loading={resendInviteEmployeeZ.isPending}
        />

        <ConfirmDialog
          open={modal.cancel}
          onCancel={() => setModal((prev) => ({ ...prev, cancel: false }))}
          onConfirm={() => handleCancelEmployeeInvite(employeeId)}
          title="Weet je het zeker?"
          description="Weet je zeker dat je de uitnodiging wilt annuleren?"
          loading={cancelInvitedEmployeeZ.isPending}
        />
      </CardContent>
    </Card>
  );
};
