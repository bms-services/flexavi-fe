
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SupportTicket } from "@/types/support";
import { SupportTicketStatusBadge, SupportTicketPriorityBadge } from "./SupportTicketStatusBadge";
import { formatRelativeDate } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, ExternalLink, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SupportTicketsTableProps {
  tickets: SupportTicket[];
  onDelete?: (id: string) => void;
}

export function SupportTicketsTable({ tickets, onDelete }: SupportTicketsTableProps) {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SupportTicket | null;
    direction: 'ascending' | 'descending';
  }>({ key: 'updatedAt', direction: 'descending' });

  const handleSort = (key: keyof SupportTicket) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTickets = React.useMemo(() => {
    const sortableTickets = [...tickets];
    if (sortConfig.key) {
      sortableTickets.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTickets;
  }, [tickets, sortConfig]);

  const viewTicket = (id: string) => {
    navigate(`/support/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Weet u zeker dat u deze ticket wilt verwijderen?")) {
      onDelete?.(id);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              <button
                className="flex items-center gap-1 hover:text-primary"
                onClick={() => handleSort('title')}
              >
                Ticket
              </button>
            </TableHead>
            <TableHead>Klant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioriteit</TableHead>
            <TableHead>Categorie</TableHead>
            <TableHead>
              <button
                className="flex items-center gap-1 hover:text-primary"
                onClick={() => handleSort('updatedAt')}
              >
                Laatste update
              </button>
            </TableHead>
            <TableHead>Toegewezen aan</TableHead>
            <TableHead className="text-right">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                Geen tickets gevonden.
              </TableCell>
            </TableRow>
          ) : (
            sortedTickets.map((ticket) => (
              <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell 
                  className="font-medium"
                  onClick={() => viewTicket(ticket.id)}
                >
                  {ticket.title}
                </TableCell>
                <TableCell onClick={() => viewTicket(ticket.id)}>
                  {ticket.customerName}
                </TableCell>
                <TableCell onClick={() => viewTicket(ticket.id)}>
                  <SupportTicketStatusBadge status={ticket.status} />
                </TableCell>
                <TableCell onClick={() => viewTicket(ticket.id)}>
                  <SupportTicketPriorityBadge priority={ticket.priority} />
                </TableCell>
                <TableCell onClick={() => viewTicket(ticket.id)}>
                  {ticket.category === 'technical' && 'Technisch'}
                  {ticket.category === 'billing' && 'Facturatie'}
                  {ticket.category === 'feature-request' && 'Feature verzoek'}
                  {ticket.category === 'account' && 'Account'}
                  {ticket.category === 'general' && 'Algemeen'}
                </TableCell>
                <TableCell onClick={() => viewTicket(ticket.id)}>
                  {formatRelativeDate(new Date(ticket.updatedAt))}
                </TableCell>
                <TableCell onClick={() => viewTicket(ticket.id)}>
                  {ticket.assignedTo ? ticket.assignedTo.name : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acties</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => viewTicket(ticket.id)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Bekijken
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/support/edit/${ticket.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Bewerken
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(ticket.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Verwijderen
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
