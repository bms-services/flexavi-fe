
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Invoice } from "@/types";

export const useInvoiceActions = () => {
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  const navigate = useNavigate();

  const handleViewInvoice = (invoice: Invoice) => {
    navigate(`/portal/invoices/${invoice.id}`);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    if (invoice.status !== "draft") {
      
      return;
    }
    navigate(`/invoices/edit/${invoice.id}`);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    if (invoice.status !== "draft") {
      
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

    const typeQuery = creditType === "full" ? "full" : "partial";
    setTimeout(() => {
      navigate(`/invoices/create?creditFor=${selectedInvoice.id}&type=${typeQuery}`);
    }, 500);
    
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
