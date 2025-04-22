
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SupportHeaderProps {
  onNewTicket: () => void;
}

export const SupportHeader = ({ onNewTicket }: SupportHeaderProps) => {
  return (
    <div className="bg-white border-b p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground">Stel een vraag aan ons support team</p>
        </div>
        <Button onClick={onNewTicket}>
          <Plus className="mr-2 h-4 w-4" />
          Nieuw Ticket
        </Button>
      </div>
    </div>
  );
};
