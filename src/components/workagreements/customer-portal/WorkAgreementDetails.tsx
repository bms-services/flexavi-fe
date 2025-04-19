import React from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CompanyDetails } from "./components/CompanyDetails";
import { CustomerInfoCard } from "./components/CustomerInfoCard";
import { PaymentDetails } from "./components/PaymentDetails";
import { GeneralTerms } from "./components/GeneralTerms";
import { AgreementDetails } from "./components/AgreementDetails";
import { WorkDescription } from "./components/WorkDescription";
import { ProvisionsCard } from "./components/ProvisionsCard";
import { ExclusionsCard } from "./components/ExclusionsCard";
import { Attachments } from "./components/Attachments";

interface WorkAgreementDetailsProps {
  customer: {
    name: string;
    address: string;
    email: string;
    phone: string;
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
    attachments?: File[];
    defaultAttachments?: { name: string; url: string }[];
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

export const WorkAgreementDetails: React.FC<WorkAgreementDetailsProps> = ({ 
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
}) => {
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

      <AgreementDetails workAgreement={workAgreement} formatCurrency={formatCurrency} />
      
      <WorkDescription description={workAgreement.workDescription} />
      
      <ProvisionsCard provisions={provisions} />
      
      <ExclusionsCard exclusions={exclusions} />

      <Attachments 
        attachments={workAgreement.attachments}
        defaultAttachments={workAgreement.defaultAttachments}
      />

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
