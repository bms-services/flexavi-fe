
import React, { useState } from "react";
import { Lead } from "@/types";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import { LeadStatusBadge } from "./LeadStatusBadge";

interface LeadListProps {
  leads: Lead[];
}

export const LeadList: React.FC<LeadListProps> = ({ leads }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-auto sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Zoek leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe Lead
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Naam</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Telefoon</TableHead>
              <TableHead className="hidden lg:table-cell">Adres</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Bron</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32">
                  Geen leads gevonden
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Link
                      to={`/leads/${lead.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {lead.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {lead.email}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {lead.phone}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {lead.address}
                  </TableCell>
                  <TableCell>
                    <LeadStatusBadge status={lead.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {lead.source}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
