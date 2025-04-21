
import React from "react";
import { Link } from "react-router-dom";
import { CircleSlash } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { QuoteStatusBadge } from "./badges/QuoteStatusBadge";
import { InvoiceStatusBadge } from "./badges/InvoiceStatusBadge";
import { Lead, QuoteStatus, InvoiceStatus } from "@/types";

interface LeadTableContentProps {
  leads: Lead[];
  getLeadStats: (leadId: string) => {
    quotesValue: number;
    invoicesValue: number;
    latestQuoteStatus?: QuoteStatus;
    latestInvoiceStatus?: InvoiceStatus;
  };
  formatCurrency: (amount: number) => string;
}

export const LeadTableContent: React.FC<LeadTableContentProps> = ({
  leads,
  getLeadStats,
  formatCurrency,
}) => {
  if (leads.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center h-24">
          <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
            <CircleSlash className="h-8 w-8 text-gray-400" />
            <p>Geen leads gevonden</p>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {leads.map((lead) => {
        const stats = getLeadStats(lead.id);
        return (
          <TableRow key={lead.id} className="flex flex-col sm:table-row">
            <TableCell className="flex flex-col gap-1 py-4 sm:table-cell">
              <Link
                to={`/leads/${lead.id}`}
                className="font-medium text-primary hover:underline"
              >
                {lead.name}
              </Link>
              <div className="text-sm text-muted-foreground sm:hidden">
                {lead.email}
              </div>
              <div className="text-sm text-muted-foreground sm:hidden">
                {lead.phone}
              </div>
              <div className="text-sm text-muted-foreground sm:hidden">
                {lead.address}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{lead.email}</TableCell>
            <TableCell className="hidden sm:table-cell">{lead.phone}</TableCell>
            <TableCell className="hidden sm:table-cell">{lead.address}</TableCell>
            <TableCell className="py-2 sm:py-4">
              <div className="flex flex-col gap-2">
                <div className="text-xs text-muted-foreground sm:hidden">Status</div>
                {lead.status ? (
                  <LeadStatusBadge status={lead.status} />
                ) : (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <CircleSlash className="h-4 w-4" />
                    <span className="text-xs">Geen status</span>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell className="py-2 sm:py-4">
              <div className="flex flex-col gap-2">
                <div className="text-xs text-muted-foreground">Offertes</div>
                <div className="font-medium">{formatCurrency(stats.quotesValue)}</div>
                <div className="text-xs text-muted-foreground">Facturen</div>
                <div className="font-medium">{formatCurrency(stats.invoicesValue)}</div>
              </div>
            </TableCell>
            <TableCell className="py-2 sm:py-4 border-b sm:border-0">
              <div className="flex flex-col gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">Offerte status</div>
                  {stats.latestQuoteStatus ? (
                    <QuoteStatusBadge status={stats.latestQuoteStatus} />
                  ) : (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <CircleSlash className="h-4 w-4" />
                      <span className="text-xs">Geen offerte</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Factuur status</div>
                  {stats.latestInvoiceStatus ? (
                    <InvoiceStatusBadge status={stats.latestInvoiceStatus} />
                  ) : (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <CircleSlash className="h-4 w-4" />
                      <span className="text-xs">Geen factuur</span>
                    </div>
                  )}
                </div>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};
