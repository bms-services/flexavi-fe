import React, { useState } from "react";
import { Calendar, FileText, MapPin, User, Phone, Mail, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { DigitalQuoteDisplay } from "./DigitalQuoteDisplay";
import { RescheduleDialog } from "./RescheduleDialog";
import { Appointment } from "@/types";
import { Separator } from "@/components/ui/separator";
import { EmployeeAppointmentActions } from "./EmployeeAppointmentActions";
import { EmployeeAppointmentSheet } from "./EmployeeAppointmentSheet";
import { Sheet } from "@/components/ui/sheet";
import { AppointmentProcessModal } from "./AppointmentProcessModal";

interface EmployeeAppointmentCardProps {
  app: Appointment;
  lead: any;
  isRescheduled: boolean;
  rescheduleReason: string;
  rescheduleModalOpen: boolean;
  digitalQuote?: ReceiptData;
  digitalInvoice?: ReceiptData;
  digitalAgreement?: ReceiptData;
  onMapOpen: (address: string) => void;
  onCreateQuote: () => void;
  onOpenUploadQuote: () => void;
  uploadQuoteDialogOpen: boolean;
  onQuoteResult: (data: ReceiptData) => void;
  onCloseUploadQuote: () => void;
  onCreateInvoice: () => void;
  onOpenUploadInvoice: () => void;
  uploadInvoiceDialogOpen: boolean;
  onInvoiceResult: (data: ReceiptData) => void;
  onCloseUploadInvoice: () => void;
  onCreateAgreement: () => void;
  onOpenUploadAgreement: () => void;
  uploadAgreementDialogOpen: boolean;
  onAgreementResult: (data: ReceiptData) => void;
  onCloseUploadAgreement: () => void;
  onViewHistory: () => void;
  onOpenRescheduleModal: () => void;
  onCloseRescheduleModal: () => void;
  onRescheduleReasonChange: (val: string) => void;
  onRescheduleSave: () => void;
}

// --- NEW Helper: Kolom-card style
function BlockCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "bg-[#F6FBFF] border border-[#B8D8FF] rounded-2xl px-4 py-4 shadow-sm flex flex-col gap-3 " +
        (className || "")
      }
      style={{ minWidth: 0 }}
    >
      {children}
    </div>
  );
}

