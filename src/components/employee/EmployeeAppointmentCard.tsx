
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Info, MoreHorizontal, FilePlus, Upload, CalendarPlus, FileMinus } from "lucide-react";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { DigitalQuoteDisplay } from "./DigitalQuoteDisplay";
import { RescheduleDialog } from "./RescheduleDialog";
import { Appointment } from "@/types";
import { Separator } from "@/components/ui/separator";
import { AppointmentProcessModal } from "./AppointmentProcessModal";
import { LeadInfoCard } from "./LeadInfoCard";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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
      <CardHeader className="pb-1 pt-4 px-6 border-b-0 bg-white flex flex-row justify-between items-start">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            {/* Dag en tijd bewust leeg gelaten */}
          </div>
        </div>
        {/* DRIE BOLLETJES DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-none shadow-none bg-transparent hover:bg-gray-100 text-[#00254D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] transition"
              aria-label="Meer acties"
            >
              <MoreHorizontal className="w-7 h-7" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="z-[2000] min-w-[180px] bg-white rounded-xl border border-[#00254D] shadow-lg p-1"
            style={{ color: "#00254D" }}
          >
            <DropdownMenuItem onClick={onCreateQuote} className="hover:bg-[#e9f2fa] font-medium">
              <FilePlus className="mr-2 w-4 h-4" /> Offerte maken
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenUploadQuote} className="hover:bg-[#e9f2fa] font-medium">
              <Upload className="mr-2 w-4 h-4" /> Offerte uploaden
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCreateInvoice} className="hover:bg-[#e9f2fa] font-medium">
              <FilePlus className="mr-2 w-4 h-4" /> Factuur maken
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenUploadInvoice} className="hover:bg-[#e9f2fa] font-medium">
              <Upload className="mr-2 w-4 h-4" /> Factuur uploaden
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCreateAgreement} className="hover:bg-[#e9f2fa] font-medium">
              <FilePlus className="mr-2 w-4 h-4" /> Werkopdracht maken
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenUploadAgreement} className="hover:bg-[#e9f2fa] font-medium">
              <Upload className="mr-2 w-4 h-4" /> Werkopdracht uploaden
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenProcessModal} className="hover:bg-[#e9f2fa] font-medium">
              <CalendarPlus className="mr-2 w-4 h-4" /> Verwerk afspraak
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            {/* NIET MEER NODIG: alle oude knoppen zijn verwijderd! */}
            {/* Hier stond het grid met alle (maak/upload) knoppen */}
            {/* EINDE Nieuw knoppenblok */}

            <Separator className="my-7" />
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

