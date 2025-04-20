import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CustomerPortalLayout } from "@/components/customer-portal/layout/CustomerPortalLayout";
import { CompanyDetails } from "@/components/workagreements/customer-portal/components/CompanyDetails";
import { CustomerInfoCard } from "@/components/workagreements/customer-portal/components/CustomerInfoCard";
import { AgreementDetails } from "@/components/workagreements/customer-portal/components/AgreementDetails";
import { WorkDescription } from "@/components/workagreements/customer-portal/components/WorkDescription";
import { ProvisionsCard } from "@/components/workagreements/customer-portal/components/ProvisionsCard";
import { ExclusionsCard } from "@/components/workagreements/customer-portal/components/ExclusionsCard";
import { Attachments } from "@/components/workagreements/customer-portal/components/Attachments";
import { GeneralTerms } from "@/components/workagreements/customer-portal/components/GeneralTerms";
import { PaymentDetails } from "@/components/workagreements/customer-portal/components/PaymentDetails";
import { WorkOrderHeader } from "@/components/customer-portal/workorders/components/WorkOrderHeader";
import { SignatureSection } from "@/components/customer-portal/workorders/components/SignatureSection";
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

const CustomerPortalWorkOrder = () => {
  const { id } = useParams<{ id: string }>();
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
        <WorkOrderHeader workOrderId={workOrder.id} status={workOrder.status} />

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

          <SignatureSection
            customerSignature={workOrder.customerSignature}
            onSignatureChange={handleSignatureChange}
            onSign={handleSign}
            onRevisionRequest={handleRevisionRequest}
          />
        </div>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalWorkOrder;
