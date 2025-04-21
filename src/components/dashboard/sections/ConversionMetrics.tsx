
import React from "react";
import { StatsCardWithTable } from "../stats/StatsCardWithTable";
import { Lead, Quote } from "@/types";

interface ConversionMetricsProps {
  leads: Lead[];
  quotes: Quote[];
}

export const ConversionMetrics: React.FC<ConversionMetricsProps> = ({ 
  leads, 
  quotes 
}) => {
  // Calculate conversion rates for each stage
  const totalLeads = leads.length;
  const appointmentScheduled = leads.filter(l => l.status === "appointment_scheduled").length;
  const quoteSent = quotes.length;
  const convertedLeads = leads.filter(l => l.status === "satisfied").length;

  const conversionFunnel = [
    { 
      stage: "Nieuwe leads", 
      count: totalLeads,
      rate: (totalLeads / totalLeads * 100).toFixed(1),
      change: 4.0 
    },
    { 
      stage: "Afspraak gepland", 
      count: appointmentScheduled,
      rate: (appointmentScheduled / totalLeads * 100).toFixed(1),
      change: 2.0 
    },
    { 
      stage: "Offerte verstuurd", 
      count: quoteSent,
      rate: (quoteSent / totalLeads * 100).toFixed(1),
      change: 1.4 
    },
    {
      stage: "Tevreden klant",
      count: convertedLeads,
      rate: (convertedLeads / totalLeads * 100).toFixed(1),
      change: 0.8
    }
  ];

  return (
    <StatsCardWithTable
      title="Conversie percentage"
      value={`${(convertedLeads / totalLeads * 100).toFixed(1)}%`}
      change={3.6}
      subTitle="LEAD NAAR KLANT CONVERSIE"
      table={conversionFunnel.map(item => ({
        label: item.stage,
        value: `${item.rate}%`,
        subLabel: `${item.count} leads`,
        change: item.change
      }))}
    />
  );
};
