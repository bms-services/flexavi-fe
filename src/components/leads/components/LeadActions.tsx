
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus, PlusCircle, Edit2 } from "lucide-react";

export const LeadDetailActions = () => {
  return (
    <div className="flex items-center gap-3 w-full justify-start">
      <Button variant="outline">
        <PlusCircle className="mr-2 h-4 w-4" />
        Notitie Toevoegen
      </Button>
      <Button variant="outline">
        <Calendar className="mr-2 h-4 w-4" />
        Afspraak Plannen
      </Button>
      <Button variant="outline">
        <FilePlus className="mr-2 h-4 w-4" />
        Offerte maken
      </Button>
      <Button variant="outline">
        <FileText className="mr-2 h-4 w-4" />
        Factuur maken
      </Button>
      <Button>
        <Edit2 className="mr-2 h-4 w-4" />
        Lead Bewerken
      </Button>
    </div>
  );
};
