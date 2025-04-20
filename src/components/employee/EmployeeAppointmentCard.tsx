
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Info } from "lucide-react";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { DigitalQuoteDisplay } from "./DigitalQuoteDisplay";
import { RescheduleDialog } from "./RescheduleDialog";
import { Appointment } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  onRescheduleSave,
}) => {
  const hasDigitalQuote = !!digitalQuote;
  const hasDigitalInvoice = !!digitalInvoice;
  const hasDigitalAgreement = !!digitalAgreement;

  // State for process modal
  const [processModalOpen, setProcessModalOpen] = React.useState(false);
  const [processReason, setProcessReason] = React.useState("");
  const [processTaskChecked, setProcessTaskChecked] = React.useState(false);
  const [processTaskDescription, setProcessTaskDescription] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  // Dummy notities en historie voor demo (in praktijk uit backend)
  const notities = [
    "Klant wil graag volgende week extra opties besproken krijgen.",
    "Vorige keer niet thuis aangetroffen, telefonisch nieuwe afspraak gepland.",
  ];
  const historyEntries = isRescheduled && rescheduleReason
    ? [{ type: "Afspraak verzet", description: rescheduleReason, date: app.date }]
    : [];

  const handleOpenProcessModal = () => setProcessModalOpen(true);
  const handleCloseProcessModal = () => {
    setProcessModalOpen(false);
    setProcessReason("");
    setProcessTaskChecked(false);
    setProcessTaskDescription("");
    setProcessing(false);
  }
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
                  {hasDigitalQuote && <DigitalQuoteDisplay quote={digitalQuote} title="Offerte" />}
                  {hasDigitalInvoice && <DigitalQuoteDisplay quote={digitalInvoice} title="Factuur" />}
                  {hasDigitalAgreement && <DigitalQuoteDisplay quote={digitalAgreement} title="Werkovereenkomst" />}
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="sm"
                    className="text-xs font-bold bg-[#0EA5E9] hover:bg-[#0A6DBC] text-white"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Verwerken
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md flex flex-col justify-between h-full px-0">
                  <div className="p-6 pt-7">
                    <SheetHeader>
                      <SheetTitle>Verwerken</SheetTitle>
                      <SheetDescription>
                        Creëer, upload of verwerk documenten voor deze afspraak.
                      </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 space-y-6">
                      {/* Offerte sectie */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-[#0EA5E9]" />
                          Offerte
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onCreateQuote}
                            className="text-[#0EA5E9] border-[#0EA5E9]"
                          >
                            Creëer offerte
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onOpenUploadQuote}
                            className="text-[#0EA5E9] border-[#0EA5E9]"
                          >
                            Upload offerte
                          </Button>
                        </div>
                      </div>

                      {/* Factuur sectie */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-[#0EA5E9]" />
                          Factuur
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onCreateInvoice}
                            className="text-[#0EA5E9] border-[#0EA5E9]"
                          >
                            Creëer factuur
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onOpenUploadInvoice}
                            className="text-[#0EA5E9] border-[#0EA5E9]"
                          >
                            Upload factuur
                          </Button>
                        </div>
                      </div>

                      {/* Werkovereenkomst sectie */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-[#0EA5E9]" />
                          Werkovereenkomst
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onCreateAgreement}
                            className="text-[#0EA5E9] border-[#0EA5E9]"
                          >
                            Creëer overeenkomst
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onOpenUploadAgreement}
                            className="text-[#0EA5E9] border-[#0EA5E9]"
                          >
                            Upload overeenkomst
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-6 py-4 border-t flex flex-col items-center">
                    <Button
                      className="w-full bg-[#0EA5E9] hover:bg-[#0A6DBC] text-white font-bold py-2 px-4 rounded-lg shadow transition"
                      onClick={handleOpenProcessModal}
                      size="lg"
                    >
                      <Info className="h-5 w-5 mr-2" />
                      Afspraak verwerken
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Geef aan waarom je geen documenten aanmaakt of maak een taak aan.</p>
                  </div>
                </SheetContent>
              </Sheet>
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
        onOpenChange={open => open ? onOpenUploadQuote() : onCloseUploadQuote()}
        onResult={onQuoteResult}
      />
      <ReceiptUploadDialog
        open={uploadInvoiceDialogOpen}
        onOpenChange={open => open ? onOpenUploadInvoice() : onCloseUploadInvoice()}
        onResult={onInvoiceResult}
      />
      <ReceiptUploadDialog
        open={uploadAgreementDialogOpen}
        onOpenChange={open => open ? onOpenUploadAgreement() : onCloseUploadAgreement()}
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
