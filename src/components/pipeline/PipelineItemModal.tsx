import React, { useState } from "react";

import { PipelineItemMainDialog } from "./item-modal/PipelineItemMainDialog";
import { PipelineItemNoteDialog } from "./item-modal/PipelineItemNoteDialog";
import { PipelineItemAppointmentDialog } from "./item-modal/PipelineItemAppointmentDialog";
import { usePipeline } from "@/hooks/usePipeline";
import { mockAppointments } from "@/data/mockAppointments";
import { mockQuotes } from "@/data/mockQuotes";
import { mockInvoices } from "@/data/mockInvoices";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";

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

  // Responsive modal size control
  const modalClass =
    "w-full max-w-[98vw] md:max-w-[1200px] sm:max-w-full max-h-[98vh] flex flex-col rounded-lg p-0 overflow-hidden";

  const leadNAW = demoLeads.find((l) => l.objectId === item.objectId) || demoLeads[0];

  // We keep filtering logic local, could be optimized by moving or memoizing outside
  const appointments = mockAppointments
    .filter((a: any) => a.leadId === item.objectId)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const quotes = mockQuotes.filter((q: any) => q.leadId === item.objectId);
  const invoices = mockInvoices.filter((i: any) => i.leadId === item.objectId);
  const workAgreements = mockWorkAgreements.filter((w: any) => w.leadId === item.objectId);
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

  // Footer menu handlers (could be made into a single grouped object)
  const handleCreateQuote = () => {
    
  };
  const handleCreateInvoice = () => {
    
  };
  const handleCreateWorkOrder = () => {
    
  };
  const handleUploadPhotos = () => {
    
  };

  // Notitie toevoegen modal
  const handleSaveNote = () => {
    if (!noteValue.trim()) {
      
      return;
    }
    
    setNoteValue("");
    setShowNoteDialog(false);
  };

  // Afspraak toevoegen modal submit
  const handleNewAppointmentSubmit = (data: any) => {
    
    setShowAppointmentDialog(false);
  };

  const { selectedPipeline, handleItemMove } = usePipeline();

  const handleStageChange = (newStageId: string) => {
    handleItemMove(item.id, newStageId);
    
  };

  return (
    <>
      <PipelineItemMainDialog
        open={open}
        onOpenChange={onOpenChange}
        modalClass={modalClass}
        item={item}
        leadNAW={leadNAW}
        guarantees={guarantees}
        appointments={appointments}
        quotes={quotes}
        invoices={invoices}
        workAgreements={workAgreements}
        activeDocTab={activeDocTab}
        setActiveDocTab={setActiveDocTab}
        getStatusColor={getStatusColor}
        pipeline={selectedPipeline}
        currentStageId={item.stageId}
        onStageChange={handleStageChange}
        onGoToDetail={onGoToDetail}
        onAddNote={() => setShowNoteDialog(true)}
        onSchedule={() => setShowAppointmentDialog(true)}
        onCreateQuote={handleCreateQuote}
        onCreateInvoice={handleCreateInvoice}
        onCreateWorkOrder={handleCreateWorkOrder}
        onUploadPhotos={handleUploadPhotos}
      />

      <PipelineItemNoteDialog
        open={showNoteDialog}
        onOpenChange={setShowNoteDialog}
        noteValue={noteValue}
        setNoteValue={setNoteValue}
        onSave={handleSaveNote}
      />

      <PipelineItemAppointmentDialog
        open={showAppointmentDialog}
        onOpenChange={setShowAppointmentDialog}
        onSubmit={handleNewAppointmentSubmit}
      />
    </>
  );
};
