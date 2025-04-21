
import React from "react";
import { FileText, Upload, CalendarPlus, Info } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AppointmentActionsProps {
  leadId: string;
  appointmentId: string;
  onCreateQuote: (leadId: string) => void;
  onUploadQuote: (appointmentId: string) => void;
  onCreateInvoice: (leadId: string) => void;
  onUploadInvoice: (appointmentId: string) => void;
  onCreateAgreement: (leadId: string) => void;
  onUploadAgreement: (appointmentId: string) => void;
  onReschedule: (appointmentId: string) => void;
  onProcess: (appointmentId: string) => void;
}

export const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  leadId,
  appointmentId,
  onCreateQuote,
  onUploadQuote,
  onCreateInvoice,
  onUploadInvoice,
  onCreateAgreement,
  onUploadAgreement,
  onReschedule,
  onProcess,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          onCreateQuote(leadId);
        }}>
          <FileText className="mr-2 h-4 w-4" /> Offerte maken
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          onUploadQuote(appointmentId);
        }}>
          <Upload className="mr-2 h-4 w-4" /> Offerte uploaden
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          onCreateInvoice(leadId);
        }}>
          <FileText className="mr-2 h-4 w-4" /> Factuur maken
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          onUploadInvoice(appointmentId);
        }}>
          <Upload className="mr-2 h-4 w-4" /> Factuur uploaden
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          onCreateAgreement(leadId);
        }}>
          <FileText className="mr-2 h-4 w-4" /> Werkopdracht maken
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          onUploadAgreement(appointmentId);
        }}>
          <Upload className="mr-2 h-4 w-4" /> Werkopdracht uploaden
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          onReschedule(appointmentId);
        }}>
          <CalendarPlus className="mr-2 h-4 w-4" /> Afspraak verzetten
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          onProcess(appointmentId);
        }}>
          <Info className="mr-2 h-4 w-4" /> Verwerk afspraak
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
