
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SupportHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground">Beheer klantenvragen en ondersteuningsverzoeken</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filteren
          </Button>
          <Button onClick={() => navigate("/support/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Nieuw Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};
