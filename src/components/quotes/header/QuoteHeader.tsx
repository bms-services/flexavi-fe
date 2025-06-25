
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save } from "lucide-react";

interface QuoteHeaderProps {
  isEditing: boolean;
}

export const QuoteHeader: React.FC<QuoteHeaderProps> = ({ isEditing }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate("/quotes")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Terug naar offertes
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Offerte bewerken" : "Nieuwe offerte"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Bewerk de gegevens van de offerte"
              : "Voeg een nieuwe offerte toe"}
          </p>
        </div>
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Offerte opslaan
        </Button>
      </div>
    </>
  );
};
