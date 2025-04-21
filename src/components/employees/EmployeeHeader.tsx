
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useEmployeeDialog } from "./useEmployeeDialog";

export const EmployeeHeader = () => {
  const { openDialog } = useEmployeeDialog();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Medewerkers</h1>
      </div>
      <Button onClick={() => openDialog()}>
        <Plus className="h-4 w-4 mr-2" />
        Nieuwe Medewerker
      </Button>
    </div>
  );
};
