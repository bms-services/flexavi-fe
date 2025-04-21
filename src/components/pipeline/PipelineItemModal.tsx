
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import { PipelineItemModalHeader } from "./item-modal/PipelineItemModalHeader";
import { PipelineItemModalFooterActions } from "./item-modal/PipelineItemModalFooterActions";
import { PipelineItemModalContent } from "./item-modal/PipelineItemModalContent";

import { mockAppointments } from "@/data/mockAppointments";
import { mockQuotes } from "@/data/mockQuotes";
import { mockInvoices } from "@/data/mockInvoices";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NewAppointmentForm } from "@/components/appointments/components/form/NewAppointmentForm";

const demoLeads = [
  {
    objectId: "lead-1",
    name: "Niels de Vries",
    address: "Vijzelstraat 12, 1017 HK Amsterdam",
    phone: "06-12345678",
    email: "niels@voorbeeldbedrijf.nl",
    requestReason: "Dakgoot vervanging en lekkage reparatie",
    wozValue: 780000,
    estimatedProjectValue: 7800
  },
  {
    objectId: "lead-2",
    name: "Marco Jansen",
    address: "Bloemgracht 55, 1016 KE Amsterdam",
    phone: "06-87654321",
    email: "marco@voorbeeld.nl",
    requestReason: "Zonnepanelen installatie en dakisolatie",
    wozValue: 650000,
    estimatedProjectValue: 16500
  }
];

const demoGuarantees = [
  {
    id: "guarantee-1",
    objectId: "lead-1",
    title: "Dakgoot Installatie",
    description: "10 jaar fabrieksgarantie op materialen, 5 jaar op arbeid",
    startDate: "2024-01-15",
    endDate: "2034-01-15",
    status: "active"
  },
  {
    id: "guarantee-2",
    objectId: "lead-1",
    title: "Lekkage Reparatie",
    description: "2 jaar garantie op waterdichtheid",
    startDate: "2024-02-10",
    endDate: "2026-02-10",
    status: "active"
  }
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: any;
  onGoToDetail: () => void;
  onAddNote: () => void;
  onSchedule: () => void;
}

export const PipelineItemModal: React.FC<Props> = ({
  open,
  onOpenChange,
  item,
  onGoToDetail,
  onAddNote,
  onSchedule,
}) => {
  const [activeDocTab, setActiveDocTab] = useState("quotes");
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [noteValue, setNoteValue] = useState("");

  if (!item) return null;

  // Responsive modal size control + scroll logic
  const modalClass =
    "w-full max-w-[98vw] md:max-w-[1200px] sm:max-w-full max-h-[98vh] flex flex-col rounded-lg p-0 overflow-hidden";

  const leadNAW = demoLeads.find((l) => l.objectId === item.objectId) || demoLeads[0];

  const appointments = mockAppointments
    .filter((a) => a.leadId === item.objectId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const quotes = mockQuotes.filter((q) => q.leadId === item.objectId);
  const invoices = mockInvoices.filter((i) => i.leadId === item.objectId);
  const workAgreements = mockWorkAgreements.filter((w) => w.leadId === item.objectId);

  const guarantees = demoGuarantees.filter((g) => g.objectId === item.objectId);

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      draft: "bg-gray-100 text-gray-800",
      sent: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      paid: "bg-green-100 text-green-800",
      overdue: "bg-orange-100 text-orange-800",
      completed: "bg-green-100 text-green-800",
      active: "bg-green-100 text-green-800",
      expired: "bg-gray-100 text-gray-800",
    };
    return colorMap[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  // Footer menu handlers
  const handleCreateQuote = () => {
    toast.success("Offerte aanmaken gestart");
  };
  const handleCreateInvoice = () => {
    toast.success("Factuur aanmaken gestart");
  };
  const handleCreateWorkOrder = () => {
    toast.success("Werkopdracht aanmaken gestart");
  };
  const handleUploadPhotos = () => {
    toast.success("Upload foto's gestart");
  };

  // Notitie toevoegen modal
  const handleSaveNote = () => {
    if (!noteValue.trim()) {
      toast.error("Notitie mag niet leeg zijn");
      return;
    }
    // Hier kun je uiteraard later een save functie koppelen
    toast.success("Notitie toegevoegd!");
    setNoteValue("");
    setShowNoteDialog(false);
  };

  // Afspraak toevoegen modal submit
  const handleNewAppointmentSubmit = (data: any) => {
    // Later kun je hier de data uploaden of verwerken
    toast.success("Afspraak is toegevoegd!");
    setShowAppointmentDialog(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={modalClass}>
          <div className="bg-slate-50 p-6 border-b shrink-0">
            <PipelineItemModalHeader
              objectId={item.objectId}
              name={leadNAW.name}
              updatedAt={item.updatedAt}
            />
          </div>
          <PipelineItemModalContent
            leadNAW={leadNAW}
            guarantees={guarantees}
            appointments={appointments}
            quotes={quotes}
            invoices={invoices}
            workAgreements={workAgreements}
            activeDocTab={activeDocTab}
            setActiveDocTab={setActiveDocTab}
            getStatusColor={getStatusColor}
          />
          <Separator className="my-0" />

          <PipelineItemModalFooterActions
            onAddNote={() => setShowNoteDialog(true)}
            onSchedule={() => setShowAppointmentDialog(true)}
            onGoToDetail={onGoToDetail}
            onCreateQuote={handleCreateQuote}
            onCreateInvoice={handleCreateInvoice}
            onCreateWorkOrder={handleCreateWorkOrder}
            onUploadPhotos={handleUploadPhotos}
          />
        </DialogContent>
      </Dialog>

      {/* Notitie toevoegen modal */}
      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Nieuwe Notitie toevoegen</DialogTitle>
          </DialogHeader>
          <Textarea
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            placeholder="Schrijf je notitie..."
            className="min-h-[120px] mt-3"
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
              Annuleren
            </Button>
            <Button onClick={handleSaveNote} disabled={!noteValue.trim()}>
              Notitie toevoegen
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Afspraak toevoegen modal */}
      <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
        <DialogContent className="w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>Nieuwe Afspraak maken</DialogTitle>
          </DialogHeader>
          <div className="pt-3">
            <NewAppointmentForm onSubmit={handleNewAppointmentSubmit} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
