
import React from "react";
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { LeadDetail, QuoteStatus, InvoiceStatus } from "@/types";
import { getLeadStats, formatCurrency } from "@/utils/leadStats";
import { Badge } from "@/components/ui/badge";
import { LeadRes } from "@/zustand/types/leadT";

interface LeadStatsProps {
  lead: LeadRes;
}

export const LeadStats: React.FC<LeadStatsProps> = ({ lead }) => {
  const leadStats = getLeadStats(lead.id);

  const getQuoteStatusBadge = (status: QuoteStatus | undefined) => {
    if (!status) return "Geen";

    const statusConfig = {
      draft: { label: "Concept", variant: "outline" as const },
      sent: { label: "Verzonden", variant: "default" as const },
      accepted: { label: "Geaccepteerd", variant: "success" as const },
      rejected: { label: "Afgewezen", variant: "destructive" as const },
      revised: { label: "Herzien", variant: "warning" as const },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getInvoiceStatusBadge = (status: InvoiceStatus | undefined) => {
    if (!status) return "Geen";

    const statusConfig = {
      draft: { label: "Concept", variant: "outline" as const },
      sent: { label: "Verzonden", variant: "default" as const },
      paid: { label: "Betaald", variant: "success" as const },
      overdue: { label: "Te laat", variant: "destructive" as const },
      canceled: { label: "Geannuleerd", variant: "secondary" as const },
    };

    const config = statusConfig[status] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-white/50 border-none">
        <CardHeader className="p-4">
          <CardDescription>Totale Waarde</CardDescription>
          <CardTitle className="text-2xl text-primary">
            {formatCurrency(leadStats.quotesValue)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-white/50 border-none">
        <CardHeader className="p-4">
          <CardDescription>Betaald</CardDescription>
          <CardTitle className="text-2xl text-emerald-600">
            {formatCurrency(leadStats.invoicesValue)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-white/50 border-none">
        <CardHeader className="p-4">
          <CardDescription>Laatste Offerte</CardDescription>
          <CardTitle className="text-lg">
            {leadStats.latestQuoteStatus ?
              getQuoteStatusBadge(leadStats.latestQuoteStatus) :
              "Geen"
            }
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-white/50 border-none">
        <CardHeader className="p-4">
          <CardDescription>Laatste Factuur</CardDescription>
          <CardTitle className="text-lg">
            {leadStats.latestInvoiceStatus ?
              getInvoiceStatusBadge(leadStats.latestInvoiceStatus) :
              "Geen"
            }
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};
