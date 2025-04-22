
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { SupportTicket } from "@/types";
import { formatRelativeDate } from "@/utils/format";

interface SupportTicketsTableProps {
  tickets: SupportTicket[];
  onDelete: (ticket: SupportTicket) => void;
}

export const SupportTicketsTable: React.FC<SupportTicketsTableProps> = ({ 
  tickets,
  onDelete 
}) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'open': { variant: 'default' as const, label: 'Open' },
      'in-progress': { variant: 'secondary' as const, label: 'In behandeling' },
      'waiting-for-customer': { variant: 'warning' as const, label: 'Wacht op klant' },
      'waiting-for-staff': { variant: 'warning' as const, label: 'Wacht op medewerker' },
      'resolved': { variant: 'success' as const, label: 'Opgelost' },
      'closed': { variant: 'outline' as const, label: 'Gesloten' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['open'];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'low': { variant: 'outline' as const, label: 'Laag' },
      'medium': { variant: 'secondary' as const, label: 'Middel' },
      'high': { variant: 'destructive' as const, label: 'Hoog' },
      'urgent': { variant: 'destructive' as const, label: 'Urgent' },
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig['medium'];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="rounded-md overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket</TableHead>
            <TableHead>Klant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioriteit</TableHead>
            <TableHead>Laatste update</TableHead>
            <TableHead>Toegewezen aan</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                Geen support tickets gevonden
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{ticket.title}</div>
                    <div className="text-sm text-muted-foreground">#{ticket.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{ticket.customerName}</div>
                  <div className="text-sm text-muted-foreground">{ticket.customerEmail}</div>
                </TableCell>
                <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                <TableCell>{formatRelativeDate(new Date(ticket.updatedAt))}</TableCell>
                <TableCell>
                  {ticket.assignedTo ? (
                    <div className="flex items-center gap-2">
                      {ticket.assignedTo.avatar && (
                        <img 
                          src={ticket.assignedTo.avatar} 
                          alt={ticket.assignedTo.name}
                          className="w-6 h-6 rounded-full" 
                        />
                      )}
                      <span>{ticket.assignedTo.name}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Niet toegewezen</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/support/${ticket.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/support/${ticket.id}/edit`)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(ticket)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
