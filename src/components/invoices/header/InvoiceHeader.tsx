
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save } from "lucide-react";

interface InvoiceHeaderProps {
  isEditing: boolean;
  onSave: () => void;
  status: string;
  invoiceNumber?: string;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ isEditing, onSave, invoiceNumber }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center mb-3">
        <Button variant="ghost" onClick={() => navigate("/invoices")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Terug naar facturen
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? `Factuur bewerken` : "Nieuwe factuur"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? `Bewerk de gegevens van de factuur${invoiceNumber ? ` (${invoiceNumber.replace("inv-", "FACT-")})` : ""}`
              : "Voeg een nieuwe factuur toe"}
          </p>
        </div>
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Factuur opslaan
        </Button>
      </div>
    </>
  );
};

