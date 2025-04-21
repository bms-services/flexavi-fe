
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AppointmentPanelProps {
  appointments: {
    id: string;
    title: string;
    status: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
  }[];
}

export const AppointmentPanel: React.FC<AppointmentPanelProps> = ({ appointments }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Recente Afspraken
      </CardTitle>
    </CardHeader>
    <CardContent>
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map(appointment => (
            <div key={appointment.id} className="bg-slate-50 rounded-md p-3 border">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{appointment.title}</h4>
                <Badge variant="outline" className={
                  appointment.status === "completed" ? "bg-green-100 text-green-800" :
                  appointment.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                  appointment.status === "canceled" ? "bg-red-100 text-red-800" :
                  "bg-orange-100 text-orange-800"
                }>
                  {appointment.status}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                {appointment.date} {appointment.startTime}-{appointment.endTime}
              </div>
              <p className="text-sm mt-2">{appointment.description}</p>
              {(appointment.status === "new_assignment" || appointment.status === "extra_assignment") && (
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600">Prijs: €750</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground italic text-sm">
          Geen recente afspraken gevonden voor deze klant.
        </div>
      )}
    </CardContent>
  </Card>
);
