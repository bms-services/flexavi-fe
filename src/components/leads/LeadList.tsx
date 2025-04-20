
import React, { useState } from "react";
import { Lead } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { LeadTable } from "./LeadTable";
import { LeadActions } from "./LeadActions";
import { CreateLeadDialog } from "./CreateLeadDialog";
import { CreateLeadFormData } from "@/utils/validations";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleCreateLead = (data: CreateLeadFormData) => {
    const fullAddress = `${data.postcode} ${data.huisnummer}`;
    console.log("Creating new lead:", { ...data, address: fullAddress });
    toast({
      title: "Lead toegevoegd",
      description: "De nieuwe lead is succesvol aangemaakt.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <LeadActions onCreateClick={() => setIsDialogOpen(true)} />
      </div>

      <LeadTable 
        leads={leads} 
        searchTerm={searchTerm} 
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />

      <CreateLeadDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreateLead}
      />
    </div>
  );
};
