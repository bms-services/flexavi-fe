
import React, { useState } from "react";
import { Lead, Quote, Invoice } from "@/types";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, FileText, TrendingUp } from "lucide-react";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { mockQuotes } from "@/data/mockQuotes";
import { mockInvoices } from "@/data/mockInvoices";
import { Badge } from "@/components/ui/badge";

interface LeadListProps {
  leads: Lead[];
}

interface LeadStats {
  quotesValue: number;
  invoicesValue: number;
  latestQuoteStatus?: Quote['status'];
  latestInvoiceStatus?: Invoice['status'];
}

export const LeadList: React.FC<LeadListProps> = ({ leads }) => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const getQuoteStatusBadge = (status?: Quote['status']) => {
    if (!status) return null;
    const statusConfig = {
      draft: { label: "Concept", variant: "outline" as const },
      sent: { label: "Verzonden", variant: "default" as const },
      accepted: { label: "Geaccepteerd", variant: "success" as const },
      rejected: { label: "Afgewezen", variant: "destructive" as const },
      revised: { label: "Herzien", variant: "warning" as const },
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getInvoiceStatusBadge = (status?: Invoice['status']) => {
    if (!status) return null;
    const statusConfig = {
      draft: { label: "Concept", variant: "outline" as const },
      sent: { label: "Verzonden", variant: "default" as const },
      paid: { label: "Betaald", variant: "success" as const },
      overdue: { label: "Te laat", variant: "destructive" as const },
      canceled: { label: "Geannuleerd", variant: "secondary" as const },
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-auto sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Zoek leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe Lead
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naam</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Telefoon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  <span>Waarde</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>Status</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32">
                  Geen leads gevonden
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => {
                const stats = getLeadStats(lead.id);
                return (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Link
                        to={`/leads/${lead.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {lead.name}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {lead.email}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {lead.phone}
                    </TableCell>
                    <TableCell>
                      <LeadStatusBadge status={lead.status} />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Offertes</div>
                        <div className="font-medium">{formatCurrency(stats.quotesValue)}</div>
                        <div className="text-xs text-muted-foreground">Facturen</div>
                        <div className="font-medium">{formatCurrency(stats.invoicesValue)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Offerte</div>
                        {getQuoteStatusBadge(stats.latestQuoteStatus)}
                        <div className="text-xs text-muted-foreground mt-2">Factuur</div>
                        {getInvoiceStatusBadge(stats.latestInvoiceStatus)}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
