
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, Filter } from "lucide-react";
import { CreateTicketDialog } from "./CreateTicketDialog";
import { SupportTicketFilters } from "./SupportTicketFilters";

export function SupportHeader() {
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-start md:items-center p-4 md:p-6 border-b">
      <div>
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <p className="text-muted-foreground">Beheer uw support tickets en help uw klanten</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Vernieuwen
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => setShowCreateDialog(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Nieuwe Ticket
        </Button>
      </div>
      
      {showFilters && <SupportTicketFilters className="mt-4 w-full" />}
      
      <CreateTicketDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
}
