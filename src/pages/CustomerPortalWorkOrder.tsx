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
import { WorkOrderDetails } from "@/components/customer-portal/workorders/components/WorkOrderDetails";
import { PaymentSection } from "@/components/customer-portal/workorders/components/PaymentSection";
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

        <div className="grid gap-6 md:grid-cols-2">
          <CompanyDetails companyDetails={companyDetails} />
          <CustomerInfoCard customer={customerInfo} />
        </div>

        <WorkOrderDetails 
          description={workOrder.notes}
          customerNotes={workOrder.customerNotes}
        />

        <PaymentSection totalAmount={2800.50} />

        <SignatureSection
          customerSignature={workOrder.customerSignature}
          onSignatureChange={handleSignatureChange}
          onSign={handleSign}
          onRevisionRequest={handleRevisionRequest}
        />
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalWorkOrder;
