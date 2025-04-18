
import React from "react";
import { Invoice } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileCheck } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface InvoicesTabProps {
  invoices: Invoice[];
  leadId: string;
}

const getStatusBadge = (status: Invoice["status"]) => {
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

export const InvoicesTab: React.FC<InvoicesTabProps> = ({
  invoices,
  leadId,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe Factuur
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Facturen</CardTitle>
              <CardDescription>
                Alle facturen voor deze lead
              </CardDescription>
            </div>
            <FileCheck className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nog geen facturen voor deze lead.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nummer</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Bedrag</TableHead>
                  <TableHead className="hidden md:table-cell">Vervaldatum</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <span className="font-medium text-primary">
                          {invoice.id.replace("inv-", "FACT-")}
                        </span>
                      </TableCell>
                      <TableCell>
                        {format(new Date(invoice.createdAt), "d MMMM yyyy", {
                          locale: nl,
                        })}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(invoice.dueDate), "d MMMM yyyy", {
                          locale: nl,
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
