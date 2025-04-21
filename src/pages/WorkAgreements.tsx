
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, PlusCircle, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { mockLeads } from "@/data/mockData";
import { WorkAgreement } from "@/types";
import { useWorkAgreementStatusBadge } from "@/hooks/useWorkAgreementStatusBadge";
import { WorkAgreementFilters } from "@/components/workagreements/filters/WorkAgreementFilters";
import { LeadTablePagination } from "@/components/leads/LeadTablePagination";

const WorkAgreements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const getLeadName = (leadId: string) => {
    const lead = mockLeads.find((l) => l.id === leadId);
    return lead ? lead.name : "Onbekend";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  // Filter work agreements
  const filteredAgreements = mockWorkAgreements.filter((wa) => {
    const lead = mockLeads.find((l) => l.id === wa.leadId);
    const searchMatch = 
      lead?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead?.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wa.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = statusFilter === "all" || wa.status === statusFilter;
    
    return searchMatch && statusMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAgreements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgreements = filteredAgreements.slice(startIndex, startIndex + itemsPerPage);

  const handleViewAgreement = (agreement: WorkAgreement) => {
    navigate(`/workagreements/${agreement.id}`);
  };

  const handleEditAgreement = (agreement: WorkAgreement) => {
    navigate(`/workagreements/edit/${agreement.id}`);
  };

  const handleCreateAgreement = () => {
    navigate("/workagreements/create");
  };

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Werkovereenkomsten</h1>
            <p className="text-muted-foreground">
              Beheer alle werkovereenkomsten op één plek
            </p>
          </div>
          <Button onClick={handleCreateAgreement}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nieuwe Werkovereenkomst
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Werkovereenkomsten overzicht</CardTitle>
                <CardDescription>
                  Een lijst van alle werkovereenkomsten
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <WorkAgreementFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              status={statusFilter}
              onStatusChange={setStatusFilter}
            />
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Acties</TableHead>
                  <TableHead>Nummer</TableHead>
                  <TableHead>Klant</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Bedrag</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Omschrijving
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAgreements.map((agreement) => {
                  const statusConfig = useWorkAgreementStatusBadge(agreement.status);
                  return (
                    <TableRow key={agreement.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewAgreement(agreement)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditAgreement(agreement)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {agreement.id.replace("wa-", "WO-")}
                      </TableCell>
                      <TableCell>{getLeadName(agreement.leadId)}</TableCell>
                      <TableCell>
                        {format(new Date(agreement.createdAt), "dd-MM-yyyy", {
                          locale: nl,
                        })}
                      </TableCell>
                      <TableCell>{formatCurrency(agreement.totalAmount)}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {agreement.description}
                      </TableCell>
                      <TableCell>
                        {statusConfig && (
                          <Badge variant={statusConfig.variant}>
                            {statusConfig.label}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <LeadTablePagination 
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WorkAgreements;
