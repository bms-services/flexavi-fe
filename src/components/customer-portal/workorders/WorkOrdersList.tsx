
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clipboard, CalendarRange, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";

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
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Gepland</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Uitvoering</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Afgerond</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (workOrders.length === 0) {
    return (
      <Card className="border shadow-sm">
        <CardContent className="py-8">
          <div className="text-center space-y-3">
            <Clipboard className="h-12 w-12 text-muted-foreground mx-auto opacity-40" />
            <p className="text-muted-foreground">
              Er zijn nog geen werkopdrachten beschikbaar.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {workOrders.map((workOrder) => (
        <Card key={workOrder.id} className="border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-primary" />
                {workOrder.id}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {workOrder.description}
              </p>
            </div>
            {getStatusBadge(workOrder.status)}
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarRange className="mr-2 h-4 w-4" />
                <span>
                  {workOrder.plannedStartDate 
                    ? format(new Date(workOrder.plannedStartDate), "d MMMM yyyy", { locale: nl })
                    : "Nog niet ingepland"}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="mt-2 text-primary w-full justify-start pl-0 hover:pl-2 transition-all">
                Bekijk details <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
