
import { WorkAgreementStatus } from "@/types";

export const useWorkAgreementStatusBadge = (status: WorkAgreementStatus) => {
  const statusConfig = {
    draft: { 
      label: "Concept", 
      variant: "outline" as const 
    },
    sent: { 
      label: "Verstuurd", 
      variant: "default" as const 
    },
    in_review: {
      label: "In revisie",
      variant: "warning" as const
    },
    signed: { 
      label: "Ondertekend", 
      variant: "success" as const 
    },
    rejected: {
      label: "Geweigerd",
      variant: "destructive" as const
    },
    expired: {
      label: "Verlopen",
      variant: "secondary" as const
    },
    completed: { 
      label: "Afgerond", 
      variant: "success" as const 
    },
    cancelled: { 
      label: "Geannuleerd", 
      variant: "destructive" as const 
    },
  };

  return statusConfig[status] || statusConfig.draft;
};
