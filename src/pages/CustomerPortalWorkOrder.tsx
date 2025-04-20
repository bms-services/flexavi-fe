import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { ArrowLeft, FileText, Edit, Pen, Image, CreditCard, FileText as FileTextIcon } from "lucide-react";
import { CustomerPortalLayout } from "@/components/customer-portal/layout/CustomerPortalLayout";
import { Badge } from "@/components/ui/badge";
import { CompanyDetails } from "@/components/workagreements/customer-portal/components/CompanyDetails";
import { CustomerInfoCard } from "@/components/workagreements/customer-portal/components/CustomerInfoCard";
import { AgreementDetails } from "@/components/workagreements/customer-portal/components/AgreementDetails";
import { WorkDescription } from "@/components/workagreements/customer-portal/components/WorkDescription";
import { ProvisionsCard } from "@/components/workagreements/customer-portal/components/ProvisionsCard";
import { ExclusionsCard } from "@/components/workagreements/customer-portal/components/ExclusionsCard";
import { Attachments } from "@/components/workagreements/customer-portal/components/Attachments";
import { GeneralTerms } from "@/components/workagreements/customer-portal/components/GeneralTerms";
import { PaymentDetails } from "@/components/workagreements/customer-portal/components/PaymentDetails";
import Signature from "@/components/customer/Signature";
import { toast } from "sonner";

const mockWorkOrder = {
  id: "WO-001",
  description: "Installatie zonnepanelen",
  status: "in_progress",
  createdAt: "2025-04-20T10:00:00Z",
  plannedStartDate: "2025-05-01T08:00:00Z",
  address: "Hoofdstraat 123, Amsterdam",
  notes: "Installatie van 12 zonnepanelen op het zuidelijke dak inclusief montage en aansluiting op het elektriciteitsnet.",
  customerNotes: "Graag parkeren op de oprit"
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "planned":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Gepland</Badge>;
    case "in_progress":
      return <Badge className="bg-blue-500 hover:bg-blue-600">In Uitvoering</Badge>;
    case "completed":
      return <Badge className="bg-green-500 hover:bg-green-600">Afgerond</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const CustomerPortalWorkOrder = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<any>(null);
  const [signature, setSignature] = useState<string | null>(null);

  useEffect(() => {
    setWorkOrder(mockWorkOrder);
    setLoading(false);
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleSignatureChange = (signatureData: string | null) => {
    setSignature(signatureData);
  };

  const handleSign = () => {
    if (!signature) {
      toast.error("Plaats eerst uw handtekening");
      return;
    }
    toast.success("Werkopdracht succesvol ondertekend");
  };

  const handleRevisionRequest = () => {
    toast.success("Revisie verzoek verzonden");
  };

  if (loading) {
    return (
      <CustomerPortalLayout>
        <div className="flex items-center justify-center py-12">
          <p>Laden...</p>
        </div>
      </CustomerPortalLayout>
    );
  }

  if (!workOrder) {
    return (
      <CustomerPortalLayout>
        <div className="flex items-center justify-center py-12">
          <p>Werkopdracht niet gevonden.</p>
        </div>
      </CustomerPortalLayout>
    );
  }

  const companyDetails = {
    name: "Mijn Dakbedrijf B.V.",
    address: "Dakstraat 10, 1234 AB Amsterdam",
    email: "info@dakbedrijf.nl",
    phone: "020-1234567",
    taxId: "NL123456789B01",
    bankName: "ING Bank",
    iban: "NL91INGB0123456789"
  };

  const customerInfo = {
    name: "John Doe",
    address: workOrder.address,
    email: "john@example.com",
    phone: "06-12345678"
  };

  return (
    <CustomerPortalLayout
      title={`Werkopdracht ${workOrder.id}`}
      subtitle="Details van de geplande werkzaamheden"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </Button>
          {getStatusBadge(workOrder.status)}
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <CompanyDetails companyDetails={companyDetails} />
            <CustomerInfoCard customer={customerInfo} />
          </div>

          <AgreementDetails 
            workAgreement={{
              totalAmount: 2800.50,
              startDate: workOrder.plannedStartDate,
              warranty: "10"
            }}
            formatCurrency={formatCurrency}
          />

          <WorkDescription description={workOrder.notes} />

          <ProvisionsCard provisions={[
            "Ter beschikking stellen stroomvoorziening 230 volt 16 amp.",
            "Sanitaire voorzieningen",
            "Bereikbaarheid werkplek met materieel",
            "Oponthoud door werkzaamheden van derden worden doorberekend a €85 p/u per man"
          ]} />

          <ExclusionsCard exclusions={[
            "Werkzaamheden die niet genoemd zijn vallen buiten deze werkovereenkomst",
            "Werkzaamheden aan asbesthoudende materialen",
            "Werkzaamheden anders dan omschreven",
            "Parkeerkosten"
          ]} />

          <Attachments 
            defaultAttachments={[
              { 
                name: "Werkopdracht.pdf", 
                url: "https://example.com/workorder.pdf" 
              },
              { 
                name: "Situatiefoto.jpg", 
                url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop" 
              }
            ]} 
          />

          <GeneralTerms />

          <PaymentDetails 
            workAgreement={{
              paymentMethod: "bank",
              paymentInstallments: [
                { description: "Aanbetaling", percentage: 30 },
                { description: "Bij oplevering", percentage: 70 }
              ]
            }}
            formatCurrency={formatCurrency}
          />

          {!workOrder.customerSignature && (
            <Card className="p-6 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <FileTextIcon className="h-4 w-4 text-primary" />
                Handtekening
              </h3>
              <Signature onSignatureChange={handleSignatureChange} />
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={handleRevisionRequest}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Revisie Verzoeken
                </Button>
                <Button
                  onClick={handleSign}
                  className="gap-2"
                >
                  <Pen className="h-4 w-4" />
                  Ondertekenen
                </Button>
              </div>
            </Card>
          )}

          {workOrder.customerSignature && (
            <Card className="p-6">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <FileTextIcon className="h-4 w-4 text-primary" />
                Handtekening
              </h3>
              <div className="bg-muted rounded-lg p-4">
                <img 
                  src={workOrder.customerSignature} 
                  alt="Handtekening" 
                  className="max-h-40 mx-auto"
                />
              </div>
            </Card>
          )}
        </div>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalWorkOrder;
