
import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const getSizeClass = () => {
    switch (size) {
      case "sm": return "h-3 w-3";
      case "lg": return "h-6 w-6";
      default: return "h-4 w-4";
    }
  };

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const filled = interactive
          ? starValue <= (hoverRating || rating)
          : starValue <= rating;

        return (
          <Star
            key={index}
            className={`${getSizeClass()} ${
              filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => {
              if (interactive && onRatingChange) {
                onRatingChange(starValue);
              }
            }}
            onMouseEnter={() => {
              if (interactive) {
                setHoverRating(starValue);
              }
            }}
            onMouseLeave={() => {
              if (interactive) {
                setHoverRating(0);
              }
            }}
          />
        );
      })}
    </div>
  );
};
