
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus, PlusCircle, Edit2, Calendar, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  const navigate = useNavigate();
  
  const handleCreateWorkOrder = () => {
    // In a real app, this would create the work order
    
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
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isWorkOrderDialogOpen, setIsWorkOrderDialogOpen] = useState(false);
  
  const leadId = window.location.pathname.split('/').pop() || '';

  const handleAddNote = () => {
    // Find the notes tab element and click it
    const notesTab = document.querySelector('[data-state="inactive"][value="notes"]');
    if (notesTab) {
      (notesTab as HTMLElement).click();
      
      // After the tab is loaded, focus on the editor
      setTimeout(() => {
        const editorDiv = document.querySelector('.ProseMirror');
        if (editorDiv) {
          (editorDiv as HTMLElement).focus();
          // Scroll to the notes editor
          editorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300); // Increased timeout to ensure tab content is fully loaded
    } else {
      // If we can't find an inactive tab, it might already be active
      // In that case, just try to focus the editor directly
      setTimeout(() => {
        const editorDiv = document.querySelector('.ProseMirror');
        if (editorDiv) {
          (editorDiv as HTMLElement).focus();
          editorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleScheduleAppointment = () => {
    navigate(`/appointments?leadId=${leadId}`);
  };

  const handleCreateQuote = () => {
    navigate(`/quotes/create?leadId=${leadId}`);
  };

  const handleCreateInvoice = () => {
    navigate(`/invoices/create?leadId=${leadId}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 w-full bg-white p-4 shadow-sm rounded-lg mb-6">
      <Button 
        onClick={handleAddNote}
        className="flex-shrink-0"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Notitie
      </Button>
      
      <Button 
        onClick={handleScheduleAppointment}
        className="flex-shrink-0"
      >
        <Calendar className="mr-2 h-4 w-4" />
        Afspraak
      </Button>
      
      <Button 
        onClick={handleCreateQuote}
        className="flex-shrink-0"
      >
        <FilePlus className="mr-2 h-4 w-4" />
        Offerte
      </Button>
      
      <Button 
        onClick={handleCreateInvoice}
        className="flex-shrink-0"
      >
        <FileText className="mr-2 h-4 w-4" />
        Factuur
      </Button>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex-shrink-0">
            <Edit2 className="mr-2 h-4 w-4" />
            Bewerken
          </Button>
        </DialogTrigger>
        <CreateLeadDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={(data) => {
            
            setIsEditDialogOpen(false);
          }}
          leadId={leadId}
        />
      </Dialog>
      
      <Dialog open={isWorkOrderDialogOpen} onOpenChange={setIsWorkOrderDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            className="flex-shrink-0"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Werkopdracht
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
