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

          <div className="px-6 pb-6 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
              {/* Beschrijving KAART */}
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

            {/* MODERN KNOPPEN BLOK */}
            <div className="flex flex-col gap-6 md:flex-row md:gap-4 justify-center items-stretch mx-auto max-w-4xl">
              {/* Offerte */}
              <div className="flex-1">
                <button
                  className="w-full relative group rounded-2xl p-0 overflow-hidden shadow-xl"
                  style={{
                    background: "linear-gradient(90deg, #8B5CF6 0%, #33C3F0 100%)",
                  }}
                  onClick={onCreateQuote}
                  type="button"
                >
                  <div className="flex flex-col items-center justify-center py-6 px-2 md:px-4">
                    <span className="flex items-center justify-center bg-white bg-opacity-70 rounded-full w-12 h-12 mb-3 shadow group-hover:scale-110 transition-transform duration-300">
                      <svg width="30" height="30" stroke="#8B5CF6" viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h3"/><path d="M12 17v4m2-2h-4"/></svg>
                    </span>
                    <span className="text-white tracking-wide font-bold text-lg md:text-xl drop-shadow">Maak offerte</span>
                    <span className="text-xs mt-1 text-white/80 group-hover:text-white font-medium transition">+ upload</span>
                  </div>
                  <span className="absolute inset-0 rounded-2xl border-2 border-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
              </div>

              {/* Factuur */}
              <div className="flex-1">
                <button
                  className="w-full relative group rounded-2xl p-0 overflow-hidden shadow-xl"
                  style={{
                    background: "linear-gradient(90deg, #0EA5E9 0%, #1EAEDB 100%)",
                  }}
                  onClick={onCreateInvoice}
                  type="button"
                >
                  <div className="flex flex-col items-center justify-center py-6 px-2 md:px-4">
                    <span className="flex items-center justify-center bg-white bg-opacity-70 rounded-full w-12 h-12 mb-3 shadow group-hover:scale-110 transition-transform duration-300">
                      <svg width="30" height="30" stroke="#0EA5E9" viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h3"/><path d="M12 19v2m0-6v2" /></svg>
                    </span>
                    <span className="text-white tracking-wide font-bold text-lg md:text-xl drop-shadow">Maak factuur</span>
                    <span className="text-xs mt-1 text-white/80 group-hover:text-white font-medium transition">+ upload</span>
                  </div>
                  <span className="absolute inset-0 rounded-2xl border-2 border-[#0EA5E9] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
              </div>

              {/* Werkopdracht */}
              <div className="flex-1">
                <button
                  className="w-full relative group rounded-2xl p-0 overflow-hidden shadow-xl"
                  style={{
                    background: "linear-gradient(90deg, #7E69AB 0%, #9b87f5 100%)",
                  }}
                  onClick={onCreateAgreement}
                  type="button"
                >
                  <div className="flex flex-col items-center justify-center py-6 px-2 md:px-4">
                    <span className="flex items-center justify-center bg-white bg-opacity-70 rounded-full w-12 h-12 mb-3 shadow group-hover:scale-110 transition-transform duration-300">
                      <svg width="30" height="30" stroke="#7E69AB" viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h3"/><path d="M8 20h8" /></svg>
                    </span>
                    <span className="text-white tracking-wide font-bold text-lg md:text-xl drop-shadow">Werkopdracht</span>
                    <span className="text-xs mt-1 text-white/80 group-hover:text-white font-medium transition">+ upload</span>
                  </div>
                  <span className="absolute inset-0 rounded-2xl border-2 border-[#7E69AB] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
              </div>

              {/* Verwerk Afspraak */}
              <div className="flex-1 relative">
                <button
                  className="w-full relative group rounded-2xl p-0 overflow-hidden shadow-xl"
                  style={{
                    background: "linear-gradient(90deg, #9b87f5 0%, #D6BCFA 100%)",
                  }}
                  onClick={handleOpenProcessModal}
                  type="button"
                >
                  <div className="flex flex-col items-center justify-center py-6 px-2 md:px-4">
                    <span className="flex items-center justify-center bg-white bg-opacity-70 rounded-full w-12 h-12 mb-3 shadow group-hover:scale-110 transition-transform duration-300">
                      <svg width="30" height="30" stroke="#9b87f5" viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 14h8m-4-4v8" /></svg>
                    </span>
                    <span className="text-[#6E59A5] tracking-wide font-extrabold text-lg md:text-xl drop-shadow">Verwerk afspraak</span>
                  </div>
                  <span className="absolute inset-0 rounded-2xl border-2 border-[#9b87f5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
                <span className="block text-xs text-[#7E69AB] text-center font-medium mt-2 opacity-70">Afronden of notitie toevoegen</span>
              </div>
            </div>
            {/* /MODERN KNOPPEN BLOK */}

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
