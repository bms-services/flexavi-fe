
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { EmployeeAppointmentInfo } from "./EmployeeAppointmentInfo";
import { EmployeeAppointmentActions } from "./EmployeeAppointmentActions";
import { EmployeeAppointmentSheet } from "./EmployeeAppointmentSheet";
import { Sheet } from "@/components/ui/sheet";
import { RescheduleDialog } from "./RescheduleDialog";
import { AppointmentProcessModal } from "./AppointmentProcessModal";
import { Dialog } from "@/components/ui/dialog";
import { Appointment } from "@/types";

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
  const [processModalOpen, setProcessModalOpen] = useState(false);

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

  const notes = [
    "Klant wil graag volgende week extra opties besproken krijgen.",
  ];
  const historyEntries = isRescheduled && rescheduleReason
    ? [{ type: "Afspraak verzet", description: rescheduleReason, date: app.date }]
    : [];

  return (
    <Card className="border-[#B8D8FF] bg-[#F8FAFC] rounded-3xl overflow-hidden shadow flex flex-col w-full">
      <CardHeader className="rounded-t-3xl border-2 border-[#B8D8FF] bg-[#F4F9FE] px-6 py-3 border-b flex flex-row items-center gap-2 border-t-0 border-x-0">
        <Calendar className="h-6 w-6 text-[#189BE7]" />
        <CardTitle className="text-xl font-bold text-[#1366b2]"> {app.title} </CardTitle>
      </CardHeader>

      <CardContent className="bg-white p-6 pt-3">
        <EmployeeAppointmentInfo
          app={app}
          lead={lead}
          notes={notes}
          historyEntries={historyEntries}
          onMapOpen={onMapOpen}
          digitalQuote={localDigitalQuote}
          digitalInvoice={localDigitalInvoice}
          digitalAgreement={localDigitalAgreement}
        />
      </CardContent>

      <div className="bg-[#F8FAFC] border-t px-2 py-2 flex flex-wrap md:flex-nowrap justify-end gap-3 mt-2 w-full">
        <div className="grow flex flex-row justify-end gap-2">
          <Dialog open={rescheduleModalOpen} onOpenChange={(open) => {
            if (!open) onCloseRescheduleModal();
          }}>
            <EmployeeAppointmentActions
              onViewHistory={onViewHistory}
              onOpenRescheduleModal={onOpenRescheduleModal}
            />
          </Dialog>
        </div>
        <div className="grow-0">
          <Sheet>
            <EmployeeAppointmentSheet
              hasDigitalQuote={!!localDigitalQuote}
              hasDigitalInvoice={!!localDigitalInvoice}
              hasDigitalAgreement={!!localDigitalAgreement}
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
              onOpenProcessModal={() => setProcessModalOpen(true)}
            />
          </Sheet>
        </div>
      </div>

      <RescheduleDialog
        open={rescheduleModalOpen}
        reason={rescheduleReason}
        onChange={onRescheduleReasonChange}
        onCancel={onCloseRescheduleModal}
        onSave={onRescheduleSave}
      />
      <AppointmentProcessModal
        open={processModalOpen}
        reason={""}
        onReasonChange={() => {}}
        taskChecked={false}
        onTaskCheckedChange={() => {}}
        taskDescription={""}
        onTaskDescriptionChange={() => {}}
        onCancel={() => setProcessModalOpen(false)}
        onSubmit={() => setProcessModalOpen(false)}
        loading={false}
      />
    </Card>
  );
};
