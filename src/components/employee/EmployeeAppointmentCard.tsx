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
            {/* Dag en tijd bewust leeg gelaten */}
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

          <div className="px-6 pb-6 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
              {/* Beschrijving KAART & Documenten KAART */}
              <div className="bg-[#FAF9FD] rounded-2xl shadow-md flex flex-col p-5 min-h-[170px] border border-[#ece6fa]">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="text-[#9b87f5] h-5 w-5" />
                  <span className="font-semibold text-[#7E69AB] text-sm uppercase tracking-wide">Beschrijving</span>
                </div>
                <span className="block text-base text-[#1A1F2C] leading-relaxed">{app.description}</span>
              </div>

              {/* Documenten KAART */}
              <div className="bg-[#F6F7FA] rounded-2xl shadow-md flex flex-col p-5 border border-[#d8e8f9] min-h-[170px]">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="text-[#0EA5E9] h-5 w-5" />
                  <span className="font-semibold text-[#0EA5E9] text-sm uppercase tracking-wide">Documenten</span>
                </div>
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

            {/* HERONTWORPEN KNOPPEN BLOK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
              {/* ROWN 1: Online maken */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Maak offerte */}
                <button
                  className="flex-1 rounded-2xl py-4 px-1 bg-gradient-to-r from-[#8B5CF6] to-[#33C3F0] shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition-all duration-200"
                  onClick={onCreateQuote}
                  type="button"
                >
                  <FilePlus className="mb-1 text-[#fff] bg-[#8B5CF6] rounded-full p-1 w-9 h-9 border-2 border-white shadow" />
                  <span className="text-white font-bold text-sm mt-1 tracking-wide">Maak offerte</span>
                </button>
                {/* Maak factuur */}
                <button
                  className="flex-1 rounded-2xl py-4 px-1 bg-gradient-to-r from-[#0EA5E9] to-[#1EAEDB] shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition-all duration-200"
                  onClick={onCreateInvoice}
                  type="button"
                >
                  <FilePlus className="mb-1 text-[#fff] bg-[#0EA5E9] rounded-full p-1 w-9 h-9 border-2 border-white shadow" />
                  <span className="text-white font-bold text-sm mt-1 tracking-wide">Maak factuur</span>
                </button>
                {/* Maak werkopdracht */}
                <button
                  className="flex-1 rounded-2xl py-4 px-1 bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition-all duration-200"
                  onClick={onCreateAgreement}
                  type="button"
                >
                  <FilePlus className="mb-1 text-[#fff] bg-[#7E69AB] rounded-full p-1 w-9 h-9 border-2 border-white shadow" />
                  <span className="text-white font-bold text-sm mt-1 tracking-wide">Maak werkopdracht</span>
                </button>
              </div>

              {/* ROWN 2: Upload handmatig */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
                {/* Upload offerte */}
                <button
                  className="flex-1 rounded-2xl py-4 px-1 bg-gradient-to-r from-[#8B5CF6] to-[#33C3F0] shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition-all duration-200"
                  onClick={onOpenUploadQuote}
                  type="button"
                >
                  <Upload className="mb-1 text-[#fff] bg-[#8B5CF6] rounded-full p-1 w-9 h-9 border-2 border-white shadow" />
                  <span className="text-white font-bold text-sm mt-1 tracking-wide">Upload offerte</span>
                </button>
                {/* Upload factuur */}
                <button
                  className="flex-1 rounded-2xl py-4 px-1 bg-gradient-to-r from-[#0EA5E9] to-[#1EAEDB] shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition-all duration-200"
                  onClick={onOpenUploadInvoice}
                  type="button"
                >
                  <Upload className="mb-1 text-[#fff] bg-[#0EA5E9] rounded-full p-1 w-9 h-9 border-2 border-white shadow" />
                  <span className="text-white font-bold text-sm mt-1 tracking-wide">Upload factuur</span>
                </button>
                {/* Upload werkopdracht */}
                <button
                  className="flex-1 rounded-2xl py-4 px-1 bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] shadow-lg flex flex-col items-center justify-center group hover:scale-105 transition-all duration-200"
                  onClick={onOpenUploadAgreement}
                  type="button"
                >
                  <Upload className="mb-1 text-[#fff] bg-[#7E69AB] rounded-full p-1 w-9 h-9 border-2 border-white shadow" />
                  <span className="text-white font-bold text-sm mt-1 tracking-wide">Upload werkopdracht</span>
                </button>
              </div>
            </div>

            {/* KNOP verwerk afspraak, los eronder */}
            <div className="flex flex-row justify-center mt-2">
              <button
                className="flex items-center gap-2 rounded-2xl py-4 px-7 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] shadow-lg group hover:scale-105 transition-all duration-200"
                onClick={handleOpenProcessModal}
                type="button"
              >
                <CalendarPlus className="text-[#fff] bg-[#9b87f5] rounded-full p-1 w-8 h-8 border-2 border-white shadow mr-1" />
                <span className="text-[#6E59A5] font-extrabold text-base tracking-wide">Verwerk afspraak</span>
              </button>
            </div>

            <Separator className="my-7" />
          </div>

          {/* EINDE: nieuw ontworpen blok */}

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
