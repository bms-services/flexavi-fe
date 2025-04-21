
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./ui/StarRating";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { MoreHorizontal, Search, FileText, MessageSquare, Check, X, Eye, EyeOff } from "lucide-react";
import { ReviewStatus, ReviewPlatform, Review } from "@/types/reputation";
import { ReviewResponseDialog } from "./dialogs/ReviewResponseDialog";
import { useReviewStatusBadge } from "@/hooks/useReviewStatusBadge";

export const ReviewsList = ({ reputation }: { reputation: any }) => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);

  // Handle review management actions
  const handleUpdateStatus = (reviewId: string, newStatus: ReviewStatus) => {
    reputation.updateReviewStatus(reviewId, newStatus);
  };

  const handleAddResponse = (review: Review) => {
    setSelectedReview(review);
    setIsResponseDialogOpen(true);
  };

  const handleSubmitResponse = (responseText: string) => {
    if (selectedReview) {
      reputation.addReviewResponse(selectedReview.id, responseText);
      setIsResponseDialogOpen(false);
      setSelectedReview(null);
    }
  };

  const handleTogglePublic = (reviewId: string) => {
    reputation.togglePublicDisplay(reviewId);
  };

  const statusOptions = [
    { value: "all", label: "Alle statussen" },
    { value: "pending", label: "Wachtend" },
    { value: "approved", label: "Goedgekeurd" },
    { value: "internal_review", label: "Interne review" },
    { value: "published", label: "Gepubliceerd" },
    { value: "rejected", label: "Afgewezen" }
  ];

  const platformOptions = [
    { value: "all", label: "Alle platforms" },
    { value: "google", label: "Google" },
    { value: "trustpilot", label: "Trustpilot" },
    { value: "facebook", label: "Facebook" },
    { value: "internal", label: "Eigen website" }
  ];

  return (
    <div className="space-y-6 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Reviews beheren</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op naam of inhoud..."
                className="pl-9"
                value={reputation.searchTerm}
                onChange={(e) => reputation.setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={reputation.activeFilter} onValueChange={(value) => reputation.setActiveFilter(value as ReviewStatus | "all")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Alle statussen" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={reputation.platformFilter} onValueChange={(value) => reputation.setPlatformFilter(value as ReviewPlatform | "all")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Alle platforms" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Klant</TableHead>
                  <TableHead>Beoordeling</TableHead>
                  <TableHead className="hidden md:table-cell">Platform</TableHead>
                  <TableHead className="hidden md:table-cell">Datum</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reputation.filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Geen reviews gevonden met de huidige filters
                    </TableCell>
                  </TableRow>
                ) : (
                  reputation.filteredReviews.map((review: Review) => {
                    const statusBadge = useReviewStatusBadge(review.status);
                    return (
                      <TableRow key={review.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{review.customerName}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {review.text || "Geen beoordeling tekst"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {review.rating > 0 ? (
                            <StarRating rating={review.rating} size="sm" />
                          ) : (
                            <span className="text-xs text-muted-foreground">Niet beoordeeld</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {review.platform === "internal" ? "Eigen website" : 
                           review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(parseISO(review.createdAt), "d MMM yyyy", { locale: nl })}
                        </TableCell>
                        <TableCell>
                          {statusBadge && (
                            <Badge variant={statusBadge.variant}>
                              {statusBadge.label}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleAddResponse(review)}>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                <span>Reageren</span>
                              </DropdownMenuItem>
                              
                              {review.status === "approved" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(review.id, "published")}>
                                  <Check className="h-4 w-4 mr-2" />
                                  <span>Publiceren</span>
                                </DropdownMenuItem>
                              )}
                              
                              {review.status === "pending" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(review.id, "approved")}>
                                    <Check className="h-4 w-4 mr-2" />
                                    <span>Goedkeuren</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(review.id, "internal_review")}>
                                    <FileText className="h-4 w-4 mr-2" />
                                    <span>Interne review</span>
                                  </DropdownMenuItem>
                                </>
                              )}
                              
                              {review.status === "internal_review" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(review.id, "approved")}>
                                    <Check className="h-4 w-4 mr-2" />
                                    <span>Goedkeuren</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(review.id, "rejected")}>
                                    <X className="h-4 w-4 mr-2" />
                                    <span>Afwijzen</span>
                                  </DropdownMenuItem>
                                </>
                              )}
                              
                              {(review.status === "published" || review.status === "approved") && (
                                <DropdownMenuItem onClick={() => handleTogglePublic(review.id)}>
                                  {review.publicDisplay ? (
                                    <>
                                      <EyeOff className="h-4 w-4 mr-2" />
                                      <span>Verbergen</span>
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-4 w-4 mr-2" />
                                      <span>Tonen</span>
                                    </>
                                  )}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ReviewResponseDialog
        open={isResponseDialogOpen}
        onOpenChange={setIsResponseDialogOpen}
        review={selectedReview}
        onSubmit={handleSubmitResponse}
      />
    </div>
  );
};
