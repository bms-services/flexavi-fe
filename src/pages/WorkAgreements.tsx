
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TableTanstack, { CustomColumnDef } from "@/components/ui/table-tanstack";
import { useDeleteWorkAgreement, useGetWorkAgreements } from "@/zustand/hooks/useWorkAgreement";
import { useCallback, useMemo, useState } from "react";
import { FilterType, ParamGlobal } from "@/zustand/types/apiT";
import { formatEuro, formatIsoToDate } from "@/utils/format";
import { WorkAgreementRes, WorkAgreementStatusMap } from "@/zustand/types/workAgreementT";
import WorkAgreementStatusBadge from "@/components/workagreements/WorkAgreementStatusBadge";

const WorkAgreements = () => {
  const navigate = useNavigate();

  const columns = useMemo<CustomColumnDef<WorkAgreementRes>[]>(() => [
    { accessorKey: "agreement_number", header: "Nummer", cell: info => info.getValue() },
    {
      accessorKey: "leads",
      header: "Klant",
      cell: info => {
        const leads = info.row.original.leads;
        if (Array.isArray(leads) && leads.length > 0) {
          return (
            <div className="flex flex-col">
              {leads.map(lead => (
                <span key={lead.id} className="text-sm text-gray-700">
                  {lead.name} ({lead.email})
                </span>
              ))}
            </div>
          )
        }
        return "-";
      }
    },
    {
      accessorKey: "planned_start_date",
      header: "Datum",
      cell: info => formatIsoToDate(info.row.original.created_at),
    },
    { accessorKey: "amount", header: "Bedrag", cell: info => formatEuro(info.getValue() as string) },
    {
      accessorKey: "status", header: "Status", cell: info =>
      (
        <WorkAgreementStatusBadge
          status={info.row.original.status}
        />
      )
    },
  ], []);

  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const getWorkAgreementsZ = useGetWorkAgreements(params);
  const deleteWorkAgreementZ = useDeleteWorkAgreement();

  const data = getWorkAgreementsZ.data?.result.data ?? [];
  const meta = getWorkAgreementsZ.data?.result.meta;

  const handleShow = (data: WorkAgreementRes) => {
    navigate(`/workagreements/${data.id}`);
  };

  const handleEdit = (data: WorkAgreementRes) => {
    navigate(`/workagreements/edit/${data.id}`);
  };

  const handleCreate = () => {
    navigate("/workagreements/create");
  };

  const handleDelete = async (ids: WorkAgreementRes[]) => {
    const workAgreementIds = ids.map(id => id.id).filter((id): id is string => typeof id === "string");
    await deleteWorkAgreementZ.mutateAsync({
      ids: workAgreementIds,
      force: false
    });
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

  /**
    * Maps the quotation status to filter options for the table.
    * 
    * @returns An array of objects containing value and label for each quotation status.
    */
  const statusFilterOptions = Object.entries(WorkAgreementStatusMap).map(
    ([value, { label }]) => ({ value, label })
  );



  return (
    <Layout>
      <div className="px-[24px] py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Werkovereenkomsten</h1>
            <p className="text-muted-foreground">
              Beheer alle werkovereenkomsten op één plek
            </p>
          </div>
          <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nieuwe Werkovereenkomst
          </Button>
        </div>

        <div className="space-y-4">
          <TableTanstack
            columns={columns}
            data={data}
            meta={meta}
            isLoading={getWorkAgreementsZ.isLoading}
            params={params}
            onParamsChange={handleParamsChange}
            onEdit={handleEdit}
            onShow={handleShow}
            onDelete={handleDelete}
            // onArchive={onArchive}
            filterOptions={{
              status: {
                label: "Status",
                type: FilterType.SELECT,
                options: statusFilterOptions,
              },
              created_at: {
                placeholder: "Van",
                type: FilterType.DATE
              }
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default WorkAgreements;
