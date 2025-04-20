
import React from "react";
import { Calendar, MapPin, FileText, User, Mail, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
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
  digitalQuote,
  digitalInvoice,
  digitalAgreement,
  onMapOpen,
  onOpenRescheduleModal,
  onViewHistory,
}) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-xl bg-white border border-[#EBE8FA] overflow-hidden animate-fade-in">
      {/* Top Bar + Status */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#D6BCFA] via-[#E5DEFF] to-[#e7f0fd] border-b">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-[#9b87f5]" />
          <div>
            <div className="text-lg sm:text-xl font-bold text-[#1A1F2C]">{lead?.name}</div>
            <div className="flex flex-wrap items-center gap-2 text-[#7E69AB] text-xs sm:text-sm mt-0.5">
              <Mail className="h-4 w-4" />{lead?.email}
              <span className="mx-1">·</span>
              <Phone className="h-4 w-4" />{lead?.phone}
            </div>
          </div>
        </div>
        {isRescheduled && (
          <span className="px-3 py-1 rounded-2xl bg-amber-100 text-amber-600 text-xs font-bold border border-amber-200">
            Verzet
          </span>
        )}
      </div>
      {/* Info blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b bg-white">
        <div className="flex flex-col gap-1 p-4 border-r">
          <div className="flex items-center gap-1 mb-0.5 text-xs font-bold text-[#9b87f5] uppercase">
            <Calendar className="h-4 w-4" />{app.date}
          </div>
          <div className="text-[#1A1F2C] font-medium">{app.startTime} - {app.endTime}</div>
          <div className="flex items-center gap-1 mt-2">
            <MapPin className="h-4 w-4 text-[#9b87f5]" />
            <button
              type="button"
              className="hover:underline truncate text-[#7E69AB]"
              onClick={() => onMapOpen(app.location || "")}
            >
              {app.location}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 p-4 border-r">
          <div className="flex items-center gap-1 mb-0.5 text-xs font-bold text-[#9b87f5] uppercase">
            <FileText className="h-4 w-4" /> Beschrijving
          </div>
          <div className="text-[#1A1F2C] text-sm leading-snug min-h-[40px]">{app.description}</div>
          {isRescheduled && rescheduleReason && (
            <div className="mt-2 py-1 px-2 text-xs bg-amber-50 border-l-4 border-amber-400 rounded text-amber-700 flex items-center gap-1">
              <Info className="h-3 w-3" />
              Verzet: {rescheduleReason}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="text-xs mb-0.5 font-bold text-[#9b87f5] uppercase">Documenten</div>
          <DocBadge label="Offerte" available={!!digitalQuote} />
          <DocBadge label="Factuur" available={!!digitalInvoice} />
          <DocBadge label="Werkovereenkomst" available={!!digitalAgreement} />
        </div>
      </div>
      {/* Action bar */}
      <div className="flex flex-wrap justify-between items-center gap-3 py-3 px-4 bg-gradient-to-br from-[#f6f6f7] via-[#e5deff] to-[#e7f0fd]">
        <div className="flex gap-2">
          <Button
            size="sm"
            className="border-[#9b87f5] text-[#7E69AB] bg-white hover:bg-[#9b87f5]/10 font-medium rounded-2xl"
            variant="outline"
            onClick={onViewHistory}
          >
            Geschiedenis
          </Button>
          <Button
            size="sm"
            className="border-[#faad13] text-[#faad13] bg-white hover:bg-[#faad13]/10 font-medium rounded-2xl"
            variant="outline"
            onClick={onOpenRescheduleModal}
          >
            Verzetten
          </Button>
        </div>
        <div className="flex gap-2">
          {/* Placeholders for demo: all buttons can get their own onClick if logic is available */}
          <Button
            size="sm"
            className={`bg-[#9b87f5] hover:bg-[#7E69AB] text-white shadow rounded-lg`}
            onClick={() => alert("Start verwerking")}
          >
            <Info className="mr-1 h-4 w-4" />
            Verwerken
          </Button>
        </div>
      </div>
    </div>
  );
};

// Kleine badge voor documentenstatus
function DocBadge({ label, available }: { label: string; available: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl mb-1 transition
      ${available ? "bg-[#F2FCE2]" : "bg-[#FDE1D3]"}`}>
      <FileText className={`h-4 w-4 ${available ? "text-[#34a853]" : "text-[#aaa]"}`} />
      <span className={`text-xs font-medium ${available ? "text-[#1A1F2C]" : "text-[#aaa]"}`}>{label}</span>
      <span className={`ml-auto text-[10px] px-2 rounded-full ${available ? "bg-[#E0FBE4] text-[#34a853]" : "bg-[#FDE1D3] text-[#aaa]"}`}>
        {available ? "Beschikbaar" : "Niet beschikbaar"}
      </span>
    </div>
  );
}
