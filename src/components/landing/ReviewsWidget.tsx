
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { mockReviews } from "@/data/mockReviews";
import { Review } from "@/types/reputation";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";

export default function ReviewsWidget() {
  // Filter for published reviews with text
  const publishedReviews = mockReviews.filter(
    review => (review.status === "published" || review.status === "approved") && 
              review.publicDisplay && 
              review.rating >= 3 &&
              review.text.length > 0
  );

  // Calculate average rating
  const averageRating = publishedReviews.reduce((sum, review) => sum + review.rating, 0) / 
                        publishedReviews.length || 0;

  return (
    <section className="py-24 bg-muted/30" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Wat onze klanten zeggen
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-2 mb-4"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-6 w-6 ${star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                />
              ))}
            </div>
            <span className="text-xl font-bold">{averageRating.toFixed(1)}/5</span>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground"
          >
            Meer dan {publishedReviews.length} tevreden klanten hebben ons beoordeeld
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedReviews.slice(0, 6).map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: Review, index: number }) {
  const platformIcons = {
    google: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    trustpilot: "https://consumer-ratings-logos.s3.amazonaws.com/trustpilot/trustpilot-logo-square.svg",
    facebook: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg",
    internal: ""
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-background rounded-xl shadow-md p-6 border hover-lift"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
            {review.customerName.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium">{review.customerName}</h3>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(review.createdAt), "d MMMM yyyy", { locale: nl })}
            </p>
          </div>
        </div>
        {review.platform !== "internal" && (
          <img 
            src={platformIcons[review.platform as keyof typeof platformIcons]} 
            alt={review.platform} 
            className="h-6 w-6"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
      </div>
      
      <div className="flex mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
          />
        ))}
      </div>
      
      <p className="text-gray-700">{review.text}</p>
      
      {review.responseText && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-medium">Onze reactie:</p>
          <p className="text-sm text-muted-foreground">{review.responseText}</p>
        </div>
      )}
    </motion.div>
  );
}
