
import React, { useState } from "react";
import { ModernEmployeeAppointmentCard } from "./ModernEmployeeAppointmentCard";
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

export const EmployeeAppointmentCard: React.FC<EmployeeAppointmentCardProps> = (props) => {
  // Sla local state over, forward alle props, provide mocks.
  // Je kunt eigen notities/geschiedenis mechanismen integreren als je echte hooks/data hebt.
  const notes = [
    "Klant wil graag volgende week extra opties besproken krijgen.",
  ];
  const historyEntries = props.isRescheduled && props.rescheduleReason
    ? [{ type: "Afspraak verzet", description: props.rescheduleReason, date: props.app.date }]
    : [];

  return (
    <ModernEmployeeAppointmentCard
      app={props.app}
      lead={props.lead}
      notes={notes}
      historyEntries={historyEntries}
      onMapOpen={props.onMapOpen}
      digitalQuote={props.digitalQuote}
      digitalInvoice={props.digitalInvoice}
      digitalAgreement={props.digitalAgreement}
      onProcess={props.onOpenRescheduleModal}
    />
  );
};
