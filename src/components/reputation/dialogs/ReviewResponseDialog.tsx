
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/types/reputation";
import { StarRating } from "../ui/StarRating";

interface ReviewResponseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: Review | null;
  onSubmit: (response: string) => void;
}

export const ReviewResponseDialog = ({
  open,
  onOpenChange,
  review,
  onSubmit,
}: ReviewResponseDialogProps) => {
  const [response, setResponse] = useState("");

  // Reset form when dialog opens with a new review
  useEffect(() => {
    if (open && review) {
      setResponse(review.responseText || "");
    }
  }, [open, review]);

  const handleSubmit = () => {
    onSubmit(response.trim());
    setResponse("");
  };

  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Reageren op review</DialogTitle>
          <DialogDescription>
            Uw reactie zal publiekelijk zichtbaar zijn bij de review van de klant.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 space-y-2">
            <h4 className="font-medium">{review.customerName}</h4>
            <div className="flex items-center space-x-2">
              <StarRating rating={review.rating} />
              <span className="text-sm text-muted-foreground">
                {review.platform === "internal" ? "Eigen website" : 
                 review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
              </span>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm">{review.text || "Geen reviewtekst beschikbaar"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Uw reactie</label>
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Schrijf hier uw antwoord..."
              rows={5}
            />
            <p className="text-xs text-muted-foreground">
              Houd uw reactie professioneel en behulpzaam. Bedank de klant voor de feedback en adresseer eventuele zorgen.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!response.trim()}
          >
            Reactie plaatsen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
