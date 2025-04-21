
import React from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Review, ReviewStatus } from "@/types/reputation";
import { StarRating } from "../ui/StarRating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useReviewStatusBadge } from "@/hooks/useReviewStatusBadge";

interface RecentReviewsWidgetProps {
  reviews: Review[];
  onUpdateStatus: (reviewId: string, status: ReviewStatus) => void;
}

export const RecentReviewsWidget = ({ reviews, onUpdateStatus }: RecentReviewsWidgetProps) => {
  // Sort reviews by date, newest first
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedReviews.length === 0 ? (
        <p className="text-center py-6 text-muted-foreground">Geen recente reviews beschikbaar</p>
      ) : (
        sortedReviews.map(review => (
          <RecentReviewItem 
            key={review.id} 
            review={review} 
            onUpdateStatus={onUpdateStatus} 
          />
        ))
      )}
    </div>
  );
};

const RecentReviewItem = ({ 
  review, 
  onUpdateStatus 
}: { 
  review: Review;
  onUpdateStatus: (reviewId: string, status: ReviewStatus) => void;
}) => {
  const statusBadge = useReviewStatusBadge(review.status);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{review.customerName}</h3>
            {statusBadge && (
              <Badge variant={statusBadge.variant}>
                {statusBadge.label}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {format(parseISO(review.createdAt), "d MMMM yyyy", { locale: nl })}
            {review.platform !== "internal" && (
              <span className="ml-2">
                via {review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
              </span>
            )}
          </p>
        </div>
        {review.rating > 0 && <StarRating rating={review.rating} />}
      </div>
      
      {review.text ? (
        <p className="my-2 text-sm">{review.text}</p>
      ) : review.status === "pending" ? (
        <p className="my-2 italic text-sm text-muted-foreground">
          Wachtend op klantreactie...
        </p>
      ) : null}
      
      {review.responseText && (
        <div className="bg-muted/50 p-2 rounded-md mt-2 text-sm">
          <p className="font-medium text-xs">Uw antwoord:</p>
          <p>{review.responseText}</p>
        </div>
      )}
      
      {(review.status === "pending" || review.status === "internal_review") && (
        <div className="mt-3 flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onUpdateStatus(review.id, "approved")}
          >
            <Check className="mr-1 h-4 w-4" /> Goedkeuren
          </Button>
          {review.status === "pending" && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateStatus(review.id, "internal_review")}
            >
              <X className="mr-1 h-4 w-4" /> Probleem melden
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
