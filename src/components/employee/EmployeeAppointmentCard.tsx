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

            {/* Nieuw knoppenblok */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
              {/* OFFERTES */}
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-[#00254D] text-sm mb-1 pl-1">Offerte</span>
                <div className="flex flex-row gap-2 w-full">
                  <button
                    className="flex-1 rounded-lg py-2 px-2 text-sm font-semibold bg-[#00254D] text-white shadow-md hover:bg-[#1a3866] transition-colors"
                    onClick={onCreateQuote}
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FilePlus className="w-4 h-4" />
                      Maak
                    </span>
                  </button>
                  <button
                    className="flex-1 rounded-lg py-2 px-2 text-sm font-semibold border border-[#00254D] text-[#00254D] bg-white shadow-md hover:bg-roof-100 transition-colors"
                    onClick={onOpenUploadQuote}
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </span>
                  </button>
                </div>
              </div>

              {/* FACTUUR */}
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-[#00254D] text-sm mb-1 pl-1">Factuur</span>
                <div className="flex flex-row gap-2 w-full">
                  <button
                    className="flex-1 rounded-lg py-2 px-2 text-sm font-semibold bg-[#00254D] text-white shadow-md hover:bg-[#1a3866] transition-colors"
                    onClick={onCreateInvoice}
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FilePlus className="w-4 h-4" />
                      Maak
                    </span>
                  </button>
                  <button
                    className="flex-1 rounded-lg py-2 px-2 text-sm font-semibold border border-[#00254D] text-[#00254D] bg-white shadow-md hover:bg-roof-100 transition-colors"
                    onClick={onOpenUploadInvoice}
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </span>
                  </button>
                </div>
              </div>

              {/* WERKOPDRACHT */}
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-[#00254D] text-sm mb-1 pl-1">Werkopdracht</span>
                <div className="flex flex-row gap-2 w-full">
                  <button
                    className="flex-1 rounded-lg py-2 px-2 text-sm font-semibold bg-[#00254D] text-white shadow-md hover:bg-[#1a3866] transition-colors"
                    onClick={onCreateAgreement}
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FilePlus className="w-4 h-4" />
                      Maak
                    </span>
                  </button>
                  <button
                    className="flex-1 rounded-lg py-2 px-2 text-sm font-semibold border border-[#00254D] text-[#00254D] bg-white shadow-md hover:bg-roof-100 transition-colors"
                    onClick={onOpenUploadAgreement}
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* EINDE Nieuw knoppenblok */}

            <div className="flex flex-row justify-center mt-2">
              <button
                className="flex items-center gap-2 rounded-xl py-3 px-5 bg-gradient-to-r from-[#37547a] to-[#62739b] shadow-lg hover:scale-[1.04] hover:bg-[#253c59] transition-all duration-200"
                onClick={handleOpenProcessModal}
                type="button"
              >
                <CalendarPlus className="text-white bg-[#37547a] rounded-full p-0.5 w-7 h-7 border-2 border-white shadow mr-1" />
                <span className="text-white font-extrabold text-base tracking-wide">Verwerk afspraak</span>
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
