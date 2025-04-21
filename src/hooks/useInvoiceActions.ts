
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Invoice } from "@/types";

export const useInvoiceActions = () => {
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleViewInvoice = (invoice: Invoice) => {
    navigate(`/portal/invoices/${invoice.id}`);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    if (invoice.status !== "draft") {
      toast({
        title: "Alleen concepten kunnen bewerkt worden",
        variant: "destructive",
      });
      return;
    }
    navigate(`/invoices/edit/${invoice.id}`);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    if (invoice.status !== "draft") {
      toast({
        title: "Alleen concepten kunnen verwijderd worden",
        variant: "destructive",
      });
      return;
    }
    console.log("Delete invoice:", invoice);
  };

  const handleCreateNewInvoice = () => {
    navigate("/invoices/create");
  };

  const handleCreditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setCreditDialogOpen(true);
  };

  const createCreditInvoice = (creditType: "full" | "partial") => {
    if (!selectedInvoice) return;
    
    if (creditType === "full") {
      toast({
        title: "Creditfactuur aangemaakt",
        description: `Volledige creditfactuur voor ${selectedInvoice.id.replace("inv-", "FACT-")} is aangemaakt. De originele factuur is als betaald gemarkeerd.`,
      });
    } else if (creditType === "partial") {
      toast({
        title: "Gedeeltelijke creditering",
        description: `U wordt doorgestuurd naar het bewerk scherm voor een nieuwe creditfactuur voor ${selectedInvoice.id.replace("inv-", "FACT-")}.`,
      });
      
      setTimeout(() => {
        navigate("/invoices/create?creditFor=" + selectedInvoice.id);
      }, 500);
    }
    
    setCreditDialogOpen(false);
    setSelectedInvoice(null);
  };

  return {
    creditDialogOpen,
    selectedInvoice,
    setCreditDialogOpen,
    handleViewInvoice,
    handleEditInvoice,
    handleDeleteInvoice,
    handleCreateNewInvoice,
    handleCreditInvoice,
    createCreditInvoice,
  };
};
