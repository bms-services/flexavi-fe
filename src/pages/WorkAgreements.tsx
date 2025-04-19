
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
import { Eye, PlusCircle, Search, Edit2, Trash2, FileSignature } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockWorkAgreements } from "@/data/mockWorkAgreements";
import { mockLeads } from "@/data/mockData";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { WorkAgreement } from "@/types";
import { useWorkAgreementStatusBadge } from "@/hooks/useWorkAgreementStatusBadge";

const WorkAgreements = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredAgreements = mockWorkAgreements.filter(
    (wa) =>
      wa.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getLeadName(wa.leadId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      wa.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewAgreement = (agreement: WorkAgreement) => {
    navigate(`/portal/workagreement/${agreement.id}`);
  };

  const handleEditAgreement = (agreement: WorkAgreement) => {
    navigate(`/workagreements/edit/${agreement.id}`);
  };

  const handleDeleteAgreement = (agreement: WorkAgreement) => {
    console.log("Delete agreement:", agreement);
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
              <div className="relative w-full sm:w-auto sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Zoek werkovereenkomsten..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
                {filteredAgreements.map((agreement) => {
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
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAgreement(agreement)}
                          >
                            <Trash2 className="h-4 w-4" />
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WorkAgreements;
