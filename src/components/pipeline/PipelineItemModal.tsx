
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PipelineItem } from "@/types/pipeline";
import { Button } from "@/components/ui/button";
import { FileText, Eye, FilePlus, FileMinus, Shield, Calendar, FileImage } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

import { CustomerInfoPanel } from "./item-modal/CustomerInfoPanel";
import { AppointmentPanel } from "./item-modal/AppointmentPanel";
import { DocumentsTabsPanel } from "./item-modal/DocumentsTabsPanel";
import { GuaranteesPanel } from "./item-modal/GuaranteesPanel";

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
  item?: PipelineItem;
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

  if (!item) return null;

  // Responsive modal size control + scroll logic
  const modalClass =
    "w-full max-w-[98vw] md:max-w-[1200px] sm:max-w-full max-h-[98vh] flex flex-col rounded-lg p-0 overflow-hidden";

  const leadNAW = demoLeads.find(l => l.objectId === item.objectId) || demoLeads[0];

  const appointments = mockAppointments
    .filter(a => a.leadId === item.objectId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const quotes = mockQuotes.filter(q => q.leadId === item.objectId);
  const invoices = mockInvoices.filter(i => i.leadId === item.objectId);
  const workAgreements = mockWorkAgreements.filter(w => w.leadId === item.objectId);

  const guarantees = demoGuarantees.filter(g => g.objectId === item.objectId);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={modalClass}>
        <div className="bg-slate-50 p-6 border-b shrink-0">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="font-normal bg-blue-100 text-blue-800">
                Klant
              </Badge>
              <span className="text-xs text-muted-foreground">
                ID: {item.objectId.substring(0, 8)}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <span className="text-blue-800 font-bold text-lg">{leadNAW.name[0]}</span>
              </span>
              <div>
                <DialogTitle className="text-xl">{leadNAW.name}</DialogTitle>
                <DialogDescription className="text-xs mt-1">
                  Laatst bijgewerkt: {(new Date(item.updatedAt)).toLocaleDateString("nl", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Responsive grid */}
        <div className="p-6 flex-1 min-h-0 max-h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="space-y-6 min-w-0">
            <CustomerInfoPanel lead={leadNAW} />
            <GuaranteesPanel guarantees={guarantees} getStatusColor={getStatusColor} />
          </div>
          <div className="space-y-6 min-w-0">
            <AppointmentPanel appointments={appointments} />
            <DocumentsTabsPanel
              activeTab={activeDocTab}
              setActiveTab={setActiveDocTab}
              quotes={quotes}
              invoices={invoices}
              workAgreements={workAgreements}
              getStatusColor={getStatusColor}
            />
          </div>
        </div>
        <Separator className="my-0" />
        {/* Modal footer, stays always visible */}
        <div className="px-6 py-6 flex flex-wrap gap-3 justify-start bg-white shrink-0">
          <Button onClick={onAddNote} variant="outline" className="min-w-[140px] flex gap-2">
            <FileText className="h-4 w-4" />
            Notitie toevoegen
          </Button>
          <Button onClick={onSchedule} variant="outline" className="min-w-[140px] flex gap-2">
            <Calendar className="h-4 w-4" />
            Afspraak maken
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[140px] flex gap-2">
                <FilePlus className="h-4 w-4" />
                Document maken
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCreateQuote}>
                <FilePlus className="h-4 w-4 mr-2" />
                Maak offerte
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCreateInvoice}>
                <FileMinus className="h-4 w-4 mr-2" />
                Maak factuur
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCreateWorkOrder}>
                <Shield className="h-4 w-4 mr-2" />
                Maak werkopdracht
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleUploadPhotos}>
                <FileImage className="h-4 w-4 mr-2" />
                Upload foto's
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={onGoToDetail} variant="default" className="min-w-[140px] flex gap-2">
            <Eye className="h-4 w-4" />
            Ga naar details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
// End refactor: src/components/pipeline/PipelineItemModal.tsx

