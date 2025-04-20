
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Info, FilePlus, Upload, CalendarPlus } from "lucide-react";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { DigitalQuoteDisplay } from "./DigitalQuoteDisplay";
import { RescheduleDialog } from "./RescheduleDialog";
import { Appointment } from "@/types";
import { Separator } from "@/components/ui/separator";
import { AppointmentProcessModal } from "./AppointmentProcessModal";
import { LeadInfoCard } from "./LeadInfoCard";

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
  onRescheduleSave
}) => {
  const [processModalOpen, setProcessModalOpen] = React.useState(false);
  const [processReason, setProcessReason] = React.useState("");
  const [processTaskChecked, setProcessTaskChecked] = React.useState(false);
  const [processTaskDescription, setProcessTaskDescription] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const notities = ["Klant wil graag volgende week extra opties besproken krijgen.", "Vorige keer niet thuis aangetroffen, telefonisch nieuwe afspraak gepland."];
  const historyEntries = isRescheduled && rescheduleReason ? [{
    type: "Afspraak verzet",
    description: rescheduleReason,
    date: app.date
  }] : [];

  const handleOpenProcessModal = () => setProcessModalOpen(true);
  const handleCloseProcessModal = () => {
    setProcessModalOpen(false);
    setProcessReason("");
    setProcessTaskChecked(false);
    setProcessTaskDescription("");
    setProcessing(false);
  };
  const handleProcessSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setProcessModalOpen(false);
      setProcessReason("");
      setProcessTaskChecked(false);
      setProcessTaskDescription("");
    }, 1200);
  };

  return (
    <Card className="shadow-md border border-[#0EA5E9] bg-white rounded-2xl overflow-hidden hover:shadow-lg transition">
      <CardHeader className="pb-1 pt-4 px-6 border-b-0 bg-white">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            {/* Hier wordt de dag en tijd weggelaten zoals gevraagd */}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="p-0">
          {lead && (
            <LeadInfoCard
              lead={{
                ...lead,
                appointmentDateTime: `${app.date} · ${app.startTime} - ${app.endTime}`,
              }}
              isRescheduled={isRescheduled}
              rescheduleReason={rescheduleReason}
              historyEntries={historyEntries}
              notes={notities}
            />
          )}

          <div className="px-6 pb-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Beschrijving */}
              <div className="mb-4 flex-1">
                <span className="block text-xs font-semibold text-[#0A8AD0] mb-1">Beschrijving</span>
                <span className="block text-sm text-[#1A1F2C]">{app.description}</span>
              </div>
              {/* Documenten */}
              <div className="flex-1">
                <h4 className="text-xs font-semibold text-[#0A8AD0] uppercase mb-1">Documenten</h4>
                {digitalQuote || digitalInvoice || digitalAgreement ? (
                  <div className="grid gap-2 sm:grid-cols-3">
                    {digitalQuote && <DigitalQuoteDisplay quote={digitalQuote} title="Offerte" />}
                    {digitalInvoice && <DigitalQuoteDisplay quote={digitalInvoice} title="Factuur" />}
                    {digitalAgreement && <DigitalQuoteDisplay quote={digitalAgreement} title="Werkovereenkomst" />}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-7 text-[#0A8AD0]">
                    <FileText className="h-10 w-10 text-[#0A8AD0] mb-2" />
                    <span className="text-xs">Geen digitale documenten beschikbaar</span>
                  </div>
                )}
              </div>
            </div>

            {/* Verwerk knop sectie met 4 knoppen */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {/* Maak offerte & upload offerte */}
              <Button
                className="justify-start px-4 py-3 font-semibold text-[#9b87f5] border border-[#9b87f5] hover:bg-[#f7f4fd]"
                onClick={onCreateQuote}
              >
                <FilePlus className="mr-2 text-[#9b87f5]" />
                Maak offerte & upload offerte
              </Button>

              {/* Maak factuur & upload factuur */}
              <Button
                className="justify-start px-4 py-3 font-semibold text-[#0EA5E9] border border-[#0EA5E9] hover:bg-[#e7f6fd]"
                onClick={onCreateInvoice}
              >
                <FilePlus className="mr-2 text-[#0EA5E9]" />
                Maak factuur & upload factuur
              </Button>

              {/* Maak werkopdracht & upload werkopdracht */}
              <Button
                className="justify-start px-4 py-3 font-semibold text-[#7E69AB] border border-[#7E69AB] hover:bg-[#f3f1fa]"
                onClick={onCreateAgreement}
              >
                <FilePlus className="mr-2 text-[#7E69AB]" />
                Maak werkopdracht & upload werkopdracht
              </Button>

              {/* Verwerk afspraak */}
              <Button
                className="justify-start px-4 py-3 font-semibold text-white bg-[#9b87f5] hover:bg-[#7E69AB]"
                onClick={handleOpenProcessModal}
              >
                <CalendarPlus className="mr-2" />
                Verwerk afspraak
              </Button>
            </div>

            <Separator className="my-6" />
          </div>

          <div className="border-t bg-[#FAF9FD] p-4 flex justify-end">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={onViewHistory}
                className="text-xs font-semibold text-[#0A8AD0]"
              >
                <Info className="h-4 w-4 mr-1" />
                Geschiedenis
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenRescheduleModal}
                className="text-xs font-semibold text-[#0A8AD0]"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Verzetten
              </Button>
            </div>
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

      <ReceiptUploadDialog
        open={uploadQuoteDialogOpen}
        onOpenChange={(open) => (open ? onOpenUploadQuote() : onCloseUploadQuote())}
        onResult={onQuoteResult}
      />
      <ReceiptUploadDialog
        open={uploadInvoiceDialogOpen}
        onOpenChange={(open) => (open ? onOpenUploadInvoice() : onCloseUploadInvoice())}
        onResult={onInvoiceResult}
      />
      <ReceiptUploadDialog
        open={uploadAgreementDialogOpen}
        onOpenChange={(open) => (open ? onOpenUploadAgreement() : onCloseUploadAgreement())}
        onResult={onAgreementResult}
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
