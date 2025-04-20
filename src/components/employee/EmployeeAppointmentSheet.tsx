
import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FileText, Info } from "lucide-react";
import { ReceiptUploadDialog } from "@/components/layout/quick-actions/ReceiptUploadDialog";
import { ReceiptData } from "@/components/layout/quick-actions/types/quickActions";
import { DigitalQuoteDisplay } from "./DigitalQuoteDisplay";

interface EmployeeAppointmentSheetProps {
  hasDigitalQuote: boolean;
  hasDigitalInvoice: boolean;
  hasDigitalAgreement: boolean;
  digitalQuote?: ReceiptData;
  digitalInvoice?: ReceiptData;
  digitalAgreement?: ReceiptData;
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
  onOpenProcessModal: () => void;
}

export const EmployeeAppointmentSheet: React.FC<EmployeeAppointmentSheetProps> = ({
  hasDigitalQuote,
  hasDigitalInvoice,
  hasDigitalAgreement,
  digitalQuote,
  digitalInvoice,
  digitalAgreement,
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
  onOpenProcessModal,
}) => (
  <Sheet>
    <SheetContent side="right" className="w-full sm:max-w-md flex flex-col justify-between h-full px-0">
      <div className="p-6 pt-7">
        <SheetHeader>
          <SheetTitle>Verwerken</SheetTitle>
          <SheetDescription>
            Creëer, upload of verwerk documenten voor deze afspraak.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Offerte sectie */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-[#0EA5E9]" />
              Offerte
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCreateQuote}
                className="text-[#0EA5E9] border-[#0EA5E9]"
              >
                Creëer offerte
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenUploadQuote}
                className="text-[#0EA5E9] border-[#0EA5E9]"
              >
                Upload offerte
              </Button>
            </div>
          </div>

          {/* Factuur sectie */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-[#0EA5E9]" />
              Factuur
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCreateInvoice}
                className="text-[#0EA5E9] border-[#0EA5E9]"
              >
                Creëer factuur
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenUploadInvoice}
                className="text-[#0EA5E9] border-[#0EA5E9]"
              >
                Upload factuur
              </Button>
            </div>
          </div>

          {/* Werkovereenkomst sectie */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-[#0EA5E9]" />
              Werkovereenkomst
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCreateAgreement}
                className="text-[#0EA5E9] border-[#0EA5E9]"
              >
                Creëer overeenkomst
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenUploadAgreement}
                className="text-[#0EA5E9] border-[#0EA5E9]"
              >
                Upload overeenkomst
              </Button>
            </div>
          </div>

          {/* Preview digital docs in grid */}
          <div className="mt-6">
            {(hasDigitalQuote || hasDigitalInvoice || hasDigitalAgreement) ? (
                <div className="grid gap-2 sm:grid-cols-3">
                  {hasDigitalQuote && <DigitalQuoteDisplay quote={digitalQuote} title="Offerte" />}
                  {hasDigitalInvoice && <DigitalQuoteDisplay quote={digitalInvoice} title="Factuur" />}
                  {hasDigitalAgreement && <DigitalQuoteDisplay quote={digitalAgreement} title="Werkovereenkomst" />}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-7 text-[#0A8AD0]">
                  <FileText className="h-10 w-10 text-[#0A8AD0] mb-2" />
                  <span className="text-xs">Geen digitale documenten beschikbaar</span>
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-6 py-4 border-t flex flex-col items-center">
        <Button
          className="w-full bg-[#0EA5E9] hover:bg-[#0A6DBC] text-white font-bold py-2 px-4 rounded-lg shadow transition"
          onClick={onOpenProcessModal}
          size="lg"
        >
          <Info className="h-5 w-5 mr-2" />
          Afspraak verwerken
        </Button>
        <p className="text-xs text-gray-500 mt-2">Geef aan waarom je geen documenten aanmaakt of maak een taak aan.</p>
      </div>
      {/* Upload dialogs must remain as Sheet content siblings */}
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
    </SheetContent>
  </Sheet>
);
