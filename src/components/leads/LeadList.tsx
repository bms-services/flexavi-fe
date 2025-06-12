import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
// import { Lead } from "@/types/leads";
import { useGetLeads, useGetLead, useCreateLead, useUpdateLead, useDeleteLead } from "@/zustand/hooks/useLead";
// import LeadTable from "./LeadTable";
// import LeadActions from "./LeadActions";
// import CreateLeadDialog from "./CreateLeadDialog";
import { ParamsAction } from "@/@types/global-type";
import { flattenLeadAddressToObject, objectToFormData } from "@/utils/dataTransform";
import { LeadActions } from "./LeadActions";
import { LeadTable } from "./LeadTable";
import { CreateLeadDialog } from "./CreateLeadDialog";
import { LeadReq, LeadRes } from "@/zustand/types/leadT";

export const LeadList: React.FC = () => {
  const [params, setParams] = useState<ParamsAction>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const methods = useForm<LeadReq>({
    defaultValues: { name: "", email: "", phone: "", address: { street: "", postal_code: { label: "", value: "" }, house_number: "", house_number_addition: "", city: "", province: "" } }
  });

  const getLeadsZ = useGetLeads(params);
  const getLeadZ = useGetLead(leadId ?? "");
  const createLeadZ = useCreateLead();
  const updateLeadZ = useUpdateLead();
  const deleteLeadZ = useDeleteLead();

  const handleStore = async (data: LeadReq) => {
    const flattenedAddress = flattenLeadAddressToObject(data.address);

    const leadData: LeadReq = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: flattenedAddress,
    };

    await createLeadZ.mutateAsync(leadData);
    setIsDialogOpen(false);
  };

  const handleUpdate = async (data: LeadReq) => {
    const flattenedAddress = flattenLeadAddressToObject(data.address);

    const leadData: LeadReq = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: flattenedAddress,
    };

    await updateLeadZ.mutateAsync({ id: data.id!, formData: leadData });
    setIsDialogOpen(false);
  };

  const handleShow = async (row: LeadRes) => {
    setLeadId(row.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (ids: LeadRes[]) => {
    await deleteLeadZ.mutateAsync({ ids: ids.map(id => id.id), force: false });
  };

  // useEffect(() => {
  //   if (getLeadZ.isSuccess && leadId && isDialogOpen) {
  //     methods.reset(getLeadZ.data.result);
  //   }
  // }, [getLeadZ.isSuccess, leadId, isDialogOpen]);

  useEffect(() => {
    if (!isDialogOpen) {
      setLeadId(null);
      methods.reset();
    }
  }, [isDialogOpen]);

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <LeadActions onCreateClick={() => setIsDialogOpen(true)} />
      </div>

      <LeadTable
        params={params}
        setParams={setParams}
        onEdit={handleShow}
        onDelete={handleDelete}
      />

      <FormProvider {...methods}>
        <CreateLeadDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={leadId ? handleUpdate : handleStore}
          leadId={leadId}
        />
      </FormProvider>
    </div>
  );
};
