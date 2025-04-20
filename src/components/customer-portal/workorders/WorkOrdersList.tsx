
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface WorkOrder {
  id: string;
  description: string;
  status: string;
  createdAt: string;
  plannedStartDate?: string;
}

interface WorkOrdersListProps {
  workOrders: WorkOrder[];
}

export const WorkOrdersList: React.FC<WorkOrdersListProps> = ({ workOrders }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planned':
        return <Badge variant="secondary">Gepland</Badge>;
      case 'in_progress':
        return <Badge variant="default">In Uitvoering</Badge>;
      case 'completed':
        return <Badge variant="success">Afgerond</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (workOrders.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            Er zijn nog geen werkopdrachten beschikbaar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {workOrders.map((workOrder) => (
        <Card key={workOrder.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Werkopdracht {workOrder.id}
                </CardTitle>
                <CardDescription className="mt-1">
                  {workOrder.description}
                </CardDescription>
              </div>
              {getStatusBadge(workOrder.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Aangemaakt op: {format(new Date(workOrder.createdAt), "d MMMM yyyy", { locale: nl })}</p>
              {workOrder.plannedStartDate && (
                <p>Geplande startdatum: {format(new Date(workOrder.plannedStartDate), "d MMMM yyyy", { locale: nl })}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
