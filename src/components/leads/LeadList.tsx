
import React, { useEffect, useState } from "react";
import { Lead } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { LeadTable } from "./LeadTable";
import { LeadActions } from "./LeadActions";
import { CreateLeadDialog } from "./CreateLeadDialog";
import { CreateLeadFormData } from "@/utils/validations";
import { useAppDispatch } from "@/hooks/use-redux";
import { destroyLead, getDetailLead, getLead, storeLead, updateLead } from "@/actions/leadAction";
import { FormProvider, useForm } from "react-hook-form";
import { ParamsAction } from "@/@types/global-type";
import { getLeadDetail } from "@/data/getLeadDetail";
import { set } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface LeadListProps {
  leads: Lead[];
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

export const LeadList: React.FC<LeadListProps> = ({ 
  leads,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange = () => {}
}) => {
  const dispatch = useAppDispatch();
  const methods = useForm<Lead>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      postal_code: "",
      house_number: "",
      house_number_addition: "",
      street: "",
      city: "",
      province: "",
    },
  });

  const [params, setParams] = useState<ParamsAction>({
    page: 1,
    per_page: 10,
    search: "",
    sort_by: "created_at",
    sort_dir: "desc",
  });

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading:loadingLeadsStore, response:reponseLeadStore } = useSelector((state: RootState) => state.lead.store);
  const resultLeadStore = reponseLeadStore.result as Lead;
  
  const { loading:loadingLeadShow, response:responseLeadShow} = useSelector((state: RootState) => state.lead.show);
  const resultLeadShow = responseLeadShow.result as Lead;
  
  const { loading:loadingLeadUpdate, response:responseLeadUpdate} = useSelector((state: RootState) => state.lead.update);
  const resultLeadUpdate = responseLeadUpdate.result as Lead;

  const handleStore = async (data: Lead) => {
    await dispatch(storeLead(data));
  };

  
  const handleShow = async (data: Lead) => {
    const leadId = data.id;
    if (leadId) {
      await dispatch(getDetailLead(leadId));
      setLeadId(leadId);
      setIsDialogOpen(true);
    }
  }

  const handleUpdate =  async (data: Lead) => {
    await dispatch(updateLead({id:leadId, formData:data}));
  }


  const handleDestory =  async (data: Lead[]) => {
    const ids = data.map((lead) => lead.id);
    await dispatch(destroyLead(ids));
  }

  // Fetch index
  useEffect(() => {
    dispatch(getLead(params));
  }, [dispatch, params]);

  useEffect(() => {
  if (reponseLeadStore.success) {
    setIsDialogOpen(false);
  }
}, [reponseLeadStore]);

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <LeadActions onCreateClick={() => setIsDialogOpen(true)} />
      </div>

      <LeadTable
        params={params}
        setParams={setParams}
        onDelete={handleDestory}
        onEdit={handleShow}
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
