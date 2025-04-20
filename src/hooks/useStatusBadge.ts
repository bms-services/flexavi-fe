
import { QuoteStatus, InvoiceStatus } from "@/types";

export const useQuoteStatusBadge = (status?: QuoteStatus) => {
  if (!status) return null;

  const statusConfig = {
    draft: { label: "Concept", variant: "outline" as const },
    sent: { label: "Verzonden", variant: "default" as const },
    accepted: { label: "Geaccepteerd", variant: "success" as const },
    rejected: { label: "Afgewezen", variant: "destructive" as const },
    revised: { label: "Herzien", variant: "warning" as const },
  };

  // Check if the status exists in the statusConfig
  if (!statusConfig[status]) {
    console.warn(`Unknown quote status: ${status}`);
    return { label: status, variant: "outline" as const };
  }

  return { 
    label: statusConfig[status].label, 
    variant: statusConfig[status].variant 
  };
};

export const useInvoiceStatusBadge = (status?: InvoiceStatus) => {
  if (!status) return null;

  const statusConfig = {
    draft: { label: "Concept", variant: "outline" as const },
    sent: { label: "Verzonden", variant: "default" as const },
    paid: { label: "Betaald", variant: "success" as const },
    overdue: { label: "Verlopen", variant: "destructive" as const },
    canceled: { label: "Geannuleerd", variant: "secondary" as const },
    collection: { label: "Bij deurwaarder", variant: "warning" as const },
    legal: { label: "Rechtzaak", variant: "destructive" as const },
  };

  // Check if the status exists in the statusConfig
  if (!statusConfig[status]) {
    console.warn(`Unknown invoice status: ${status}`);
    return { label: status, variant: "outline" as const };
  }

  return { 
    label: statusConfig[status].label, 
    variant: statusConfig[status].variant 
  };
};
