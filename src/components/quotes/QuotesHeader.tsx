import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface QuotesHeaderProps {
  onNewQuotation: () => void;
}

export const QuotesHeader: React.FC<QuotesHeaderProps> = ({
  onNewQuotation,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Offertes</h1>
        <p className="text-muted-foreground">
          Beheer al je offertes op één plek
        </p>
      </div>
      <Button onClick={onNewQuotation} className="w-full sm:w-auto">
        <PlusCircle className="mr-2 h-4 w-4" />
        Nieuwe Offerte
      </Button>
    </div>
  );
};
