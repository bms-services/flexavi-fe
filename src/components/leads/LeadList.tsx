import React, { useEffect, useState, useCallback } from "react";
import { Lead } from "@/types";
import { LeadTable } from "./LeadTable";
import { LeadActions } from "./LeadActions";
import { CreateLeadDialog } from "./CreateLeadDialog";
import { useAppDispatch } from "@/hooks/use-redux";
import {
  deleteLeadDestroy,
  getLeadIndex,
  getLeadShow,
  putLeadUpdate,
  postLeadStore,
} from "@/actions/leadAction";
import { FormProvider, useForm } from "react-hook-form";
import { ParamsAction } from "@/@types/global-type";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const LeadList: React.FC = () => {
  const dispatch = useAppDispatch();
  const methods = useForm<Lead>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        postal_code: { label: "", value: "" },
        house_number: "",
        house_number_addition: "",
        city: "",
        province: "",
      },
    },
  });

  const [params, setParams] = useState<ParamsAction>({
    page: 1,
    per_page: 10,
    search: "",
    filters: {},
    sorts: {},
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  // grab all your slice‐level statuses via useSelector:
  // const idxLoading = useSelector((s: RootState) => s.lead.index.loading);
  // const showState = useSelector((s: RootState) => s.lead.show);
  // const storeState = useSelector((s: RootState) => s.lead.store);
  // const updateState = useSelector((s: RootState) => s.lead.update);
  // const destroyState = useSelector((s: RootState) => s.lead.destroy);


  const leadIndexState = useSelector((state: RootState) => state.lead.index);
  const leadShowState = useSelector((state: RootState) => state.lead.show);
  const leadStoreState = useSelector((state: RootState) => state.lead.store);
  const leadUpdateState = useSelector((state: RootState) => state.lead.update);
  const leadDestroyState = useSelector((state: RootState) => state.lead.destroy);




  // whenever params change, fetch the page
  useEffect(() => {
    dispatch(getLeadIndex(params));
  }, [dispatch, params]);

  // Handlers
  const handleStore = useCallback(
    async (data: Lead) => {
      await dispatch(
        postLeadStore({
          ...data,
          address: {
            ...data.address,
            postal_code:
              typeof data.address.postal_code === "object"
                ? data.address.postal_code.value
                : data.address.postal_code,
          },
        })
      );
    },
    [dispatch]
  );

  // Show detail in dialog
  const handleShow = useCallback(
    async (row: Lead) => {
      await dispatch(getLeadShow(row.id));
      setLeadId(row.id);
      setIsDialogOpen(true);
    },
    [dispatch]
  );


  // Update lead
  const handleUpdate = useCallback(
    async (data: Lead) => {
      if (!leadId) return;
      await dispatch(
        putLeadUpdate({
          id: leadId,
          formData: {
            ...data,
            address: {
              ...data.address,
              postal_code:
                typeof data.address.postal_code === "object"
                  ? data.address.postal_code.value
                  : data.address.postal_code,
            },
          },
        })
      );
    },
    [dispatch, leadId]
  );

  // Delete lead
  const handleDestroy = useCallback(
    async (rows: Lead[]) => {
      const ids = rows.map((r) => r.id);
      await dispatch(deleteLeadDestroy(ids));
    },
    [dispatch]
  );

  // Reset & load detail into form
  useEffect(() => {
    if (!isDialogOpen) {
      setLeadId(null);
      methods.reset();
    }
  }, [isDialogOpen, methods]);

  // When detail fetch succeeds, populate the form
  useEffect(() => {
    if (leadShowState.success) {
      const lead = leadShowState.result
      methods.reset({
        ...lead,
        address: {
          ...lead.address,
          postal_code:
            typeof lead.address.postal_code === "string"
              ? { label: lead.address.postal_code, value: lead.address.postal_code }
              : lead.address.postal_code,
        },
      });
    }
  }, [leadShowState, methods]);

  // **After** store/update/destroy all succeed, close dialog and re-fetch
  useEffect(() => {
    if (
      leadStoreState.success ||
      leadUpdateState.success ||
      leadDestroyState.success
    ) {
      setIsDialogOpen(false);
      dispatch(getLeadIndex(params));
    }
  }, [
    leadStoreState.success,
    leadUpdateState.success,
    leadDestroyState.success,
    dispatch,
    params,
  ]);

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <LeadActions onCreateClick={() => setIsDialogOpen(true)} />
      </div>

      <LeadTable
        params={params}
        setParams={setParams}
        onEdit={handleShow}
        onDelete={handleDestroy}
        onArchive={() => { }}
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