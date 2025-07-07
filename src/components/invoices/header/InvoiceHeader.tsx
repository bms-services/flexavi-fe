
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, RefreshCcw, Send, ArrowLeft } from "lucide-react";


interface InvoiceHeaderProps {
  isEditing: boolean;
  loadingSubmit?: boolean;
  invoiceNumber?: string;
  handleOpenModal: (type: "send" | "credit") => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ isEditing, loadingSubmit, invoiceNumber, handleOpenModal }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          {isEditing ? `Factuur bewerken` : "Nieuwe factuur"}
        </h1>
        <p className="text-muted-foreground">
          {isEditing
            ? `Bewerk de gegevens van de factuur${invoiceNumber ? ` (${invoiceNumber.replace("inv-", "FACT-")})` : ""}`
            : "Voeg een nieuwe factuur toe"}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button variant="outline" onClick={() => navigate("/workagreements")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug
        </Button>
        {isEditing && (
          <>
            <Button type="button" variant="outline" onClick={() => handleOpenModal("credit")}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Crediteer factuur
            </Button>
            <Button type="button" variant="outline" onClick={() => handleOpenModal("send")}>
              <Send className="mr-2 h-4 w-4" />
              Verzend factuur
            </Button>
          </>
        )}
        <Button type="submit" loading={loadingSubmit}>
          <Save className="mr-2 h-4 w-4" />
          Opslaan
        </Button>
      </div>
    </div>
  );
};
