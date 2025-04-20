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
import { AppointmentDetailsCard } from "./AppointmentDetailsCard";

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
      <CardHeader className="py-2 px-4 border-b bg-[#F1F0FB]">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#0EA5E9]" />
          <CardTitle className="text-lg font-bold text-[#1A1F2C]">{app.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-0">
          <div className="px-4 pt-3 pb-3">
            <div className="flex flex-col gap-4 md:flex-row md:gap-3">
              <div className="flex-1 min-w-[220px] h-full">
                <LeadInfoCard
                  lead={lead}
                  onMapOpen={onMapOpen}
                  historyEntries={historyEntries}
                  notes={notities}
                  isRescheduled={isRescheduled}
                  rescheduleReason={rescheduleReason}
                  compact={true}
                />
              </div>
              <div className="flex-1 min-w-[200px] h-full flex">
                <AppointmentDetailsCard app={app} onMapOpen={onMapOpen} />
              </div>
              <div className="flex-1 min-w-[200px] h-full flex flex-col">
                <div className="bg-[#F1F0FB] rounded-xl p-3 border flex flex-col h-full">
                  <h4 className="text-[11px] font-semibold text-[#0A8AD0] uppercase mb-2">Documenten</h4>
                  {(hasDigitalQuote || hasDigitalInvoice || hasDigitalAgreement) ? (
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-1">
                      {hasDigitalQuote && <DigitalQuoteDisplay quote={localDigitalQuote!} title="Offerte" />}
                      {hasDigitalInvoice && <DigitalQuoteDisplay quote={localDigitalInvoice!} title="Factuur" />}
                      {hasDigitalAgreement && <DigitalQuoteDisplay quote={localDigitalAgreement!} title="Werkovereenkomst" />}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-4 text-[#0A8AD0] h-full">
                      <FileText className="h-8 w-8 text-[#0A8AD0] mb-1" />
                      <span className="text-xs">Geen digitale documenten beschikbaar</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="border-t bg-[#FAF9FD] px-3 py-2 flex justify-end">
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
