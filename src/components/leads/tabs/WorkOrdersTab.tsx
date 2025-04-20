import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadTablePagination } from "@/components/leads/LeadTablePagination";
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
import { PlusCircle, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface WorkOrdersTabProps {
  leadId: string;
}

type WorkOrder = {
  id: string;
  title: string;
  status: "not_started" | "in_progress" | "completed" | "canceled";
  createdAt: string;
  plannedDate: string;
  address: string;
};

// Sample work orders data
const mockWorkOrders: WorkOrder[] = [
  {
    id: "work-1",
    title: "Dakbedekking vervangen",
    status: "in_progress",
    createdAt: "2025-03-15T10:00:00.000Z",
    plannedDate: "2025-04-25T10:00:00.000Z",
    address: "Hoofdstraat 123, Amsterdam",
  },
  {
    id: "work-2",
    title: "Goot reparatie",
    status: "completed",
    createdAt: "2025-02-10T10:00:00.000Z",
    plannedDate: "2025-03-01T10:00:00.000Z",
    address: "Hoofdstraat 123, Amsterdam",
  },
];

const getStatusBadge = (status: WorkOrder["status"]) => {
  const statusConfig = {
    not_started: { label: "Niet gestart", variant: "outline" as const },
    in_progress: { label: "In uitvoering", variant: "default" as const },
    completed: { label: "Afgerond", variant: "success" as const },
    canceled: { label: "Geannuleerd", variant: "destructive" as const },
  };

  const config = statusConfig[status] || statusConfig.not_started;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export const WorkOrdersTab: React.FC<WorkOrdersTabProps> = ({ leadId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const workOrders = mockWorkOrders;

  const totalPages = Math.ceil(workOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWorkOrders = workOrders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(startIndex, endIndex);

  const navigate = useNavigate();
  const handleCreateWorkOrder = () => {
    navigate(`/projects/create?leadId=${leadId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleCreateWorkOrder}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe Werkopdracht
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Werkopdrachten</CardTitle>
              <CardDescription>
                Alle werkopdrachten voor deze lead
              </CardDescription>
            </div>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {workOrders.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nog geen werkopdrachten voor deze lead.
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titel</TableHead>
                    <TableHead>Datum Aangemaakt</TableHead>
                    <TableHead>Geplande Datum</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Adres</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentWorkOrders.map((workOrder) => (
                    <TableRow key={workOrder.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/projects/${workOrder.id}`)}
                    >
                      <TableCell>
                        <span className="font-medium">{workOrder.title}</span>
                      </TableCell>
                      <TableCell>
                        {format(new Date(workOrder.createdAt), "d MMMM yyyy", {
                          locale: nl,
                        })}
                      </TableCell>
                      <TableCell>
                        {format(new Date(workOrder.plannedDate), "d MMMM yyyy", {
                          locale: nl,
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(workOrder.status)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {workOrder.address}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <LeadTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
