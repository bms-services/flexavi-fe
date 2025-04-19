
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface LeadActionsProps {
  onCreateClick: () => void;
}

export const LeadActions: React.FC<LeadActionsProps> = ({ onCreateClick }) => {
  return (
    <Button size="sm" onClick={onCreateClick}>
      <PlusCircle className="mr-2 h-3.5 w-3.5" />
      Nieuwe Lead
    </Button>
  );
};
