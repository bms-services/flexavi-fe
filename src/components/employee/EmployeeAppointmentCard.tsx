
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Info, MoreHorizontal, FilePlus, Upload, CalendarPlus } from "lucide-react";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
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
    <Card className="shadow-md border border-[#00254D] bg-white rounded-2xl overflow-hidden hover:shadow-lg transition">
      <CardHeader className="pb-1 pt-4 px-6 border-b-0 bg-[#00254D] flex flex-row justify-between items-center text-white rounded-t-2xl">
        <div className="flex flex-col items-start gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide">
              Geplande afspraak
            </span>
          </div>
          <div className="text-lg font-bold">
            {app.date} · {app.startTime} - {app.endTime}
          </div>
        </div>
        {/* DRIE BOLLETJES DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-none shadow-none bg-transparent hover:bg-white/20 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition"
              aria-label="Meer acties"
            >
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="z-[2000] min-w-[180px] bg-white rounded-xl border border-[#00254D] shadow-lg p-1"
            style={{ color: "#00254D" }}
          >
            <DropdownMenuItem onClick={onCreateQuote} className="hover:bg-[#e6f0fc] font-medium">
              <FilePlus className="mr-2 w-4 h-4" /> Offerte maken
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenUploadQuote} className="hover:bg-[#e6f0fc] font-medium">
              <Upload className="mr-2 w-4 h-4" /> Offerte uploaden
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCreateInvoice} className="hover:bg-[#e6f0fc] font-medium">
              <FilePlus className="mr-2 w-4 h-4" /> Factuur maken
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenUploadInvoice} className="hover:bg-[#e6f0fc] font-medium">
              <Upload className="mr-2 w-4 h-4" /> Factuur uploaden
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCreateAgreement} className="hover:bg-[#e6f0fc] font-medium">
              <FilePlus className="mr-2 w-4 h-4" /> Werkopdracht maken
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenUploadAgreement} className="hover:bg-[#e6f0fc] font-medium">
              <Upload className="mr-2 w-4 h-4" /> Werkopdracht uploaden
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenRescheduleModal} className="hover:bg-[#e6f0fc] font-medium">
              <CalendarPlus className="mr-2 w-4 h-4" /> Afspraak verzetten
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-6">
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
            showMapButton={true}
          />
        )}

        <Separator className="my-7" />

        {/* KNOPPEN ONDERIN WEGLATEN, want nu is alles in dropdown */}

        <div className="border-t bg-[#FAF9FD] p-4 flex justify-end">
          <div className="flex gap-2 flex-wrap">
            {/* WEGLATEN: Geschiedenis en Verzetten knoppen verdwijnen door design keuze */}
          </div>
        </div>

      </CardContent>

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

