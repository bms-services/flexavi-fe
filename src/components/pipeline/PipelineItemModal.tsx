import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PipelineItem } from "@/types/pipeline";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Eye, FilePlus, FileMinus, Shield, User, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LeadCallbackModalCard } from "./item-modal/LeadCallbackModalCard";
import { LeadDefaultModalCard } from "./item-modal/LeadDefaultModalCard";
import { QuoteModalCard } from "./item-modal/QuoteModalCard";
import { InvoiceModalCard } from "./item-modal/InvoiceModalCard";
import { ProjectModalCard } from "./item-modal/ProjectModalCard";
import { mockAppointments } from "@/data/mockAppointments";

// Dummy NAW details (in praktijk via API laden)
const demoLeads = [
  {
    objectId: "lead-1",
    name: "Niels de Vries",
    address: "Vijzelstraat 12, 1017 HK Amsterdam",
    phone: "06-12345678",
    email: "niels@voorbeeldbedrijf.nl",
  },
  {
    objectId: "lead-2",
    name: "Marco Jansen",
    address: "Bloemgracht 55, 1016 KE Amsterdam",
    phone: "06-87654321",
    email: "marco@voorbeeld.nl",
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
  if (!item) return null;

  // Brede modal!
  const modalWidth = "max-w-5xl w-full"; // Extra, extra breed

  // ACTIES
  const handleCreateQuote = () => {
    window.location.assign("/quotes/create?leadId=" + item.objectId.split("-")[1]);
  };
  const handleCreateInvoice = () => {
    window.location.assign("/invoices/create?leadId=" + item.objectId.split("-")[1]);
  };
  const handleCreateWorkOrder = () => {
    window.location.assign("/projects?leadId=" + item.objectId.split("-")[1]);
  };

  // Zoek NAW voor demo-lead
  const leadNAW =
    demoLeads.find(l => l.objectId === item.objectId) || demoLeads[0];

  // Afspraakdata ophalen (voor lead-type items)
  let appointment = undefined;
  if (item.objectType === "lead") {
    // Vind een afspraak die hoort bij deze lead (niet gelukte afspraken: status = "canceled", "rescheduled", "no_show", "failed")
    // Voor demo gebruiken we statuses canceled, rescheduled, toegevoegd no_show en failed als voorbeeld
    appointment = mockAppointments.find(
      a =>
        a.leadId === item.objectId &&
        ["canceled", "rescheduled", "no_show", "failed"].includes(a.status)
    );
  }

  // Kolom layout opbouwen
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${modalWidth} rounded-lg p-0 overflow-hidden`}>
        <div className="bg-slate-50 p-8 pb-4 border-b">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className={`font-normal bg-blue-100 text-blue-800`}>
                Klant
              </Badge>
              <span className="text-xs text-muted-foreground">
                ID: {item.objectId.substring(0, 8)}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <DialogTitle className="text-xl">{leadNAW.name ?? item.name}</DialogTitle>
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
        {/* 2 kolommen: klant (links), afspraak (rechts) */}
        <div className="flex flex-col md:flex-row gap-8 p-8 pt-4">
          {/* Klantdata */}
          <div className="flex-1 min-w-[260px] max-w-md">
            <h3 className="text-sm font-semibold mb-2">Klantgegevens</h3>
            <ul className="space-y-1 text-sm">
              <li><span className="font-medium">Naam:</span> {leadNAW.name ?? item.name}</li>
              <li><span className="font-medium">Adres:</span> {leadNAW.address ?? "-"}</li>
              <li><span className="font-medium">Telefoon:</span> {leadNAW.phone ?? "-"}</li>
              <li><span className="font-medium">E-mail:</span> {leadNAW.email ?? "-"}</li>
            </ul>
          </div>
          {/* Afspraakdata */}
          <div className="flex-1 min-w-[260px] flex flex-col">
            <h3 className="text-sm font-semibold mb-2">Afspraakgegevens</h3>
            {appointment ? (
              <div className="space-y-2 text-sm flex-grow">
                <div>
                  <span className="font-medium">Datum:</span>{" "}
                  {appointment.date}{" "}
                  <span className="ml-1">{appointment.startTime}-{appointment.endTime}</span>
                </div>
                <div>
                  <span className="font-medium">Titel:</span> {appointment.title}
                </div>
                <div>
                  <span className="font-medium">Beschrijving:</span>{" "}
                  <span className="inline-block align-top">{appointment.description}</span>
                </div>
                {/* Prijs tonen indien 'klus' of 'geld ophalen' → dummy check */}
                {(appointment.status === "new_assignment" || appointment.status === "extra_assignment") && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-700" /> <span className="font-medium">Prijs:</span> € 750
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground italic text-sm">Geen niet gelukte afspraak gevonden voor deze lead.</div>
            )}
            {/* Actieknoppen naast onder afspraakdata */}
            <div className="flex flex-wrap gap-2 mt-6">
              <Button onClick={handleCreateQuote} variant="outline" className="min-w-[140px] flex gap-2">
                <FilePlus className="h-4 w-4" />
                Maak offerte
              </Button>
              <Button onClick={handleCreateInvoice} variant="outline" className="min-w-[140px] flex gap-2">
                <FileMinus className="h-4 w-4" />
                Maak factuur
              </Button>
              <Button onClick={handleCreateWorkOrder} variant="outline" className="min-w-[140px] flex gap-2">
                <Shield className="h-4 w-4" />
                Maak werkopdracht
              </Button>
            </div>
          </div>
        </div>
        <Separator className="my-3" />
        {/* Standaard acties */}
        <div className="px-8 pb-8 flex flex-wrap gap-3">
          <Button onClick={onAddNote} variant="outline" className="min-w-[140px] flex gap-2">
            <FileText className="h-4 w-4" />
            Notitie toevoegen
          </Button>
          <Button onClick={onSchedule} variant="outline" className="min-w-[140px] flex gap-2">
            <Calendar className="h-4 w-4" />
            Afspraak maken
          </Button>
          <Button onClick={onGoToDetail} variant="default" className="min-w-[140px] flex gap-2">
            <Eye className="h-4 w-4" />
            Ga naar details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
