import React from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { User, MapPin, FileText, Info, Clock, Euro } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  isEditable?: boolean;
  onFieldChange?: (field: string, value: any) => void;
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
  },
  isEditable = false,
  onFieldChange
}: WorkAgreementDetailsProps) => {
  const handleChange = (field: string, value: any) => {
    if (onFieldChange) {
      onFieldChange(field, value);
    }
  };

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

  const renderPaymentMethod = () => {
    const method = workAgreement.paymentMethod;
    if (!method) return null;

    let methodText = "";
    if (method === "bank") methodText = "Bankoverschrijving";
    if (method === "cash") methodText = "Contante betaling";
    if (method === "both") methodText = "Bank en contante betaling";

    return (
      <div>
        <Label>Betaalwijze</Label>
        <p className="font-medium">{methodText}</p>
        {(method === "cash" || method === "both") && workAgreement.cashPaymentAmount && (
          <p className="text-sm text-muted-foreground mt-1">
            Contant te betalen bij oplevering: {formatCurrency(workAgreement.cashPaymentAmount)}
          </p>
        )}
      </div>
    );
  };

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
              <Label>Totaalbedrag excl. BTW</Label>
              {isEditable ? (
                <Input
                  type="number"
                  value={workAgreement.totalAmount}
                  onChange={(e) => handleChange("totalAmount", parseFloat(e.target.value))}
                  className="mt-1"
                />
              ) : (
                <p className="font-medium">{formatCurrency(workAgreement.totalAmount)}</p>
              )}
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
              {isEditable ? (
                <Input
                  type="number"
                  value={workAgreement.warranty}
                  onChange={(e) => handleChange("warranty", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="font-medium">{workAgreement.warranty} jaar</p>
              )}
            </div>
            {isEditable && (
              <div>
                <Label>Contante betaling bij oplevering (excl. BTW)</Label>
                <Input
                  type="number"
                  value={workAgreement.cashPaymentAmount || 0}
                  onChange={(e) => handleChange("cashPaymentAmount", parseFloat(e.target.value))}
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div>
            <Label>Startdatum Werkzaamheden</Label>
            {isEditable ? (
              <Input
                type="date"
                value={new Date(workAgreement.startDate).toISOString().split('T')[0]}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="mt-1"
              />
            ) : (
              <p>{format(new Date(workAgreement.startDate), "d MMMM yyyy", { locale: nl })}</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
          <Info className="h-4 w-4" />
          Beschrijving Werkzaamheden
        </h3>
        {isEditable ? (
          <Textarea
            value={workAgreement.workDescription}
            onChange={(e) => handleChange("workDescription", e.target.value)}
            rows={6}
            placeholder="Beschrijf de uit te voeren werkzaamheden..."
          />
        ) : (
          <p className="whitespace-pre-line">{workAgreement.workDescription}</p>
        )}
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Voorzieningen door Opdrachtgever</h3>
        {isEditable ? (
          <Textarea
            value={provisions.join('\n')}
            onChange={(e) => handleChange("provisions", e.target.value.split('\n').filter(line => line.trim()))}
            rows={4}
            placeholder="Voeg voorzieningen toe (één per regel)..."
          />
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {provisions.map((provision, index) => (
              <li key={index}>{provision}</li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Uitsluitingen</h3>
        {isEditable ? (
          <Textarea
            value={exclusions.join('\n')}
            onChange={(e) => handleChange("exclusions", e.target.value.split('\n').filter(line => line.trim()))}
            rows={4}
            placeholder="Voeg uitsluitingen toe (één per regel)..."
          />
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {exclusions.map((exclusion, index) => (
              <li key={index}>{exclusion}</li>
            ))}
          </ul>
        )}
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

      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4 Euro">
          Betaalgegevens
        </h3>
        <div className="space-y-4">
          {renderPaymentMethod()}
          
          {workAgreement.paymentInstallments && workAgreement.paymentInstallments.length > 0 && (
            <div>
              <Label>Betaaltermijnen</Label>
              <div className="space-y-2 mt-2">
                {workAgreement.paymentInstallments.map((installment, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{installment.description}</span>
                    <span className="font-medium">{installment.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
