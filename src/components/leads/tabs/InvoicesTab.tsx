
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
import { useNavigate } from "react-router-dom";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";

interface InvoicesTabProps {
  invoices: Invoice[];
  leadId: string;
}

export const InvoicesTab: React.FC<InvoicesTabProps> = ({
  invoices,
  leadId,
}) => {
  const navigate = useNavigate();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const handleCreateInvoice = () => {
    navigate(`/invoices/create?leadId=${leadId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleCreateInvoice}>
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
                  .map((invoice) => {
                    const statusConfig = useInvoiceStatusBadge(invoice.status);
                    
                    return (
                      <TableRow key={invoice.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => navigate(`/invoices/edit/${invoice.id}`)}
                      >
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
                        <TableCell>
                          {statusConfig && (
                            <Badge variant={statusConfig.variant}>
                              {statusConfig.label}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
