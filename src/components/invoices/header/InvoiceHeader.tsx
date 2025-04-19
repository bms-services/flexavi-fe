
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Download, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InvoiceStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useInvoiceStatusBadge } from "@/hooks/useStatusBadge";

interface InvoiceHeaderProps {
  isEditing: boolean;
  onSave: () => void;
  status?: InvoiceStatus;
  invoiceNumber?: string;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  isEditing,
  onSave,
  status,
  invoiceNumber,
}) => {
  const navigate = useNavigate();
  const statusBadge = useInvoiceStatusBadge(status);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/invoices")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Factuur bewerken" : "Nieuwe factuur"}
            {invoiceNumber && <span className="text-lg ml-2 text-muted-foreground">
              {invoiceNumber.replace("inv-", "FACT-")}
            </span>}
          </h1>
          {statusBadge && (
            <Badge variant={statusBadge.variant} className="ml-2">
              {statusBadge.label}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground mt-1">
          {isEditing
            ? "Bewerk de details van deze factuur"
            : "Maak een nieuwe factuur aan"}
        </p>
      </div>
      <div className="flex gap-2">
        {status === "draft" && (
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Versturen
          </Button>
        )}
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Downloaden
        </Button>
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Factuur opslaan
        </Button>
      </div>
    </div>
  );
};
