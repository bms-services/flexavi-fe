import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { DigitalQuoteDisplay } from "./DigitalQuoteDisplay";
import { RescheduleDialog } from "./RescheduleDialog";
import { Appointment } from "@/types";
import { Separator } from "@/components/ui/separator";
import { AppointmentProcessModal } from "./AppointmentProcessModal";
import { LeadInfoCard } from "./LeadInfoCard";
import { useAppointmentProcess } from "./useAppointmentProcess";
import { EmployeeAppointmentActions } from "./EmployeeAppointmentActions";
import { EmployeeAppointmentSheet } from "./EmployeeAppointmentSheet";
import { Sheet } from "@/components/ui/sheet";

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
  // Local state for digital documents in this example (In real app: fetch/save via API)
  const [localDigitalQuote, setLocalDigitalQuote] = useState<ReceiptData | undefined>(digitalQuote);
  const [localDigitalInvoice, setLocalDigitalInvoice] = useState<ReceiptData | undefined>(digitalInvoice);
  const [localDigitalAgreement, setLocalDigitalAgreement] = useState<ReceiptData | undefined>(digitalAgreement);

  // Triggered when upload-modal returns parsed data
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

  const {
    processModalOpen,
    processReason,
    setProcessReason,
    processTaskChecked,
    setProcessTaskChecked,
    processTaskDescription,
    setProcessTaskDescription,
    processing,
    handleOpenProcessModal,
    handleCloseProcessModal,
    handleProcessSubmit,
  } = useAppointmentProcess();

  const notities = [
    "Klant wil graag volgende week extra opties besproken krijgen.",
    "Vorige keer niet thuis aangetroffen, telefonisch nieuwe afspraak gepland.",
  ];
  const historyEntries = isRescheduled && rescheduleReason
    ? [{ type: "Afspraak verzet", description: rescheduleReason, date: app.date }]
    : [];

  return (
    <Card className="shadow-md border border-[#0EA5E9] bg-white rounded-2xl overflow-hidden hover:shadow-lg transition">
      <CardHeader className="pb-4 pt-4 px-6 border-b bg-[#F1F0FB]">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-[#0EA5E9]" />
          <CardTitle className="text-xl font-bold text-[#1A1F2C]">{app.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-0">
          {lead && (
            <LeadInfoCard
              lead={lead}
              onMapOpen={onMapOpen}
              historyEntries={historyEntries}
              notes={notities}
              isRescheduled={isRescheduled}
              rescheduleReason={rescheduleReason}
            />
          )}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 mb-5">
              <div>
                <span className="block text-xs font-semibold text-[#0A8AD0] mb-1">Tijdsbestek</span>
                <span className="text-sm text-[#0A8AD0] font-medium">{app.date} · {app.startTime} - {app.endTime}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-[#0A8AD0] mb-1">Locatie</span>
                <button
                  onClick={() => onMapOpen(app.location || "")}
                  className="text-sm font-medium text-[#33C3F0] hover:underline flex items-center gap-1 bg-transparent"
                  tabIndex={0}
                  type="button"
                >
                  <span>{app.location}</span>
                  <span className="ml-1">
                    <svg className="inline h-4 w-4 text-[#33C3F0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5a8.38 8.38 0 0 1-1.9 5.4l-6.11 7.61a2 2 0 0 1-3.1 0L3 15.91A8.38 8.38 0 0 1 1 10.5 9 9 0 1 1 21 10.5z"/><circle cx="12" cy="10.5" r="2.25"/></svg>
                  </span>
                </button>
              </div>
              <div>
                <span className="block text-xs font-semibold text-[#0A8AD0] mb-1">Beschrijving</span>
                <span className="block text-sm text-[#1A1F2C]">{app.description}</span>
              </div>
            </div>
            <Separator />
            <div className="mt-5">
              <h4 className="text-xs font-semibold text-[#0A8AD0] uppercase mb-1">Documenten</h4>
              {(hasDigitalQuote || hasDigitalInvoice || hasDigitalAgreement) ? (
                <div className="grid gap-2 sm:grid-cols-3">
                  {hasDigitalQuote && <DigitalQuoteDisplay quote={localDigitalQuote!} title="Offerte" />}
                  {hasDigitalInvoice && <DigitalQuoteDisplay quote={localDigitalInvoice!} title="Factuur" />}
                  {hasDigitalAgreement && <DigitalQuoteDisplay quote={localDigitalAgreement!} title="Werkovereenkomst" />}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-7 text-[#0A8AD0]">
                  <FileText className="h-10 w-10 text-[#0A8AD0] mb-2" />
                  <span className="text-xs">Geen digitale documenten beschikbaar</span>
                </div>
              )}
            </div>
          </div>
          <div className="border-t bg-[#FAF9FD] p-4 flex justify-end">
            <Sheet>
              <EmployeeAppointmentActions
                onViewHistory={onViewHistory}
                onOpenRescheduleModal={onOpenRescheduleModal}
              />
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
                onOpenProcessModal={handleOpenProcessModal}
              />
            </Sheet>
          </div>
        </div>
      </CardContent>
      <RescheduleDialog
        open={rescheduleModalOpen}
        reason={rescheduleReason}
        onChange={onRescheduleReasonChange}
        onCancel={onCloseRescheduleModal}
        onSave={onRescheduleSave}
      />
      <AppointmentProcessModal
        open={processModalOpen}
        reason={processReason}
        onReasonChange={setProcessReason}
        taskChecked={processTaskChecked}
        onTaskCheckedChange={setProcessTaskChecked}
        taskDescription={processTaskDescription}
        onTaskDescriptionChange={setProcessTaskDescription}
        onCancel={handleCloseProcessModal}
        onSubmit={handleProcessSubmit}
        loading={processing}
      />
    </Card>
  );
};
