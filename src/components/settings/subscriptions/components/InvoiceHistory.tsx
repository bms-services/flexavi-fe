
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";
import { InvoiceStatus } from "@/types";

interface Invoice {
  id: string;
  createdAt: string;
  amount: number;
  status: InvoiceStatus;
}

interface InvoiceHistoryProps {
  invoices: Invoice[];
}

export const InvoiceHistory = ({ invoices }: InvoiceHistoryProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Factuurgeschiedenis</CardTitle>
            <CardDescription>
              Bekijk en download je eerdere facturen
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Factuurnr.</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Bedrag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const statusBadge = useInvoiceStatusBadge(invoice.status);
                return (
                  <TableRow key={invoice.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {invoice.id.replace('inv-', 'FACT-')}
                    </TableCell>
                    <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`/portal/invoice/${invoice.id}`, '_blank')}
                      >
                        Bekijken
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {invoices.length === 0 && (
          <div className="py-6 text-center text-muted-foreground">
            Geen facturen gevonden.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
