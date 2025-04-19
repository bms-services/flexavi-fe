
import React from "react";
import { Button } from "@/components/ui/button";

export const LeadDetailActions = () => {
  return (
    <div className="flex gap-3">
      <Button variant="outline">Notitie Toevoegen</Button>
      <Button variant="outline">Afspraak Plannen</Button>
      <Button>Lead Bewerken</Button>
    </div>
  );
};
