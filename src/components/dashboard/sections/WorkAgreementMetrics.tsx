
import React from "react";
import { StatsCardWithTable } from "../stats/StatsCardWithTable";
import { WorkAgreement } from "@/types/work-agreements";

interface WorkAgreementMetricsProps {
  workAgreements: WorkAgreement[];
}

export const WorkAgreementMetrics: React.FC<WorkAgreementMetricsProps> = () => {
  const metrics = [
    { status: "Ondertekend", count: 24, change: 15.2 },
    { status: "In behandeling", count: 12, change: 8.4 },
    { status: "Concept", count: 8, change: -2.1 },
    { status: "Verlopen", count: 3, change: -1.5 }
  ];

  return (
    <StatsCardWithTable
      title="Werkovereenkomsten"
      value="37"
      change={8.4}
      tooltip="Overzicht van werkovereenkomsten per status"
      subTitle="DEZE MAAND"
      table={metrics.map(item => ({
        label: item.status,
        value: item.count.toString(),
        change: item.change
      }))}
    />
  );
};
