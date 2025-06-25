
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface LeadActionsProps {
  onCreateClick: () => void;
}

export const LeadActions: React.FC<LeadActionsProps> = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">
          Beheer al je leads op één plek.
        </p>
      </div>
      <Button size="sm" onClick={onCreateClick}>
        <PlusCircle className="mr-2 h-3.5 w-3.5" />
        Nieuwe Lead
      </Button>
    </div>
  );
};
