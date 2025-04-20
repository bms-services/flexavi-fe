
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus, PlusCircle, Edit2, Calendar, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CreateLeadDialog } from "../CreateLeadDialog";

interface CreateWorkOrderDialogProps {
  leadId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Component for creating a work order
const CreateWorkOrderDialog: React.FC<CreateWorkOrderDialogProps> = ({ 
  leadId, 
  open, 
  onOpenChange 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleCreateWorkOrder = () => {
    // In a real app, this would create the work order
    toast({
      title: "Werkopdracht aangemaakt",
      description: "De nieuwe werkopdracht is succesvol aangemaakt.",
    });
    
    onOpenChange(false);
    // Navigate to the projects page after creating a work order
    navigate(`/projects?leadId=${leadId}`);
  };
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Nieuwe Werkopdracht</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <p>
          Je staat op het punt om een nieuwe werkopdracht aan te maken voor deze lead.
          De werkopdracht zal worden gekoppeld aan deze lead en zal verschijnen in de projectenlijst.
        </p>
        <p className="text-muted-foreground">
          Wil je doorgaan met het aanmaken van deze werkopdracht?
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Annuleren
        </Button>
        <Button onClick={handleCreateWorkOrder}>
          Werkopdracht Aanmaken
        </Button>
      </div>
    </DialogContent>
  );
};

export const LeadDetailActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isWorkOrderDialogOpen, setIsWorkOrderDialogOpen] = useState(false);
  
  // Get the lead ID from the URL
  const leadId = window.location.pathname.split('/').pop() || '';

  const handleAddNote = () => {
    // Scroll to the notes tab
    const notesTab = document.querySelector('[data-state="inactive"][value="notes"]');
    if (notesTab) {
      (notesTab as HTMLElement).click();
      
      // Scroll to the notes section
      setTimeout(() => {
        const notesSection = document.querySelector('.tabs-content[value="notes"]');
        if (notesSection) {
          notesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleScheduleAppointment = () => {
    // Navigate to appointments page with lead ID
    navigate(`/appointments/create?leadId=${leadId}`);
  };

  const handleCreateQuote = () => {
    // Navigate to quotes page with lead ID
    navigate(`/quotes/create?leadId=${leadId}`);
  };

  const handleCreateInvoice = () => {
    // Navigate to invoices page with lead ID
    navigate(`/invoices/create?leadId=${leadId}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 w-full justify-start mt-4">
      <Button variant="outline" onClick={handleAddNote}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Notitie Toevoegen
      </Button>
      
      <Button variant="outline" onClick={handleScheduleAppointment}>
        <Calendar className="mr-2 h-4 w-4" />
        Afspraak Plannen
      </Button>
      
      <Button variant="outline" onClick={handleCreateQuote}>
        <FilePlus className="mr-2 h-4 w-4" />
        Offerte maken
      </Button>
      
      <Button variant="outline" onClick={handleCreateInvoice}>
        <FileText className="mr-2 h-4 w-4" />
        Factuur maken
      </Button>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Edit2 className="mr-2 h-4 w-4" />
            Lead Bewerken
          </Button>
        </DialogTrigger>
        <CreateLeadDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={(data) => {
            toast({
              title: "Lead bijgewerkt",
              description: "De lead is succesvol bijgewerkt.",
            });
            setIsEditDialogOpen(false);
          }}
          editMode={true}
          leadId={leadId}
        />
      </Dialog>
      
      <Dialog open={isWorkOrderDialogOpen} onOpenChange={setIsWorkOrderDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="ml-auto bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 border-emerald-200">
            <Briefcase className="mr-2 h-4 w-4" />
            Werkopdracht maken
          </Button>
        </DialogTrigger>
        <CreateWorkOrderDialog
          leadId={leadId}
          open={isWorkOrderDialogOpen}
          onOpenChange={setIsWorkOrderDialogOpen}
        />
      </Dialog>
    </div>
  );
};
