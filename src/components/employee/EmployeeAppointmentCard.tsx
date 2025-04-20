
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FilePlus, Upload, History, Clock, Calendar, User, Phone, Mail, FileText, Info } from "lucide-react";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { DigitalQuoteDisplay } from "./DigitalQuoteDisplay";
import { RescheduleDialog } from "./RescheduleDialog";
import { Appointment } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
  
  return (
    <Card className="shadow-sm border-l-4 border-l-roof-500 bg-white">
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center gap-2 border-b">
        <Calendar className="h-5 w-5 text-roof-500 flex-shrink-0" />
        <CardTitle className="text-base font-semibold text-roof-800">
          {app.title}
        </CardTitle>
        {isRescheduled && (
          <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full font-medium ml-auto">
            Verzet
          </span>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-4 grid gap-4 sm:grid-cols-2">
          {/* Customer Info Section */}
          {lead && (
            <div className="bg-gray-50 p-3 rounded-md sm:col-span-2">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-roof-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-roof-700">{lead.name}</h3>
                    <p className="text-xs text-gray-500">{lead.address}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-2 sm:mt-0">
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-xs text-gray-700 hover:text-roof-600">
                    <Phone className="h-3 w-3" />
                    <span>{lead.phone}</span>
                  </a>
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-xs text-gray-700 hover:text-roof-600">
                    <Mail className="h-3 w-3" />
                    <span>{lead.email}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Appointment Details */}
          <div className="space-y-2">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-xs font-medium text-gray-500">Tijdsbestek</span>
                <span className="text-xs font-medium text-roof-600">
                  {app.date} · {app.startTime} - {app.endTime}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs font-medium text-gray-500">Locatie</span>
                <button 
                  onClick={() => onMapOpen(app.location || "")}
                  className="text-xs font-medium text-roof-600 hover:text-roof-700 flex items-center gap-1"
                >
                  <span>{app.location}</span>
                  <MapPin className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Beschrijving</p>
              <p className="text-sm text-gray-700">{app.description}</p>
            </div>
            
            {isRescheduled && (
              <div className="mt-2 p-2 bg-amber-50 rounded-md border border-amber-100">
                <p className="text-xs font-medium text-amber-700">Reden verzet: {rescheduleReason}</p>
              </div>
            )}
          </div>

          {/* Digital Documents Section */}
          <div className="space-y-2">
            {(hasDigitalQuote || hasDigitalInvoice || hasDigitalAgreement) ? (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500">Digitale documenten</h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {hasDigitalQuote && <DigitalQuoteDisplay quote={digitalQuote} title="Offerte" />}
                  {hasDigitalInvoice && <DigitalQuoteDisplay quote={digitalInvoice} title="Factuur" />}
                  {hasDigitalAgreement && <DigitalQuoteDisplay quote={digitalAgreement} title="Werkovereenkomst" />}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-4">
                  <FileText className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Geen digitale documenten beschikbaar</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Now in a slide-in drawer */}
        <div className="border-t p-3 flex justify-end">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onViewHistory}
              className="text-xs"
            >
              <History className="h-3.5 w-3.5 mr-1" />
              Geschiedenis
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onOpenRescheduleModal}
              className="text-xs"
            >
              <Clock className="h-3.5 w-3.5 mr-1" />
              Verzetten
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  size="sm"
                  className="text-xs bg-roof-500 hover:bg-roof-600"
                >
                  <FilePlus className="h-3.5 w-3.5 mr-1" />
                  Documenten
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Document acties</SheetTitle>
                  <SheetDescription>
                    Creëer of upload documenten voor deze afspraak
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Offerte Group */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-roof-500" />
                      Offerte
                    </h3>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={onCreateQuote}
                        className="justify-start"
                      >
                        <FilePlus className="h-4 w-4 mr-2 text-roof-500" />
                        Maak Offerte
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={onOpenUploadQuote}
                        className="justify-start"
                      >
                        <Upload className="h-4 w-4 mr-2 text-roof-500" />
                        Upload Offerte
                      </Button>
                    </div>
                    {hasDigitalQuote && (
                      <div className="pl-2 border-l-2 border-roof-200 mt-2">
                        <p className="text-xs text-muted-foreground">Huidige offerte:</p>
                        <DigitalQuoteDisplay quote={digitalQuote} title="Offerte" />
                      </div>
                    )}
                  </div>
                  
                  {/* Factuur Group */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-roof-500" />
                      Factuur
                    </h3>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={onCreateInvoice}
                        className="justify-start"
                      >
                        <FilePlus className="h-4 w-4 mr-2 text-roof-500" />
                        Maak Factuur
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={onOpenUploadInvoice}
                        className="justify-start"
                      >
                        <Upload className="h-4 w-4 mr-2 text-roof-500" />
                        Upload Factuur
                      </Button>
                    </div>
                    {hasDigitalInvoice && (
                      <div className="pl-2 border-l-2 border-roof-200 mt-2">
                        <p className="text-xs text-muted-foreground">Huidige factuur:</p>
                        <DigitalQuoteDisplay quote={digitalInvoice} title="Factuur" />
                      </div>
                    )}
                  </div>
                  
                  {/* Werkovereenkomst Group */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-roof-500" />
                      Werkovereenkomst
                    </h3>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={onCreateAgreement}
                        className="justify-start"
                      >
                        <FilePlus className="h-4 w-4 mr-2 text-roof-500" />
                        Maak Overeenkomst
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={onOpenUploadAgreement}
                        className="justify-start"
                      >
                        <Upload className="h-4 w-4 mr-2 text-roof-500" />
                        Upload Overeenkomst
                      </Button>
                    </div>
                    {hasDigitalAgreement && (
                      <div className="pl-2 border-l-2 border-roof-200 mt-2">
                        <p className="text-xs text-muted-foreground">Huidige overeenkomst:</p>
                        <DigitalQuoteDisplay quote={digitalAgreement} title="Werkovereenkomst" />
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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

      {/* Upload Dialogs */}
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
    </Card>
  );
};
