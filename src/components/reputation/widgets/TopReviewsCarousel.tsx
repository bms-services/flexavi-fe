
import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import { Review } from "@/types/reputation";
import { StarRating } from "../ui/StarRating";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TopReviewsCarousel = ({ reviews }: { reviews: Review[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter for published reviews with high ratings (4-5 stars)
  const topReviews = reviews.filter(
    review => 
      (review.status === "published" || review.status === "approved") && 
      review.rating >= 4 &&
      review.text.length > 0 // Only include reviews with text
  ).sort((a, b) => b.rating - a.rating);

  // Auto-rotate reviews every 5 seconds
  useEffect(() => {
    if (topReviews.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(current => (current + 1) % topReviews.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [topReviews.length]);

  const handlePrevious = () => {
    setCurrentIndex(current => 
      current === 0 ? topReviews.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(current => 
      (current + 1) % topReviews.length
    );
  };

  if (topReviews.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Nog geen top beoordelingen om te tonen
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {topReviews.map((review) => (
            <div key={review.id} className="w-full flex-shrink-0">
              <Card className="bg-muted/30 border-none shadow-none">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <StarRating rating={review.rating} />
                  </div>
                  <blockquote className="italic border-l-4 border-primary/40 pl-4 text-lg">
                    "{review.text}"
                  </blockquote>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{review.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(review.createdAt), "d MMMM yyyy", { locale: nl })}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Via {review.platform === "internal" ? "Eigen website" : 
                           review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {topReviews.length > 1 && (
        <>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background shadow-md"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background shadow-md"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <div className="flex justify-center mt-4 gap-1">
            {topReviews.map((_, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                size="icon" 
                className={`w-2 h-2 rounded-full p-0 ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
