import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExpenseHeaderProps {
  isEditing: boolean;
  isReadOnly: boolean;
  handleDelete?: () => void;
}

export const ExpenseHeader: React.FC<ExpenseHeaderProps> = ({
  isEditing,
  isReadOnly,
  handleDelete,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          {isEditing ? "Uitgave bewerken" : "Nieuwe uitgave"}
        </h1>
        <p className="text-muted-foreground">
          {isReadOnly
            ? "Deze uitgave is definitief en kan niet meer worden bewerkt"
            : isEditing
              ? "Bewerk de details van deze uitgave"
              : "Maak een nieuwe uitgave aan"}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button variant="outline" onClick={() => navigate("/expenses")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug
        </Button>

        {handleDelete && (
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Verwijderen
          </Button>
        )}

        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Opslaan
        </Button>
      </div>
    </div>
  );
};
