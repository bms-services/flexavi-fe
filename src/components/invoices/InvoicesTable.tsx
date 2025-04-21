
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Invoice } from "@/types";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";
import { formatCurrency } from "@/utils/format";

interface InvoicesTableProps {
  invoices: Invoice[];
  getLeadName: (leadId: string) => string;
  onView: (invoice: Invoice) => void;
  onEdit: (invoice: Invoice) => void;
  onDelete: (invoice: Invoice) => void;
  onCredit: (invoice: Invoice) => void;
}

export const InvoicesTable: React.FC<InvoicesTableProps> = ({
  invoices,
  getLeadName,
  onView,
  onEdit,
  onDelete,
  onCredit,
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Acties</TableHead>
        <TableHead>Nummer</TableHead>
        <TableHead>Klant</TableHead>
        <TableHead>Datum</TableHead>
        <TableHead>Vervaldatum</TableHead>
        <TableHead>Bedrag</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map((invoice) => {
        const statusConfig = useInvoiceStatusBadge(invoice.status);
        const isDraft = invoice.status === "draft";
        
        return (
          <TableRow key={invoice.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(invoice)}
                  title="Bekijken"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(invoice)}
                  disabled={!isDraft}
                  title={!isDraft ? "Alleen concepten kunnen bewerkt worden" : "Bewerken"}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(invoice)}
                  disabled={!isDraft}
                  title={!isDraft ? "Alleen concepten kunnen verwijderd worden" : "Verwijderen"}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onCredit(invoice)}
                  title="Crediteren"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              {invoice.id.replace("inv-", "FACT-")}
            </TableCell>
            <TableCell>{getLeadName(invoice.leadId)}</TableCell>
            <TableCell>
              {format(new Date(invoice.createdAt), "dd-MM-yyyy", {
                locale: nl,
              })}
            </TableCell>
            <TableCell>
              {format(new Date(invoice.dueDate), "dd-MM-yyyy", {
                locale: nl,
              })}
            </TableCell>
            <TableCell>{formatCurrency(invoice.amount)}</TableCell>
            <TableCell>
              {statusConfig && (
                <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
