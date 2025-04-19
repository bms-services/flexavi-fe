
import { useState, useEffect } from "react";
import { WorkAgreement, Lead, Quote, WorkAgreementStatus } from "@/types";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { mockLeads, mockQuotes } from "@/data/mockData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useWorkAgreementState = (workAgreementId?: string) => {
  const navigate = useNavigate();
  const isEditing = !!workAgreementId;

  const [workAgreement, setWorkAgreement] = useState<WorkAgreement>({
    id: workAgreementId || `wa-${Date.now().toString(36)}`,
    quoteId: "",
    leadId: "",
    totalAmount: 0,
    description: "",
    status: "draft",
    workDescription: "",
    warranty: "1",
    startDate: new Date().toISOString(),
    companySignature: "data:image/png;base64,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",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lineItems: [],
    exclusions: [
      "Werkzaamheden die niet genoemd zijn vallen buiten deze werkovereenkomst",
      "Werkzaamheden aan asbesthoudende materialen",
      "Werkzaamheden anders dan omschreven",
      "Parkeerkosten"
    ],
    paymentMethod: "bank",
    paymentInstallments: [
      {
        percentage: 30,
        description: "Aanbetaling",
        dueType: "upfront"
      },
      {
        percentage: 30,
        description: "Bij aanvang werkzaamheden",
        dueType: "start"
      },
      {
        percentage: 30,
        description: "Tussentijdse betaling",
        dueType: "during"
      },
      {
        percentage: 10,
        description: "Bij oplevering",
        dueType: "completion"
      }
    ]
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Lead | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    if (isEditing && workAgreementId) {
      const foundWorkAgreement = mockWorkAgreements.find(wa => wa.id === workAgreementId);
      
      if (foundWorkAgreement) {
        setWorkAgreement(foundWorkAgreement);
        
        const customer = mockLeads.find(l => l.id === foundWorkAgreement.leadId);
        if (customer) {
          setSelectedCustomer(customer);
        }

        const quote = mockQuotes.find(q => q.id === foundWorkAgreement.quoteId);
        if (quote) {
          setSelectedQuote(quote);
        }
      } else {
        toast.error("Werkovereenkomst niet gevonden");
        navigate("/workagreements");
      }
    }
  }, [workAgreementId, isEditing, navigate]);

  return {
    workAgreement,
    setWorkAgreement,
    selectedCustomer,
    setSelectedCustomer,
    selectedQuote,
    setSelectedQuote,
    isEditing
  };
};
