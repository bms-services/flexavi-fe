
import React from "react";
import { Check, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionsProps {
  onAccept: () => void;
  onRequestRevision: () => void;
  onReject: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onAccept,
  onRequestRevision,
  onReject,
}) => {
  return (
    <div className="sticky top-6 p-6">
      <div className="bg-white rounded-lg shadow-lg border p-4 flex flex-col gap-3">
        <Button 
          onClick={onAccept}
          className="bg-primary hover:bg-primary/90 text-white w-full"
        >
          <Check className="w-4 h-4 mr-2" />
          Accepteren
        </Button>
        
        <Button 
          variant="outline"
          onClick={onRequestRevision}
          className="w-full"
        >
          <Edit className="w-4 h-4 mr-2" />
          Revisie aanvragen
        </Button>
        
        <Button 
          variant="outline"
          onClick={onReject}
          className="w-full hover:bg-destructive hover:text-white"
        >
          <X className="w-4 h-4 mr-2" />
          Weigeren
        </Button>
      </div>
    </div>
  );
};
