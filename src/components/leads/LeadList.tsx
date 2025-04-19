
import React, { useState } from "react";
import { Lead } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { LeadTable } from "./LeadTable";
import { LeadSearch } from "./LeadSearch";
import { LeadActions } from "./LeadActions";
import { CreateLeadDialog } from "./CreateLeadDialog";
import { CreateLeadFormData } from "@/utils/validations";

interface LeadListProps {
  leads: Lead[];
}

export const LeadList: React.FC<LeadListProps> = ({ leads }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <LeadSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <LeadActions onCreateClick={() => setIsDialogOpen(true)} />
      </div>

      <LeadTable leads={leads} searchTerm={searchTerm} />

      <CreateLeadDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreateLead}
      />
    </div>
  );
};
