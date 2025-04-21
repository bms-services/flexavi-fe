
import React from "react";
import { Button } from "@/components/ui/button";

interface TableActionsProps {
  selectedCount: number;
  onAction: (action: string) => void;
  onClearSelection: () => void;
}

export const TableActions: React.FC<TableActionsProps> = ({
  selectedCount,
  onAction,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;
  
  return (
    <div className="bg-muted p-2 rounded-md mt-2 flex items-center justify-between">
      <span>{selectedCount} uitgaven geselecteerd</span>
      <div className="space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onAction('Goedkeuren')}
        >
          Goedkeuren
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onAction('Exporteren')}
        >
          Exporteren
        </Button>
        <Button 
          variant="default" 
          size="sm"
          onClick={onClearSelection}
        >
          Selectie wissen
        </Button>
      </div>
    </div>
  );
};
