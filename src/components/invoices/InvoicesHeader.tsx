
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface InvoicesHeaderProps {
  onCreateNewInvoice: () => void;
}

export const InvoicesHeader: React.FC<InvoicesHeaderProps> = ({
  onCreateNewInvoice,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div className="flex-1">
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
        Facturen
      </h1>
      <p className="text-muted-foreground">
        Beheer al je facturen op één plek
      </p>
    </div>
    <Button onClick={onCreateNewInvoice}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Nieuwe Factuur
    </Button>
  </div>
);
