
import React from "react";
import { StatCard } from "./StatCard";
import { FileText } from "lucide-react";
import { Quote } from "@/types";

interface QuoteStatsProps {
  quotes: Quote[];
  formatCurrency: (amount: number) => string;
}

export const QuoteStats: React.FC<QuoteStatsProps> = ({ quotes, formatCurrency }) => {
  const pendingQuotes = quotes.filter(q => q.status === "sent").length;
  const acceptedQuotes = quotes.filter(q => q.status === "accepted").length;
  const totalQuotesValue = quotes
    .filter(q => q.status !== "rejected")
    .reduce((sum, q) => sum + q.amount, 0);

  return (
    <StatCard
      title="Offertes"
      value={formatCurrency(totalQuotesValue)}
      description={`${pendingQuotes} open, ${acceptedQuotes} geaccepteerd`}
      icon={<FileText className="h-4 w-4" />}
    />
  );
};
