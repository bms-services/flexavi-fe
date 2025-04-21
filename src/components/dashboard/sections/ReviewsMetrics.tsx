
import React from "react";
import { StatsCardWithTable } from "../stats/StatsCardWithTable";
import { Review } from "@/types/reputation";
import { Star } from "lucide-react";

interface ReviewsMetricsProps {
  reviews: Review[];
}

export const ReviewsMetrics: React.FC<ReviewsMetricsProps> = ({ reviews }) => {
  // Calculate metrics
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  // Group reviews by platform
  const platforms = reviews.reduce((acc, review) => {
    acc[review.platform] = acc[review.platform] || [];
    acc[review.platform].push(review);
    return acc;
  }, {} as Record<string, Review[]>);

  // Prepare table data for platforms
  const platformData = Object.entries(platforms).map(([platform, platformReviews]) => {
    const platformAvg = platformReviews.reduce((sum, review) => sum + review.rating, 0) / platformReviews.length;
    return {
      label: platform,
      value: `${platformAvg.toFixed(1)}★`,
      subLabel: `${platformReviews.length} reviews`,
      // Random change value for demo
      change: parseFloat((Math.random() * 8 - 2).toFixed(1))
    };
  }).sort((a, b) => parseFloat(b.value) - parseFloat(a.value)).slice(0, 4);

  return (
    <StatsCardWithTable
      title="Klantreviews"
      value={`${averageRating.toFixed(1)}★`}
      change={3.8}
      tooltip="Gemiddelde rating uit alle platforms"
      viewReportLink="/reputation"
      subTitle="TOP REVIEW PLATFORMS"
      table={platformData}
    />
  );
};
