
import React from "react";
import { DigitalQuoteDisplay } from "./DigitalQuoteDisplay";
import { FileText } from "lucide-react";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";

interface EmployeeAppointmentDocumentsProps {
  digitalQuote?: ReceiptData;
  digitalInvoice?: ReceiptData;
  digitalAgreement?: ReceiptData;
}

export const EmployeeAppointmentDocuments: React.FC<EmployeeAppointmentDocumentsProps> = ({
  digitalQuote,
  digitalInvoice,
  digitalAgreement,
}) => {
  const hasDigitalQuote = !!digitalQuote;
  const hasDigitalInvoice = !!digitalInvoice;
  const hasDigitalAgreement = !!digitalAgreement;

  return (
    <div className="items-center">
      <h4 className="uppercase text-xs text-[#189BE7] font-bold mb-1 tracking-wider text-center">
        Documenten
      </h4>
      {(hasDigitalQuote || hasDigitalInvoice || hasDigitalAgreement) ? (
        <div className="w-full grid gap-2 grid-cols-1">
          {hasDigitalQuote && <DigitalQuoteDisplay quote={digitalQuote!} title="Offerte" />}
          {hasDigitalInvoice && <DigitalQuoteDisplay quote={digitalInvoice!} title="Factuur" />}
          {hasDigitalAgreement && <DigitalQuoteDisplay quote={digitalAgreement!} title="Werkovereenkomst" />}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-7 text-[#189BE7] h-full">
          <FileText className="h-10 w-10 mb-2" />
          <span className="text-sm">Geen digitale documenten beschikbaar</span>
        </div>
      )}
    </div>
  );
};
