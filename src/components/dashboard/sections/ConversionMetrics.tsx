
import React from "react";
import { StatsCardWithTable } from "../stats/StatsCardWithTable";
import { Lead, Quote } from "@/types";

interface ConversionMetricsProps {
  leads: Lead[];
  quotes: Quote[];
}

export const ConversionMetrics: React.FC<ConversionMetricsProps> = ({ leads, quotes }) => {
  const conversionFunnel = [
    { 
      stage: "Bekeken", 
      count: leads.length, 
      rate: (leads.length / leads.length * 100).toFixed(2), 
      change: 4.0 
    },
    { 
      stage: "Contact", 
      count: leads.filter(l => l.status !== "new_lead").length, 
      rate: (leads.filter(l => l.status !== "new_lead").length / leads.length * 100).toFixed(2), 
      change: 2.0 
    },
    { 
      stage: "Offerte", 
      count: quotes.length, 
      rate: (quotes.length / leads.length * 100).toFixed(2), 
      change: 1.4 
    }
  ];

  return (
    <StatsCardWithTable
      title="Online conversie percentage"
      value={`${(quotes.length / leads.length * 100).toFixed(2)}%`}
      change={3.6}
      subTitle="CONVERSIE TRECHTER"
      table={conversionFunnel.map(item => ({
        label: item.stage,
        value: `${item.rate}%`,
        subLabel: `${item.count} bezoeken`,
        change: item.change
      }))}
    />
  );
};

