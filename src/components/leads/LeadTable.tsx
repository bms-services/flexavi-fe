import React from "react";
import { Link } from "react-router-dom";
import { CircleSlash } from "lucide-react";
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
import { Lead, Quote, Invoice } from "@/types";
import { FileText, TrendingUp } from "lucide-react";
import { mockQuotes } from "@/data/mockQuotes";
import { mockInvoices } from "@/data/mockInvoices";

interface LeadTableProps {
  leads: Lead[];
  searchTerm: string;
}

interface LeadStats {
  quotesValue: number;
  invoicesValue: number;
  latestQuoteStatus?: Quote['status'];
  latestInvoiceStatus?: Invoice['status'];
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads, searchTerm }) => {
  const getLeadStats = (leadId: string): LeadStats => {
    const leadQuotes = mockQuotes.filter(quote => quote.leadId === leadId);
    const leadInvoices = mockInvoices.filter(invoice => invoice.leadId === leadId);

    const latestQuote = leadQuotes.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

    const latestInvoice = leadInvoices.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

    return {
      quotesValue: leadQuotes.reduce((sum, quote) => sum + quote.amount, 0),
      invoicesValue: leadInvoices.reduce((sum, invoice) => sum + invoice.amount, 0),
      latestQuoteStatus: latestQuote?.status,
      latestInvoiceStatus: latestInvoice?.status,
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-8">Naam</TableHead>
            <TableHead className="h-8 hidden md:table-cell">Email</TableHead>
            <TableHead className="h-8 hidden lg:table-cell">Telefoon</TableHead>
            <TableHead className="h-8">Status</TableHead>
            <TableHead className="h-8">
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Waarde</span>
              </div>
            </TableHead>
            <TableHead className="h-8">
              <div className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                <span>Status</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                  <CircleSlash className="h-8 w-8 text-gray-400" />
                  <p>Geen leads gevonden</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredLeads.map((lead) => {
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
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
