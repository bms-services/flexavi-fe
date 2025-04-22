
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Trash2, 
  Edit, 
  UserPlus, 
  Tag,
  Printer,
  Mail,
  ClipboardCopy
} from "lucide-react";
import { SupportTicket } from "@/types/support";
import { useSupportTickets } from "@/hooks/useSupportTickets";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface SupportTicketActionsProps {
  ticket: SupportTicket;
}

export function SupportTicketActions({ ticket }: SupportTicketActionsProps) {
  const { updateTicketStatus, updateTicketPriority, assignTicket, deleteTicket } = useSupportTickets();
  const navigate = useNavigate();
  
  const handleDelete = () => {
    if (confirm("Weet u zeker dat u deze ticket wilt verwijderen?")) {
      deleteTicket(ticket.id);
      navigate("/support");
    }
  };
  
  const handleStatusChange = (status: string) => {
    updateTicketStatus(ticket.id, status as any);
  };
  
  const handlePriorityChange = (priority: string) => {
    updateTicketPriority(ticket.id, priority as any);
  };
  
  const handleAssign = () => {
    // In a real app, you would show a user picker dialog here
    assignTicket(ticket.id, "staff-1", "Henk Visser");
  };
  
  const handleCopyId = () => {
    navigator.clipboard.writeText(ticket.id);
    toast({
      title: "Ticket ID gekopieerd",
      description: `Ticket ID ${ticket.id} is gekopieerd naar het klembord.`
    });
  };

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate(`/support/edit/${ticket.id}`)}
      >
        <Edit className="h-4 w-4 mr-2" />
        Bewerken
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Ticket acties</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate(`/support/edit/${ticket.id}`)}>
              <Edit className="h-4 w-4 mr-2" />
              Bewerken
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAssign}>
              <UserPlus className="h-4 w-4 mr-2" />
              Toewijzen
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyId}>
              <ClipboardCopy className="h-4 w-4 mr-2" />
              Kopieer ticket ID
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Status wijzigen</DropdownMenuLabel>
          
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleStatusChange("open")}>
              Open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("in-progress")}>
              In behandeling
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("waiting-for-customer")}>
              Wachtend op klant
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("resolved")}>
              Opgelost
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange("closed")}>
              Gesloten
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Prioriteit wijzigen</DropdownMenuLabel>
          
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handlePriorityChange("low")}>
              Laag
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange("medium")}>
              Gemiddeld
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange("high")}>
              Hoog
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePriorityChange("urgent")}>
              Urgent
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Afdrukken
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Mail className="h-4 w-4 mr-2" />
            E-mail sturen
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Verwijderen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
