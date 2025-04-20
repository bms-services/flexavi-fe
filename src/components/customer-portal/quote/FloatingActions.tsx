
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
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg border px-4 py-3 flex gap-3">
        <Button 
          onClick={onAccept}
          className="bg-primary hover:bg-primary/90 text-white min-w-[140px]"
        >
          <Check className="w-4 h-4 mr-2" />
          Accepteren
        </Button>
        
        <Button 
          variant="outline"
          onClick={onRequestRevision}
          className="min-w-[140px]"
        >
          <Edit className="w-4 h-4 mr-2" />
          Revisie aanvragen
        </Button>
        
        <Button 
          variant="outline"
          onClick={onReject}
          className="min-w-[140px] hover:bg-destructive hover:text-white"
        >
          <X className="w-4 h-4 mr-2" />
          Weigeren
        </Button>
      </div>
    </div>
  );
};
