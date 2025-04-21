
import { ReviewStatus } from "@/types/reputation";

export const useReviewStatusBadge = (status: ReviewStatus) => {
  switch (status) {
    case "pending":
      return {
        label: "Wachtend",
        variant: "outline" as const
      };
    case "approved":
      return {
        label: "Goedgekeurd",
        variant: "default" as const
      };
    case "rejected":
      return {
        label: "Afgewezen",
        variant: "destructive" as const
      };
    case "published":
      return {
        label: "Gepubliceerd",
        variant: "success" as const
      };
    case "internal_review":
      return {
        label: "Interne review",
        variant: "warning" as const
      };
    default:
      return null;
  }
};
