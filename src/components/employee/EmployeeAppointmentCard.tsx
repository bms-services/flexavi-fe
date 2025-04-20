
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FilePlus, Upload, History, Clock } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
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
  digitalQuote: ReceiptData | undefined;
  onMapOpen: (address: string) => void;
  onCreateQuote: () => void;
  onOpenUploadQuote: () => void;
  onViewHistory: () => void;
  onOpenRescheduleModal: () => void;
  onCloseRescheduleModal: () => void;
  onRescheduleReasonChange: (val: string) => void;
  onRescheduleSave: () => void;
  onUploadDialogChange: (open: boolean) => void;
  uploadDialogOpen: boolean;
  onQuoteResult: (data: ReceiptData) => void;
}

export const EmployeeAppointmentCard: React.FC<EmployeeAppointmentCardProps> = ({
  app,
  lead,
  isRescheduled,
  rescheduleReason,
  rescheduleModalOpen,
  digitalQuote,
  onMapOpen,
  onCreateQuote,
  onOpenUploadQuote,
  onViewHistory,
  onOpenRescheduleModal,
  onCloseRescheduleModal,
  onRescheduleReasonChange,
  onRescheduleSave,
  onUploadDialogChange,
  uploadDialogOpen,
  onQuoteResult,
}) => {
  return (
    <Card key={app.id} className="mb-2 relative">
      <CardHeader>
        <CardTitle className="text-base leading-tight flex items-center gap-2">
          {app.title}
          {isRescheduled && (
            <span className="ml-2 px-2 py-1 rounded bg-warning text-xs text-warning-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />Verzet
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lead && (
          <div className="mb-2 p-2 rounded bg-gray-50 border flex flex-col sm:flex-row gap-2 sm:justify-between">
            <div>
              <div className="text-sm font-medium">{lead.name}</div>
              <div className="text-xs text-muted-foreground">{lead.address}</div>
            </div>
            <div className="flex flex-col text-xs mt-1 sm:mt-0 gap-1">
              <span><b>Tel:</b> {lead.phone}</span>
              <span><b>Email:</b> {lead.email}</span>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <div className="text-sm"><strong>Beschrijving:</strong> {app.description}</div>
          <div className="text-sm"><strong>Datum:</strong> {app.date}</div>
          <div className="text-sm"><strong>Tijd:</strong> {app.startTime} - {app.endTime}</div>
          <div className="text-sm"><strong>Locatie:</strong> {app.location}</div>
          {isRescheduled && (
            <div className="text-sm text-warning mt-2">
              <b>Reden verzet:</b> {rescheduleReason}
            </div>
          )}
        </div>

        {digitalQuote && <DigitalQuoteDisplay quote={digitalQuote} />}

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => onMapOpen(app.location || "")}>
            <MapPin className="h-4 w-4 mr-2" />
            Open Maps
          </Button>
          <Button variant="outline" size="sm" onClick={onCreateQuote}>
            <FilePlus className="h-4 w-4 mr-2" />
            Maak Offerte
          </Button>
          <Button variant="outline" size="sm" onClick={onOpenUploadQuote}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Offerte
          </Button>
          <Button variant="outline" size="sm" onClick={onViewHistory}>
            <History className="h-4 w-4 mr-2" />
            Bekijk Geschiedenis
          </Button>
          <Button variant="outline" size="sm" onClick={onOpenRescheduleModal}>
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

      <ReceiptUploadDialog
        open={uploadDialogOpen}
        onOpenChange={onUploadDialogChange}
        onResult={onQuoteResult}
      />
    </Card>
  );
};
