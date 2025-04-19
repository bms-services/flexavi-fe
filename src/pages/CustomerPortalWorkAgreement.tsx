
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { mockLeads } from "@/data/mockLeads";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWorkAgreementStatusBadge } from "@/hooks/useWorkAgreementStatusBadge";
import { FileSignature, ChevronLeft, Check } from "lucide-react";
import { QuoteLineItems } from "@/components/customer-portal/quote/QuoteLineItems";
import { WorkAgreementDetails } from "@/components/workagreements/customer-portal/WorkAgreementDetails";
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
    
    // In a real application, this would update the work agreement status
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
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4">
      <div className="container mx-auto flex justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader className="border-b pb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                  <FileSignature className="h-5 w-5 text-primary shrink-0" />
                  <span className="break-all">Werkovereenkomst {workAgreement.id.replace("wa-", "WO-")}</span>
                </CardTitle>
                <CardDescription className="mt-1">{workAgreement.description}</CardDescription>
              </div>
              {statusBadge && (
                <Badge variant={statusBadge.variant} className="self-start">
                  {statusBadge.label}
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="py-6 space-y-6">
            <WorkAgreementDetails 
              customer={customer}
              workAgreement={workAgreement}
              formatCurrency={formatCurrency}
            />
            
            <h3 className="text-sm font-medium text-gray-500 pb-2 border-b">Werkzaamheden</h3>
            <div className="overflow-x-auto -mx-6 px-6">
              <QuoteLineItems 
                lineItems={workAgreement.lineItems}
                formatCurrency={formatCurrency}
              />
            </div>
            
            {workAgreement.exclusions && workAgreement.exclusions.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 pb-2 border-b">Uitsluitingen</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {workAgreement.exclusions.map((exclusion: string, index: number) => (
                    <li key={index} className="text-sm">{exclusion}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Handtekening</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium mb-2">Ondertekend door opdrachtnemer:</p>
                  {workAgreement.companySignature && (
                    <div className="border rounded-md p-2 bg-white">
                      <img 
                        src={workAgreement.companySignature} 
                        alt="Handtekening opdrachtnemer" 
                        className="max-h-24 mx-auto"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Uw handtekening (opdrachtgever):</p>
                  <Signature onSignatureChange={setSignature} />
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Terug
            </Button>
            <Button 
              onClick={handleSign}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              <Check className="mr-2 h-4 w-4" />
              Ondertekenen
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPortalWorkAgreement;
