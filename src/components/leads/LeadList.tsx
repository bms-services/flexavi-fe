import React, { useEffect, useState, useCallback } from "react";
import type { Lead, LeadAddress } from '@/types/leads';
import { LeadTable } from "./LeadTable";
import { LeadActions } from "./LeadActions";
import { CreateLeadDialog } from "./CreateLeadDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  deleteLeadDestroy,
  getLeadIndex,
  getLeadShow,
  putLeadUpdate,
  postLeadStore,
} from "@/actions/leadAction";
import { FormProvider, useForm } from "react-hook-form";
import { ParamsAction } from "@/@types/global-type";

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

  const leadIndexState = useAppSelector((state) => state.lead.index);
  const leadShowState = useAppSelector((state) => state.lead.show);
  const leadStoreState = useAppSelector((state) => state.lead.store);
  const leadUpdateState = useAppSelector((state) => state.lead.update);
  const leadDestroyState = useAppSelector((state) => state.lead.destroy);

  console.log(leadShowState);
  
  // whenever params change, fetch the page
  useEffect(() => {
    dispatch(getLeadIndex(params));
  }, [dispatch, params]);

  // Helper to flatten address fields for Laravel-style array input
  const flattenLeadAddress = (data: Lead) => {
    const address: Partial<LeadAddress> = data.address || {} as Partial<LeadAddress>;
    let postalCode = '';
    if (typeof address.postal_code === 'object' && address.postal_code !== null && 'value' in address.postal_code) {
      postalCode = address.postal_code.value;
    } else if (typeof address.postal_code === 'string') {
      postalCode = address.postal_code;
    }
    const flat = {
      ...data,
      address: undefined,
      'address[street]': address.street ?? '',
      'address[postal_code]': postalCode,
      'address[house_number]': address.house_number ?? '',
      'address[house_number_addition]': address.house_number_addition ?? '',
      'address[city]': address.city ?? '',
      'address[province]': address.province ?? '',
    };
    const fd = new FormData();
    Object.entries(flat).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fd.append(key, String(value));
      }
    });
    return fd;
  };

  // Handlers
  const handleStore = useCallback(
    async (data: Lead) => {
      await dispatch(
        postLeadStore(flattenLeadAddress(data))
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
      await dispatch(
        putLeadUpdate({
          id: data.id!,
          formData: flattenLeadAddress(data),
        })
      );
    },
    [dispatch]
  );

  // Fix: convert Lead[] to string[] for delete
  const handleDelete = useCallback(
    async (rows: Lead[]) => {
      const ids = rows.map((row) => row.id!);
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
    if (leadShowState.success && isDialogOpen && leadId) {
      const lead = leadShowState.result;
      const address: Partial<LeadAddress> = lead.address || {
        street: "",
        postal_code: { label: "", value: "" },
        house_number: "",
        house_number_addition: "",
        city: "",
        province: "",
      };
      methods.reset({
        ...lead,
        address: {
          ...address,
          postal_code:
            typeof address.postal_code === "string"
              ? { label: address.postal_code, value: address.postal_code }
              : address.postal_code,
        },
      });
    }
  }, [leadShowState, methods, isDialogOpen, leadId]);

  // Reset form when dialog opens without leadId
  useEffect(() => {
    if (isDialogOpen && !leadId) {
      methods.reset({
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
      });
    }
  }, [isDialogOpen, leadId, methods]);

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
        onDelete={handleDelete}
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