
import React from "react";
import { Link } from "react-router-dom";
import { CircleSlash, TrendingUp, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
          <TableRow key={lead.id} className="h-auto">
            <TableCell className="py-1.5">
              <Link
                to={`/leads/${lead.id}`}
                className="font-medium text-sm text-primary hover:underline"
              >
                {lead.name}
              </Link>
            </TableCell>
            <TableCell className="hidden md:table-cell py-1.5 text-sm">
              {lead.email}
            </TableCell>
            <TableCell className="hidden lg:table-cell py-1.5 text-sm">
              {lead.phone}
            </TableCell>
            <TableCell className="hidden md:table-cell py-1.5 text-sm">
              {lead.address}
            </TableCell>
            <TableCell className="py-1.5">
              {lead.status ? (
                <LeadStatusBadge status={lead.status} />
              ) : (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <CircleSlash className="h-4 w-4" />
                  <span className="text-xs">Geen status</span>
                </div>
              )}
            </TableCell>
            <TableCell className="py-1.5">
              <div className="space-y-0.5">
                <div className="text-xs text-muted-foreground">Offertes</div>
                <div className="font-medium text-sm">{formatCurrency(stats.quotesValue)}</div>
                <div className="text-xs text-muted-foreground">Facturen</div>
                <div className="font-medium text-sm">{formatCurrency(stats.invoicesValue)}</div>
              </div>
            </TableCell>
            <TableCell className="py-1.5">
              <div className="space-y-0.5">
                <div className="text-xs text-muted-foreground">Offerte</div>
                {stats.latestQuoteStatus ? (
                  <QuoteStatusBadge status={stats.latestQuoteStatus} />
                ) : (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <CircleSlash className="h-4 w-4" />
                    <span className="text-xs">Geen offerte</span>
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">Factuur</div>
                {stats.latestInvoiceStatus ? (
                  <InvoiceStatusBadge status={stats.latestInvoiceStatus} />
                ) : (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <CircleSlash className="h-4 w-4" />
                    <span className="text-xs">Geen factuur</span>
                  </div>
                )}
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
