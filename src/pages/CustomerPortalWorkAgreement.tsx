
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { mockLeads } from "@/data/mockLeads";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkAgreementStatusBadge } from "@/hooks/useWorkAgreementStatusBadge";
import { ArrowLeft, Check } from "lucide-react";
import { QuoteLineItems } from "@/components/customer-portal/quote/QuoteLineItems";
import { WorkAgreementDetails } from "@/components/workagreements/customer-portal/WorkAgreementDetails";
import { Attachments } from "@/components/workagreements/customer-portal/components/Attachments";
import Signature from "@/components/customer/Signature";
import PortalSuccessMessage from "@/components/customer-portal/PortalSuccessMessage";

const CustomerPortalWorkAgreement = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workAgreement, setWorkAgreement] = useState<any | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      const foundAgreement = mockWorkAgreements.find(wa => wa.id === id);
      if (foundAgreement) {
        setWorkAgreement(foundAgreement);
        const foundCustomer = mockLeads.find(l => l.id === foundAgreement.leadId);
        if (foundCustomer) {
          setCustomer(foundCustomer);
        }
      }
    }
    setLoading(false);
  }, [id]);

  const statusBadge = useWorkAgreementStatusBadge(workAgreement?.status);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const handleSign = () => {
    if (!signature) {
      alert("Plaats eerst uw handtekening om de werkovereenkomst te accepteren.");
      return;
    }
    
    console.log("Werkovereenkomst ondertekend met handtekening:", signature);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Laden...</p>
      </div>
    );
  }

  if (!workAgreement || !customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Werkovereenkomst niet gevonden.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <PortalSuccessMessage 
        title="Werkovereenkomst Ondertekend"
        description="Hartelijk dank voor het ondertekenen van de werkovereenkomst. Wij nemen spoedig contact met u op om de werkzaamheden in te plannen."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </Button>
          <h1 className="text-2xl font-semibold">
            Werkovereenkomst {workAgreement.id}
          </h1>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <WorkAgreementDetails 
                customer={customer}
                workAgreement={workAgreement}
                formatCurrency={formatCurrency}
              />
            </CardContent>
          </Card>

          <Attachments 
            attachments={workAgreement.attachments}
            defaultAttachments={workAgreement.defaultAttachments}
          />

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Handtekening</h3>
                <Signature onSignatureChange={setSignature} />
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSign} className="w-full sm:w-auto">
                  <Check className="mr-2 h-4 w-4" />
                  Ondertekenen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalWorkAgreement;
