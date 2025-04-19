
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockInvoices } from "@/data/mockInvoices";
import { PlanCard } from "./components/PlanCard";
import { InvoiceHistory } from "./components/InvoiceHistory";
import { CurrentPlan } from "./components/CurrentPlan";
import { CancelSubscription } from "./components/CancelSubscription";

export const SubscriptionSettings = () => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState("basic");

  const plans = [
    { 
      id: "basic", 
      name: "Basis", 
      price: "€29,99", 
      period: "maand", 
      features: [
        "Maximaal 10 leads per maand",
        "Maximaal 5 offertes per maand",
        "Maximaal 5 facturen per maand",
        "Geen werkovereenkomsten",
        "Beperkte email templates"
      ],
      isCurrent: currentPlan === "basic"
    },
    { 
      id: "pro", 
      name: "Pro", 
      price: "€59,99", 
      period: "maand", 
      features: [
        "Onbeperkt aantal leads",
        "Maximaal 25 offertes per maand",
        "Maximaal 25 facturen per maand",
        "10 werkovereenkomsten",
        "Alle email templates"
      ],
      isCurrent: currentPlan === "pro"
    },
    { 
      id: "enterprise", 
      name: "Enterprise", 
      price: "€99,99", 
      period: "maand", 
      features: [
        "Onbeperkt aantal leads",
        "Onbeperkt aantal offertes",
        "Onbeperkt aantal facturen",
        "Onbeperkt aantal werkovereenkomsten",
        "Aangepaste email templates",
        "Prioriteit support",
        "Aangepaste branding"
      ],
      isCurrent: currentPlan === "enterprise"
    }
  ];

  const handleUpgrade = (planId: string) => {
    if (planId === currentPlan) {
      toast({
        title: "Dit is je huidige abonnement",
        description: "Je gebruikt dit abonnement al.",
      });
      return;
    }

    toast({
      title: "Abonnement gewijzigd",
      description: `Je abonnement is gewijzigd naar ${plans.find(p => p.id === planId)?.name}.`,
    });
    setCurrentPlan(planId);
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Abonnement opgezegd",
      description: "Je abonnement is opgezegd en loopt af aan het einde van de huidige periode.",
      variant: "destructive",
    });
  };

  const currentPlanDetails = plans.find(p => p.id === currentPlan);

  return (
    <div className="space-y-8">
      <CurrentPlan
        name={currentPlanDetails?.name || ""}
        price={currentPlanDetails?.price || ""}
        period={currentPlanDetails?.period || ""}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            onUpgrade={handleUpgrade}
          />
        ))}
      </div>

      <InvoiceHistory
        invoices={mockInvoices.slice(0, 5)}
      />

      <CancelSubscription
        onCancel={handleCancelSubscription}
      />
    </div>
  );
};
