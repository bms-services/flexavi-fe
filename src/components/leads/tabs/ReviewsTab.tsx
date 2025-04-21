
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadTablePagination } from "@/components/leads/LeadTablePagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Star } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { useReviewStatusBadge } from "@/hooks/useReviewStatusBadge";
import { Lead } from "@/types/leads";
import { Review, ReviewStatus } from "@/types/reputation";
import { mockReviews } from "@/data/mockReviews";
import { StarRating } from "@/components/reputation/ui/StarRating";
import { RequestReviewDialog } from "../../reputation/dialogs/RequestReviewDialog";

interface ReviewsTabProps {
  lead: Lead;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({ lead }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  
  // Filter reviews for this lead
  const reviews = mockReviews.filter(review => review.leadId === lead.id);

  const handleRequestReview = () => {
    setIsRequestDialogOpen(true);
  };

  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = reviews
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleRequestReview}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Review verzoek sturen
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                Reviews van deze klant
              </CardDescription>
            </div>
            <Star className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nog geen reviews van deze klant.
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="hidden md:table-cell">Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Inhoud</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentReviews.map((review) => {
                    const statusBadge = useReviewStatusBadge(review.status as ReviewStatus);
                    
                    return (
                      <TableRow key={review.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => navigate(`/reputation?review=${review.id}`)}
                      >
                        <TableCell>
                          {format(new Date(review.createdAt), "d MMMM yyyy", {
                            locale: nl,
                          })}
                        </TableCell>
                        <TableCell>
                          {review.rating > 0 ? (
                            <StarRating rating={review.rating} size="sm" />
                          ) : (
                            <span className="text-xs text-muted-foreground">Nog niet beoordeeld</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {review.platform === "internal" ? "Eigen website" : 
                           review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
                        </TableCell>
                        <TableCell>
                          {statusBadge && (
                            <Badge variant={statusBadge.variant}>
                              {statusBadge.label}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                          {review.text || "Geen review tekst"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <LeadTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </CardContent>
      </Card>

      <RequestReviewDialog
        open={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
        lead={lead}
      />
    </div>
  );
};
