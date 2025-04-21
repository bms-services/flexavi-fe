
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
          <TableRow key={lead.id} className="block sm:table-row border rounded-lg sm:rounded-none shadow-sm sm:shadow-none mb-4 sm:mb-0 overflow-hidden">
            <TableCell className="flex flex-col py-4 sm:table-cell sm:py-4 border-b-0 sm:border-b bg-white">
              <Link
                to={`/leads/${lead.id}`}
                className="font-medium text-primary hover:underline text-lg"
              >
                {lead.name}
              </Link>
              <div className="mt-1 grid grid-cols-1 gap-1 sm:hidden">
                <div className="flex items-center">
                  <span className="text-xs font-medium text-gray-500 w-20">Email:</span>
                  <span className="text-sm text-gray-700">{lead.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-gray-500 w-20">Telefoon:</span>
                  <span className="text-sm text-gray-700">{lead.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-gray-500 w-20">Adres:</span>
                  <span className="text-sm text-gray-700">{lead.address}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{lead.email}</TableCell>
            <TableCell className="hidden sm:table-cell">{lead.phone}</TableCell>
            <TableCell className="hidden sm:table-cell">{lead.address}</TableCell>
            <TableCell className="py-2 px-4 sm:py-4 sm:px-2 flex justify-between items-center sm:table-cell bg-white border-b-0 sm:border-b">
              <span className="text-xs font-medium text-gray-500 sm:hidden">Status:</span>
              {lead.status ? (
                <LeadStatusBadge status={lead.status} />
              ) : (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <CircleSlash className="h-4 w-4" />
                  <span className="text-xs">Geen status</span>
                </div>
              )}
            </TableCell>
            <TableCell className="py-3 px-4 sm:py-4 sm:px-2 bg-white border-b-0 sm:border-b">
              <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-4 sm:gap-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">Offertes</span>
                  <span className="font-medium">{formatCurrency(stats.quotesValue)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">Facturen</span>
                  <span className="font-medium">{formatCurrency(stats.invoicesValue)}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-3 px-4 sm:py-4 sm:px-2 bg-white border-b-0 sm:border-b bg-gray-50 sm:bg-white rounded-b-lg sm:rounded-none">
              <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-4 sm:gap-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">Offerte status</span>
                  {stats.latestQuoteStatus ? (
                    <QuoteStatusBadge status={stats.latestQuoteStatus} />
                  ) : (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <CircleSlash className="h-4 w-4" />
                      <span className="text-xs">Geen offerte</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">Factuur status</span>
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
