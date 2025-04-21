
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
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

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
  
  const afspraakOmschrijving = app.description || "Hier komt duidelijk te staan wat we er precies moeten doen";
  
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
  
  // Format date for display
  const dateObj = app.date ? new Date(app.date) : new Date();
  const dayNumber = format(dateObj, 'dd');
  const dayName = format(dateObj, 'EEE');
  
  return (
    <Card className="shadow-md border border-gray-200 bg-white rounded-xl overflow-hidden hover:shadow-lg transition max-w-full mb-4">
      <div className="flex items-stretch">
        {/* Left side with date */}
        <div className="bg-gray-50 text-center p-4 flex flex-col justify-center items-center min-w-[70px] border-r border-gray-200">
          <span className="text-gray-500 text-sm">{dayName}</span>
          <span className="text-3xl font-bold text-gray-900">{dayNumber}</span>
        </div>
        
        <div className="flex-1 flex flex-col">
          <CardHeader className="pb-2 pt-3 px-4 flex flex-row justify-between items-center text-gray-900">
            <div className="flex flex-col min-w-0">
              <div className="text-sm font-medium text-gray-600">
                {app.startTime} - {app.endTime}
              </div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 truncate max-w-full">
                {app.title}
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end" className="z-[2000] min-w-[180px] bg-white">
                <DropdownMenuItem onClick={onCreateQuote}>
                  <FilePlus className="mr-2 w-4 h-4" /> Offerte maken
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenUploadQuote}>
                  <Upload className="mr-2 w-4 h-4" /> Offerte uploaden
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onCreateInvoice}>
                  <FilePlus className="mr-2 w-4 h-4" /> Factuur maken
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenUploadInvoice}>
                  <Upload className="mr-2 w-4 h-4" /> Factuur uploaden
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onCreateAgreement}>
                  <FilePlus className="mr-2 w-4 h-4" /> Werkopdracht maken
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenUploadAgreement}>
                  <Upload className="mr-2 w-4 h-4" /> Werkopdracht uploaden
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenRescheduleModal}>
                  <CalendarPlus className="mr-2 w-4 h-4" /> Afspraak verzetten
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleOpenProcessModal}>
                  <Info className="mr-2 w-4 h-4" /> Verwerk afspraak
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          
          <CardContent className="p-0 flex-1">
            {lead && <LeadInfoCard lead={lead} isRescheduled={isRescheduled} rescheduleReason={rescheduleReason} historyEntries={historyEntries} notes={notities} showMapButton={true} description={afspraakOmschrijving} />}
          </CardContent>
        </div>
      </div>
      
      <ReceiptUploadDialog open={uploadQuoteDialogOpen} onOpenChange={open => open ? onOpenUploadQuote() : onCloseUploadQuote()} onResult={onQuoteResult} />
      <ReceiptUploadDialog open={uploadInvoiceDialogOpen} onOpenChange={open => open ? onOpenUploadInvoice() : onCloseUploadInvoice()} onResult={onInvoiceResult} />
      <ReceiptUploadDialog open={uploadAgreementDialogOpen} onOpenChange={open => open ? onOpenUploadAgreement() : onCloseUploadAgreement()} onResult={onAgreementResult} />
      <AppointmentProcessModal open={processModalOpen} reason={processReason} onReasonChange={setProcessReason} taskChecked={processTaskChecked} onTaskCheckedChange={setProcessTaskChecked} taskDescription={processTaskDescription} onTaskDescriptionChange={setProcessTaskDescription} onCancel={handleCloseProcessModal} onSubmit={handleProcessSubmit} loading={processing} />
    </Card>
  );
};