// --- NEW: Notities en Geschiedenis compact block
function NotesHistory({
  notes,
  historyEntries,
}: { notes: string[]; historyEntries: { type: string; description: string; date: string }[] }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full">
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-1 text-sm font-semibold text-[#2196F3]">
          <FileText className="h-4 w-4" /> Notities
        </div>
        {notes.length > 0 ? (
          <ul className="list-disc pl-4 text-[13px] text-[#222]">
            {notes.map((n, i) => (
              <li key={i} className="whitespace-pre-wrap">{n}</li>
            ))}
          </ul>
        ) : (
          <span className="italic text-gray-400 text-[13px]">Geen notities</span>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-1 text-sm font-semibold text-[#2196F3]">
          <History className="h-4 w-4" /> Geschiedenis
        </div>
        {historyEntries.length > 0 ? (
          <ul className="list-disc pl-4 text-[13px] text-[#222]">
            {historyEntries.map((entry, i) => (
              <li key={i}>
                <span className="font-semibold">{entry.type}</span>: {entry.description}{" "}
                <span className="text-gray-400 text-[12px]">{entry.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span className="italic text-gray-400 text-[13px]">Geen geschiedenis</span>
        )}
      </div>
    </div>
  );
}

// --- Redesign Main Card
export const EmployeeAppointmentCard: React.FC<EmployeeAppointmentCardProps> = ({
  app,
  lead,
  isRescheduled,
  rescheduleReason,
  rescheduleModalOpen,
  digitalQuote,
  digitalInvoice,
  digitalAgreement,
  onMapOpen,
  onCreateQuote,
  onOpenUploadQuote,
  uploadQuoteDialogOpen,
  onQuoteResult,
  onCloseUploadQuote,
  onCreateInvoice,
  onOpenUploadInvoice,
  uploadInvoiceDialogOpen,
  onInvoiceResult,
  onCloseUploadInvoice,
  onCreateAgreement,
  onOpenUploadAgreement,
  uploadAgreementDialogOpen,
  onAgreementResult,
  onCloseUploadAgreement,
  onViewHistory,
  onOpenRescheduleModal,
  onCloseRescheduleModal,
  onRescheduleReasonChange,
  onRescheduleSave,
}) => {
  const [localDigitalQuote, setLocalDigitalQuote] = useState<ReceiptData | undefined>(digitalQuote);
  const [localDigitalInvoice, setLocalDigitalInvoice] = useState<ReceiptData | undefined>(digitalInvoice);
  const [localDigitalAgreement, setLocalDigitalAgreement] = useState<ReceiptData | undefined>(digitalAgreement);

  const handleQuoteResult = (data: ReceiptData) => {
    setLocalDigitalQuote(data);
    if (onQuoteResult) onQuoteResult(data);
  };
  const handleInvoiceResult = (data: ReceiptData) => {
    setLocalDigitalInvoice(data);
    if (onInvoiceResult) onInvoiceResult(data);
  };
  const handleAgreementResult = (data: ReceiptData) => {
    setLocalDigitalAgreement(data);
    if (onAgreementResult) onAgreementResult(data);
  };

  const hasDigitalQuote = !!localDigitalQuote;
  const hasDigitalInvoice = !!localDigitalInvoice;
  const hasDigitalAgreement = !!localDigitalAgreement;

  // Mock notes/history for demo - you can pass in as props
  const notes = [
    "Klant wil graag volgende week extra opties besproken krijgen.",
  ];
  const historyEntries = isRescheduled && rescheduleReason
    ? [{ type: "Afspraak verzet", description: rescheduleReason, date: app.date }]
    : [];

  // --- Card header styling
  return (
    <Card className="border-[#B8D8FF] bg-[#F8FAFC] rounded-3xl overflow-hidden shadow flex flex-col w-full">
      {/* Header */}
      <CardHeader className="rounded-t-3xl border-2 border-[#B8D8FF] bg-[#F4F9FE] px-6 py-3 border-b flex flex-row items-center gap-2 border-t-0 border-x-0">
        <Calendar className="h-6 w-6 text-[#189BE7]" />
        <CardTitle className="text-xl font-bold text-[#1366b2]"> {app.title} </CardTitle>
      </CardHeader>

      {/* Main Content in 3 blocks */}
      <CardContent className="bg-white p-6 pt-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Kolom 1: Klant */}
          <BlockCard className="col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-6 w-6 text-[#189BE7]" />
              <span className="font-bold text-lg text-[#183d5c]">{lead?.name}</span>
            </div>
            <div className="flex flex-col gap-1 text-[#4496D1] text-[15px] mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{lead?.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{lead?.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{lead?.email}</span>
              </div>
            </div>
            <button
              onClick={() => onMapOpen(lead?.address || "")}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-[#189BE7] text-[#2196F3] px-3 py-1 mt-1 mb-2 font-medium bg-white hover:bg-[#E6F2FC] transition"
              type="button"
            >
              <MapPin className="h-4 w-4" />
              Bekijk op kaart
            </button>

            {/* Notities en geschiedenis compact */}
            <NotesHistory notes={notes} historyEntries={historyEntries} />
          </BlockCard>

          {/* Kolom 2: Tijdsbestek, locatie, beschrijving */}
          <BlockCard className="col-span-1">
            {/* Tijdsbestek */}
            <div className="mb-2">
              <span className="block text-sm font-bold text-[#189BE7] flex items-center gap-1 mb-0.5">
                <Calendar className="h-4 w-4" />
                Tijdsbestek
              </span>
              <span className="text-[15px] text-[#183d5c] font-medium">
                {app.date} · {app.startTime} - {app.endTime}
              </span>
            </div>
            {/* Locatie */}
            <div className="mb-2">
              <span className="block text-sm font-bold text-[#189BE7] flex items-center gap-1 mb-0.5">
                <MapPin className="h-4 w-4" />
                Locatie
              </span>
              <span
                className="text-[15px] text-[#2196F3] font-medium hover:underline cursor-pointer flex items-center gap-1"
                onClick={() => onMapOpen(app.location || "")}
                tabIndex={0}
                role="button"
              >
                {app.location}
                <MapPin className="inline h-4 w-4 text-[#2196F3] ml-1" />
              </span>
            </div>
            {/* Beschrijving */}
            <div>
              <span className="block text-sm font-bold text-[#189BE7] flex items-center gap-1 mb-0.5">
                <FileText className="h-4 w-4" />
                Beschrijving
              </span>
              <span className="block text-[15px] text-[#222]">{app.description}</span>
            </div>
          </BlockCard>

          {/* Kolom 3: Documenten */}
          <BlockCard className="col-span-1 items-center">
            <h4 className="uppercase text-xs text-[#189BE7] font-bold mb-1 tracking-wider text-center">
              Documenten
            </h4>
            {(hasDigitalQuote || hasDigitalInvoice || hasDigitalAgreement) ? (
              <div className="w-full grid gap-2 grid-cols-1">
                {hasDigitalQuote && <DigitalQuoteDisplay quote={localDigitalQuote!} title="Offerte" />}
                {hasDigitalInvoice && <DigitalQuoteDisplay quote={localDigitalInvoice!} title="Factuur" />}
                {hasDigitalAgreement && <DigitalQuoteDisplay quote={localDigitalAgreement!} title="Werkovereenkomst" />}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-7 text-[#189BE7] h-full">
                <FileText className="h-10 w-10 mb-2" />
                <span className="text-sm">Geen digitale documenten beschikbaar</span>
              </div>
            )}
          </BlockCard>
        </div>
      </CardContent>

      {/* Actions (Geschiedenis / Verzetten / Verwerken) */}
      <div className="bg-[#F8FAFC] border-t px-2 py-2 flex flex-wrap md:flex-nowrap justify-end gap-3 mt-2 w-full">
        <div className="grow flex flex-row justify-end gap-2">
          <EmployeeAppointmentActions
            onViewHistory={onViewHistory}
            onOpenRescheduleModal={onOpenRescheduleModal}
          />
        </div>
        <div className="grow-0">
          <Sheet>
            <EmployeeAppointmentSheet
              hasDigitalQuote={hasDigitalQuote}
              hasDigitalInvoice={hasDigitalInvoice}
              hasDigitalAgreement={hasDigitalAgreement}
              digitalQuote={localDigitalQuote}
              digitalInvoice={localDigitalInvoice}
              digitalAgreement={localDigitalAgreement}
              onCreateQuote={onCreateQuote}
              onOpenUploadQuote={onOpenUploadQuote}
              uploadQuoteDialogOpen={uploadQuoteDialogOpen}
              onQuoteResult={handleQuoteResult}
              onCloseUploadQuote={onCloseUploadQuote}
              onCreateInvoice={onCreateInvoice}
              onOpenUploadInvoice={onOpenUploadInvoice}
              uploadInvoiceDialogOpen={uploadInvoiceDialogOpen}
              onInvoiceResult={handleInvoiceResult}
              onCloseUploadInvoice={onCloseUploadInvoice}
              onCreateAgreement={onCreateAgreement}
              onOpenUploadAgreement={onOpenUploadAgreement}
              uploadAgreementDialogOpen={uploadAgreementDialogOpen}
              onAgreementResult={handleAgreementResult}
              onCloseUploadAgreement={onCloseUploadAgreement}
              onOpenProcessModal={() => {}} // If needed
            />
          </Sheet>
        </div>
      </div>

      {/* Dialogs */}
      <RescheduleDialog
        open={rescheduleModalOpen}
        reason={rescheduleReason}
        onChange={onRescheduleReasonChange}
        onCancel={onCloseRescheduleModal}
        onSave={onRescheduleSave}
      />
      <AppointmentProcessModal
        open={false}
        reason={""}
        onReasonChange={() => {}}
        taskChecked={false}
        onTaskCheckedChange={() => {}}
        taskDescription={""}
        onTaskDescriptionChange={() => {}}
        onCancel={() => {}}
        onSubmit={() => {}}
        loading={false}
      />
    </Card>
  );
};
