import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useGetLeads, useGetLead, useCreateLead, useUpdateLead, useDeleteLead } from "@/zustand/hooks/useLead";
import { flattenAddressToObject } from "@/utils/dataTransform";
import { LeadActions } from "./LeadActions";
import { LeadTable } from "./LeadTable";
import { CreateLeadDialog } from "./CreateLeadDialog";
import { LeadReq, LeadRes } from "@/zustand/types/leadT";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { useNavigate } from "react-router-dom";
import { ParamGlobal } from "@/zustand/types/apiT";

const defaultLeadData: LeadReq = {
  name: "",
  email: "",
  phone: "",
  address: {
    street: "",
    postal_code: { label: "", value: "" },
    house_number: "",
    house_number_addition: "",
    city: "",
    province: ""
  }
};

export const LeadList: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<ParamGlobal>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });

  const [leadId, setLeadId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const methods = useForm<LeadReq>({
    defaultValues: defaultLeadData,
  });

  const getLeadsZ = useGetLeads(params);
  const getLeadZ = useGetLead(leadId ?? "");
  const createLeadZ = useCreateLead();
  const updateLeadZ = useUpdateLead();
  const deleteLeadZ = useDeleteLead();

  /**
   * Handle create lead
   * 
   * @returns void
   */
  const handleCreate = () => {
    methods.reset(defaultLeadData);
    setLeadId("");
    setIsDialogOpen(true);
  };

  /**
   * Handle store lead
   * 
   * @param data 
   * @returns Promise<void>
   */
  const handleStore = async (data: LeadReq) => {
    const flattenedAddress = flattenAddressToObject(data.address);
    const leadData: LeadReq = { ...data, address: flattenedAddress };

    try {
      await createLeadZ.mutateAsync(leadData);
      setIsDialogOpen(false);
    } catch (error) {
      throw new Error("Failed to create lead: " + error);
    }
  };

  /**
   * Handle edit lead
   * 
   * @param row 
   * @returns void
   */
  const handleEdit = (data: LeadReq) => {
    setLeadId(data.id ?? "");
    setIsDialogOpen(true);
  };

  /**
   * Handle update lead
   * 
   * @param data 
   * @returns Promise<void>
   */
  const handleUpdate = async (data: LeadReq) => {
    const flattenedAddress = flattenAddressToObject(data.address);
    const leadData: LeadReq = { ...data, address: flattenedAddress };

    try {
      await updateLeadZ.mutateAsync({ id: data.id!, formData: leadData });
      setIsDialogOpen(false);
    } catch (error) {
      throw new Error("Failed to update lead: " + error);
    }
  };

  /**
   * Handle show lead detail
   * 
   * @param row 
   * @returns void
   */
  const handleShow = (data: LeadReq) => {
    navigate(`/lead/${data.id}`);
  };

  /**
   * Handle delete lead
   * 
   * @param ids 
   * @returns Promise<void>
   */
  const handleDelete = async (ids: LeadReq[]) => {
    const leadIds = ids.map(id => id.id).filter((id): id is string => typeof id === "string");
    try {
      await deleteLeadZ.mutateAsync({
        ids: leadIds,
        force: false
      });
      setLeadId("");
    } catch (error) {
      throw new Error("Failed to delete lead: " + error);
    }
  };

  // Load data lead when dialog is opened
  useEffect(() => {
    if (getLeadZ.isSuccess && leadId && isDialogOpen && getLeadZ.data) {
      const leadData: LeadReq = {
        ...getLeadZ.data.result,
        address: {
          ...getLeadZ.data.result.address,
          postal_code: typeof getLeadZ.data.result.address.postal_code === "string"
            ? {
              label: getLeadZ.data.result.address.postal_code,
              value: getLeadZ.data.result.address.postal_code,
            }
            : getLeadZ.data.result.address.postal_code,
        },
      };

      methods.reset(leadData);
    }
  }, [getLeadZ.isSuccess, getLeadZ.data, leadId, isDialogOpen, methods]);

  // Reset Form When Dialog Closed
  useEffect(() => {
    if (!isDialogOpen) {
      setLeadId("");
      methods.reset(defaultLeadData);
    }
  }, [isDialogOpen, methods]);

  // Handle error validation create
  useEffect(() => {
    if (createLeadZ.isError) {
      mapApiErrorsToForm(createLeadZ.error.errors, methods.setError);
    }
  }, [createLeadZ.isError, createLeadZ.error, methods.setError]);

  // Handle error validation update
  useEffect(() => {
    if (updateLeadZ.isError) {
      mapApiErrorsToForm(updateLeadZ.error.errors, methods.setError);
    }
  }, [updateLeadZ.isError, updateLeadZ.error, methods.setError]);

  return (
    <div className="px-[24px] py-6 space-y-6">
      <LeadActions onCreateClick={handleCreate} />
      <LeadTable
        params={params}
        setParams={setParams}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onShow={handleShow}
        getLeadsZ={getLeadsZ}
      />

      <FormProvider {...methods}>
        <CreateLeadDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={leadId ? handleUpdate : handleStore}
          leadId={leadId}
          isLoading={leadId ? getLeadZ.isLoading : false}
        />
      </FormProvider>
    </div>
  );
};