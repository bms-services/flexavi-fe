
import React from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { User, MapPin, FileText, Info, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WorkAgreementDetailsProps {
  customer: {
    name: string;
    address: string;
  };
  workAgreement: {
    createdAt: string;
    startDate: string;
    workDescription: string;
    warranty: string;
    totalAmount: number;
  };
  formatCurrency: (amount: number) => string;
  companyDetails?: {
    name: string;
    address: string;
    email: string;
    phone: string;
    taxId: string;
  };
}

export const WorkAgreementDetails = ({ 
  customer, 
  workAgreement, 
  formatCurrency,
  companyDetails = {
    name: "Mijn Dakbedrijf B.V.",
    address: "Dakstraat 10, 1234 AB Amsterdam",
    email: "info@dakbedrijf.nl",
    phone: "020-1234567",
    taxId: "NL123456789B01"
  }
}: WorkAgreementDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
            <User className="h-4 w-4" />
            Opdrachtnemer (Bedrijf)
          </h3>
          <div className="space-y-2">
            <p className="font-medium">{companyDetails.name}</p>
            <p>{companyDetails.address}</p>
            <p>Email: {companyDetails.email}</p>
            <p>Tel: {companyDetails.phone}</p>
            <p>BTW: {companyDetails.taxId}</p>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
            <User className="h-4 w-4" />
            Opdrachtgever
          </h3>
          <div className="space-y-2">
            <p className="font-medium">{customer.name}</p>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-1" />
              <span>{customer.address}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Overeenkomst Details
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Totaalbedrag excl. BTW</p>
              <p className="font-medium">{formatCurrency(workAgreement.totalAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">BTW (21%)</p>
              <p className="font-medium">{formatCurrency(workAgreement.totalAmount * 0.21)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Totaalbedrag incl. BTW</p>
              <p className="font-medium">{formatCurrency(workAgreement.totalAmount * 1.21)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Garantie</p>
              <p className="font-medium">{workAgreement.warranty} jaar</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Startdatum Werkzaamheden</h4>
            <p>{format(new Date(workAgreement.startDate), "d MMMM yyyy", { locale: nl })}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
          <Info className="h-4 w-4" />
          Beschrijving Werkzaamheden
        </h3>
        <p className="whitespace-pre-line">{workAgreement.workDescription}</p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Voorzieningen door Opdrachtgever</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ter beschikking stellen stroomvoorziening 230 volt 16 amp.</li>
          <li>Sanitaire voorzieningen</li>
          <li>Bereikbaarheid werkplek met materieel</li>
          <li>Oponthoud door werkzaamheden van derden worden doorberekend a €85 p/u per man</li>
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Algemene Voorwaarden</h3>
        <div className="space-y-4 text-sm">
          <p>
            Op deze overeenkomst van opdracht zijn de algemene voorwaarden van Dakspecialist.nu van toepassing, 
            welke u terug kunt vinden op onze website www.dakspecialist.nu (deze zijn ook ter hand gereikt) 
            daarvan ook onlosmakelijk deel uitmaken.
          </p>
          <p>
            Indien werkzaamheden zien op het herstellen van lekkages, dan geldt voor wat betreft het herstel 
            daarvan expliciet dat er sprake is van een inspanningsplicht en niet van een resultaatverplichting.
          </p>
          <p>
            Onvoorziene werkzaamheden, benodigd ter uitvoering van de originele werkzaamheden, zullen uitsluitend, 
            tegen een overeengekomen meerprijs, door ons uitgevoerd worden.
          </p>
          <p>
            Door ondertekening ziet u af van de wettelijke bedenktijd van 14 dagen.
          </p>
        </div>
      </Card>

      <div className="text-sm text-gray-500 italic">
        <p>
          Aldus overeengekomen op {format(new Date(workAgreement.createdAt), "d MMMM yyyy", { locale: nl })} 
          te Amsterdam
        </p>
      </div>
    </div>
  );
};
