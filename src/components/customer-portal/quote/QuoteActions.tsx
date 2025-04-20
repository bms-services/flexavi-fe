
import React from "react";
import { Button } from "@/components/ui/button";

interface QuoteActionsProps {
  onRevisionRequest: () => void;
  onAccept: () => void;
}

export const QuoteActions: React.FC<QuoteActionsProps> = ({
  onRevisionRequest,
  onAccept,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
      <Button 
        variant="outline" 
        onClick={onRevisionRequest}
        className="w-full sm:w-auto order-2 sm:order-1"
      >
        Revisie Aanvragen
      </Button>
      <Button 
        onClick={onAccept}
        className="w-full sm:w-auto order-1 sm:order-2"
      >
        Offerte accepteren
      </Button>
    </div>
  );
};
