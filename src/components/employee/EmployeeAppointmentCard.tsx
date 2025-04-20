
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FilePlus, Upload, History, Clock } from "lucide-react";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { DigitalQuoteDisplay } from "./DigitalQuoteDisplay";
import { RescheduleDialog } from "./RescheduleDialog";
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
  return (
    <Card key={app.id} className="mb-4 shadow-sm border-2 border-muted bg-white/95 hover:shadow-lg transition-shadow relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-roof-100/80 border-b pb-2">
        <CardTitle className="text-lg leading-tight flex items-center gap-2 font-semibold">
          {app.title}
          {isRescheduled && (
            <span className="ml-2 px-2 py-1 rounded bg-warning text-xs text-warning-foreground flex items-center gap-1 animate-pulse">
              <Clock className="w-3 h-3" />Verzet
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-3">

        {lead && (
          <div className="mb-2 px-4 py-3 rounded-md bg-roof-50 border flex flex-col sm:flex-row gap-2 sm:justify-between items-start sm:items-center shadow-sm">
            <div>
              <div className="text-sm font-semibold text-roof-700">{lead.name}</div>
              <div className="text-xs text-muted-foreground">{lead.address}</div>
            </div>
            <div className="flex flex-col text-xs mt-1 sm:mt-0 gap-0.5">
              <span><b>Tel:</b> <a href={`tel:${lead.phone}`} className="hover:underline hover:text-primary">{lead.phone}</a></span>
              <span><b>Email:</b> <a href={`mailto:${lead.email}`} className="hover:underline hover:text-primary">{lead.email}</a></span>
            </div>
          </div>
        )}

        <div className="space-y-1.5 px-1">
          <div className="text-sm"><strong>Beschrijving:</strong> {app.description}</div>
          <div className="text-sm"><strong>Datum:</strong> {app.date}</div>
          <div className="text-sm"><strong>Tijd:</strong> {app.startTime} - {app.endTime}</div>
          <div className="text-sm"><strong>Locatie:</strong> {app.location}</div>
          {isRescheduled && (
            <div className="text-sm text-warning font-medium mt-2">
              <b>Reden verzet:</b> {rescheduleReason}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {digitalQuote && <DigitalQuoteDisplay quote={digitalQuote} title="Offerte (digitaal)" />}
          {digitalInvoice && <DigitalQuoteDisplay quote={digitalInvoice} title="Factuur (digitaal)" />}
          {digitalAgreement && <DigitalQuoteDisplay quote={digitalAgreement} title="Werkovereenkomst (digitaal)" />}
        </div>

        <div className="flex flex-wrap gap-2 mt-3 border-t pt-3">
          <Button variant="outline" size="sm" onClick={() => onMapOpen(app.location || "")} className="hover-scale">
            <MapPin className="h-4 w-4 mr-2" />
            Open Maps
          </Button>
          
          {/* Offerte knoppen */}
          <Button variant="outline" size="sm" onClick={onCreateQuote} className="hover-scale">
            <FilePlus className="h-4 w-4 mr-2" />
            Maak Offerte
          </Button>
          <Button variant="outline" size="sm" onClick={onOpenUploadQuote} className="hover-scale">
            <Upload className="h-4 w-4 mr-2" />
            Upload Offerte
          </Button>

          {/* Factuur knoppen */}
          <Button variant="outline" size="sm" onClick={onCreateInvoice} className="hover-scale">
            <FilePlus className="h-4 w-4 mr-2" />
            Maak Factuur
          </Button>
          <Button variant="outline" size="sm" onClick={onOpenUploadInvoice} className="hover-scale">
            <Upload className="h-4 w-4 mr-2" />
            Upload Factuur
          </Button>

          {/* Werkovereenkomst knoppen */}
          <Button variant="outline" size="sm" onClick={onCreateAgreement} className="hover-scale">
            <FilePlus className="h-4 w-4 mr-2" />
            Maak Werkovereenkomst
          </Button>
          <Button variant="outline" size="sm" onClick={onOpenUploadAgreement} className="hover-scale">
            <Upload className="h-4 w-4 mr-2" />
            Upload Werkovereenkomst
          </Button>

          <Button variant="outline" size="sm" onClick={onViewHistory} className="hover-scale">
            <History className="h-4 w-4 mr-2" />
            Bekijk Geschiedenis
          </Button>
          <Button variant="outline" size="sm" onClick={onOpenRescheduleModal} className="hover-scale">
            <Clock className="h-4 w-4 mr-2" />
            Verzetten
          </Button>
        </div>
      </CardContent>

      <RescheduleDialog
        open={rescheduleModalOpen}
        reason={rescheduleReason}
        onChange={onRescheduleReasonChange}
        onCancel={onCloseRescheduleModal}
        onSave={onRescheduleSave}
      />

      {/* Offerte Upload Modal */}
      <ReceiptUploadDialog
        open={uploadQuoteDialogOpen}
        onOpenChange={open => open ? onOpenUploadQuote() : onCloseUploadQuote()}
        onResult={onQuoteResult}
      />
      {/* Factuur Upload Modal */}
      <ReceiptUploadDialog
        open={uploadInvoiceDialogOpen}
        onOpenChange={open => open ? onOpenUploadInvoice() : onCloseUploadInvoice()}
        onResult={onInvoiceResult}
      />
      {/* Werkovereenkomst Upload Modal */}
      <ReceiptUploadDialog
        open={uploadAgreementDialogOpen}
        onOpenChange={open => open ? onOpenUploadAgreement() : onCloseUploadAgreement()}
        onResult={onAgreementResult}
      />
    </Card>
  );
};
