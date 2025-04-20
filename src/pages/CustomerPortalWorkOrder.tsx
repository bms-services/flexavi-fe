
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { ArrowLeft, CalendarRange, Clipboard, MapPin } from "lucide-react";
import { CustomerPortalLayout } from "@/components/customer-portal/layout/CustomerPortalLayout";
import { Badge } from "@/components/ui/badge";

// Mock data for testing - in real app this would come from API
const mockWorkOrder = {
  id: "WO-001",
  description: "Installatie zonnepanelen",
  status: "in_progress",
  createdAt: "2025-04-20T10:00:00Z",
  plannedStartDate: "2025-05-01T08:00:00Z",
  address: "Hoofdstraat 123, Amsterdam",
  notes: "Installatie van 12 zonnepanelen op het zuidelijke dak inclusief montage en aansluiting op het elektriciteitsnet.",
  customerNotes: "Graag parkeren op de oprit"
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "planned":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Gepland</Badge>;
    case "in_progress":
      return <Badge className="bg-blue-500 hover:bg-blue-600">In Uitvoering</Badge>;
    case "completed":
      return <Badge className="bg-green-500 hover:bg-green-600">Afgerond</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const CustomerPortalWorkOrder = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<any>(null);

  useEffect(() => {
    // Simulate API call
    setWorkOrder(mockWorkOrder);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <CustomerPortalLayout>
        <div className="flex items-center justify-center py-12">
          <p>Laden...</p>
        </div>
      </CustomerPortalLayout>
    );
  }

  if (!workOrder) {
    return (
      <CustomerPortalLayout>
        <div className="flex items-center justify-center py-12">
          <p>Werkopdracht niet gevonden.</p>
        </div>
      </CustomerPortalLayout>
    );
  }

  return (
    <CustomerPortalLayout
      title={`Werkopdracht ${workOrder.id}`}
      subtitle="Details van de geplande werkzaamheden"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </Button>
          {getStatusBadge(workOrder.status)}
        </div>

        <Card className="p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Clipboard className="h-4 w-4 text-primary" />
                Omschrijving
              </h3>
              <p className="text-muted-foreground">
                {workOrder.description}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Locatie
              </h3>
              <p className="text-muted-foreground">
                {workOrder.address}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <CalendarRange className="h-4 w-4 text-primary" />
              Planning
            </h3>
            <p className="text-muted-foreground">
              Gepland op {format(new Date(workOrder.plannedStartDate), "EEEE d MMMM yyyy", { locale: nl })}
            </p>
          </div>

          {workOrder.notes && (
            <div>
              <h3 className="font-medium mb-2">Details Werkzaamheden</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {workOrder.notes}
              </p>
            </div>
          )}

          {workOrder.customerNotes && (
            <div>
              <h3 className="font-medium mb-2">Uw Notities</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {workOrder.customerNotes}
              </p>
            </div>
          )}
        </Card>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalWorkOrder;
