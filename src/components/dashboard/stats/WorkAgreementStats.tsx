
import React from "react";
import { StatCard } from "./StatCard";
import { FileText } from "lucide-react";
import { WorkAgreement } from "@/types";

interface WorkAgreementStatsProps {
  workAgreements: WorkAgreement[];
  formatCurrency: (amount: number) => string;
}

export const WorkAgreementStats: React.FC<WorkAgreementStatsProps> = ({ 
  workAgreements,
  formatCurrency
}) => {
  const pendingAgreements = workAgreements.filter(wa => wa.status === "sent").length;
  const signedAgreements = workAgreements.filter(wa => wa.status === "signed").length;
  const totalAgreementsValue = workAgreements
    .filter(wa => wa.status !== "rejected")
    .reduce((sum, wa) => sum + wa.totalAmount, 0);

  return (
    <StatCard
      title="Werkovereenkomsten"
      value={formatCurrency(totalAgreementsValue)}
      description={`${pendingAgreements} open, ${signedAgreements} ondertekend`}
      icon={<FileText className="h-4 w-4" />}
    />
  );
};
