
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, RefreshCcw, Send } from "lucide-react";


interface InvoiceHeaderProps {
  isEditing: boolean;
  loadingSubmit?: boolean;
  invoiceNumber?: string;
  handleOpenCreditDialog?: () => void;
  handleOpenSendDialog?: () => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ isEditing, loadingSubmit, invoiceNumber, handleOpenCreditDialog, handleOpenSendDialog }) => {
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
        <div className="flex flex-wrap gap-2">
          {isEditing && (
            <>
              <Button variant="outline" onClick={handleOpenCreditDialog}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Crediteer factuur
              </Button>
              <Button variant="outline" onClick={handleOpenSendDialog}>
                <Send className="mr-2 h-4 w-4" />
                Verzend factuur
              </Button>
            </>
          )}
          <Button type="submit" loading={loadingSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Factuur opslaan
          </Button>
        </div>
      </div>


    </>
  );
};
