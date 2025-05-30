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
          <TableRow key={lead.id} className="flex flex-col sm:table-row border sm:border-0 rounded-lg sm:rounded-none shadow-sm sm:shadow-none mb-4 sm:mb-0">
            <TableCell className="flex flex-col py-3 sm:py-4 sm:table-cell">
              <Link
                to={`/leads/${lead.id}`}
                className="font-medium text-primary hover:underline"
              >
                {lead.name}
              </Link>
              <div className="mt-2 grid gap-1 sm:hidden text-sm">
                <div className="text-muted-foreground">{lead.email}</div>
                <div className="text-muted-foreground">{lead.phone}</div>
                <div className="text-muted-foreground">{
                  lead.address
                    ? `${lead.address.street} ${lead.address.house_number}${lead.address.house_number_addition ? ' ' + lead.address.house_number_addition : ''}, ${typeof lead.address.postal_code === 'object' ? lead.address.postal_code.value : lead.address.postal_code} ${lead.address.city}`
                    : "-"
                }</div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{lead.email}</TableCell>
            <TableCell className="hidden sm:table-cell">{lead.phone}</TableCell>
            <TableCell className="hidden sm:table-cell">{
              lead.address
                ? `${lead.address.street} ${lead.address.house_number}${lead.address.house_number_addition ? ' ' + lead.address.house_number_addition : ''}, ${typeof lead.address.postal_code === 'object' ? lead.address.postal_code.value : lead.address.postal_code} ${lead.address.city}`
                : "-"
            }</TableCell>
            <TableCell className="py-2 sm:py-4 flex items-center justify-between sm:table-cell">
              <span className="text-sm text-muted-foreground sm:hidden">Status</span>
              <LeadStatusBadge status={lead.status} />
            </TableCell>
            <TableCell className="py-2 sm:py-4 flex flex-row justify-between items-center sm:table-cell border-t sm:border-0">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                <div>
                  <span className="text-sm text-muted-foreground block sm:inline">Offertes</span>
                  <div className="font-medium">{formatCurrency(stats.quotesValue)}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block sm:inline">Facturen</span>
                  <div className="font-medium">{formatCurrency(stats.invoicesValue)}</div>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell py-2 sm:py-4">
              <div className="flex flex-col gap-2">
                <div>
                  <span className="text-sm text-gray-500 block">Offerte status</span>
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
                  <span className="text-sm text-gray-500 block">Factuur status</span>
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
