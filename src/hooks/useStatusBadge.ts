
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

  const config = statusConfig[status];
  return { label: config.label, variant: config.variant };
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

  const config = statusConfig[status];
  return { label: config.label, variant: config.variant };
};
