
import React from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { FileText, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CompanyDetails } from "./components/CompanyDetails";
import { CustomerInfoCard } from "./components/CustomerInfoCard";
import { PaymentDetails } from "./components/PaymentDetails";
import { GeneralTerms } from "./components/GeneralTerms";

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
    cashPaymentAmount?: number;
    provisions?: string[];
    exclusions?: string[];
    paymentMethod?: string;
    paymentInstallments?: {
      description: string;
      percentage: number;
    }[];
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
  const defaultProvisions = [
    "Ter beschikking stellen stroomvoorziening 230 volt 16 amp.",
    "Sanitaire voorzieningen",
    "Bereikbaarheid werkplek met materieel",
    "Oponthoud door werkzaamheden van derden worden doorberekend a €85 p/u per man"
  ];

  const defaultExclusions = [
    "Werkzaamheden die niet genoemd zijn vallen buiten deze werkovereenkomst",
    "Werkzaamheden aan asbesthoudende materialen",
    "Werkzaamheden anders dan omschreven",
    "Parkeerkosten"
  ];

  const provisions = workAgreement.provisions || defaultProvisions;
  const exclusions = workAgreement.exclusions || defaultExclusions;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CompanyDetails companyDetails={companyDetails} />
        <CustomerInfoCard customer={customer} />
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Overeenkomst Details
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Totaalbedrag excl. BTW</Label>
              <p className="font-medium">{formatCurrency(workAgreement.totalAmount)}</p>
            </div>
            <div>
              <Label>BTW (21%)</Label>
              <p className="font-medium">{formatCurrency(workAgreement.totalAmount * 0.21)}</p>
            </div>
            <div>
              <Label>Totaalbedrag incl. BTW</Label>
              <p className="font-medium">{formatCurrency(workAgreement.totalAmount * 1.21)}</p>
            </div>
            <div>
              <Label>Garantie (jaren)</Label>
              <p className="font-medium">{workAgreement.warranty} jaar</p>
            </div>
          </div>

          <div>
            <Label>Startdatum Werkzaamheden</Label>
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
          {provisions.map((provision, index) => (
            <li key={index}>{provision}</li>
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Uitsluitingen</h3>
        <ul className="list-disc pl-5 space-y-1">
          {exclusions.map((exclusion, index) => (
            <li key={index}>{exclusion}</li>
          ))}
        </ul>
      </Card>

      <GeneralTerms />

      <PaymentDetails 
        workAgreement={workAgreement}
        formatCurrency={formatCurrency}
      />

      <div className="text-sm text-gray-500 italic">
        <p>
          Aldus overeengekomen op {format(new Date(workAgreement.createdAt), "d MMMM yyyy", { locale: nl })} 
          te Amsterdam
        </p>
      </div>
    </div>
  );
};
