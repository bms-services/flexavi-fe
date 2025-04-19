
import { WorkAgreementStatus } from "@/types";

export const useWorkAgreementStatusBadge = (status: WorkAgreementStatus) => {
  const statusConfig = {
    draft: { 
      label: "Concept", 
      variant: "outline" as const 
    },
    sent: { 
      label: "Verzonden", 
      variant: "default" as const 
    },
    signed: { 
      label: "Ondertekend", 
      variant: "success" as const 
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
